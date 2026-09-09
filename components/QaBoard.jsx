"use client";
import { useState } from "react";
import { S, EMAIL_ENDPOINT } from "@/lib/data";

/** Searchable answered questions, plus a form to ask one. Questions go to the Formspree inbox. */
export function QaBoard({ items }) {
  const [q, setQ] = useState("");
  const [ask, setAsk] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = needle ? items.filter((x) => (x.q + " " + x.a + " " + x.tags.join(" ")).toLowerCase().includes(needle)) : items;

  async function submit(e) {
    e.preventDefault();
    if (ask.trim().length < 10) { setError("Write the question out. A sentence or two is ideal."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError("Enter the email you want the answer sent to."); return; }
    setState("busy"); setError("");
    try {
      const r = await fetch(EMAIL_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), question: ask.trim(), source: "course-question", _subject: "Course question" }) });
      if (!r.ok) throw new Error();
      setState("done");
    } catch { setError("That did not send. Try again in a moment."); setState("idle"); }
  }

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search answered questions…" aria-label="Search"
        style={{ width: "100%", background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "11px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 14, marginBottom: 14 }} />
      {shown.length === 0 && <p style={{ fontSize: 13, color: S.m }}>Nothing answered on that yet. Ask below.</p>}
      {shown.map((x, i) => (
        <details key={i} style={{ background: S.card, border: "1px solid " + S.br, borderRadius: 10, padding: "12px 16px", marginBottom: 8 }}>
          <summary style={{ cursor: "pointer", fontSize: 14, fontWeight: 600, color: S.t }}>{x.q}</summary>
          <p style={{ fontSize: 13, color: S.d, lineHeight: 1.65, margin: "10px 0 6px" }}>{x.a}</p>
          <div style={{ display: "flex", gap: 6 }}>{x.tags.map((t) => <span key={t} style={{ fontSize: 10, color: S.a, background: S.ab, padding: "1px 6px", borderRadius: 4 }}>{t}</span>)}</div>
        </details>
      ))}

      <div style={{ marginTop: 26, background: S.card, border: "1px solid " + S.abr, borderRadius: 14, padding: "18px 20px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 4px", color: S.t }}>Ask a question about the material</h2>
        <p style={{ fontSize: 12, color: S.m, margin: "0 0 12px", lineHeight: 1.6 }}>Questions about a peptide, a lesson, a study or a term get answered, and useful ones get added here. Questions about what you personally should take get pointed to a clinician, because that is the only honest answer.</p>
        {state === "done" ? (
          <div style={{ background: S.ab, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: S.t }}><strong style={{ color: S.a }}>Sent.</strong> You will get a reply by email, and if the answer helps everyone it lands on this page.</div>
        ) : (
          <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
            <textarea value={ask} onChange={(e) => { setAsk(e.target.value); if (error) setError(""); }} rows={3} placeholder="What did the lesson mean by…" aria-label="Your question"
              style={{ background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "10px 12px", borderRadius: 8, fontFamily: S.f, fontSize: 13, resize: "vertical" }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }} placeholder="you@example.com" aria-label="Email"
                style={{ flex: "1 1 200px", background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "10px 12px", borderRadius: 8, fontFamily: S.f, fontSize: 13 }} />
              <button type="submit" disabled={state === "busy"} style={{ background: S.ab, border: "1px solid " + S.abr, color: S.a, padding: "10px 16px", borderRadius: 8, fontFamily: S.f, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{state === "busy" ? "Sending…" : "Send question"}</button>
            </div>
            {error && <div style={{ fontSize: 12, color: S.w }}>{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
