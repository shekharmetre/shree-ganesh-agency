 // Get your API key from Resend
'use client'
import { resend } from "@/lib/config/email-config";
import { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
interface EmailProps {
  to: string;
  subject: string;
  htmlContent: string | ReactElement;
}

export const sendOtpEmail = async ({ to, subject, htmlContent }: EmailProps) => {
  try {
    // Convert React component to string if needed
    const emailHtml =
      typeof htmlContent === "string" ? htmlContent : renderToStaticMarkup(htmlContent);

    const response = await resend.emails.send({
      from: "shree-Ganesh-agency <onboarding@resend.dev>", // Use your email or a domain linked with Resend
      to,
      subject,
      html: emailHtml, // Rendered HTML content
    });


    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


export function isExpired(expiryTimestamp: string): boolean {
  const expiresAtUTC = new Date(expiryTimestamp); // Convert string to Date object
  const currentUTC = new Date(); // Get the current time in UTC
  return currentUTC > expiresAtUTC; // Return true if expired, false otherwise
}
