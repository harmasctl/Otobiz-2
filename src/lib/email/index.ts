import { emailTemplates } from "./templates";

interface EmailOptions {
  to: string;
  subject?: string;
  template: keyof typeof emailTemplates;
  variables?: Record<string, string>;
}

export async function sendEmail({
  to,
  subject,
  template,
  variables,
}: EmailOptions) {
  try {
    let html = emailTemplates[template].html;
    let finalSubject = subject || emailTemplates[template].subject;

    // Replace variables in template
    if (variables) {
      Object.entries(variables).forEach(([key, value]) => {
        html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
      });
    }

    // In development, just log the email
    if (import.meta.env.DEV) {
      console.log("Email sent:", {
        to,
        subject: finalSubject,
        html,
      });
      return;
    }

    // In production, send via your email service
    // Add your email service integration here
    // Example with SendGrid:
    // await sendGrid.send({
    //   to,
    //   from: 'noreply@yourdomain.com',
    //   subject: finalSubject,
    //   html
    // });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
