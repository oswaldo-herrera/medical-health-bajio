import Coverflow from './Coverflow'
import WhatsAppIcon from './WhatsAppIcon'
import { MOBILE_UNIT_COUNT, whatsappMessages } from '../data/content'
import { whatsappLink } from '../lib/whatsapp'

const um = (n: number) => `/unidad_medica/um_${String(n).padStart(2, '0')}.webp`

const photos = [
  { src: um(2), title: 'Salud hasta donde estés', text: 'Nuestro equipo médico listo para atenderte donde lo necesites.' },
  { src: '/unidad_01.webp', title: 'Unidad de diagnóstico', text: 'Audiometría, espirometría, rayos X, laboratorio y exámenes médicos.' },
  { src: um(7), title: 'Montaje completo', text: 'Unidades y módulo de atención instalados en un solo lugar.' },
  { src: um(11), title: 'Registro en sitio', text: 'Recepción y captura de datos en línea con nuestro laboratorio.' },
  { src: '/unidad_02.webp', title: 'Atención en sitio', text: 'Montamos el servicio donde lo necesitas, en el horario que te convenga.' },
  { src: um(4), title: 'Equipo profesional', text: 'Personal médico y de enfermería capacitado.' },
  { src: um(8), title: 'Unidades de diagnóstico', text: 'Rayos X, audiometría y toma de muestras sin trasladarte.' },
  { src: um(6), title: 'Módulo de atención', text: 'Espacio para recibir y orientar a cada persona.' },
  { src: '/unidad_03.webp', title: `${MOBILE_UNIT_COUNT} unidades móviles`, text: 'Una flotilla lista para atender a muchas personas en un mismo día.' },
  { src: um(1), title: 'Empresas, eventos y comunidades', text: 'Plantas, escuelas, ferias de salud, eventos y grupos.' },
  { src: um(3), title: 'Llegamos a tu ubicación', text: 'Instalamos la unidad en el lugar que nos indiques.' },
  { src: um(9), title: 'Atención cercana', text: 'Un equipo amable y profesional en cada servicio.' },
  { src: um(5), title: 'A tu horario', text: 'Programamos la atención en las fechas y horarios que necesites.' },
  { src: um(10), title: 'Resultados a tiempo', text: 'Información enviada en línea a nuestro laboratorio.' },
]

export default function UnitsSlider() {
  return (
    <section className="units" aria-label="Nuestras unidades móviles">
      <div className="container">
        <div className="units__head" data-reveal>
          <div>
            <p className="eyebrow">Unidades móviles en acción</p>
            <h2 className="section__title">Llevamos los estudios hasta donde estés</h2>
            <p className="units__lead">
              Empresas, eventos, escuelas, ferias de salud, comunidades o grupos: instalamos nuestras unidades en el
              lugar que nos indiques.
            </p>
          </div>
          <a {...whatsappLink(whatsappMessages.mobileUnitAny)} className="btn btn--primary units__cta">
            <WhatsAppIcon />
            Agenda una unidad móvil
          </a>
        </div>

        <Coverflow photos={photos} label="Nuestras unidades móviles" autoplayMs={4500} shape="landscape" />
      </div>
    </section>
  )
}
