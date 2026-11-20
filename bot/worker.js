/**
 * Cloudflare Worker «Все свои»: приём заявок с сайта → Telegram.
 *
 * Эндпоинты:
 *   POST /api/lead  — заявка с формы обратной связи (JSON)
 *   GET  /health    — проверка живости
 *
 * Секреты (задаются один раз, не хранятся в коде):
 *   wrangler secret put TELEGRAM_BOT_TOKEN   — токен бота от @BotFather
 *   wrangler secret put TELEGRAM_CHAT_ID     — id чата, куда падают заявки
 *
 * Переменные (wrangler.toml [vars]):
 *   ALLOWED_ORIGIN — адрес сайта для CORS (админка/localhost добавляются автоматически)
 *
 * Опционально: KV-неймспейс LEADS_KV — бэкап заявок и лимит запросов.
 *   wrangler kv namespace create LEADS_KV
 *   → id вписать в wrangler.toml
 */

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

function cors(response, origin) {
  const h = new Headers(response.headers);
  h.set("Access-Control-Allow-Origin", origin || "*");
  h.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  h.set("Access-Control-Allow-Headers", "Content-Type");
  return new Response(response.body, { status: response.status, headers: h });
}

function json(data, status, origin) {
  return cors(new Response(JSON.stringify(data), { status, headers: JSON_HEADERS }), origin);
}

function allowedOrigins(env) {
  const list = [env.ALLOWED_ORIGIN, "http://localhost:4173", "http://localhost:5173", "http://127.0.0.1:4173"];
  return list.filter(Boolean);
}

function pickOrigin(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin) return env.ALLOWED_ORIGIN || "*";
  return allowedOrigins(env).includes(origin) ? origin : allowedOrigins(env)[0] || "*";
}

function esc(s) {
  // экранирование HTML для Telegram parse_mode=HTML
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function validate(lead) {
  const errors = {};
  if (!lead.name || lead.name.trim().length < 2) errors.name = "Укажите имя";
  const digits = (lead.phone || "").replace(/\D/g, "");
  if (digits.length < 10) errors.phone = "Укажите корректный телефон";
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.email = "Проверьте email";
  if (!lead.message || lead.message.trim().length < 5) errors.message = "Опишите задачу";
  return errors;
}

async function rateLimit(env, ip) {
  if (!env.LEADS_KV) return true; // без KV лимит не проверяем
  const key = `ratelimit:${ip}:${Math.floor(Date.now() / 60000)}`;
  const current = parseInt((await env.LEADS_KV.get(key)) || "0", 10);
  if (current >= 5) return false;
  await env.LEADS_KV.put(key, String(current + 1), { expirationTtl: 120 });
  return true;
}

async function handleLead(request, env) {
  const origin = pickOrigin(request, env);

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return json({ ok: false, error: "Bot is not configured (missing secrets)" }, 503, origin);
  }

  let lead;
  try {
    lead = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400, origin);
  }

  // honeypot: скрытое поле, заполненное ботом → имитируем успех и молчим
  if (lead.company) {
    return json({ ok: true }, 200, origin);
  }

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (!(await rateLimit(env, ip))) {
    return json({ ok: false, error: "Слишком много заявок подряд — попробуйте через минуту" }, 429, origin);
  }

  const errors = validate(lead);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 422, origin);
  }

  const when = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow", hour12: false });
  const audience = lead.audience === "performer" ? "Исполнитель" : "Заказчик";
  const text = [
    `🔔 <b>Новая заявка с сайта</b> (${esc(when)} МСК)`,
    ``,
    `👤 <b>Имя:</b> ${esc(lead.name)}`,
    `📱 <b>Телефон:</b> ${esc(lead.phone)}`,
    lead.email ? `📧 <b>Email:</b> ${esc(lead.email)}` : null,
    lead.city ? `📍 <b>Город:</b> ${esc(lead.city)}` : null,
    `🧭 <b>Роль:</b> ${audience}`,
    ``,
    `💬 <b>Сообщение:</b>`,
    esc(lead.message),
  ].filter((line) => line !== null).join("\n");

  let telegramOk = true;
  try {
    const tg = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!tg.ok) {
      telegramOk = false;
      console.error("Telegram error:", await tg.text());
    }
  } catch (e) {
    telegramOk = false;
    console.error("Telegram fetch failed:", e.message);
  }

  // бэкап заявки в KV, если неймспейс подключён
  if (env.LEADS_KV) {
    try {
      const key = `lead:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
      await env.LEADS_KV.put(key, JSON.stringify({ ...lead, ip, telegramOk, when }), { expirationTtl: 60 * 60 * 24 * 90 });
    } catch {}
  }

  if (!telegramOk) {
    return json({ ok: false, error: "Не удалось отправить заявку — попробуйте ещё раз или напишите нам в Telegram" }, 502, origin);
  }
  return json({ ok: true }, 200, origin);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = pickOrigin(request, env);

    if (request.method === "OPTIONS") {
      return cors(new Response(null, { status: 204 }), origin);
    }
    if (url.pathname === "/health") {
      return cors(new Response("ok"), origin);
    }
    if (url.pathname === "/api/lead" && request.method === "POST") {
      try {
        return await handleLead(request, env);
      } catch (e) {
        console.error("lead handler error:", e);
        return json({ ok: false, error: "Internal error" }, 500, origin);
      }
    }
    return cors(new Response("Not found", { status: 404 }), origin);
  },
};
