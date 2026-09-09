"use client";
import { useState } from "react";
import { S, EMAIL_ENDPOINT } from "@/lib/data";
import { COURSE } from "@/lib/course";

/**
 * Founder reservation. Until a checkout exists this collects an email and
 * nothing else, which is the honest version of a pre-sale: no card, no charge,
 * a place in the first hundred and the founder price when the course opens.
 * When NEXT_PUBLIC_COURSE_CHECKOUT_URL is set, the button goes there instead.
 */
export function FounderReserve({ compact = false }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  if (COURSE.checkoutUrl) {
    return (
      <a
        href={COURSE.checkoutUrl}
        style={{ display: "inline-block", background: "linear-gradient(135deg,#5EEAD4,#38BDF8)", color: "#0B1120", padding: "13px 24px", borderRadius: 8, fontFamily: S.f, fontSize: 14, fontWeight: 700 }}
      >
        Get the course, <s style={{ opacity: .6, fontWeight: 500 }}>${COURSE.price}</s> ${COURSE.founderPrice} →
      </a>
    );
  }

  async function submit(e) {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) { setError("Enter a real email so the founder link reaches you."); return; }
    setState("busy"); setError("");
    try {
      const r = await fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "course-founder",
          founder_price: COURSE.founderPrice,
          _subject: "Course founder reservation",
        }),
      });
      if (!r.ok) throw new Error(String(r.status));
      try { window.localStorage.setItem("pg-course-reserved", email.trim()); } catch {}
      setState("done");
    } catch {
      setError("That did not send. Try again in a moment.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div style={{ background: S.ab, border: "1px solid " + S.abr, borderRadius: 10, padding: "14px 16px", fontSize: 13, color: S.t, lineHeight: 1.6 }}>
        <strong style={{ color: S.a }}>You are on the founder list.</strong> Nothing has been charged. Checkout is being connected; you get the first email with the ${COURSE.founderPrice} link, and a week to decide before it goes to ${COURSE.price}.
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
        placeholder="you@example.com"
        aria-label="Email"
        style={{ flex: "1 1 220px", background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "12px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 14 }}
      />
      <button
        type="submit"
        disabled={state === "busy"}
        style={{ background: "linear-gradient(135deg,#5EEAD4,#38BDF8)", color: "#0B1120", padding: "12px 20px", borderRadius: 8, fontFamily: S.f, fontSize: 14, fontWeight: 700, border: 0, cursor: "pointer", whiteSpace: "nowrap" }}
      >
        {state === "busy" ? "Saving…" : compact ? "Reserve founder price" : `Reserve the founder price, $${COURSE.founderPrice}`}
      </button>
      {error && <div style={{ flexBasis: "100%", fontSize: 12, color: S.w }}>{error}</div>}
      {!compact && (
        <div style={{ flexBasis: "100%", fontSize: 11, color: S.m, lineHeight: 1.5 }}>
          No card now. Checkout goes live within days; this holds your place in the first {COURSE.founderSeats} at the founder price.
        </div>
      )}
    </form>
  );
}
