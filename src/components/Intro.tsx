import { useEffect, useState } from 'react'

const SHOW_MS = 3400 // tiempo en pantalla antes de abrirse
const EXIT_MS = 900 // duración de la salida
const STORAGE_KEY = 'mh-intro-visto'

function alreadySeen() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // sin almacenamiento disponible: se mostrará en cada carga
  }
}

// Pantalla de entrada: logo, línea de pulso, avatares y frase; luego se abre en círculo hacia la página
export default function Intro() {
  const [phase, setPhase] = useState<'show' | 'exit' | 'done'>(() =>
    alreadySeen() || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'done' : 'show',
  )

  useEffect(() => {
    if (phase === 'done') return
    document.documentElement.style.overflow = 'hidden'
    const exitTimer = phase === 'show' ? window.setTimeout(() => setPhase('exit'), SHOW_MS) : undefined
    const doneTimer = phase === 'exit' ? window.setTimeout(() => setPhase('done'), EXIT_MS) : undefined
    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'done') return
    markSeen()
    document.documentElement.style.overflow = ''
  }, [phase])

  if (phase === 'done') return null

  return (
    <div className={`intro${phase === 'exit' ? ' is-exit' : ''}`} role="presentation">
      <div className="intro__glow" aria-hidden="true" />
      <div className="intro__grid" aria-hidden="true" />

      <div className="intro__center">
        <div className="intro__logo">
          <span className="intro__ring" aria-hidden="true" />
          <span className="intro__ring intro__ring--2" aria-hidden="true" />
          <img src="/ogotipo_medical_and_health.png" alt="Medical and Health del Bajío" width={1322} height={812} />
        </div>

        <svg className="intro__ecg" viewBox="0 0 400 60" aria-hidden="true">
          <path
            pathLength={1}
            d="M0 30h120l10-8 8 8h16l7 10 10-36 10 50 7-24h20l10-6 8 6h154"
          />
        </svg>

        <p className="intro__tagline">
          <span>Gente sana,</span> <em>gente productiva.</em>
        </p>
        <p className="intro__sub">Salud ocupacional para la industria del Bajío</p>
      </div>

      <img className="intro__avatar intro__avatar--left" src="/avatar_cuerpo.webp" alt="" aria-hidden="true" />
      <img className="intro__avatar intro__avatar--center" src="/avatar_clientes.webp" alt="" aria-hidden="true" />
      <img className="intro__avatar intro__avatar--right" src="/avatar_masculino.webp" alt="" aria-hidden="true" />

      <button type="button" className="intro__skip" onClick={() => setPhase('exit')}>
        Saltar
      </button>
    </div>
  )
}
