// Número de WhatsApp que recibe todas las llamadas a la acción (472 159 4620)
export const WHATSAPP_NUMBER = '524721594620'
export const WHATSAPP_DISPLAY = '472 159 4620'

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// Props comunes para los enlaces que abren WhatsApp
export function whatsappLink(message: string) {
  return { href: whatsappUrl(message), target: '_blank', rel: 'noopener noreferrer' }
}
