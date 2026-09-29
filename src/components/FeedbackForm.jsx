import { useState } from 'react'
import { useAudience } from '../context/AudienceContext.jsx'
import { Icon } from './Icons.jsx'

const initial = { name: '', phone: '', email: '', message: '' }

export default function FeedbackForm({ onOpenLegal }) {
  const { audience } = useAudience()
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Укажите имя (минимум 2 символа)'
    const phoneClean = form.phone.replace(/\D/g, '')
    if (phoneClean.length < 11) e.phone = 'Укажите корректный телефон (11 цифр)'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Проверьте email'
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Опишите задачу подробнее'
    if (!consent) e.consent = 'Необходимо согласие на обработку персональных данных'
    return e
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    // Имитация отправки на бэкенд
    setSubmitted(true)
    setForm(initial)
    setConsent(false)
  }

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  return (
    <section id="contacts" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="orb w-80 h-80 -top-20 right-12 bg-brand-crimson/20" />
      <div className="orb w-80 h-80 bottom-0 -left-20 bg-brand-blue/25" />

      <div className="container-x relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Левая часть — контактная информация */}
          <div className="lg:col-span-5">
            <div className="section-eyebrow">
              <Icon.chat className="w-3.5 h-3.5" />
              Контакты и заявка
            </div>
            <h2 className="mt-4 section-title">
              Обсудим вашу задачу
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {audience === 'client'
                ? 'Опишите задачу — куратор ответит в течение 30 минут в рабочее время. Без брифов на 20 страниц и навязчивых звонков.'
                : 'Заполните анкету — куратор свяжется, подберёт подходящие направления и расскажет про ближайшие заказы.'}
            </p>

            <div className="mt-8 space-y-4">
              <ContactRow icon="phone" label="Телефон" value="+7 (495) 123-45-67" href="tel:+74951234567" />
              <ContactRow icon="mail" label="Email" value="hello@vse-svoi.ru" href="mailto:hello@vse-svoi.ru" />
              <ContactRow icon="clock" label="Часы работы" value="Уточнить (не готово)" />
            </div>

            <div className="mt-8 rounded-2xl bg-brand-lilacSoft p-5 ring-1 ring-brand-lilac/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-gradient flex items-center justify-center text-white">
                  <Icon.shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-brand-deepPurple">Безопасно и по закону</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Работаем с ИП или с самозанятыми. Соответствие 152-ФЗ «О персональных данных».
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть — форма */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-brand-purple/10 ring-1 ring-slate-100">
              {submitted ? (
                <SuccessBlock onReset={() => setSubmitted(false)} />
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Имя *"
                      error={errors.name}
                    >
                      <input
                        type="text"
                        className="input"
                        placeholder="Иван"
                        value={form.name}
                        onChange={update('name')}
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Телефон *" error={errors.phone}>
                      <input
                        type="tel"
                        className="input"
                        placeholder="+7 (___) ___-__-__"
                        value={form.phone}
                        onChange={update('phone')}
                        autoComplete="tel"
                      />
                    </Field>
                  </div>

                  <Field label="Email (необязательно)" error={errors.email}>
                    <input
                      type="email"
                      className="input"
                      placeholder="ivan@company.ru"
                      value={form.email}
                      onChange={update('email')}
                      autoComplete="email"
                    />
                  </Field>

                  <Field
                    label={
                      audience === 'client' ? 'Опишите задачу *' : 'О себе и опыте *'
                    }
                    error={errors.message}
                  >
                    <textarea
                      rows={4}
                      className="input resize-none"
                      placeholder={
                        audience === 'client'
                          ? 'Например: нужны 5 курьеров на доставку в Москве, со следующей недели, на месяц'
                          : 'Например: опыт работы курьером 2 года, готов брать заказы в районе СВАО'
                      }
                      value={form.message}
                      onChange={update('message')}
                    />
                  </Field>

                  {/* Согласие на ПДн */}
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked)
                        if (errors.consent) setErrors((er) => ({ ...er, consent: undefined }))
                      }}
                      className="mt-0.5 h-5 w-5 rounded border-slate-300 text-brand-purple focus:ring-brand-lilac cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      Я согласен(на) с{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal('policy')}
                        className="text-brand-purple font-semibold underline hover:text-brand-crimson"
                      >
                        Политикой обработки персональных данных
                      </button>{' '}
                      и{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal('privacy')}
                        className="text-brand-purple font-semibold underline hover:text-brand-crimson"
                      >
                        Политикой конфиденциальности
                      </button>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-brand-crimson -mt-2">{errors.consent}</p>
                  )}

                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Отправить заявку
                    <Icon.arrow className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Нажимая «Отправить заявку», вы подтверждаете, что ознакомились с политиками
                    обработки и защиты персональных данных агентства «Все свои». Данные используются
                    исключительно для связи по вашей заявке и не передаются третьим лицам.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-brand-crimson">{error}</p>}
    </div>
  )
}

function ContactRow({ icon, label, value, href }) {
  const Ico =
    icon === 'phone' ? (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
      </svg>
    ) : icon === 'mail' ? (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ) : icon === 'pin' ? (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ) : (
      <Icon.clock className="w-5 h-5" />
    )

  const content = (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-brand-lilacSoft flex items-center justify-center text-brand-purple">
        {Ico}
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{label}</div>
        <div className="text-sm font-semibold text-slate-800">{value}</div>
      </div>
    </div>
  )

  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity">
      {content}
    </a>
  ) : (
    content
  )
}

function SuccessBlock({ onReset }) {
  return (
    <div className="text-center py-8 animate-fade-in-up">
      <div className="mx-auto h-16 w-16 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-lg shadow-brand-purple/30">
        <Icon.check className="w-8 h-8" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold text-brand-deepPurple">Заявка отправлена!</h3>
      <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
        Спасибо! Куратор «Все свои» свяжется с вами в течение 30 минут в рабочее время.
        Если оставили заявку в нерабочее время — ответим на следующее утро.
      </p>
      <button onClick={onReset} className="mt-6 btn-ghost">
        Отправить ещё одну
      </button>
    </div>
  )
}
