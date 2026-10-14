import { Wifi } from 'lucide-react'
import { mobileUnits, whatsappMessages } from '../data/content'
import { delay, spotlight } from '../lib/ui'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink } from '../lib/whatsapp'

export default function MobileUnit() {
  return (
    <section className="section section--dark mobile-unit" id="unidad-movil">
      <div className="mobile-unit__bg" aria-hidden="true">
        {['/unidad_01.webp', '/unidad_02.webp', '/unidad_03.webp'].map((src) => (
          <span key={src} style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>
      <div className="mobile-unit__road" aria-hidden="true" />
      <div className="container mobile-unit__inner">
        <div className="section__head" data-reveal>
          <p className="eyebrow eyebrow--light">Unidad de diagnóstico clínica móvil</p>
          <h2 className="section__title">Llevamos la clínica a tu planta. Tu producción no se detiene.</h2>
          <p className="section__lead">
            Unidades móviles totalmente equipadas para aplicar los exámenes médicos en tus instalaciones: optimizas
            tiempos y costos, evitas traslados de personal y largas ausencias en producción.
          </p>
        </div>

        <div className="mobile-unit__grid">
          {mobileUnits.map((unit, i) => (
            <article className="card card--dark card--glow" key={unit.title} onMouseMove={spotlight} data-reveal style={delay(i * 100)}>
              <span className="card__number">0{i + 1}</span>
              <span className="card__icon">
                <unit.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="card__title">{unit.title}</h3>
              <p className="card__text">{unit.text}</p>
            </article>
          ))}
        </div>

        <div className="mobile-unit__foot" data-reveal>
          <p>
            <Wifi size={18} aria-hidden="true" />
            Todas las unidades se conectan vía remota para enviar la información a nuestro laboratorio.
          </p>
          <a {...whatsappLink(whatsappMessages.mobileUnit)} className="btn btn--primary">
            <WhatsAppIcon />
            Agenda una unidad móvil
          </a>
        </div>
      </div>
    </section>
  )
}
