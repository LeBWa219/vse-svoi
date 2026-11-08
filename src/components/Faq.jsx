import { useState } from "react";
import { useAudience } from "../context/AudienceContext.jsx";
import { faqContent } from "../data/content.js";
import { Icon } from "./Icons.jsx";

export default function Faq() {
  const { audience } = useAudience();
  const c = faqContent[audience];
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen((cur) => (cur === i ? null : i));

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="orb w-72 h-72 top-20 -left-20 bg-brand-blue/20" />
      <div className="orb w-72 h-72 -bottom-10 -right-20 bg-brand-purple/20" />

      <div className="container-x relative z-10">
        <div className="max-w-3xl">
          <div className="section-eyebrow">
            <Icon.chat className="w-3.5 h-3.5" />
            Вопросы и ответы
          </div>
          <h2 className="mt-4 section-title">{c.title}</h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed dark:text-slate-400">
            Не нашли ответ на свой вопрос? Напишите куратору в{" "}
            <a
              href="https://t.me/vse_svoi_job"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-purple font-semibold underline hover:text-brand-crimson dark:text-brand-lilac"
            >
              Telegram
            </a>{" "}
            — ответим в течение 30 минут.
          </p>
        </div>

        <div className="mt-10 grid gap-3 max-w-3xl">
          {c.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-white ring-1 ring-slate-100 shadow-md shadow-brand-purple/5 overflow-hidden transition-shadow hover:shadow-lg dark:bg-slate-900 dark:ring-slate-800 dark:shadow-black/20"
                style={{ animation: `fade-in-up .4s ease ${i * 0.05}s both` }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span
                    className={`font-display font-bold text-base sm:text-lg leading-snug ${
                      isOpen
                        ? "text-brand-purple dark:text-brand-lilac"
                        : "text-brand-deepPurple dark:text-slate-100"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-brand-gradient text-white rotate-180"
                        : "bg-brand-lilacSoft text-brand-purple dark:bg-brand-purple/20 dark:text-brand-lilac"
                    }`}
                  >
                    <Icon.arrow className="w-4 h-4 rotate-90" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 animate-fade-in-up">
                    {String(item.a)
                      .split("\n\n")
                      .map((para, idx) => (
                        <p
                          key={idx}
                          className={`text-sm sm:text-base text-slate-600 leading-relaxed dark:text-slate-400 ${
                            idx > 0 ? "mt-2" : ""
                          } ${
                            para.startsWith("—")
                              ? "pl-4 border-l-2 border-brand-lilac"
                              : ""
                          }`}
                        >
                          {para}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
