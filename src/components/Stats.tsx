import CountUp from './CountUp'
import { clients, FOUNDED_YEAR, managedClients, mobileUnits } from '../data/content'
import { delay } from '../lib/ui'

const stats = [
  { end: new Date().getFullYear() - FOUNDED_YEAR, suffix: '', label: `años cuidando a la industria, desde ${FOUNDED_YEAR}` },
  // redondeado hacia abajo a la decena: la lista publicada son "algunos" clientes
  { end: Math.floor((clients.length + managedClients.length) / 10) * 10, prefix: '+', label: 'empresas del Bajío confían en nosotros' },
  { end: mobileUnits.length, label: 'tipos de unidad móvil que llegan a tu planta' },
  { end: 100, suffix: '%', label: 'empresa guanajuatense, con 2 sedes en Silao' },
]

export default function Stats() {
  return (
    <section className="stats" aria-label="Medical and Health en cifras">
      <div className="container stats__grid">
        {stats.map((stat, i) => (
          <div className="stats__item" key={stat.label} data-reveal style={delay(i * 90)}>
            <p className="stats__value">
              <CountUp end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <p className="stats__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
