import { Icon } from "./Icons.jsx";
import { pub } from "../utils/pub.js";

const socials = [
  {
    key: "vk",
    label: "ВКонтакте",
    href: "https://vk.com/vsesvoi",
    icon: "/images/vk.svg",
  },
  {
    key: "tg",
    label: "Telegram",
    href: "https://t.me/vsesvoi",
    icon: "/images/telegram.svg",
  },
  {
    key: "max",
    label: "MAX",
    href: "https://max.ru/vsesvoi",
    icon: "/images/max.svg",
  },
];

const nav = {
  Агентство: [
    { label: "О нас", href: "#about" },
    { label: "Новости", href: "#news" },
    { label: "Партнёры", href: "#partners" },
    { label: "Контакты", href: "#contacts" },
  ],
  Заказчикам: [
    { label: "Услуги", href: "#services" },
    { label: "Как мы работаем", href: "#how" },
    { label: "Оставить заявку", href: "#contacts" },
    { label: "Договор и документы", href: "#" },
  ],
  Исполнителям: [
    { label: "Стать исполнителем", href: "#contacts" },
    { label: "Рейтинг", href: "#" },
    { label: "Обучение", href: "#news" },
    { label: "Поддержка", href: "#" },
  ],
  Документы: [
    { label: "Политика конфиденциальности", href: "#", action: "privacy" },
    { label: "Политика обработки ПДн", href: "#", action: "policy" },
    { label: "Пользовательское соглашение", href: "#" },
    { label: "Согласие на ПДн", href: "#", action: "policy" },
  ],
};

export default function Footer({ onOpenLegal }) {
  return (
    <footer className="relative bg-brand-deepPurple text-white pt-16 pb-8 overflow-hidden">
      <div className="orb w-72 h-72 top-0 -left-20 bg-brand-purple/40" />
      <div className="orb w-72 h-72 -bottom-20 right-12 bg-brand-blue/30" />

      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Бренд + соцсети */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src={pub("/logo.jpg")}
                alt="Все свои"
                className="h-11 w-11 flex-shrink-0 rounded-xl object-cover shadow-lg shadow-black/30"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fb = e.currentTarget.nextSibling;
                  if (fb) fb.style.display = "flex";
                }}
              />
              <div
                className="h-11 w-11 rounded-xl bg-brand-gradient items-center justify-center shadow-lg shadow-black/30"
                style={{ display: "none" }}
              >
                <span className="font-display font-extrabold text-white text-lg">
                  ВС
                </span>
              </div>
              <div>
                <div className="font-display font-extrabold text-lg">
                  Все свои
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-brand-lilac">
                  аутсорсинговое агентство
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-sm">
              Подбираем исполнителей для бизнеса и предлагаем проекты для
              специалистов. Сотрудничаем с Яндексом, Флитом, Бери Заряд.
            </p>

            {/* Соцсети */}
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-wider text-brand-lilac font-semibold mb-3">
                Мы в соцсетях
              </div>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="group inline-flex items-center justify-center h-10 w-10 rounded-xl overflow-hidden transition-all hover:scale-110 hover:ring-2 hover:ring-white/30"
                  >
                    <img
                      src={pub(s.icon)}
                      alt={s.label}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Ссылки */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {Object.entries(nav).map(([title, items]) => (
              <div key={title}>
                <div className="text-xs uppercase tracking-wider text-brand-lilac font-semibold">
                  {title}
                </div>
                <ul className="mt-3 space-y-2">
                  {items.map((it, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => {
                          if (it.action && onOpenLegal) onOpenLegal(it.action);
                          else if (
                            it.href &&
                            it.href.startsWith("#") &&
                            it.href.length > 1
                          ) {
                            const el = document.getElementById(
                              it.href.slice(1),
                            );
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="text-sm text-white/70 hover:text-white transition-colors text-left"
                      >
                        {it.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Нижняя плашка */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-white/60">
            © {new Date().getFullYear()} ООО «Все свои» · ИНН 7700000000 · ОГРН
            1167700000000
          </div>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <Icon.shield className="w-3.5 h-3.5 text-brand-lilac" />
              152-ФЗ «О персональных данных»
            </span>
            <span className="hidden sm:inline">·</span>
            <span>Сделано в России</span>
          </div>
        </div>
      </div>
    </footer>
  );
}