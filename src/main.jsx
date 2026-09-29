import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AudienceProvider } from './context/AudienceContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AudienceProvider>
      <App />
    </AudienceProvider>
  </React.StrictMode>,
)
