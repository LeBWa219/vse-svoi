import { useState } from 'react'
import { useAudience } from './context/AudienceContext.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import Services from './components/Services.jsx'
import HowWeWork from './components/HowWeWork.jsx'
import Vacancies from './components/Vacancies.jsx'
import CtaBand from './components/CtaBand.jsx'
import News from './components/News.jsx'
import FeedbackForm from './components/FeedbackForm.jsx'
import Footer from './components/Footer.jsx'
import FloatingSocials from './components/FloatingSocials.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import LegalModal from './components/LegalModal.jsx'

export default function App() {
  const [legal, setLegal] = useState({ open: false, kind: null })
  const { audience } = useAudience()
  const openLegal = (kind) => setLegal({ open: true, kind })
  const closeLegal = () => setLegal({ open: false, kind: null })

  return (
    <div className="min-h-screen bg-white relative">
      <Header />

      <main>
        <Hero />
        <Ticker />
        <Services />
        <HowWeWork />
        {/* Вакансии видны только в режиме «Исполнителям» */}
        {audience === 'performer' && <Vacancies />}
        <CtaBand />
        <News />
        <FeedbackForm onOpenLegal={openLegal} />
      </main>

      <Footer onOpenLegal={openLegal} />

      {/* Боковая плашка с VK и TG — всегда видна */}
      <FloatingSocials />

      {/* Cookie-баннер (152-ФЗ) */}
      <CookieBanner onOpenLegal={openLegal} />

      {/* Юридические модальные окна */}
      <LegalModal open={legal.open} kind={legal.kind} onClose={closeLegal} />
    </div>
  )
}
