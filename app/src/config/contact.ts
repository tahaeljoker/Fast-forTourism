// Contact Configuration
export const contactConfig = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201111899963', // Update with your actual WhatsApp number
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@fastfortourism.com',
  phone: process.env.NEXT_PUBLIC_PHONE || '+201111899963',
};

export const getWhatsAppLink = (message?: string) => {
  const encodedMessage = message ? encodeURIComponent(message) : '';
  const phoneNumber = contactConfig.whatsapp.replace(/\D/g, ''); // Remove non-digits
  return `https://wa.me/${phoneNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
};
