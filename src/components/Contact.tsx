import { useState, type FormEvent } from 'react'
import { Mail, Phone } from 'lucide-react'
import AudienceToggle from './AudienceToggle'
import WhatsAppIcon from './WhatsAppIcon'
import { WHATSAPP_DISPLAY, whatsappUrl } from '../lib/whatsapp'
import { useAudience } from '../context/audience'
import {
  audienceContact,
  contact,
  interestOptions,
  patientInterestOptions,
  sedeOptions,
  whatsappMessages,
  type Audience,
} from '../data/content'

const intro: Record<Audience, { title: string; lead: string; form: string }> = {
  empresa: {
    title: 'Cubrimos las necesidades de salud laboral que tu empresa necesita',
    lead: 'Cuéntanos cuántos trabajadores tienes y qué necesitas. Te preparamos una propuesta a la medida de tu operación.',
    form: 'Solicita tu cotización',
  },
  paciente: {
    title: 'Estamos para cuidar de ti y de tu familia',
    lead: 'Escríbenos o llámanos y te orientamos sobre el estudio o la consulta que necesitas.',
    form: 'Pide informes',
  },
}

// Teléfonos secundarios que se muestran a cada tipo de visitante
const otherPhones: Record<Audience, string[]> = {
  empresa: ['Oficinas administrativas', 'Laboratorio', 'Clínica'],
  paciente: ['Clínica', 'Oficinas administrativas'],
}

export default function Contact() {
  const { audience } = useAudience()
  const [sent, setSent] = useState(false)
  const copy = intro[audience]
  const main = audienceContact[audience]

  // Abre WhatsApp con la solicitud ya redactada.
  // Al conectar Supabase, aquí también se guardará el prospecto.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const field = (name: string) => String(data.get(name) ?? '').trim()

    const isCompany = audience === 'empresa'
    const message = [
      isCompany
        ? 'Hola, quiero solicitar una cotización de salud ocupacional para mi empresa.'
        : 'Hola, quiero pedir informes sobre un estudio o servicio médico.',
      '',
      `Nombre: ${field('nombre')}`,
      ...(isCompany ? [`Empresa: ${field('empresa')}`] : []),
      `Teléfono: ${field('telefono')}`,
      `Correo: ${field('correo')}`,
      ...(isCompany
        ? [`Número de trabajadores: ${field('trabajadores')}`, `Servicio de interés: ${field('interes')}`]
        : [`Estudio de interés: ${field('interes')}`, `Sede de preferencia: ${field('sede')}`]),
      '',
      field('mensaje'),
    ].join('\n')

    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <section className="section section--dark contact" id="contacto">
      <div className="container contact__layout">
        <div data-reveal>
          <p className="eyebrow eyebrow--light">Contáctanos</p>
          <div className="contact__swap" key={audience}>
            <h2 className="section__title">{copy.title}</h2>
            <p className="section__lead">{copy.lead}</p>

            <a href={`tel:${main.tel}`} className="contact__sales">
              <span className="contact__sales-icon">
                <Phone size={22} aria-hidden="true" />
              </span>
              <span>
                <small>
                  {main.label} · {main.detail}
                </small>
                <strong>{main.text}</strong>
              </span>
            </a>

            <ul className="contact__phones">
              {contact.phones
                .filter((group) => otherPhones[audience].includes(group.label))
                .map((group) => (
                  <li key={group.label}>
                    <span>{group.label}</span>
                    {group.numbers.map((number) => (
                      <a key={number.tel} href={`tel:${number.tel}`}>
                        {number.text}
                      </a>
                    ))}
                  </li>
                ))}
              <li>
                <span>WhatsApp</span>
                <a href={whatsappUrl(whatsappMessages.general[audience])} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={15} /> {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <span>Correo</span>
                <a href={`mailto:${contact.email}`}>
                  <Mail size={15} aria-hidden="true" /> {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit} data-reveal>
          <AudienceToggle tone="light" />
          <h3>{copy.form}</h3>

          <div className="form__fields" key={audience}>
            <div className="form__row">
              <label>
                Nombre
                <input name="nombre" type="text" autoComplete="name" required />
              </label>
              {audience === 'empresa' ? (
                <label>
                  Empresa
                  <input name="empresa" type="text" autoComplete="organization" required />
                </label>
              ) : (
                <label>
                  Teléfono
                  <input name="telefono" type="tel" autoComplete="tel" required />
                </label>
              )}
            </div>
            <div className="form__row">
              {audience === 'empresa' && (
                <label>
                  Teléfono
                  <input name="telefono" type="tel" autoComplete="tel" required />
                </label>
              )}
              <label>
                Correo
                <input name="correo" type="email" autoComplete="email" required={audience === 'empresa'} />
              </label>
              {audience === 'paciente' && (
                <label>
                  Sede de preferencia
                  <select name="sede" defaultValue={sedeOptions[0]}>
                    {sedeOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            <div className="form__row">
              {audience === 'empresa' && (
                <label>
                  Número de trabajadores
                  <input name="trabajadores" type="number" min={1} inputMode="numeric" />
                </label>
              )}
              <label className={audience === 'paciente' ? 'form__full' : undefined}>
                {audience === 'empresa' ? 'Servicio de interés' : 'Estudio o servicio de interés'}
                <select name="interes">
                  {(audience === 'empresa' ? interestOptions : patientInterestOptions).map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Mensaje
              <textarea
                name="mensaje"
                rows={3}
                placeholder={audience === 'empresa' ? 'Cuéntanos qué necesita tu planta' : 'Cuéntanos qué estudio necesitas o tus dudas'}
              />
            </label>
          </div>

          <button type="submit" className="btn btn--primary btn--lg form__submit">
            <WhatsAppIcon />
            Enviar por WhatsApp
          </button>
          {sent && (
            <p className="form__note" role="status">
              Abrimos WhatsApp con tu solicitud lista para enviar. Si no se abrió, escríbenos al {WHATSAPP_DISPLAY}.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
