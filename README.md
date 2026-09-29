# Все свои — аутсорсинговое агентство

Сайт на React + Vite + Tailwind CSS. Развёрнут на GitHub Pages через ручной деплой.

## Локальный запуск

```bash
npm install
npm run dev
```

Открыть `http://localhost:5173/`

## Деплой на GitHub Pages (ручной)

### Один раз: настройка GitHub Pages

1. Открой https://github.com/LeBWa219/vse-svoi/settings/pages
2. **Build and deployment** → **Source**: `Deploy from a branch`
3. **Branch**: `gh-pages` / `/(root)` → **Save**

### Каждый раз при обновлении сайта

```bash
npm install         # если ещё не ставил или обновил зависимости
npm run deploy
```

Эта команда:
1. Соберёт проект (`vite build`) в папку `dist/`
2. Запушит содержимое `dist/` в ветку `gh-pages`

Через 30–60 секунд после пуша сайт обновится по адресу:
**https://lebwa219.github.io/vse-svoi/**

## Важно про `base` путь

В `vite.config.js` указан `base: '/vse-svoi/'`. Это нужно, потому что GitHub Pages публикует сайт по пути `/vse-svoi/`, а не в корне домена.

Все картинки и ассеты автоматически получают этот префикс через хелпер `src/utils/pub.js`.

Если зальёшь репозиторий под другим именем — поменяй `base` в `vite.config.js`:
```js
base: '/mysite/',
```

Если используешь кастомный домен (`example.com`) — убери `base` или поставь `base: '/'`.
