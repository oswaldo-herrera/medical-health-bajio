import { clients, managedClients } from '../data/content'

function Marquee({ names, reverse = false }: { names: string[]; reverse?: boolean }) {
  return (
    <div className={`marquee${reverse ? ' marquee--reverse' : ''}`}>
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1}>
            {names.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default function Clients() {
  return (
    <section className="section clients" id="clientes">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Nuestros clientes</p>
          <h2 className="section__title">Las empresas que mueven al Bajío ya cuidan a su gente con nosotros</h2>
        </div>
      </div>

      <div data-reveal>
        <Marquee names={clients} />
        <p className="clients__label">Servicios médicos administrados por Medical and Health</p>
        <Marquee names={managedClients} reverse />
      </div>
    </section>
  )
}
