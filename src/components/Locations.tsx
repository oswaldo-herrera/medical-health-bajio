import { ArrowUpRight, MapPin } from 'lucide-react'
import { locations } from '../data/content'
import { delay } from '../lib/ui'

export default function Locations() {
  return (
    <section className="section locations" id="instalaciones">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Nuestras instalaciones</p>
          <h2 className="section__title">Laboratorio, gabinete y unidad médica propios en Silao</h2>
          <p className="section__lead">
            Todo se procesa en casa: menos intermediarios, resultados más rápidos y un solo responsable.
          </p>
        </div>

        <div className="locations__grid">
          {locations.map((location, i) => (
            <article className="location" key={location.name} data-reveal style={delay(i * 120)}>
              <figure className="location__media">
                <img
                  src={location.image}
                  alt={`Fachada de ${location.name}, ${location.zone}, Silao`}
                  loading="lazy"
                  width={1400}
                  height={1050}
                  style={{ objectPosition: location.imagePosition }}
                />
                <figcaption className="location__badge">
                  <MapPin size={14} aria-hidden="true" />
                  {location.zone}
                </figcaption>
              </figure>

              <h3>{location.name}</h3>

              <div className="location__groups">
                {location.groups.map((group) => (
                  <div key={group.title}>
                    <p className="location__group-title">{group.title}</p>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="location__foot">
                <p>
                  <MapPin size={18} aria-hidden="true" />
                  <span>
                    {location.address[0]}
                    <br />
                    {location.address[1]}
                  </span>
                </p>
                <a
                  className="card__link"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Cómo llegar
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
