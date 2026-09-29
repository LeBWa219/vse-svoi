import { useEffect, useState } from 'react'
import { Icon } from './Icons.jsx'

const STORAGE_KEY = 'vs_cookie_consent_v1'

export default function CookieBanner({ onOpenLegal }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) {
        const t = setTimeout(() => setVisible(true), 800)
        return () => clearTimeout(t)
      }
    } catch {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = (level) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ level, ts: Date.now() })
      )
    } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookie"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 animate-fade-in-up"
    >
      <div className="container-x">
        <div className="relative mx-auto max-w-5xl rounded-2xl bg-white shadow-2xl ring-1 ring-brand-lilac/40 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />

          <div className="p-5 sm:p-6 flex flex-col lg:flex-row gap-4 lg:items-center">
            <div className="flex items-start gap-3 flex-1">
              <div className="hidden sm:flex h-10 w-10 flex-shrink-0 rounded-xl bg-brand-lilacSoft items-center justify-center text-brand-purple">
                <Icon.shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-brand-deepPurple text-sm sm:text-base">
                  Мы используем cookie
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Продолжая использовать сайт, вы соглашаетесь с{' '}
                  <button
                    onClick={() => onOpenLegal('privacy')}
                    className="text-brand-purple font-semibold underline hover:text-brand-crimson"
                  >
                    Политикой конфиденциальности
                  </button>{' '}
                  и обработкой персональных данных в соответствии с{' '}
                  <a
                    href="http://www.consultant.ru/document/cons_doc_LAW_61801/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-purple font-semibold underline hover:text-brand-crimson"
                  >
                    152-ФЗ
                  </a>{' '}
                  (файлы cookie, IP, метрика). Вы можете отозвать согласие в любой момент.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
              <button
                onClick={() => accept('minimal')}
                className="btn-ghost text-xs sm:text-sm !py-2.5 !px-4"
              >
                Только необходимые
              </button>
              <button
                onClick={() => accept('all')}
                className="btn-primary text-xs sm:text-sm !py-2.5 !px-5"
              >
                Принять все
              </button>
            </div>

            <button
              onClick={() => accept('minimal')}
              aria-label="Закрыть"
              className="absolute top-3 right-3 lg:static lg:ml-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <Icon.close className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
