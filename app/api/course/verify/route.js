import { ACCESS_COOKIE } from "@/lib/course-access";
import { EMAIL_ENDPOINT } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Purchase → access, with no human in the loop.
 *
 * The Stripe Payment Link is configured to redirect here after payment with
 * {CHECKOUT_SESSION_ID} in the query. This asks Stripe whether that session
 * was actually paid, and if so sets the same access cookie the founder code
 * sets, then sends the buyer to the first lesson. The same URL works again on
 * another device, so the buyer's confirmation link is their key.
 *
 * Needs STRIPE_SECRET_KEY in the environment (a restricted key with read
 * access to Checkout Sessions is enough). Without it, or without the other
 * course env, this refuses rather than guessing.
 */

const YEAR = 60 * 60 * 24 * 365;
const FIRST_LESSON = "/course/start-here/how-to-use-this-course?welcome=1";

function fail(msg, status = 400) {
  const html = `<!doctype html><meta charset="utf-8"><title>Course access</title>
<body style="font-family:system-ui,sans-serif;background:#0B1120;color:#E2E8F0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px">
<div style="max-width:460px;line-height:1.6"><h1 style="font-size:20px;margin:0 0 10px">Could not confirm the purchase</h1>
<p style="color:#94A3B8;font-size:14px">${msg}</p>
<p style="font-size:14px"><a href="/course" style="color:#5EEAD4">Back to the course</a> · or reply to your receipt email and it will be sorted by hand.</p></div></body>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function GET(req) {
  const key = process.env.STRIPE_SECRET_KEY;
  const token = process.env.COURSE_COOKIE_TOKEN;
  if (!key || !token) return fail("Checkout is not connected yet. If you have just paid, your access will be set up by hand within the day.", 503);

  const url = new URL(req.url);
  const sessionId = (url.searchParams.get("session_id") || "").trim();
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sessionId)) return fail("This link is missing its checkout reference.");

  let session;
  try {
    const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!r.ok) return fail("Stripe did not recognize this checkout. If you were charged, reply to your receipt and it will be sorted by hand.", 404);
    session = await r.json();
  } catch {
    return fail("Could not reach Stripe. Try the link again in a minute.", 502);
  }

  const paid = session.payment_status === "paid" || (session.status === "complete" && session.amount_total === 0);
  if (!paid) return fail("This checkout was not completed. If you closed the payment page early, go back and finish it.", 402);

  // Best effort: add the buyer to the founder list. Access does not depend on it.
  const email = session.customer_details?.email || session.customer_email || "";
  if (email) {
    fetch(EMAIL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, source: "course-purchase", amount: (session.amount_total || 0) / 100, session: sessionId, _subject: "Course purchase" }),
    }).catch(() => {});
  }

  const cookie = [`${ACCESS_COOKIE}=${token}`, "Path=/", "HttpOnly", "SameSite=Lax", "Secure", `Max-Age=${YEAR}`].join("; ");
  return new Response(null, {
    status: 303,
    headers: { Location: FIRST_LESSON, "Set-Cookie": cookie },
  });
}
