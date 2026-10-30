// Número de WhatsApp que recibe todas las llamadas a la acción (472 101 0133)
export const WHATSAPP_NUMBER = '524721010133'
export const WHATSAPP_DISPLAY = '472 101 0133'

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// Props comunes para los enlaces que abren WhatsApp
export function whatsappLink(message: string) {
  return { href: whatsappUrl(message), target: '_blank', rel: 'noopener noreferrer' }
}
