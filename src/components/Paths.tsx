import { ArrowRight, Building2, Check, HeartPulse } from 'lucide-react'
import { useAudience } from '../context/audience'
import { paths, type Audience } from '../data/content'
import { delay } from '../lib/ui'

const icons = { empresa: Building2, paciente: HeartPulse }

export default function Paths() {
  const { audience, setAudience } = useAudience()

  return (
    <section className="section paths" aria-labelledby="paths-title">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">¿Cómo podemos ayudarte?</p>
          <h2 className="section__title" id="paths-title">
            Atendemos a empresas y a personas, con la misma calidad
          </h2>
        </div>

        <div className="paths__grid">
          {(Object.keys(paths) as Audience[]).map((key, i) => {
            const path = paths[key]
            const Icon = icons[key]
            return (
              <article
                key={key}
                className={`path path--${key}${audience === key ? ' is-active' : ''}`}
                data-reveal
                style={delay(i * 120)}
              >
                <Icon className="path__watermark" aria-hidden="true" />
                <span className="path__icon">
                  <Icon size={26} aria-hidden="true" />
                </span>
                <h3>{path.title}</h3>
                <p className="path__text">{path.text}</p>
                <ul>
                  {path.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <a
                  href={path.href}
                  className={`btn ${key === 'empresa' ? 'btn--primary' : 'btn--navy'}`}
                  onClick={() => setAudience(key)}
                >
                  {path.cta}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
