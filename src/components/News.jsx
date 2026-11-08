import { useState } from "react";
import { news } from "../data/news.js";
import { Icon } from "./Icons.jsx";
import ImagePlaceholder from "./ImagePlaceholder.jsx";
import { pub } from "../utils/pub.js";

const tags = ["Все", "Партнёрство", "Агентство"];

export default function News() {
  const [active, setActive] = useState("Все");
  const [expanded, setExpanded] = useState(null);

  const filtered =
    active === "Все" ? news : news.filter((n) => n.tag === active);

  const toggle = (id) => setExpanded((cur) => (cur === id ? null : id));

  return (
    <section id="news" className="py-16 sm:py-24 relative">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="section-eyebrow">Новости агентства</div>
            <h2 className="mt-4 section-title">Что у нас происходит</h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Партнёрства, новые направления, продуктовые апдейты. Обновляем по
              мере событий — без воды.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setActive(t);
                  setExpanded(null);
                }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  active === t
                    ? "bg-brand-gradient text-white shadow-md shadow-brand-purple/30"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-brand-lilac hover:text-brand-purple dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700 dark:hover:text-brand-lilac"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((n, i) => {
            const isOpen = expanded === n.id;
            return (
              <article
                key={n.id}
                className={`group relative rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-md shadow-brand-purple/5 ring-1 ring-slate-100 dark:ring-slate-800 transition-all duration-500 ${
                  isOpen
                    ? "sm:col-span-2 lg:col-span-3 shadow-xl shadow-brand-purple/15 dark:shadow-black/30"
                    : "hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1"
                }`}
                style={{
                  animation: "fade-in-up .4s ease " + i * 0.05 + "s both",
                }}
              >
                <div
                  className={`relative ${isOpen ? "h-48" : "h-36"} transition-all duration-500`}
                >
                  {n.image ? (
                    <img
                      src={pub(n.image)}
                      alt={n.title}
                      width="800"
                      height="300"
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${n.accent} flex flex-col items-center justify-center gap-2 text-white/70`}
                    >
                      <Icon.image className="w-8 h-8" />
                      <span className="text-[10px] uppercase tracking-wider font-semibold">
                        Место для фото
                      </span>
                    </div>
                  )}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 35%)",
                    }}
                  />
                  <span className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-purple dark:text-brand-lilac">
                    {n.tag}
                  </span>
                  <span className="absolute bottom-4 right-4 text-white/90 text-xs font-medium">
                    {n.date}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-brand-deepPurple dark:text-white leading-snug group-hover:text-brand-purple dark:group-hover:text-brand-lilac transition-colors">
                    {n.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {n.excerpt}
                  </p>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 animate-fade-in-up">
                      {n.content.split("\n\n").map((para, idx) => (
                        <p
                          key={idx}
                          className={
                            para.startsWith("—")
                              ? "pl-4 border-l-2 border-brand-lilac"
                              : ""
                          }
                        >
                          {para.split("\n").map((line, lidx) => (
                            <span key={lidx} className="block">
                              {line}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => toggle(n.id)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:text-brand-crimson transition-colors dark:text-brand-lilac dark:hover:text-white"
                  >
                    {isOpen ? "Свернуть" : "Читать далее"}
                    <Icon.arrow
                      className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : "group-hover:translate-x-1"}`}
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center text-slate-500 py-12">
            По выбранной категории пока нет новостей.
          </div>
        )}
      </div>
    </section>
  );
}
