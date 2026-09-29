import { useEffect, useState } from 'react'
import { Icon } from './Icons.jsx'
import { pub } from '../utils/pub.js'

// Боковая фиксированная плашка — всегда видна.
// В РФ VK и Telegram — основные каналы для бизнеса.
export default function FloatingSocials() {
  const [visible, setVisible] = useState(false)
  const [cookieOffset, setCookieOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Следим за появлением cookie-баннера — если он виден, поднимаем плашку выше
  useEffect(() => {
    const checkCookie = () => {
      const banner = document.querySelector('[role="dialog"][aria-label="Уведомление об использовании cookie"]')
      if (!banner) {
        setCookieOffset(0)
        return
      }
      const rect = banner.getBoundingClientRect()
      const style = window.getComputedStyle(banner)
      const isVisible = rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0
      setCookieOffset(isVisible ? rect.height + 8 : 0)
    }
    checkCookie()
    // Проверяем чаще в первые секунды (баннер появляется через 800мс)
    const interval = setInterval(checkCookie, 300)
    return () => clearInterval(interval)
  }, [])

  // На mobile плашка снизу, на десктопе — справа по центру
  return (
    <aside
      aria-label="Социальные сети"
      className={`fixed z-40 transition-all duration-500 right-2 sm:right-5 sm:top-1/2 sm:-translate-y-1/2 ${
        visible
          ? 'opacity-100 sm:translate-x-0'
          : 'opacity-0 sm:translate-x-6 pointer-events-none'
      }`}
      style={{
        bottom: `calc(${cookieOffset}px + 0.75rem)`,
      }}
    >
      <div className="relative flex flex-col items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur shadow-lg sm:shadow-xl ring-1 ring-brand-lilac/30">
        {/* Заголовок-мини — только на десктопе */}
        <div className="hidden sm:block px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-purple rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Мы на связи
        </div>

        <div className="hidden sm:block h-px w-6 bg-brand-lilac/40" />

        {/* На mobile — горизонтальная раскладка, на десктопе — вертикальная */}
        <div className="flex sm:flex-col items-center gap-1.5 sm:gap-2">
          <a
            href="https://vk.com/vsesvoi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ВКонтакте"
            title="ВКонтакте"
            className="group relative inline-flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:scale-110 transition-transform"
          >
            <img
              src={pub("/images/vk.svg")}
              alt="ВКонтакте"
              className="w-full h-full object-cover rounded-lg sm:rounded-xl"
            />
            <Tooltip>ВКонтакте</Tooltip>
          </a>

          <a
            href="https://t.me/vsesvoi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            title="Telegram"
            className="group relative inline-flex items-center justify-center h-9 w-9 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:scale-110 transition-transform"
          >
            <img
              src={pub("/images/telegram.svg")}
              alt="Telegram"
              className="w-full h-full object-cover rounded-lg sm:rounded-xl"
            />
            <Tooltip>Telegram</Tooltip>
          </a>
        </div>

        <div className="h-px w-5 sm:w-6 bg-brand-lilac/40" />

        {/* Пульсирующий индикатор */}
        <div className="relative flex items-center justify-center">
          <span className="absolute h-5 w-5 sm:h-7 sm:w-7 rounded-full bg-brand-crimson/40 animate-ping" />
          <span className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-brand-crimson" />
        </div>
      </div>
    </aside>
  )
}

function Tooltip({ children }) {
  return (
    <>
      {/* Тултип сверху — для mobile (плашка внизу) */}
      <span className="sm:hidden absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-brand-deepPurple px-2.5 py-1 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
        {children}
      </span>
      {/* Тултип слева — для десктопа (плашка сбоку) */}
      <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-brand-deepPurple px-3 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
        {children}
        <span className="absolute left-full top-1/2 -translate-y-1/2 -ml-px border-4 border-transparent border-l-brand-deepPurple" />
      </span>
    </>
  )
}