import { ArrowUpRight } from 'lucide-react'
import { certifications } from '../data/content'
import { delay, spotlight } from '../lib/ui'

export default function Certifications() {
  return (
    <section className="section certs" id="certificaciones">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Respaldo y calidad</p>
          <h2 className="section__title">Calidad certificada que puedes comprobar</h2>
          <p className="section__lead">
            Para tu empresa, un proveedor en regla ante cualquier auditoría. Para ti, la confianza de un laboratorio
            certificado. Estas son las certificaciones y registros que nos respaldan.
          </p>
        </div>

        <div className="certs__grid">
          {certifications.map((cert, i) => (
            <article className="card card--glow" key={cert.title} onMouseMove={spotlight} data-reveal style={delay(i * 80)}>
              <span className="card__icon">
                <cert.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="card__title">{cert.title}</h3>
              <p className="card__text">{cert.text}</p>
              {cert.link && (
                <a className="card__link" href={cert.link.href} target="_blank" rel="noreferrer">
                  {cert.link.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
