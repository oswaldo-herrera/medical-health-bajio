import {
  Activity,
  Award,
  BadgeCheck,
  CalendarX2,
  ChartColumn,
  ClipboardList,
  Ear,
  FileWarning,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Laptop,
  MapPin,
  Medal,
  Radiation,
  ScanLine,
  Stethoscope,
  Timer,
  UserCheck,
  Wind,
  UserX,
  type LucideIcon,
} from 'lucide-react'

export const FOUNDED_YEAR = 2012

// Cifras confirmadas por Medical and Health (octubre 2026)
export const CLIENT_COUNT = 200
export const MOBILE_UNIT_COUNT = 4
// Estudios realizados en unidades móviles, en miles
export const MOBILE_STUDIES_THOUSANDS = 500

export type Audience = 'empresa' | 'paciente'

export const contact = {
  // Ejecutivas de atención empresarial
  sales: [
    { name: 'Noemi Coronilla', text: '472 159 4620', tel: '+524721594620' },
    { name: 'Yadhira Ramirez Caudillo', text: '477 138 6879', tel: '+524771386879' },
  ],
  email: 'redes@mhdelbajio.com',
  phones: [
    {
      label: 'Atención empresarial',
      numbers: [
        { text: '472 159 4620', tel: '+524721594620' },
        { text: '477 138 6879', tel: '+524771386879' },
      ],
    },
    { label: 'Oficinas administrativas', numbers: [{ text: '472 748 9194', tel: '+524727489194' }] },
    { label: 'Laboratorio', numbers: [{ text: '472 722 4832', tel: '+524727224832' }] },
    {
      label: 'Clínica',
      numbers: [
        { text: '472 748 9393', tel: '+524727489393' },
        { text: '472 722 2763', tel: '+524727222763' },
      ],
    },
  ],
}

// Teléfono principal y llamada a la acción según quién visita
export const audienceContact: Record<Audience, { label: string; detail: string; text: string; tel: string; cta: string; ctaShort: string }> = {
  empresa: {
    label: 'Atención empresarial',
    detail: 'Noemi Coronilla',
    text: '472 159 4620',
    tel: '+524721594620',
    cta: 'Solicitar cotización',
    ctaShort: 'Cotizar',
  },
  paciente: {
    label: 'Laboratorio y gabinete',
    detail: 'Zona Centro, Silao',
    text: '472 722 4832',
    tel: '+524727224832',
    cta: 'Pide informes',
    ctaShort: 'Informes',
  },
}

// Mensajes prellenados de WhatsApp según la sección donde se da clic
export const whatsappMessages = {
  general: {
    empresa: 'Hola, me interesa una cotización de servicios de salud ocupacional para mi empresa.',
    paciente: 'Hola, quisiera informes sobre sus estudios y servicios médicos.',
  } satisfies Record<Audience, string>,
  risks:
    'Hola, quiero revisar la salud ocupacional de mi empresa: exámenes periódicos al personal expuesto y cumplimiento normativo.',
  service: (service: string) => `Hola, me interesa cotizar el servicio de "${service}" para mi empresa.`,
  mobileUnit:
    'Hola, me interesa agendar una unidad móvil para realizar exámenes médicos en las instalaciones de mi empresa.',
  mobileUnitAny:
    'Hola, me interesa agendar una unidad móvil para realizar estudios médicos (empresa, evento, escuela o grupo).',
  patients: 'Hola, tengo dudas sobre un estudio y quisiera que me orienten sobre cuál necesito y en qué sede realizarlo.',
}

export const navLinks:{ href: string; label: string; audience?: Audience }[] = [
  { href: '#soluciones', label: 'Servicios' },
  { href: '#servicios', label: 'Empresas', audience: 'empresa' },
  { href: '#pacientes', label: 'Pacientes', audience: 'paciente' },
  { href: '#unidad-movil', label: 'Unidad móvil' },
  { href: '#certificaciones', label: 'Certificaciones' },
  { href: '#instalaciones', label: 'Instalaciones' },
]

export const trustBadges = ['ISO 9001:2015', 'REPSE ARR1764/2024', 'PACAL desde 2014', 'Marca Guanajuato']

export const heroCopy: Record<
  Audience,
  { eyebrow: string; title: string; accent: string; lead: string; primary: string; phoneLabel: string; trust: string[] }
> = {
  empresa: {
    eyebrow: 'Salud ocupacional para la industria del Bajío',
    title: 'Gente sana,',
    accent: 'gente productiva.',
    lead: 'Exámenes médicos, servicio médico en planta y unidades móviles para que tu empresa cumpla con la normativa, reduzca el ausentismo y no detenga su producción.',
    primary: 'Solicita tu cotización',
    phoneLabel: 'Llama al',
    trust: trustBadges,
  },
  paciente: {
    eyebrow: 'Laboratorio, imagen y consulta en Silao',
    title: 'Tu salud,',
    accent: 'en manos expertas.',
    lead: 'Análisis clínicos, rayos X, ultrasonido, mastografía y consulta médica, con laboratorio certificado y resultados interpretados por médicos especialistas.',
    primary: 'Pide informes',
    phoneLabel: 'Laboratorio',
    trust: ['Laboratorio certificado PACAL', 'ISO 9001:2015', 'Especialistas certificados', '2 sedes en Silao'],
  },
}

export const paths: Record<
  Audience,
  { title: string; text: string; bullets: string[]; cta: string; href: string }
> = {
  empresa: {
    title: 'Para empresas',
    text: 'Salud ocupacional completa para tu planta: cumple la normativa, reduce el ausentismo y cuida a tu personal.',
    bullets: ['Exámenes de ingreso y periódicos', 'Servicio médico dentro de planta', 'Unidades móviles en tus instalaciones'],
    cta: 'Soluciones para empresas',
    href: '#servicios',
  },
  paciente: {
    title: 'Para ti y tu familia',
    text: 'Estudios y atención médica con laboratorio certificado y especialistas, en dos sedes en Silao.',
    bullets: ['Análisis clínicos', 'Rayos X, ultrasonido y mastografía', 'Consulta médica general'],
    cta: 'Servicios para ti',
    href: '#pacientes',
  },
}

interface Risk {
  icon: LucideIcon
  title: string
  text: string
}

export const risks: Risk[] = [
  {
    icon: CalendarX2,
    title: 'Ausentismo que detiene la línea',
    text: 'Un padecimiento que no se detecta a tiempo termina en incapacidades y turnos sin cubrir. Lo controlamos con vigilancia médica y seguimiento puntual del ausentismo.',
  },
  {
    icon: FileWarning,
    title: 'Cumplimiento sin respaldo',
    text: 'La normativa de seguridad y salud en el trabajo exige exámenes y programas preventivos documentados. Te entregamos el expediente en orden, listo para cualquier revisión.',
  },
  {
    icon: UserX,
    title: 'Contrataciones a ciegas',
    text: 'Ingresar personal sin diagnóstico médico es asumir riesgos que ya existían. Evaluamos antes de contratar y te damos recomendaciones y restricciones claras.',
  },
  {
    icon: Timer,
    title: 'Horas perdidas en traslados',
    text: 'Mandar al personal a una clínica son horas fuera de producción. Nuestras unidades móviles aplican los estudios dentro de tus instalaciones.',
  },
]

export interface Service {
  id: string
  icon: LucideIcon
  title: string
  intro: string
  listTitle: string
  list: string[]
  ordered?: boolean
  outcomeTitle?: string
  outcome?: string[]
  // Estudios que puede incluir, mostrados como tarjetas con ícono
  exams?: { title: string; items: { icon: LucideIcon; label: string }[] }
}

export const services: Service[] = [
  {
    id: 'nuevo-ingreso',
    icon: UserCheck,
    title: 'Exámenes médicos de nuevo ingreso',
    intro:
      'Conoce el estado de salud de cada candidato antes de que pise tu planta y asigna cada puesto con información médica, no con suposiciones.',
    listTitle: 'Pueden incluir, entre otros',
    list: [
      'Exploración física completa',
      'Análisis clínicos',
      'Rayos X',
      'Audiometría',
      'Espirometría',
      'Electrocardiograma',
      'Exámenes POE',
    ],
    outcomeTitle: 'Lo que recibes',
    outcome: [
      'Aptitud para laborar',
      'Diagnóstico médico',
      'Condicionantes médicas',
      'Recomendaciones y/o restricciones médicas',
    ],
  },
  {
    id: 'servicio-en-planta',
    icon: Stethoscope,
    title: 'Servicio médico dentro de planta',
    intro:
      'Administramos y gestionamos tu servicio médico con personal médico y de enfermería capacitado, bajo un plan de trabajo definido.',
    listTitle: 'Actividades que cubrimos',
    list: [
      'Atención médica general (consulta diaria)',
      'Prevención y control de adicciones',
      'Atención médica e investigación de incidentes de trabajo',
      'Inmunizaciones y campañas de vacunación',
      'Control y auditoría al servicio de comedor y su personal',
      'Seguimiento de incapacidades, ST7 y control prenatal',
      'Control de ausentismo por motivos de salud',
      'Vigilancia a personal en alturas o espacios confinados',
      'Revisión sensorial de condiciones de trabajo y uso del EPP',
      'Elaboración y reporte de estadísticas',
    ],
  },
  {
    id: 'poe',
    icon: Activity,
    title: 'Examen periódico a personal expuesto (POE)',
    intro:
      'Revisión médica periódica al personal ocupacionalmente expuesto, con estudios definidos según el área de riesgo y seguimiento hasta cerrar cada caso.',
    exams: {
      title: 'Estudios a realizar',
      items: [
        { icon: Stethoscope, label: 'Exploración física completa' },
        { icon: FlaskConical, label: 'Análisis clínicos' },
        { icon: ScanLine, label: 'Rayos X' },
        { icon: Ear, label: 'Audiometría' },
        { icon: Wind, label: 'Espirometría' },
        { icon: HeartPulse, label: 'Electrocardiograma' },
      ],
    },
    listTitle: 'Así lo hacemos',
    ordered: true,
    list: [
      'Mapeo en conjunto con Seguridad e Higiene',
      'Programación de la población objetivo',
      'Asistencia programada conforme a tus turnos de trabajo',
      'Aplicación de estudios médicos acorde al área de riesgo',
      'Entrega de resultados y orientación médica al trabajador',
      'Seguimiento médico a trabajadores',
      'Anexos al expediente médico',
      'Plan de acción sobre los padecimientos detectados',
    ],
  },
]

export const mobileUnits = [
  {
    icon: Ear,
    title: 'Audiometría y espirometría',
    text: 'Equipada con cabina sonoamortiguada y equipo de cómputo.',
  },
  {
    icon: Radiation,
    title: 'Rayos X',
    text: 'Unidad totalmente emplomada para estudios radiológicos seguros.',
  },
  {
    icon: Stethoscope,
    title: 'Exploración y toma de muestras',
    text: 'Con mesa de exploración para la valoración física y el muestreo.',
  },
]

export const techFeatures = [
  {
    icon: Laptop,
    title: 'Sistema informático integral',
    text: 'Monitoreamos a tus pacientes en cualquier momento y lugar donde prestemos servicio. Los especialistas interpretan y valoran en tiempo real.',
  },
  {
    icon: ClipboardList,
    title: 'Expediente clínico electrónico',
    text: 'Software desarrollado a la medida: consultas, evaluaciones de nuevo ingreso y periódicos de cada trabajador en un solo expediente.',
  },
  {
    icon: ChartColumn,
    title: 'Estadísticas para actuar a tiempo',
    text: 'Reportes de la operación y la atención del servicio para que tu empresa ejecute acciones oportunas.',
  },
]

export const statTopics = [
  'Atención médica',
  'Valoraciones de POE',
  'Nuevo ingreso',
  'Padecimientos respiratorios',
  'Padecimientos digestivos',
  'Obesidad',
]

interface Certification {
  icon: LucideIcon
  title: string
  text: string
  link?: { href: string; label: string }
}

export const certifications: Certification[] = [
  {
    icon: Award,
    title: 'ISO 9001:2015',
    text: 'Certificación vigente que avala un sistema de gestión de calidad enfocado en la mejora continua y la satisfacción del cliente.',
  },
  {
    icon: BadgeCheck,
    title: 'REPSE ARR1764/2024',
    text: 'Formamos parte del padrón de prestadoras de servicios especializados de la Secretaría del Trabajo y Previsión Social.',
    link: { href: 'https://repse.stps.gob.mx/', label: 'Validar registro' },
  },
  {
    icon: FlaskConical,
    title: 'PACAL',
    text: 'Desde 2014 mantenemos certificados nuestros procesos de laboratorio mediante el programa de aseguramiento de calidad PACAL.',
  },
  {
    icon: Medal,
    title: 'Marca Guanajuato',
    text: 'Empresa 100% guanajuatense con el distintivo que reconoce el compromiso empresarial y la calidad.',
  },
  {
    icon: GraduationCap,
    title: 'Especialistas certificados',
    text: 'Resultados y diagnósticos interpretados por médicos especialistas certificados en sus áreas: CAOHC, Consejo Mexicano de Oftalmología y CMRI.',
  },
]

export const locations = [
  {
    name: 'Laboratorio y gabinete',
    zone: 'Zona Centro',
    image: '/silao_centro_buena.webp',
    imagePosition: 'center 45%',
    address: ['Álvaro Obregón #52, Zona Centro', 'C.P. 36100, Silao, Guanajuato'],
    mapQuery: 'Álvaro Obregón 52, Zona Centro, 36100 Silao, Guanajuato',
    groups: [
      {
        title: 'Laboratorio',
        items: [
          'Antidoping',
          'Química clínica',
          'Inmunología',
          'Bacteriología',
          'Hormonas',
          'Coagulación',
          'Ácido / base',
        ],
      },
      {
        title: 'Gabinete',
        items: ['Rayos X', 'Audiometría', 'Espirometría', 'Mastografía', 'Electrocardiograma'],
      },
    ],
  },
  {
    name: 'Unidad médica',
    zone: 'Guanajuato Puerto Interior',
    image: '/puerto_interior.webp',
    imagePosition: 'center 55%',
    address: ['Blvd. Mineral de Valenciana #202-B', 'Guanajuato Puerto Interior, C.P. 36275, Silao, Guanajuato'],
    mapQuery: 'Blvd. Mineral de Valenciana 202-B, Guanajuato Puerto Interior, 36275 Silao, Guanajuato',
    groups: [
      {
        title: 'Atención',
        items: ['Consulta médica general', 'Área de curaciones', 'Cirugía y hospitalización de corta estancia'],
      },
      {
        title: 'Estudios',
        items: ['Rayos X', 'Ultrasonido', 'Audiometría', 'Espirometría'],
      },
    ],
  },
]

export const patientServices = [
  {
    icon: FlaskConical,
    title: 'Análisis clínicos',
    text: 'Química clínica, hormonas, inmunología, bacteriología, coagulación, antidoping y más.',
    where: 'Laboratorio · Zona Centro',
  },
  {
    icon: ScanLine,
    title: 'Estudios de imagen',
    text: 'Rayos X, ultrasonido y mastografía.',
    where: 'Rayos X en ambas sedes · ultrasonido en Puerto Interior · mastografía en Zona Centro',
  },
  {
    icon: HeartPulse,
    title: 'Estudios especializados',
    text: 'Electrocardiograma, audiometría y espirometría.',
    where: 'Electrocardiograma en Zona Centro · audiometría y espirometría en ambas sedes',
  },
  {
    icon: Stethoscope,
    title: 'Consulta y atención médica',
    text: 'Consulta médica general, curaciones, cirugía y hospitalización de corta estancia.',
    where: 'Unidad médica · Puerto Interior',
  },
]

export const patientReasons = [
  {
    icon: BadgeCheck,
    title: 'Laboratorio certificado',
    text: 'Desde 2014 nuestros procesos de laboratorio están certificados por el programa de calidad PACAL.',
  },
  {
    icon: GraduationCap,
    title: 'Especialistas certificados',
    text: 'Tus resultados y diagnósticos los interpretan médicos especialistas certificados en su área.',
  },
  {
    icon: MapPin,
    title: 'Dos sedes en Silao',
    text: 'Zona Centro y Guanajuato Puerto Interior, con laboratorio, gabinete y unidad médica propios.',
  },
]

export const patientInterestOptions = [
  'Análisis clínicos',
  'Rayos X, ultrasonido o mastografía',
  'Electrocardiograma, audiometría o espirometría',
  'Consulta médica general',
  'Otro',
]

export const sedeOptions = ['Sin preferencia', 'Laboratorio · Zona Centro', 'Unidad médica · Puerto Interior']

export const interestOptions = [
  'Exámenes de nuevo ingreso',
  'Servicio médico en planta',
  'Exámenes periódicos (POE)',
  'Unidad móvil en mis instalaciones',
  'Otro',
]
