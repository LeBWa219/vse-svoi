import { useEffect, useState } from "react";
import { useAudience } from "../context/AudienceContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { Icon } from "./Icons.jsx";
import { pub } from "../utils/pub.js";

// Компактное меню для десктопа (>= 1280px)
const navItemsBase = [
  { id: "about", label: "О нас" },
  { id: "partners", label: "Партнёры" },
  { id: "services", label: "Услуги" },
  { id: "how", label: "Как мы работаем" },
  { id: "news", label: "Новости" },
  { id: "contacts", label: "Контакты" },
];

const navItemsPerformer = [
  ...navItemsBase.slice(0, 4),
  { id: "vacancies", label: "Вакансии" },
  ...navItemsBase.slice(4),
];

// В вертикальном мобильном меню места больше — показываем все разделы
const navItemsMobileBase = [
  ...navItemsBase.slice(0, 4),
  { id: "faq", label: "Вопросы и ответы" },
  ...navItemsBase.slice(4),
];

const navItemsMobilePerformer = [
  ...navItemsMobileBase.slice(0, 4),
  { id: "vacancies", label: "Вакансии" },
  ...navItemsMobileBase.slice(4),
];

const go = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Header() {
  const { audience, setAudience } = useAudience();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNav = (id) => {
    setMenuOpen(false);
    go(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-md shadow-brand-purple/5 dark:bg-slate-900/95 dark:shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="container-x">
        <div className="flex h-20 md:h-24 items-center justify-between gap-2 min-[400px]:gap-3 sm:gap-4">
          {/* Текстовый логотип без изображения */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start leading-none flex-shrink-0"
            aria-label="Все свои — на главную"
          >
            <span className="font-display font-extrabold tracking-tight text-base min-[400px]:text-lg sm:text-2xl xl:text-3xl gradient-text whitespace-nowrap">
              ВСЕ СВОИ
            </span>
            <span className="mt-1 hidden min-[400px]:block text-[9px] uppercase tracking-[0.16em] text-brand-purple/80 dark:text-brand-lilac font-semibold whitespace-nowrap">
              аутсорсинг персонала
            </span>
          </button>

          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 2xl:ml-8">
            {(audience === "performer" ? navItemsPerformer : navItemsBase).map(
              (it) => (
                <button
                  key={it.id}
                  onClick={() => onNav(it.id)}
                  className="px-2 2xl:px-4 py-2 rounded-full text-[13px] 2xl:text-sm font-medium text-slate-700 hover:text-brand-purple hover:bg-brand-lilacSoft transition-colors whitespace-nowrap dark:text-slate-300 dark:hover:text-brand-lilac dark:hover:bg-brand-purple/20"
                >
                  {it.label}
                </button>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1 min-[400px]:gap-2 sm:gap-2.5 flex-shrink-0">
            <AudienceToggle audience={audience} setAudience={setAudience} />

            {/* На мобильных переключатель темы живёт в раскрывающемся меню */}
            <button
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Включить светлую тему"
                  : "Включить тёмную тему"
              }
              title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
              className="hidden sm:inline-flex p-2 rounded-full text-brand-purple hover:bg-brand-lilacSoft transition-colors dark:text-brand-lilac dark:hover:bg-brand-purple/20 flex-shrink-0"
            >
              {theme === "dark" ? <IconSun /> : <IconMoon />}
            </button>

            <button
              onClick={() => onNav("contacts")}
              className="hidden lg:inline-flex btn-primary !py-2 !px-4 2xl:!py-2.5 2xl:!px-5 text-[13px] 2xl:text-sm !w-auto whitespace-nowrap"
            >
              <Icon.chat className="w-4 h-4 flex-shrink-0" />
              Оставить заявку
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="xl:hidden p-1.5 min-[400px]:p-2 rounded-lg text-brand-purple hover:bg-brand-lilacSoft flex-shrink-0 dark:text-brand-lilac dark:hover:bg-brand-purple/20"
              aria-label="Меню"
            >
              {menuOpen ? (
                <Icon.close className="w-6 h-6" />
              ) : (
                <Icon.menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[48rem] border-t border-brand-lilac/30" : "max-h-0"
        } bg-white/95 backdrop-blur dark:bg-slate-900/95 dark:border-slate-700`}
      >
        <div className="container-x py-4 grid gap-1">
          {(audience === "performer"
            ? navItemsMobilePerformer
            : navItemsMobileBase
          ).map((it) => (
            <button
              key={it.id}
              onClick={() => onNav(it.id)}
              className="text-left px-4 py-3 rounded-xl text-slate-700 hover:bg-brand-lilacSoft hover:text-brand-purple font-medium transition-colors dark:text-slate-300 dark:hover:bg-brand-purple/20 dark:hover:text-brand-lilac"
            >
              {it.label}
            </button>
          ))}
          <button onClick={() => onNav("contacts")} className="btn-primary mt-2">
            <Icon.chat className="w-4 h-4" />
            Оставить заявку
          </button>

          <div className="mt-3 pt-3 border-t border-brand-lilac/30 dark:border-slate-700 grid grid-cols-2 gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-brand-lilacSoft text-sm font-semibold text-brand-purple transition-colors dark:bg-brand-purple/20 dark:text-brand-lilac"
            >
              {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
              {theme === "dark" ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
            </button>
            <a
              href="tel:+74951234567"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-brand-lilacSoft text-sm font-semibold text-brand-purple transition-colors dark:bg-brand-purple/20 dark:text-brand-lilac"
            >
              <Icon.headset className="w-4 h-4" />
              Позвонить
            </a>
            <a
              href="https://t.me/vse_svoi_job"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-brand-lilacSoft text-sm font-semibold text-brand-purple transition-colors dark:bg-brand-purple/20 dark:text-brand-lilac"
            >
              <img src={pub("/images/telegram.svg")} alt="" width="16" height="16" className="w-4 h-4 rounded" />
              Telegram
            </a>
            <a
              href="mailto:hello@vse-svoi.ru"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-brand-lilacSoft text-sm font-semibold text-brand-purple transition-colors dark:bg-brand-purple/20 dark:text-brand-lilac"
            >
              <Icon.chat className="w-4 h-4" />
              Написать
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function AudienceToggle({ audience, setAudience }) {
  return (
    <div className="relative inline-flex items-center rounded-full bg-brand-lilacSoft p-1 ring-1 ring-brand-lilac/40 flex-shrink-0 dark:bg-brand-purple/20 dark:ring-brand-purple/40">
      <span
        className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-brand-gradient shadow-md shadow-brand-purple/30 transition-all duration-300 ${
          audience === "client" ? "left-1" : "left-[calc(50%+0rem)]"
        }`}
        aria-hidden
      />
      <button
        onClick={() => setAudience("client")}
        className={`relative z-10 px-1.5 min-[400px]:px-2.5 sm:px-3.5 py-1 text-[10px] min-[400px]:text-[11px] sm:text-[13px] xl:text-sm font-semibold rounded-full transition-colors whitespace-nowrap after:absolute after:-inset-y-3 after:-inset-x-1 after:content-[''] ${
          audience === "client"
            ? "text-white"
            : "text-brand-purple hover:text-brand-deepPurple dark:text-brand-lilac dark:hover:text-white"
        }`}
      >
        Заказчикам
      </button>
      <button
        onClick={() => setAudience("performer")}
        className={`relative z-10 px-1.5 min-[400px]:px-2.5 sm:px-3.5 py-1 text-[10px] min-[400px]:text-[11px] sm:text-[13px] xl:text-sm font-semibold rounded-full transition-colors whitespace-nowrap after:absolute after:-inset-y-3 after:-inset-x-1 after:content-[''] ${
          audience === "performer"
            ? "text-white"
            : "text-brand-purple hover:text-brand-deepPurple dark:text-brand-lilac dark:hover:text-white"
        }`}
      >
        Исполнителям
      </button>
    </div>
  );
}

function IconSun() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12h2.5M19 12h2.5M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
    </svg>
  );
}
