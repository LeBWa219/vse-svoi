import { useState } from 'react'
import { vacancies } from '../data/vacancies.js'
import { Icon } from './Icons.jsx'
import ImagePlaceholder from './ImagePlaceholder.jsx'
import { pub } from '../utils/pub.js'

export default function Vacancies() {
  const [flipped, setFlipped] = useState({}) // { [id]: true/false }

  const toggle = (id) =>
    setFlipped((cur) => ({ ...cur, [id]: !cur[id] }))

  return (
    <section id="vacancies" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="orb w-72 h-72 top-10 -right-20 bg-brand-purple/20" />
      <div className="orb w-72 h-72 -bottom-20 -left-20 bg-brand-crimson/15" />

      <div className="container-x relative z-10">
        <div className="max-w-3xl">
          <div className="section-eyebrow">
            <Icon.briefcase className="w-3.5 h-3.5" />
            Вакансии
          </div>
          <h2 className="mt-4 section-title">Открытые позиции</h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Актуальные вакансии от партнёров «Все свои». Нажмите «Подробнее» — карточка
            перевернётся, и вы увидите полный список обязанностей, требований и условий.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {vacancies.map((v, i) => (
            <VacancyCard
              key={v.id}
              vacancy={v}
              isFlipped={!!flipped[v.id]}
              onToggle={() => toggle(v.id)}
              animationDelay={i * 0.06}
            />
          ))}
        </div>

        {/* CTA снизу */}
        <div className="mt-10 rounded-2xl bg-brand-lilacSoft ring-1 ring-brand-lilac/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="font-display font-bold text-brand-deepPurple text-base sm:text-lg">
              Не нашли подходящую вакансию?
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Оставьте заявку — куратор подберёт для вас индивидуальный вариант.
            </div>
          </div>
          <a
            href="#contacts"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary flex-shrink-0"
          >
            Оставить заявку
            <Icon.arrow className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function VacancyCard({ vacancy, isFlipped, onToggle, animationDelay }) {
  return (
    <div
      className={`flip-card h-[26rem] sm:h-[28rem] cursor-pointer ${isFlipped ? 'is-flipped' : ''}`}
      style={{
        animation: `fade-in-up .5s ease ${animationDelay}s both`,
      }}
    >
      <div className="flip-card-inner" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        {/* ЛИЦЕВАЯ СТОРОНА */}
        <div className="flip-card-face rounded-2xl bg-white ring-1 ring-slate-100 shadow-md shadow-brand-purple/5 hover:shadow-xl hover:shadow-brand-purple/10 transition-shadow overflow-hidden flex flex-col">
          {/* Место под изображение вакансии */}
          <div className="relative">
            <ImagePlaceholder
              src={pub(vacancy.image)}
              alt={vacancy.title}
              height="h-32"
              className="!rounded-none"
              label="Место для фото"
            />
            {/* Шапка с градиентом поверх картинки */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-deepPurple/90 via-brand-deepPurple/50 to-transparent p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                  {vacancy.partner}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/80 font-semibold">
                  {vacancy.city}
                </span>
              </div>
              <h3 className="mt-2 font-display text-lg font-bold text-white leading-snug">
                {vacancy.title}
              </h3>
            </div>
          </div>

          {/* Тело */}
          <div className="p-5 flex flex-col flex-1">
            <div className="text-2xl font-display font-extrabold gradient-text">
              {vacancy.salary}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <Icon.clock className="w-4 h-4 text-brand-purple" />
              {vacancy.schedule}
            </div>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed flex-1">
              {vacancy.short}
            </p>

            <button
              onClick={onToggle}
              className="mt-4 inline-flex items-center justify-center gap-1.5 w-full rounded-xl bg-brand-lilacSoft py-2.5 text-xs font-semibold text-brand-purple hover:bg-brand-lilac hover:text-white transition-all"
            >
              Подробнее
              <Icon.arrow className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ОБРАТНАЯ СТОРОНА */}
        <div className="flip-card-face flip-card-back rounded-2xl bg-brand-deepPurple ring-1 ring-brand-purple/30 shadow-xl shadow-brand-purple/20 overflow-hidden flex flex-col text-white">
          {/* Шапка */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="font-display font-bold text-sm truncate">{vacancy.title}</div>
              <div className="text-[10px] uppercase tracking-wider text-brand-lilac font-semibold mt-0.5">
                {vacancy.partner} · {vacancy.city}
              </div>
            </div>
            <button
              onClick={onToggle}
              aria-label="Закрыть"
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <Icon.close className="w-4 h-4" />
            </button>
          </div>

          {/* Прокручиваемое тело */}
          <div className="px-5 py-4 overflow-y-auto flex-1 text-xs space-y-4">
            <div>
              <div className="font-semibold text-brand-lilac uppercase tracking-wider text-[10px] mb-2">
                Обязанности
              </div>
              <ul className="space-y-1.5">
                {vacancy.details.obligations.map((it, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/85">
                    <span className="text-brand-lilac mt-0.5">•</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-semibold text-brand-lilac uppercase tracking-wider text-[10px] mb-2">
                Требования
              </div>
              <ul className="space-y-1.5">
                {vacancy.details.requirements.map((it, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/85">
                    <span className="text-brand-lilac mt-0.5">•</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-semibold text-brand-lilac uppercase tracking-wider text-[10px] mb-2">
                Условия
              </div>
              <ul className="space-y-1.5">
                {vacancy.details.conditions.map((it, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/85">
                    <span className="text-brand-lilac mt-0.5">•</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-white/10">
            <a
              href="#contacts"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center gap-1.5 w-full rounded-xl bg-white text-brand-deepPurple py-2.5 text-xs font-semibold hover:bg-brand-lilacSoft transition-colors"
            >
              Откликнуться
              <Icon.arrow className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}