import { risks, whatsappMessages } from '../data/content'
import { delay, spotlight } from '../lib/ui'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink } from '../lib/whatsapp'

export default function Risks() {
  return (
    <section className="section risks">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Para empresas · Lo que está en juego</p>
          <h2 className="section__title">La salud de tu personal no puede esperar a la próxima auditoría</h2>
          <p className="section__lead">
            Cada examen que se pospone y cada consulta que no se atiende se termina pagando en producción, en
            cumplimiento y en personas.
          </p>
        </div>

        <div className="risks__grid">
          {risks.map((risk, i) => (
            <article className="card card--glow" key={risk.title} onMouseMove={spotlight} data-reveal style={delay(i * 90)}>
              <span className="card__icon card__icon--warn">
                <risk.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="card__title">{risk.title}</h3>
              <p className="card__text">{risk.text}</p>
            </article>
          ))}
        </div>

        <div className="risks__cta" data-reveal>
          <p>¿Cuándo fue la última revisión médica de tu personal expuesto?</p>
          <a {...whatsappLink(whatsappMessages.risks)} className="btn btn--dark">
            <WhatsAppIcon />
            Quiero revisar mi caso
          </a>
        </div>
      </div>
    </section>
  )
}
