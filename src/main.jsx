import { ViteReactSSG } from 'vite-react-ssg/single-page'
import App from './App.jsx'
import { AudienceProvider } from './context/AudienceContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

// Пререндер для SEO: на сборке страница рендерится в статический HTML,
// на клиенте React гидрирует разметку.
export const createRoot = ViteReactSSG(
  <ThemeProvider>
    <AudienceProvider>
      <App />
    </AudienceProvider>
  </ThemeProvider>,
)
