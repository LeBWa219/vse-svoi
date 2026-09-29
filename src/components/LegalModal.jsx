import { useEffect } from 'react'
import { Icon } from './Icons.jsx'
import { PrivacyPolicyContent, PersonalDataPolicyContent, UserAgreementContent } from './LegalContent.jsx'

const TITLES = {
  privacy: 'Политика конфиденциальности',
  policy:  'Политика обработки персональных данных',
  terms:   'Пользовательское соглашение',
}

const CONTENT = {
  privacy: PrivacyPolicyContent,
  policy:  PersonalDataPolicyContent,
  terms:   UserAgreementContent,
}

export default function LegalModal({ open, kind, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open || !kind) return null

  const Content = CONTENT[kind]
  const title = TITLES[kind]

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      {/* Overlay */}
      <button
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-brand-deepPurple/70 backdrop-blur-sm animate-fade-in-up"
      />

      {/* Модальное окно */}
      <div className="relative w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up">
        {/* Шапка */}
        <div className="relative bg-brand-gradient px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                Документ
              </div>
              <h2 id="legal-modal-title" className="mt-1 font-display font-bold text-white text-lg sm:text-xl">
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Icon.close className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20" />
        </div>

        {/* Контент */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 text-sm text-slate-700 leading-relaxed space-y-4">
          <Content />

          <div className="mt-8 pt-5 border-t border-slate-200 text-xs text-slate-500">
            Документ вступает в силу с 1 января 2026 года. Последнее обновление — 15 сентября 2026 года.
            Уточнить{/* ООО «Все свои» · ИНН 7700000000 · г. Москва, ул. Тверская, 18. */}
          </div>
        </div>

        {/* Футер */}
        <div className="px-6 py-4 sm:px-8 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button onClick={onClose} className="btn-primary !py-2.5 !px-5 text-sm">
            Понятно
          </button>
        </div>
      </div>
    </div>
  )
}
