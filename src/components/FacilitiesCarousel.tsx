import Coverflow from './Coverflow'

const photos = [
  { src: '/int_02.webp', title: 'Recepción y atención', text: 'Te orientamos desde que llegas.' },
  { src: '/int_03.webp', title: 'Ultrasonido', text: 'Estudios de imagen con médicos especialistas.' },
  { src: '/int_04.webp', title: 'Área de atención médica', text: 'Equipada para curaciones y estancia corta.' },
]

export default function FacilitiesCarousel() {
  return <Coverflow photos={photos} label="Nuestras instalaciones" />
}
