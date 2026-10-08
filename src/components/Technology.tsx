import type { CSSProperties } from 'react'
import { statTopics, techFeatures } from '../data/content'
import { delay } from '../lib/ui'

// Alturas decorativas de las barras; no representan datos reales
const bars = [46, 62, 54, 78, 70, 92]

export default function Technology() {
  return (
    <section className="section tech" id="tecnologia">
      <div className="container tech__layout">
        <div>
          <div className="section__head section__head--left" data-reveal>
            <p className="eyebrow">Tecnología propia</p>
            <h2 className="section__title">Información médica en tiempo real para decidir a tiempo</h2>
            <p className="section__lead">
              No esperes semanas por un resultado. Tu información médica está disponible cuando la necesitas y
              organizada por trabajador.
            </p>
          </div>

          <ul className="tech__features">
            {techFeatures.map((feature, i) => (
              <li key={feature.title} data-reveal style={delay(i * 90)}>
                <span className="card__icon">
                  <feature.icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="card__title">{feature.title}</h3>
                  <p className="card__text">{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="tech__visual" data-reveal aria-hidden="true">
          <div className="dashboard">
            <div className="dashboard__bar">
              <span />
              <span />
              <span />
              <p>Estadísticas del servicio</p>
            </div>
            <div className="dashboard__chart">
              {bars.map((height, i) => (
                <span key={i} style={{ '--h': `${height}%`, '--bar-d': `${i * 90}ms` } as CSSProperties} />
              ))}
            </div>
            <ul className="dashboard__topics">
              {statTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
