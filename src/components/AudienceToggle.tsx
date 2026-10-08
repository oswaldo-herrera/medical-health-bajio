import { Building2, HeartPulse } from 'lucide-react'
import { useAudience } from '../context/audience'

export default function AudienceToggle({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { audience, setAudience } = useAudience()

  return (
    <div className={`toggle toggle--${tone}`} role="group" aria-label="¿Para quién buscas atención?">
      <span className={`toggle__pill${audience === 'paciente' ? ' is-right' : ''}`} aria-hidden="true" />
      <button type="button" aria-pressed={audience === 'empresa'} onClick={() => setAudience('empresa')}>
        <Building2 size={16} aria-hidden="true" />
        Para empresas
      </button>
      <button type="button" aria-pressed={audience === 'paciente'} onClick={() => setAudience('paciente')}>
        <HeartPulse size={16} aria-hidden="true" />
        Para ti y tu familia
      </button>
    </div>
  )
}
