import { useAudience } from '../context/AudienceContext.jsx'
import { stepsContent } from '../data/content.js'
import { Icon } from './Icons.jsx'

export default function HowWeWork() {
  const { audience } = useAudience()
  const c = stepsContent[audience]

  return (
    <section id="how" className="relative py-16 sm:py-24 bg-brand-gradient-soft overflow-hidden">
      <div className="orb w-80 h-80 top-10 -left-20 bg-brand-lilac/40" />
      <div className="orb w-80 h-80 -bottom-20 -right-20 bg-brand-crimson/20" />

      <div className="container-x relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="section-eyebrow">
            <Icon.clock className="w-3.5 h-3.5" />
            Пошаговый процесс
          </div>
          <h2 className="mt-4 section-title">{c.title}</h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 lg:grid-cols-5 gap-5">
          {c.steps.map((s, i) => (
            <div
              key={audience + '-' + i}
              className="relative rounded-2xl bg-white p-6 shadow-md shadow-brand-purple/5 ring-1 ring-white/60 hover:shadow-lg hover:shadow-brand-purple/10 hover:-translate-y-1 transition-all"
              style={{ animation: 'fade-in-up .5s ease ' + (i * 0.08) + 's both' }}
            >
              {/* Номер */}
              <div className="absolute -top-4 -left-2 h-10 w-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-display font-extrabold shadow-lg shadow-brand-purple/30 z-10">
                {s.num}
              </div>

              <div className="mt-4">
                <h3 className="font-display font-bold text-brand-deepPurple text-base">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.text}</p>
              </div>

              {/* Стрелка между шагами */}
              {i < c.steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-brand-lilac z-10">
                  <Icon.arrow className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
