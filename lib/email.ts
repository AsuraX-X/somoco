import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || "onboarding@resend.dev";
const RECIPIENT = "kiba741@gmail.com";

if (!RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set in environment variables");
}

export const resend = new Resend(RESEND_API_KEY);

export function escapeHtml(unsafe: unknown): string {
  if (unsafe == null) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatSubmittedAt(submittedAt?: string): string {
  const submittedAtRaw = submittedAt || new Date().toISOString();
  const submittedAtDate = new Date(submittedAtRaw);
  return isNaN(submittedAtDate.getTime())
    ? String(submittedAtRaw)
    : submittedAtDate.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

interface SendEmailParams {
  to?: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({
  to = RECIPIENT,
  subject,
  html,
  replyTo,
}: SendEmailParams) {
  if (!RESEND_API_KEY) {
    throw new Error("Email service not configured");
  }

  return await resend.emails.send({
    from: RESEND_FROM,
    to,
    subject,
    html,
    ...(replyTo && { replyTo }),
  });
}
