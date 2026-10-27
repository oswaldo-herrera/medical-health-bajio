import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CoverPhoto {
  src: string
  title: string
  text: string
}

interface Props {
  photos: CoverPhoto[]
  label: string
  autoplayMs?: number
  // 'portrait' para fotos verticales, 'landscape' para horizontales
  shape?: 'portrait' | 'landscape'
}

// Distancia circular más corta entre la foto i y la activa
function offsetOf(i: number, active: number, total: number) {
  let o = i - active
  if (o > total / 2) o -= total
  if (o < -total / 2) o += total
  return o
}

// Carrusel 3D tipo coverflow: foto central al frente y laterales giradas en profundidad
export default function Coverflow({ photos, label, autoplayMs = 4000, shape = 'portrait' }: Props) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)
  const total = photos.length

  const go = useCallback((n: number) => setActive((n + total) % total), [total])

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setTimeout(() => go(active + 1), autoplayMs)
    return () => window.clearTimeout(id)
  }, [active, paused, go, autoplayMs])

  return (
    <div
      className={`cover cover--${shape}`}
      data-reveal
      aria-roledescription="carrusel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1))
        touchX.current = null
      }}
    >
      <div className="cover__stage">
        {photos.map((photo, i) => {
          const o = offsetOf(i, active, total)
          const abs = Math.abs(o)
          return (
            <button
              key={photo.src}
              type="button"
              className={`cover__card${o === 0 ? ' is-active' : ''}${abs > 2 ? ' is-far' : ''}`}
              style={
                {
                  '--o': o,
                  '--abs': Math.min(abs, 3),
                  '--s': Math.sign(o),
                  zIndex: 10 - abs,
                } as CSSProperties
              }
              aria-hidden={o !== 0}
              tabIndex={o === 0 ? 0 : -1}
              aria-label={photo.title}
              onClick={() => go(i)}
            >
              <img src={photo.src} alt={photo.title} loading="lazy" />
              <span className="cover__shine" aria-hidden="true" />
            </button>
          )
        })}
      </div>

      <div className="cover__footer">
        <button type="button" className="cover__arrow" aria-label="Foto anterior" onClick={() => go(active - 1)}>
          <ChevronLeft size={20} />
        </button>

        <div className="cover__caption" key={active} aria-live="polite">
          <p className="cover__title">{photos[active].title}</p>
          <p className="cover__text">{photos[active].text}</p>
        </div>

        <button type="button" className="cover__arrow" aria-label="Foto siguiente" onClick={() => go(active + 1)}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="cover__dots" role="tablist" aria-label="Elegir foto">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Ver ${photo.title}`}
            className={`cover__dot${i === active ? ' is-active' : ''}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  )
}
