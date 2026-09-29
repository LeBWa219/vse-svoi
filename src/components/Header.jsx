import { useEffect, useState } from "react";
import { useAudience } from "../context/AudienceContext.jsx";
import { Icon } from "./Icons.jsx";
import { pub } from "../utils/pub.js";

const navItemsBase = [
  { id: "about", label: "О нас" },
  { id: "partners", label: "Партнёры" },
  { id: "services", label: "Услуги" },
  { id: "how", label: "Как мы работаем" },
  { id: "news", label: "Новости" },
  { id: "contacts", label: "Контакты" },
];

// Вакансии показываем в навигации только исполнителям
const navItemsPerformer = [
  ...navItemsBase.slice(0, 4),
  { id: "vacancies", label: "Вакансии" },
  ...navItemsBase.slice(4),
];

export default function Header() {
  const { audience, setAudience } = useAudience();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-md shadow-brand-purple/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-x">
        <div className="flex h-20 md:h-24 items-center justify-between gap-6">
          {/* Лого */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
          >
            <div className="relative flex-shrink-0">
              <img
                src={pub("/logo.jpg")}
                alt="Все свои"
                className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 rounded-xl object-cover shadow-lg shadow-brand-purple/30 group-hover:shadow-brand-crimson/40 transition-shadow"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fb = e.currentTarget.nextSibling;
                  if (fb) fb.style.display = "flex";
                }}
              />
              <div
                className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 rounded-xl bg-brand-gradient items-center justify-center shadow-lg shadow-brand-purple/30"
                style={{ display: "none" }}
              >
                <span className="text-white font-display font-extrabold text-xl">
                  ВС
                </span>
              </div>
              <div className="absolute -inset-0.5 rounded-xl bg-brand-gradient opacity-0 group-hover:opacity-30 blur-sm transition-opacity" />
            </div>
            <div className="leading-tight text-left flex-shrink-0 hidden sm:block">
              <div
                className={`font-display font-extrabold text-lg ${scrolled ? "text-brand-deepPurple" : "text-brand-deepPurple"}`}
              >
                Все свои
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-brand-purple/70 font-semibold">
                аутсорсинг
              </div>
            </div>
          </button>

          {/* Навигация (десктоп) */}
          <nav className="hidden lg:flex items-center gap-2" style={{ marginLeft: '3rem' }}>
            {(audience === 'performer' ? navItemsPerformer : navItemsBase).map((it) => (
              <button
                key={it.id}
                onClick={() => go(it.id)}
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:text-brand-purple hover:bg-brand-lilacSoft transition-colors whitespace-nowrap"
              >
                {it.label}
              </button>
            ))}
          </nav>

          {/* Переключатель аудитории + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <AudienceToggle audience={audience} setAudience={setAudience} />

            <button
              onClick={() => go("contacts")}
              className="hidden sm:inline-flex btn-primary !py-2.5 !px-5 !w-48 text-sm"
            >
              <Icon.chat className="w-4 h-4" />
              Оставить заявку
            </button>

            {/* Бургер */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-brand-purple hover:bg-brand-lilacSoft flex-shrink-0"
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

      {/* Мобильное меню */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[36rem] border-t border-brand-lilac/30" : "max-h-0"
        } bg-white/98 backdrop-blur`}
      >
        <div className="container-x py-4 grid gap-1">
          {(audience === 'performer' ? navItemsPerformer : navItemsBase).map((it) => (
            <button
              key={it.id}
              onClick={() => go(it.id)}
              className="text-left px-4 py-3 rounded-xl text-slate-700 hover:bg-brand-lilacSoft hover:text-brand-purple font-medium transition-colors"
            >
              {it.label}
            </button>
          ))}
          <button onClick={() => go("contacts")} className="btn-primary mt-2">
            <Icon.chat className="w-4 h-4" />
            Оставить заявку
          </button>
        </div>
      </div>
    </header>
  );
}

function AudienceToggle({ audience, setAudience }) {
  return (
    <div className="relative inline-flex items-center rounded-full bg-brand-lilacSoft p-1 ring-1 ring-brand-lilac/40 flex-shrink-0">
      {/* Слайдер */}
      <span
        className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-brand-gradient shadow-md shadow-brand-purple/30 transition-all duration-300 ${
          audience === "client" ? "left-1" : "left-[calc(50%+0rem)]"
        }`}
        aria-hidden
      />
      <button
        onClick={() => setAudience("client")}
        className={`relative z-10 px-2 sm:px-4 py-1 text-[11px] sm:text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
          audience === "client"
            ? "text-white"
            : "text-brand-purple hover:text-brand-deepPurple"
        }`}
        aria-label="Заказчикам"
      >
        <span className="sm:hidden">Заказч.</span>
        <span className="hidden sm:inline">Заказчикам</span>
      </button>
      <button
        onClick={() => setAudience("performer")}
        className={`relative z-10 px-2 sm:px-4 py-1 text-[11px] sm:text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${
          audience === "performer"
            ? "text-white"
            : "text-brand-purple hover:text-brand-deepPurple"
        }`}
        aria-label="Исполнителям"
      >
        <span className="sm:hidden">Исполн.</span>
        <span className="hidden sm:inline">Исполнителям</span>
      </button>
    </div>
  );
}