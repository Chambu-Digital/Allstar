// Company Information from Environment Variables
// This allows easy updates without changing code

export const companyInfo = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Allstar Tech',
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'allstartech2023@gmail.com',
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || '0722242418',
  phoneFormatted: process.env.NEXT_PUBLIC_COMPANY_PHONE_FORMATTED || '+254722242418',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254722242418',
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'HH Towers, 4th Floor, Moi Avenue, Nairobi',
  city: process.env.NEXT_PUBLIC_COMPANY_CITY || 'Nairobi',
  country: process.env.NEXT_PUBLIC_COMPANY_COUNTRY || 'Kenya',
}

// Helper functions
export const getWhatsAppLink = (message?: string) => {
  const encodedMessage = message ? encodeURIComponent(message) : ''
  return `https://wa.me/${companyInfo.whatsappNumber}${message ? `?text=${encodedMessage}` : ''}`
}

export const getPhoneLink = () => {
  return `tel:${companyInfo.phoneFormatted}`
}

export const getEmailLink = (subject?: string) => {
  return `mailto:${companyInfo.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
}

export const getFullAddress = () => {
  return `${companyInfo.address}, ${companyInfo.city}, ${companyInfo.country}`
}
