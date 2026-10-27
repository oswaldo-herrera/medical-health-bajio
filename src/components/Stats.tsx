import CountUp from './CountUp'
import { CLIENT_COUNT, FOUNDED_YEAR, MOBILE_STUDIES_THOUSANDS } from '../data/content'
import { delay } from '../lib/ui'

const stats = [
  { end: new Date().getFullYear() - FOUNDED_YEAR, suffix: '', label: `años cuidando a la industria, desde ${FOUNDED_YEAR}` },
  { end: CLIENT_COUNT, prefix: '+', label: 'empresas del Bajío confían en nosotros' },
  { end: MOBILE_STUDIES_THOUSANDS, prefix: '+', suffix: ' mil', label: 'estudios realizados en unidades móviles' },
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
