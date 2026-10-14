import { contact, FOUNDED_YEAR, navLinks } from '../data/content'
import { useAudience } from '../context/audience'

export default function Footer() {
  const { setAudience } = useAudience()

  return (
    <>
      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <img src="/ogotipo_medical_and_health.png" alt="Medical and Health del Bajío" width={104} height={64} />
            <p className="footer__tagline">“Gente sana, gente productiva”</p>
            <p>
              Servicios médicos para la industria y para ti y tu familia. Empresa 100% guanajuatense desde{' '}
              {FOUNDED_YEAR}.
            </p>
          </div>

          <nav aria-label="Pie de página">
            <p className="footer__title">Sitio</p>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => link.audience && setAudience(link.audience)}>
                {link.label}
              </a>
            ))}
            <a href="#contacto">Contacto</a>
          </nav>

          <div>
            <p className="footer__title">Contacto</p>
            {contact.phones.map((group) => (
              <p key={group.label}>
                {group.label}:{' '}
                {group.numbers.map((number, i) => (
                  <span key={number.tel}>
                    {i > 0 && ' · '}
                    <a href={`tel:${number.tel}`}>{number.text}</a>
                  </span>
                ))}
              </p>
            ))}
            <p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
        </div>
        <div className="container footer__legal">
          <p>© {new Date().getFullYear()} Medical and Health del Bajío, S.A. de C.V.</p>
          <p>REPSE ARR1764/2024 · ISO 9001:2015</p>
        </div>
      </footer>

    </>
  )
}
