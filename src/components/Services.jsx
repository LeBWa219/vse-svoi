import { useAudience } from '../context/AudienceContext.jsx'
import { servicesContent } from '../data/content.js'
import { Icon } from './Icons.jsx'
import ImagePlaceholder from './ImagePlaceholder.jsx'
import { pub } from '../utils/pub.js'

export default function Services() {
  const { audience } = useAudience()
  const c = servicesContent[audience]

  return (
    <section id="services" className="py-16 sm:py-24 relative">
      <div className="orb w-72 h-72 -top-12 right-12 bg-brand-lilac/30" />

      <div className="container-x relative z-10">
        <div className="max-w-3xl">
          <div className="section-eyebrow">
            <Icon.briefcase className="w-3.5 h-3.5" />
            {audience === 'client' ? 'Для бизнеса' : 'Для исполнителей'}
          </div>
          <h2 className="mt-4 section-title">{c.title}</h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">{c.subtitle}</p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {c.items.map((item, i) => {
            const Ico = Icon[item.icon] || Icon.spark
            return (
              <div
                key={audience + '-' + i}
                className="card group !p-0 overflow-hidden"
                style={{ animation: 'fade-in-up .5s ease ' + (i * 0.07) + 's both' }}
              >
                {/* Место под изображение */}
                <div className="p-5 pb-0">
                  <ImagePlaceholder
                    src={pub(item.image)}
                    alt={item.title}
                    height="h-36"
                    label="Место для фото"
                  />
                </div>

                <div className="relative p-5">
                  <div className="absolute inset-0 rounded-2xl bg-brand-gradient opacity-0 group-hover:opacity-[0.04] transition-opacity" />

                  <div className="relative">
                    <div className="h-12 w-12 rounded-xl bg-brand-lilacSoft flex items-center justify-center text-brand-purple group-hover:bg-brand-gradient group-hover:text-white transition-all duration-300">
                      <Ico className="w-6 h-6" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-brand-deepPurple">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.text}</p>

                    <button
                      onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple hover:text-brand-crimson transition-colors"
                    >
                      {audience === 'client' ? 'Обсудить детали' : 'Подробнее'}
                      <Icon.arrow className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}