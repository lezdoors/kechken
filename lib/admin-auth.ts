import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

// Admin panel uses service role key to bypass RLS, falls back to anon key
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const AUTH_COOKIE = "akal-admin-session";

export async function verifyCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  const { data } = await supabase
    .from("admin_users")
    .select("password_hash")
    .eq("email", email)
    .single();

  if (!data) return false;
  return bcrypt.compare(password, data.password_hash);
}

export async function createSession(email: string) {
  const cookieStore = await cookies();
  const token = Buffer.from(
    JSON.stringify({ email, ts: Date.now() })
  ).toString("base64");
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function getSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    if (Date.now() - decoded.ts > 7 * 24 * 60 * 60 * 1000) return null;
    return { email: decoded.email };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

// Re-export supabase client for admin data queries.
// Throws if env vars are absent — admin pages are force-dynamic, so this
// only fires at request time, not at build.
export function getAdminSupabase() {
  const client = getSupabase();
  if (!client) {
    throw new Error(
      "Supabase env vars not set — admin features require NEXT_PUBLIC_SUPABASE_URL + service-role or anon key.",
    );
  }
  return client;
}
