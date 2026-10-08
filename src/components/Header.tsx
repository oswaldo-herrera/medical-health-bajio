import { useEffect, useRef, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { audienceContact, navLinks, whatsappMessages } from '../data/content'
import { useAudience } from '../context/audience'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink } from '../lib/whatsapp'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const progress = useRef<HTMLDivElement>(null)
  const { audience, setAudience } = useAudience()
  const main = audienceContact[audience]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? window.scrollY / max : 0
      progress.current?.style.setProperty('transform', `scaleX(${ratio})`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header${scrolled || open ? ' header--solid' : ''}`}>
      <div className="header__progress" ref={progress} />
      <div className="container header__inner">
        <a href="#inicio" className="header__brand" aria-label="Medical and Health del Bajío, inicio">
          <img src="/ogotipo_medical_and_health.png" alt="Medical and Health del Bajío" width={72} height={44} />
        </a>

        <nav className={`header__nav${open ? ' is-open' : ''}`} aria-label="Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setOpen(false)
                if (link.audience) setAudience(link.audience)
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            {...whatsappLink(whatsappMessages.general[audience])}
            className="btn btn--primary header__nav-cta"
            onClick={() => setOpen(false)}
          >
            <WhatsAppIcon />
            {main.cta}
          </a>
        </nav>

        <div className="header__actions">
          <a href={`tel:${main.tel}`} className="header__phone" title={main.label}>
            <Phone size={16} aria-hidden="true" />
            {main.text}
          </a>
          <a {...whatsappLink(whatsappMessages.general[audience])} className="btn btn--primary btn--sm header__cta">
            <WhatsAppIcon size={16} />
            {main.cta}
          </a>
          <button
            type="button"
            className="header__toggle"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}
