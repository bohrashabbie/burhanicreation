import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

const SESSION_COOKIE = "cms_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

/** Creates a new session in the DB and returns the token */
export async function createSession(): Promise<string> {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await prisma.cmsSession.create({ data: { token, expiresAt } });
  return token;
}

/** Validates session from a cookie string. Returns true if valid. */
export async function validateSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const session = await prisma.cmsSession.findUnique({ where: { token } });
  if (!session) return false;
  if (session.expiresAt < new Date()) {
    await prisma.cmsSession.delete({ where: { token } });
    return false;
  }
  return true;
}

/** Deletes a session (logout) */
export async function deleteSession(token: string): Promise<void> {
  await prisma.cmsSession.deleteMany({ where: { token } });
}

/** Extracts and validates the session token from a NextRequest */
export async function requireAuth(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return validateSession(token);
}

/** Returns a Set-Cookie header string for the session token */
export function buildSessionCookie(token: string): string {
  const maxAge = SESSION_TTL_MS / 1000;
  return `${SESSION_COOKIE}=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

/** Returns a Set-Cookie header string that clears the session */
export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
}

export { SESSION_COOKIE };
