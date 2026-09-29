import { createContext, useContext, useEffect, useState } from 'react'

const AudienceContext = createContext({
  audience: 'client',
  setAudience: () => {},
  toggle: () => {},
})

export const useAudience = () => useContext(AudienceContext)

export function AudienceProvider({ children }) {
  const [audience, setAudience] = useState(() => {
    try {
      const saved = localStorage.getItem('vs_audience')
      return saved === 'performer' ? 'performer' : 'client'
    } catch {
      return 'client'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('vs_audience', audience)
    } catch {}
    document.documentElement.dataset.audience = audience
  }, [audience])

  const toggle = () =>
    setAudience((cur) => (cur === 'client' ? 'performer' : 'client'))

  return (
    <AudienceContext.Provider value={{ audience, setAudience, toggle }}>
      {children}
    </AudienceContext.Provider>
  )
}
