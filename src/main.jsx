import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AudienceProvider } from './context/AudienceContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AudienceProvider>
        <App />
      </AudienceProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
