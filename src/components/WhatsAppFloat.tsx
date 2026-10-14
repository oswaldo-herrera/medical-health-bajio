import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Send, X } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { useAudience } from '../context/audience'
import { whatsappMessages } from '../data/content'
import { whatsappUrl } from '../lib/whatsapp'

// Botón flotante de WhatsApp con ventana para escribir el mensaje antes de enviarlo
export default function WhatsAppFloat() {
  const { audience } = useAudience()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const root = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!open) return
    field.current?.focus()
    const onKey = (e: globalThis.KeyboardEvent) => {
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

  function send(e?: FormEvent) {
    e?.preventDefault()
    const message = text.trim() || whatsappMessages.general[audience]
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    setText('')
    setOpen(false)
  }

  // Enter envía; Shift+Enter hace salto de línea
  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className={`wa${open ? ' is-open' : ''}`} ref={root}>
      {open && (
        <div className="wa__panel" role="dialog" aria-labelledby="wa-title">
          <div className="wa__head">
            <span className="wa__logo">
              <img src="/ogotipo_medical_and_health.png" alt="" width={40} height={25} />
            </span>
            <div>
              <p className="wa__name" id="wa-title">
                Medical and Health del Bajío
              </p>
              <p className="wa__status">
                <span /> En línea · respondemos pronto
              </p>
            </div>
            <button type="button" className="wa__close" aria-label="Cerrar" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="wa__body">
            <div className="wa__msg">
              ¡Hola! 👋
              <br />
              ¿En qué podemos ayudarte? Escríbenos y te respondemos por WhatsApp.
            </div>
          </div>

          <form className="wa__composer" onSubmit={send}>
            <textarea
              ref={field}
              rows={1}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Escribe tu mensaje..."
              aria-label="Escribe tu mensaje"
            />
            <button type="submit" className="wa__send" aria-label="Enviar por WhatsApp">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="wa__button"
        aria-label={open ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={26} /> : <WhatsAppIcon size={30} />}
      </button>
    </div>
  )
}
