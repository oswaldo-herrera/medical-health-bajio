import type { CSSProperties, MouseEvent } from 'react'

// Retraso escalonado para [data-reveal]
export function delay(ms: number): CSSProperties {
  return { '--d': `${ms}ms` } as CSSProperties
}

// Guarda la posición del cursor en --mx/--my para el brillo de las tarjetas
export function spotlight(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
