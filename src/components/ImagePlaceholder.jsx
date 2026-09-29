import { Icon } from './Icons.jsx'
import { pub } from '../utils/pub.js'

/**
 * Место под изображение в карточке.
 * Использование:
 *   <ImagePlaceholder src="/images/news/1.jpg" alt="..." />
 *   <ImagePlaceholder /> {/* без src — показывает заглушку *​/}
 *
 * Когда появится реальная картинка — просто передай src.
 * Пути автоматически оборачиваются pub() для работы с GitHub Pages base.
 */
export default function ImagePlaceholder({
  src,
  alt = '',
  className = '',
  height = 'h-40',
  label = 'Место для изображения',
}) {
  if (src) {
    return (
      <div className={`relative ${height} ${className} overflow-hidden rounded-xl bg-slate-100`}>
        <img
          src={pub(src)}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Если картинка не загрузилась — показываем заглушку
            e.currentTarget.style.display = 'none'
            const ph = e.currentTarget.parentElement.querySelector('[data-placeholder]')
            if (ph) ph.style.display = 'flex'
          }}
        />
        <div
          data-placeholder
          style={{ display: 'none' }}
          className={`absolute inset-0 ${height} flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-lilacSoft to-brand-blue/10 text-brand-purple/60`}
        >
          <Icon.image className="w-8 h-8" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">{label}</span>
        </div>
      </div>
    )
  }

  // Заглушка без src
  return (
    <div
      className={`relative ${height} ${className} flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand-lilacSoft to-brand-blue/10 ring-1 ring-dashed ring-brand-lilac/40 text-brand-purple/60`}
    >
      <Icon.image className="w-8 h-8" />
      <span className="text-[10px] uppercase tracking-wider font-semibold">{label}</span>
    </div>
  )
}
