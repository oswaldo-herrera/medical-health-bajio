import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export interface GalleryImage {
  src: string
  alt: string
}

interface Props {
  title: string
  images: GalleryImage[]
  onClose: () => void
}

// Ventana emergente con galería de fotos: flechas, miniaturas, teclado y deslizar con el dedo
export default function GalleryModal({ title, images, onClose }: Props) {
  const [index, setIndex] = useState(0)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const total = images.length

  const go = useCallback((n: number) => setIndex((n + total) % total), [total])

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    closeBtn.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % total)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [onClose, total])

  return createPortal(
    <div className="gallery" role="dialog" aria-modal="true" aria-label={`Galería: ${title}`} onClick={onClose}>
      <div className="gallery__box" onClick={(e) => e.stopPropagation()}>
        <div className="gallery__head">
          <p className="gallery__title">{title}</p>
          <span className="gallery__count">
            {index + 1} / {total}
          </span>
          <button ref={closeBtn} type="button" className="gallery__close" aria-label="Cerrar galería" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div
          className="gallery__stage"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
            touchX.current = null
          }}
        >
          <img key={images[index].src} className="gallery__img" src={images[index].src} alt={images[index].alt} />
          {total > 1 && (
            <>
              <button type="button" className="gallery__nav gallery__nav--prev" aria-label="Foto anterior" onClick={() => go(index - 1)}>
                <ChevronLeft size={24} />
              </button>
              <button type="button" className="gallery__nav gallery__nav--next" aria-label="Foto siguiente" onClick={() => go(index + 1)}>
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="gallery__thumbs">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={`gallery__thumb${i === index ? ' is-active' : ''}`}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              >
                <img src={img.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
