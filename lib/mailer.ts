import Mailgun from "mailgun.js";
import FormData from "form-data";

/**
 * Mailgun email helper — 1,000 free emails/month
 *
 * Setup (~5 minutes):
 *  1. Sign up free at https://mailgun.com (no credit card needed)
 *  2. Add & verify your domain (burhanicreation.com) under Sending → Domains
 *     OR use the Mailgun sandbox domain for testing (shown in your dashboard)
 *  3. Go to API Keys and copy your Private API key
 *  4. Fill in the .env.local variables
 */

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,
  // If your account is on the EU region, use: url: "https://api.eu.mailgun.net"
  url: process.env.MAILGUN_API_URL ?? "https://api.mailgun.net",
});

export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN!;
export const NOTIFY_TO = "info@burhanicreation.com";
export const FROM = `Burhani Creation Website <noreply@${process.env.MAILGUN_DOMAIN}>`;

export { mg };
