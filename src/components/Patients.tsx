import { MapPin, Phone } from 'lucide-react'
import { contact, patientReasons, patientServices, whatsappMessages } from '../data/content'
import { delay, spotlight } from '../lib/ui'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink } from '../lib/whatsapp'

const lab = contact.phones.find((p) => p.label === 'Laboratorio')!.numbers[0]
const clinic = contact.phones.find((p) => p.label === 'Clínica')!.numbers[0]

export default function Patients() {
  return (
    <section className="section patients" id="pacientes">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Para ti y tu familia</p>
          <h2 className="section__title">Un estudio a tiempo hace la diferencia</h2>
          <p className="section__lead">
            La prevención y la detección oportuna son la base de nuestra misión. Realiza tus análisis, estudios de
            imagen y consultas con el mismo laboratorio y los mismos especialistas que cuidan a la industria del
            Bajío.
          </p>
        </div>

        <div className="patients__grid">
          {patientServices.map((service, i) => (
            <article
              className="card card--glow patients__card"
              key={service.title}
              onMouseMove={spotlight}
              data-reveal
              style={delay(i * 90)}
            >
              <span className="card__icon card__icon--navy">
                <service.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="card__title">{service.title}</h3>
              <p className="card__text">{service.text}</p>
              <p className="patients__where">
                <MapPin size={15} aria-hidden="true" />
                {service.where}
              </p>
            </article>
          ))}
        </div>

        <ul className="patients__reasons" data-reveal>
          {patientReasons.map((reason) => (
            <li key={reason.title}>
              <span className="card__icon card__icon--navy">
                <reason.icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="card__title">{reason.title}</h3>
                <p className="card__text">{reason.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="patients__cta" data-reveal>
          <div>
            <p className="patients__cta-title">¿Tienes dudas sobre tu estudio?</p>
            <p>Llámanos y te orientamos sobre qué estudio necesitas y en qué sede realizarlo.</p>
          </div>
          <div className="patients__cta-actions">
            <a href={`tel:${lab.tel}`} className="btn btn--primary">
              <Phone size={18} aria-hidden="true" />
              Laboratorio {lab.text}
            </a>
            <a href={`tel:${clinic.tel}`} className="btn btn--ghost">
              <Phone size={18} aria-hidden="true" />
              Clínica {clinic.text}
            </a>
            <a {...whatsappLink(whatsappMessages.patients)} className="patients__cta-link">
              <WhatsAppIcon size={16} />
              O escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
