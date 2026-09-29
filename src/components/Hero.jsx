import { useAudience } from '../context/AudienceContext.jsx'
import { heroContent } from '../data/content.js'
import { Icon } from './Icons.jsx'

export default function Hero() {
  const { audience } = useAudience()
  const c = heroContent[audience]

  return (
    <section id="about" className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      {/* Декоративные орбы */}
      <div className="orb w-[28rem] h-[28rem] -top-32 -left-24 bg-brand-purple/30" />
      <div className="orb w-[24rem] h-[24rem] top-10 right-0 bg-brand-blue/25" />
      <div className="orb w-[22rem] h-[22rem] bottom-0 left-1/3 bg-brand-crimson/20" />

      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Левая колонка */}
          <div className="lg:col-span-7">
            <div className="section-eyebrow animate-fade-in-up">
              {c.eyebrow}
            </div>

            <h1
              key={audience + '-title'}
              className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-deepPurple animate-fade-in-up"
            >
              {c.title.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="gradient-text">{c.title.split(' ').slice(-2).join(' ')}</span>
            </h1>

            <p
              key={audience + '-sub'}
              className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl animate-fade-in-up"
            >
              {c.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#contacts"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {c.primaryCta}
                <Icon.arrow className="w-4 h-4" />
              </a>
              <a
                href="#how"
                className="btn-ghost"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {c.secondaryCta}
              </a>
            </div>

            {/* Статистика */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl">
              {c.stats.map((s, i) => (
                <div key={i} className="relative">
                  <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold gradient-text">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-slate-500 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка — визуальный блок */}
          <div className="lg:col-span-5">
            <HeroVisual audience={audience} />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroVisual({ audience }) {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div className="relative rounded-3xl bg-brand-gradient p-1 shadow-2xl shadow-brand-purple/30">
        <div className="rounded-[1.4rem] bg-white/95 backdrop-blur p-6 sm:p-8">
          {/* Заголовок карточки */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-crimson animate-pulse-slow" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-purple">
                {audience === 'client' ? 'Лента заявок' : 'Лента заказов'}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">live</span>
          </div>

          {/* Список карточек */}
          <div className="mt-5 space-y-3">
            {(audience === 'client'
              ? [
                  { t: 'Курьеры на доставку', sub: 'Москва · 12 чел · завтра', tag: 'в работе', c: 'bg-brand-blue' },
                  { t: 'Операторы колл-центра', sub: 'Удалёнка · 6 чел · неделя', tag: 'подбор', c: 'bg-brand-purple' },
                  { t: 'Комплектовщики на склад', sub: 'СПб · 20 чел · 2 недели', tag: 'новая', c: 'bg-brand-crimson' },
                ]
              : [
                  { t: 'Яндекс · Доставка', sub: '3 заказа · 1 800 ₽', tag: 'рядом', c: 'bg-brand-blue' },
                  { t: 'Флит · Логистика', sub: 'смена · 4 200 ₽', tag: 'срочно', c: 'bg-brand-purple' },
                  { t: 'Бери Заряд · Сервис', sub: 'выезд · 2 600 ₽', tag: 'новый', c: 'bg-brand-crimson' },
                ]
            ).map((item, i) => (
              <div
                key={i}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm hover:shadow-md hover:border-brand-lilac/60 transition-all"
                style={{ animation: `fade-in-up .5s ease ${0.1 * i + 0.2}s both` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl ${item.c} text-white flex items-center justify-center font-bold`}>
                    {item.t.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-800">{item.t}</div>
                    <div className="text-xs text-slate-500">{item.sub}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple bg-brand-lilacSoft px-2 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Footer карточки */}
          <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Icon.shield className="w-4 h-4 text-brand-purple" />
              Договор · ГПХ / самозанятость
            </div>
            <div className="text-xs font-semibold text-brand-crimson">
              {audience === 'client' ? '12 ч на подбор' : '5 дней до старта'}
            </div>
          </div>
        </div>
      </div>

      {/* Плавающие бейджи */}
      <div className="absolute -top-5 -right-3 sm:-right-6 rounded-2xl bg-white shadow-xl ring-1 ring-brand-lilac/40 px-4 py-3 animate-float">
        <div className="flex items-center gap-2">
          <Icon.star className="w-4 h-4 text-brand-crimson" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Рейтинг</div>
            <div className="text-sm font-bold text-brand-deepPurple">4.9 / 5.0</div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 sm:-left-6 rounded-2xl bg-white shadow-xl ring-1 ring-brand-lilac/40 px-4 py-3 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-brand-gradient flex items-center justify-center text-white">
            <Icon.users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Активных</div>
            <div className="text-sm font-bold text-brand-deepPurple">350+ человек</div>
          </div>
        </div>
      </div>
    </div>
  )
}
