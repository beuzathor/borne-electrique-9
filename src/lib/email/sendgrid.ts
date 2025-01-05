import sgMail from '@sendgrid/mail';

// Initialiser SendGrid avec la clé API
sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

export async function sendEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const msg = {
      to: 'seoceane@gmail.com',
      from: 'contact@electroborne.fr', // Doit être vérifié dans SendGrid
      subject: `Nouveau message de ${data.name}`,
      text: `
        Nom: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
      `,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: 'Une erreur est survenue lors de l'envoi du message' 
    };
  }
}