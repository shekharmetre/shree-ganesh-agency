 // Get your API key from Resend

import { resend } from "@/lib/config/email-config";

interface EmailProps {
  to: string;
  subject: string;
  htmlContent: string;
}

export const sendOtpEmail = async ({ to, subject, htmlContent }: EmailProps) => {
  try {
    const response = await resend.emails.send({
      from: 'shree-Ganesh-agency <onboarding@resend.dev>',  // Use your email or a domain linked with Resend
      to: to,
      subject: subject,
      html: htmlContent,  // The HTML content from your template
    });
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



export function isExpired(expiryTimestamp: string): boolean {
  const expiresAtUTC = new Date(expiryTimestamp); // Convert string to Date object
  const currentUTC = new Date(); // Get the current time in UTC
  return currentUTC > expiresAtUTC; // Return true if expired, false otherwise
}
