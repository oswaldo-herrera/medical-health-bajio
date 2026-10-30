// Número de WhatsApp que recibe todas las llamadas a la acción (472 159 4620)
export const WHATSAPP_NUMBER = '524721594620'
export const WHATSAPP_DISPLAY = '472 159 4620'

// Número exclusivo del botón flotante de WhatsApp (472 101 0133)
export const WHATSAPP_FLOAT_NUMBER = '524721010133'

export function whatsappUrl(message: string, number = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

// Props comunes para los enlaces que abren WhatsApp
export function whatsappLink(message: string) {
  return { href: whatsappUrl(message), target: '_blank', rel: 'noopener noreferrer' }
}
