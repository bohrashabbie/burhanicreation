import { Resend } from "resend";

/**
 * Resend email helper — https://resend.com
 *
 * Setup (~2 minutes):
 *  1. Sign up free at https://resend.com
 *  2. Add & verify your domain (burhanicreation.com) under Domains,
 *     OR use the shared `onboarding@resend.dev` sender for quick testing.
 *  3. Create an API key under API Keys and copy it.
 *  4. Set RESEND_API_KEY in .env.local (see .env.example).
 *
 * The client is created lazily (on first use) rather than at module load so
 * that `next build` can collect page data without the env var being present.
 */

let cachedClient: Resend | null = null;

export function getMailer(): Resend {
  if (!cachedClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set.");
    }
    cachedClient = new Resend(apiKey);
  }
  return cachedClient;
}

export const NOTIFY_TO = "info@burhanicreation.com";
// Must be a verified domain in your Resend account. Falls back to Resend's
// shared onboarding sender when RESEND_FROM is not configured.
export const FROM =
  process.env.RESEND_FROM ?? "Burhani Creation Website <onboarding@resend.dev>";
