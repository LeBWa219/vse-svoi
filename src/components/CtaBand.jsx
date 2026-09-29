import { useAudience } from '../context/AudienceContext.jsx'
import { Icon } from './Icons.jsx'
import { pub } from '../utils/pub.js'

export default function CtaBand() {
  const { audience } = useAudience()

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      <div className="container-x">
        <div className="relative rounded-3xl bg-brand-gradient overflow-hidden shadow-2xl shadow-brand-purple/20">
          {/* Декор */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 15% 25%, white 0%, transparent 35%), radial-gradient(circle at 85% 75%, white 0%, transparent 30%)',
          }} />
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 p-8 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            <div className="text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                <Icon.heart className="w-3 h-3" />
                {audience === 'client' ? 'Готовы найти исполнителей?' : 'Готовы начать зарабатывать?'}
              </div>
              <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {audience === 'client'
                  ? 'Опишите задачу — подберём исполнителей за 12 часов'
                  : 'Заполните анкету — первые заказы в течение недели'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl mx-auto lg:mx-0">
                {audience === 'client'
                  ? 'Без долгого обсуждения. Куратор всегда на связи в мессенджере.'
                  : 'Заказы от Яндекса, Флита, Бери Заряд. Гибкий график, прозрачные выплаты, поддержка куратора 24/7.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <a
                href="#contacts"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn bg-white text-brand-deepPurple hover:bg-brand-lilacSoft shadow-lg"
              >
                {audience === 'client' ? 'Оставить заявку' : 'Стать исполнителем'}
                <Icon.arrow className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/vsesvoi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20 !gap-2"
              >
                <img
                  src={pub("/images/telegram.svg")}
                  alt="Telegram"
                  className="w-5 h-5 rounded-md"
                />
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}