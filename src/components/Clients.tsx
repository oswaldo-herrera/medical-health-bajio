import { Car, Cog, Factory, MapPin, Truck } from 'lucide-react'
import CountUp from './CountUp'
import { CLIENT_COUNT } from '../data/content'
import { delay } from '../lib/ui'

const industries = [
  { icon: Car, label: 'Automotriz' },
  { icon: Cog, label: 'Autopartes' },
  { icon: Truck, label: 'Logística' },
  { icon: Factory, label: 'Manufacturera' },
]

export default function Clients() {
  return (
    <section className="section clients" id="clientes">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Nuestros clientes</p>
          <h2 className="section__title">Las empresas que mueven al Bajío ya cuidan a su gente con nosotros</h2>
        </div>

        <div className="clients__panel" data-reveal>
          <p className="clients__count">
            Más de <CountUp end={CLIENT_COUNT} />
          </p>
          <p className="clients__statement">
            empresas de la industria <strong>automotriz, autopartes, logística y manufacturera</strong> en los
            principales parques industriales del Bajío
          </p>

          <ul className="clients__industries">
            {industries.map((industry, i) => (
              <li key={industry.label} data-reveal style={delay(120 + i * 90)}>
                <industry.icon size={22} aria-hidden="true" />
                {industry.label}
              </li>
            ))}
          </ul>

          <p className="clients__where">
            <MapPin size={16} aria-hidden="true" />
            Parques industriales del Bajío
          </p>
        </div>
      </div>
    </section>
  )
}
