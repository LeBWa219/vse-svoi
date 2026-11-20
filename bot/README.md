# Бот заявок «Все свои» — Cloudflare Worker

Форма обратной связи на сайте отправляет заявки в Telegram через этот Worker.
Каркас готов: чтобы всё заработало, нужно подставить токен бота и chat_id, задеплоить и вписать адрес Worker'а на сайт.

## Шаг 0. Токен и chat_id

- **Токен**: у заказчика уже есть бот — попросите токен у владельца бота (в Telegram бот `@BotFather` → `/mybots` → выбрать бота → API Token). Если бота нет: `@BotFather` → `/newbot` → имя и username → получите токен вида `123456789:AAE...`
- **Chat ID** (куда падать заявкам): напишите боту любое сообщение **с нужного чата/аккаунта**, затем откройте
  `https://api.telegram.org/bot<ТОКЕН>/getUpdates` — в ответе найдите `"chat":{"id": ...}`
  (для группы: добавьте бота в группу, напишите в неё, id будет отрицательным; боту нужны права на сообщения)
- Отправьте тестовое сообщение боту из чата — иначе Telegram не разрешит боту писать первым

## Шаг 1. Деплой Worker'а

```bash
cd bot
npm install -g wrangler      # единожды
wrangler login               # откроет браузер, войдите в Cloudflare-аккаунт

wrangler secret put TELEGRAM_BOT_TOKEN   # вставить токен
wrangler secret put TELEGRAM_CHAT_ID     # вставить chat_id

wrangler deploy
```

В выводе будет адрес вида `https://vse-svoi-bot.<ваш-сабдомен>.workers.dev`.

Опционально (бэкап заявок + защита от спама):
```bash
wrangler kv namespace create LEADS_KV
# id из вывода вписать в wrangler.toml в блок [[kv_namespaces]] (раскомментировать)
wrangler deploy
```

## Шаг 2. Проверка

```bash
curl -X POST https://vse-svoi-bot.<сабдомен>.workers.dev/api/lead ^
  -H "Content-Type: application/json" ^
  -H "Origin: https://LeBWa219.github.io" ^
  -d "{\"name\":\"Тест\",\"phone\":\"+79001234567\",\"message\":\"Проверка формы\",\"audience\":\"client\"}"
```
В Telegram должно прийти сообщение, curl вернёт `{"ok":true}`.
Живость Worker'а отдельно: `GET /health` → `ok`.

## Шаг 3. Подключить к сайту

В корне сайта создать файл `.env` (не коммитится, есть в .gitignore):
```
VITE_LEAD_API_URL=https://vse-svoi-bot.<сабдомен>.workers.dev/api/lead
```
Пересобрать и задеплоить сайт (`npm run deploy`).

Пока переменная пуста — форма работает в демо-режиме (показывает успех без отправки).

## Что уже умеет Worker

- Валидация на сервере (имя, телефон, email, сообщение)
- Антиспам: honeypot-поле на форме, лимит 5 заявок/минуту с одного IP (при подключённом KV)
- CORS только для адресов сайта
- Бэкап каждой заявки в KV на 90 дней (опционально)
- Понятные ошибки: клиент показывает «напишите нам в Telegram», если отправка не удалась

## Локальная разработка Worker'а

```bash
cd bot
npx wrangler dev            # http://localhost:8787
# секреты для локалки: файл .dev.vars рядом с wrangler.toml
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```
