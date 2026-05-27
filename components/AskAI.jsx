"use client";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/Card";
import { S, CHAT_ENDPOINT, EMAIL_ENDPOINT } from "@/lib/data";

const FREE_QUESTIONS = 3;

export function AskAI() {
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState("");
  const [ld, setLd] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [email, setEmail] = useState("");
  // Gate state
  const [showGate, setShowGate] = useState(false);
  const [pendingMsg, setPendingMsg] = useState("");
  const [gateInput, setGateInput] = useState("");
  const [gateLoading, setGateLoading] = useState(false);
  const [gateErr, setGateErr] = useState("");
  const endRef = useRef(null);

  // Load saved state on mount
  useEffect(() => {
    try {
      const count = parseInt(window.localStorage.getItem("pg-ai-q-count") || "0", 10);
      if (!isNaN(count)) setQuestionCount(count);
      const savedEmail = window.localStorage.getItem("pg-ai-email");
      if (savedEmail) setEmail(savedEmail);
    } catch {}
  }, []);

  useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const unlocked = !!email;
  const remaining = unlocked ? Infinity : Math.max(0, FREE_QUESTIONS - questionCount);

  // Fire-and-forget question log — only after an email is on file.
  // Gives us a record of what each lead is asking, for marketing segmentation.
  function logQuestion(msg, currentEmail) {
    if (!currentEmail) return;
    try {
      fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          email: currentEmail,
          source: "ask-ai-question-log",
          site: "peptidereferenceguide.com",
          question: msg,
          asked_at: new Date().toISOString(),
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {}
  }

  // Run the actual chat round-trip (used by both normal send and post-gate send).
  // emailOverride lets the gate flow pass the just-set email before React state catches up.
  async function callChat(msg, emailOverride) {
    const eff = emailOverride ?? email;
    logQuestion(msg, eff);
    setLd(true);
    try {
      const resp = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, email: eff || null }),
      });
      if (!resp.ok) {
        let errMsg = "Sorry, I had trouble connecting (error " + resp.status + ").";
        if (resp.status === 429) errMsg = "Lots of questions coming in right now. Please wait a moment and try again.";
        setMsgs((p) => p.concat([{ r: "a", t: errMsg }]));
        setLd(false);
        return;
      }
      const data = await resp.json();
      let reply = "";
      if (data.content) for (let i = 0; i < data.content.length; i++) if (data.content[i].text) reply += data.content[i].text;
      setMsgs((p) => p.concat([{ r: "a", t: reply || "Hmm, I didn't get a response. Try rephrasing your question." }]));
    } catch {
      setMsgs((p) => p.concat([{ r: "a", t: "Having trouble connecting right now. Try again in a moment." }]));
    }
    setLd(false);
  }

  async function sendChat() {
    if (!inp.trim() || ld) return;
    const msg = inp.trim();

    // Already unlocked → just send
    if (unlocked) {
      setInp("");
      setMsgs((p) => p.concat([{ r: "u", t: msg }]));
      callChat(msg);
      return;
    }

    // Not unlocked yet — count this attempt
    const next = questionCount + 1;

    // Still inside the free quota: send, increment count, no gate
    if (next <= FREE_QUESTIONS) {
      setInp("");
      setMsgs((p) => p.concat([{ r: "u", t: msg }]));
      setQuestionCount(next);
      try { window.localStorage.setItem("pg-ai-q-count", String(next)); } catch {}
      callChat(msg);
      return;
    }

    // Past the free quota → show gate, hold the message until they enter email
    setPendingMsg(msg);
    setInp("");
    setShowGate(true);
  }

  async function submitGate() {
    const e = gateInput.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      setGateErr("That email doesn't look right — double-check it.");
      return;
    }
    setGateErr("");
    setGateLoading(true);

    // Collect the questions they asked during their free quota so you can see the
    // search-intent context behind every signup.
    const priorQuestions = msgs.filter((m) => m.r === "u").map((m) => m.t);

    try {
      await fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          email: e,
          source: "ask-ai-gate",
          site: "peptidereferenceguide.com",
          questions_so_far: priorQuestions,
          next_question: pendingMsg,
        }),
      });
    } catch {
      // We still let them in — losing the signup is worse UX than blocking.
    }

    try { window.localStorage.setItem("pg-ai-email", e); } catch {}
    setEmail(e);
    setGateLoading(false);
    setShowGate(false);

    // Now actually send the message that triggered the gate.
    // Pass `e` explicitly because React state for email hasn't propagated yet.
    if (pendingMsg) {
      const msg = pendingMsg;
      setPendingMsg("");
      setMsgs((p) => p.concat([{ r: "u", t: msg }]));
      callChat(msg, e);
    }
  }

  function dismissGate() {
    // Keep the typed message in the input so they can edit/resend
    setInp(pendingMsg);
    setPendingMsg("");
    setShowGate(false);
    setGateErr("");
  }

  return (
    <>
      <Card style={{ height: 460, display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
        <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
          {msgs.length === 0 && (
            <div style={{ textAlign: "center", paddingTop: 50 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>💬</div>
              <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Tell me what's going on</p>
              <p style={{ fontSize: 12, color: S.d, marginBottom: 16 }}>I'll explain which peptides have been researched for your situation.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                {["I have a nagging knee injury","I want to lose weight","My gut has been messed up","I feel tired and old","I can't focus or think clearly"].map((q, i) => (
                  <button key={i} onClick={()=>setInp(q)} style={{ background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "8px 14px", borderRadius: 20, cursor: "pointer", fontFamily: S.f, fontSize: 12, fontWeight: 500 }}>{q}</button>
                ))}
              </div>
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.r === "u" ? "flex-end" : "flex-start", marginBottom: 10 }}>
              <div style={{ maxWidth: "80%", padding: "10px 14px", borderRadius: 10, background: m.r === "u" ? S.ab : S.surf, border: "1px solid " + (m.r === "u" ? S.abr : S.br) }}>
                <div style={{ fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{m.t}</div>
              </div>
            </div>
          ))}
          {ld && <div style={{ fontSize: 12, color: S.m, padding: 8 }}>Thinking...</div>}
          <div ref={endRef} />
        </div>
        <div style={{ padding: "12px 14px", borderTop: "1px solid " + S.br, display: "flex", gap: 8, alignItems: "flex-end" }}>
          <textarea value={inp} onChange={(e)=>setInp(e.target.value)} onKeyDown={(e)=>{ if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }} placeholder="Describe what you need help with..." rows={1} style={{ flex: 1, padding: "10px 12px", background: S.surf, border: "1px solid " + S.br, borderRadius: 8, color: S.t, fontFamily: S.f, fontSize: 13, outline: "none", resize: "none", minHeight: 42, maxHeight: 120, lineHeight: 1.4 }} />
          <button onClick={sendChat} style={{ background: "linear-gradient(135deg,#5EEAD4,#38BDF8)", border: "none", color: "#0B1120", padding: "10px 16px", borderRadius: 8, cursor: "pointer", fontFamily: S.f, fontSize: 13, fontWeight: 600, height: 42 }}>Send</button>
        </div>
        {!unlocked && remaining < Infinity && msgs.length > 0 && (
          <div style={{ padding: "6px 14px", borderTop: "1px solid " + S.br, fontSize: 10, color: S.m, textAlign: "center" }}>
            {remaining > 0
              ? `${remaining} free question${remaining === 1 ? "" : "s"} remaining`
              : "Drop your email to keep chatting"}
          </div>
        )}
      </Card>

      {showGate && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,.82)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, padding: 20, fontFamily: S.f }}>
          <div style={{ background: S.card, borderRadius: 14, maxWidth: 440, width: "100%", border: "1px solid " + S.abr, boxShadow: "0 25px 70px rgba(0,0,0,.55)", overflow: "hidden" }}>
            <div style={{ padding: "26px 26px 0", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px", color: S.t }}>Keep the conversation going</h2>
              <p style={{ fontSize: 13, color: S.d, margin: "0 0 18px", lineHeight: 1.55 }}>
                You've used your free questions. Drop your email and you can keep chatting — and we'll send the occasional research update too.
              </p>
            </div>
            <div style={{ padding: "0 26px 18px" }}>
              <input
                value={gateInput}
                onChange={(e)=>{ setGateInput(e.target.value); setGateErr(""); }}
                onKeyDown={(e)=>{ if (e.key === "Enter") submitGate(); }}
                placeholder="you@email.com"
                type="email"
                autoFocus
                style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", background: S.surf, border: "1px solid " + (gateErr ? "#F87171" : S.br), borderRadius: 8, color: S.t, fontFamily: S.f, fontSize: 14, outline: "none", marginBottom: gateErr ? 6 : 14 }}
              />
              {gateErr && <div style={{ fontSize: 11, color: "#F87171", marginBottom: 10 }}>{gateErr}</div>}
              <button
                disabled={gateLoading}
                onClick={submitGate}
                style={{ width: "100%", background: gateLoading ? S.surf : "linear-gradient(135deg,#5EEAD4,#38BDF8)", border: "none", color: gateLoading ? S.m : "#0B1120", padding: "13px 18px", borderRadius: 8, cursor: gateLoading ? "wait" : "pointer", fontFamily: S.f, fontSize: 14, fontWeight: 700, marginBottom: 10 }}
              >
                {gateLoading ? "…" : "Continue chatting"}
              </button>
              <button onClick={dismissGate} style={{ width: "100%", background: "transparent", border: "none", color: S.d, padding: "8px 0", cursor: "pointer", fontFamily: S.f, fontSize: 12, fontWeight: 500 }}>
                Maybe later
              </button>
            </div>
            <div style={{ padding: "12px 26px", borderTop: "1px solid " + S.br, background: S.surf }}>
              <p style={{ fontSize: 10, color: S.m, margin: 0, textAlign: "center", lineHeight: 1.5 }}>
                No spam. Unsubscribe anytime. See our <a href="/privacy" style={{ color: S.a, textDecoration: "underline" }}>privacy policy</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
