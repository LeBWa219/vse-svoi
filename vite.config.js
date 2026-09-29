import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Для GitHub Pages: репозиторий называется "vse-svoi",
// поэтому base должен быть "/vse-svoi/".
// Если зальёшь в репозиторий с другим именем — поменяй и здесь.
// Для локальной разработки (npm run dev) base можно убрать — Vite использует "/" по умолчанию.
export default defineConfig({
  plugins: [react()],
  base: '/vse-svoi/',
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
