import { ACCESS_COOKIE } from "@/lib/course-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const YEAR = 60 * 60 * 24 * 365;

function cookieHeader(value, maxAge) {
  return [
    `${ACCESS_COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Secure",
    `Max-Age=${maxAge}`,
  ].join("; ");
}

export async function POST(req) {
  const expected = (process.env.COURSE_ACCESS_CODE || "").trim().toLowerCase();
  const token = process.env.COURSE_COOKIE_TOKEN;
  if (!expected || !token) {
    return Response.json({ ok: false, error: "Access is not open yet." }, { status: 503 });
  }
  let code = "";
  try {
    const body = await req.json();
    code = String(body.code || "").trim().toLowerCase();
  } catch {
    return Response.json({ ok: false, error: "Bad request." }, { status: 400 });
  }
  if (!code || code !== expected) {
    return Response.json({ ok: false, error: "That code did not match." }, { status: 401 });
  }
  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": cookieHeader(token, YEAR) } },
  );
}

/** GET clears the cookie, so a founder can sign out of a shared machine. */
export async function GET() {
  return Response.json(
    { ok: true, cleared: true },
    { headers: { "Set-Cookie": cookieHeader("", 0) } },
  );
}
