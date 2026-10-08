import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Audience } from '../data/content'

interface AudienceState {
  audience: Audience
  setAudience: (audience: Audience) => void
}

const AudienceContext = createContext<AudienceState | null>(null)

// ?para=pacientes abre la página en modo paciente (útil para campañas)
function initialAudience(): Audience {
  return new URLSearchParams(window.location.search).get('para') === 'pacientes' ? 'paciente' : 'empresa'
}

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>(initialAudience)
  return <AudienceContext.Provider value={{ audience, setAudience }}>{children}</AudienceContext.Provider>
}

export function useAudience() {
  const ctx = useContext(AudienceContext)
  if (!ctx) throw new Error('useAudience debe usarse dentro de AudienceProvider')
  return ctx
}
