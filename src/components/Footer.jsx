import { Icon } from "./Icons.jsx";
import { pub } from "../utils/pub.js";

const socials = [
  {
    key: "vk",
    label: "ВКонтакте",
    href: "https://vk.ru/vse_svoi_job",
    icon: "/images/vk.svg",
  },
  {
    key: "tg",
    label: "Telegram",
    href: "https://t.me/vse_svoi_job",
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
    { label: "Вопросы и ответы", href: "#faq" },
    { label: "Контакты", href: "#contacts" },
  ],
  Заказчикам: [
    { label: "Услуги", href: "#services" },
    { label: "Как мы работаем", href: "#how" },
    { label: "Оставить заявку", href: "#contacts" },
  ],
  Исполнителям: [
    { label: "Стать исполнителем", href: "#contacts" },
    { label: "Вакансии", href: "#vacancies" },
    { label: "Вопросы и ответы", href: "#faq" },
  ],
  Документы: [
    { label: "Политика конфиденциальности", href: "#", action: "privacy" },
    { label: "Политика обработки ПДн", href: "#", action: "policy" },
    { label: "Пользовательское соглашение", href: "#", action: "terms" },
  ],
};

export default function Footer({ onOpenLegal }) {
  return (
    <footer className="relative bg-brand-deepPurple dark:bg-slate-950 dark:border-t dark:border-slate-800 text-white pt-16 pb-28 sm:pb-8 overflow-hidden">
      <div className="orb w-72 h-72 top-0 -left-20 bg-brand-purple/40" />
      <div className="orb w-72 h-72 -bottom-20 right-12 bg-brand-blue/30" />

      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            {/* Текстовый логотип без изображения */}
            <div className="flex flex-col items-start">
              <span className="font-brand font-bold text-xl tracking-tight text-white">
                ВСЕ СВОИ
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-brand-lilac font-semibold">
                аутсорсинговое агентство
              </span>
            </div>

            <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-sm">
              Подбираем исполнителей для бизнеса и предлагаем проекты для
              специалистов. Сотрудничаем с сервисами Яндекса, Флитом, Бери
              Заряд. Работаем по всей России — онлайн и без привязки к региону.
            </p>

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
                      width="40"
                      height="40"
                      loading="lazy"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-1.5">
              <a
                href="tel:+74951234567"
                className="block text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                +7 (495) 123-45-67
              </a>
              <a
                href="mailto:hello@vse-svoi.ru"
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                hello@vse-svoi.ru
              </a>
            </div>
          </div>

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
            <span>Работаем по всей России</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
