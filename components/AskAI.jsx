"use client";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/Card";
import { S, CHAT_ENDPOINT } from "@/lib/data";

export function AskAI() {
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState("");
  const [ld, setLd] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  async function sendChat() {
    if (!inp.trim() || ld) return;
    const msg = inp.trim();
    setInp("");
    setMsgs((p) => p.concat([{ r: "u", t: msg }]));
    setLd(true);
    try {
      const resp = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
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

  return (
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
    </Card>
  );
}
