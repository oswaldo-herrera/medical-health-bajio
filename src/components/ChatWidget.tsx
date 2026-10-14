import { useEffect, useRef, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappUrl } from '../lib/whatsapp'

// Asistente flotante: avatar de cuerpo completo con globo; abre un formulario corto que se envía por WhatsApp
export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [showBubble, setShowBubble] = useState(true)
  const root = useRef<HTMLDivElement>(null)
  const firstField = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    firstField.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const field = (name: string) => String(data.get(name) ?? '').trim()

    const message = [
      `Hola, mi nombre es ${field('nombre')}.`,
      `Mi WhatsApp: ${field('whatsapp')}`,
      '',
      `Motivo: ${field('motivo')}`,
      '',
      '(Enviado desde el asistente de la página web)',
    ].join('\n')

    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    e.currentTarget.reset()
    setOpen(false)
  }

  return (
    <div className={`chat${open ? ' is-open' : ''}`} ref={root}>
      {open && (
        <div className="chat__panel" role="dialog" aria-labelledby="chat-title">
          <div className="chat__head">
            <img src="/avatar_asistente.webp" alt="" width={48} height={48} />
            <div>
              <p className="chat__title" id="chat-title">
                Cuéntame tu necesidad
              </p>
              <p className="chat__subtitle">Te respondemos por WhatsApp</p>
            </div>
            <button type="button" className="chat__close" aria-label="Cerrar" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <form className="chat__form" onSubmit={handleSubmit}>
            <label>
              Nombre
              <input ref={firstField} name="nombre" type="text" autoComplete="name" required />
            </label>
            <label>
              WhatsApp
              <input
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="10 dígitos"
                pattern="[0-9 +()\-]{10,}"
                title="Escribe tu número a 10 dígitos"
                required
              />
            </label>
            <label>
              Motivo
              <textarea
                name="motivo"
                rows={3}
                placeholder="Ej. cotización de exámenes de ingreso, informes de un análisis..."
                required
              />
            </label>
            <button type="submit" className="btn btn--navy chat__submit">
              <WhatsAppIcon />
              Enviar por WhatsApp
            </button>
            <p className="chat__note">Se abrirá WhatsApp con tu mensaje listo para enviar.</p>
          </form>
        </div>
      )}

      {!open && showBubble && (
        <div className="chat__bubble">
          <button type="button" className="chat__bubble-body" onClick={() => setOpen(true)} tabIndex={-1} aria-hidden="true">
            <span className="chat__bubble-title">Cuéntame tu necesidad 👋</span>
          </button>
          <button
            type="button"
            className="chat__bubble-close"
            aria-label="Ocultar mensaje"
            onClick={() => setShowBubble(false)}
          >
            <X size={14} />
          </button>
        </div>
      )}

      <button
        type="button"
        className="chat__avatar"
        aria-label="Abrir asistente: cuéntanos tu necesidad"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <img src="/avatar_cuerpo.webp" alt="" width={148} height={420} />
      </button>
    </div>
  )
}
