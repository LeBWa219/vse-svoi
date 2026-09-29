// Хелпер для правильных путей к статике в public/
// На GitHub Pages base = "/vse-svoi/", поэтому все пути в public/ должны начинаться с этого префикса.
// Vite автоматически не подставляет base к строкам в JSX — только к ассетам в index.html.
// Использование: <img src={pub('/images/vk.svg')} />
export function pub(path) {
  const base = import.meta.env.BASE_URL || '/'
  // Если path уже начинается с base — не дублируем
  if (path.startsWith(base)) return path
  // Нормализуем: убираем trailing slash у base, добавляем path
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  return `${normalizedBase}${path.startsWith('/') ? path : '/' + path}`
}
