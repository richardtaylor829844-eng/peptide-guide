"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { PEPS, FREQ_OPTIONS, HALF_LIVES, S, peptideUrl } from "@/lib/data";
import { freqHours, freqLabel, formatAgo, formatDueIn, dueColor, downloadReminder } from "@/lib/utils";

export function MyStack() {
  const [stack, setStack] = useState([]);
  const [stackForm, setStackForm] = useState(null);
  const [, setTick] = useState(0);
  const pepKeys = Object.keys(PEPS);

  useEffect(() => {
    try { const raw = window.localStorage.getItem("peptide-stack-v1"); if (raw) setStack(JSON.parse(raw)); } catch {}
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem("peptide-stack-v1", JSON.stringify(stack)); } catch {}
  }, [stack]);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 60000);
    return () => clearInterval(t);
  }, []);

  function stackAdd(entry) {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 6);
    setStack(stack.concat([Object.assign({ id, lastInjection: null, notes: "" }, entry)]));
    setStackForm(null);
  }
  function stackUpdate(id, changes) {
    setStack(stack.map((s) => s.id === id ? Object.assign({}, s, changes) : s));
  }
  function stackRemove(id) {
    if (typeof window !== "undefined" && !window.confirm("Remove this from your stack?")) return;
    setStack(stack.filter((s) => s.id !== id));
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 6 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>My Stack</h1>
        <button onClick={()=>setStackForm({ pepId: "", dose: "", doseUnit: "mcg", frequency: "daily", notes: "" })} style={{ background: "linear-gradient(135deg,#5EEAD4,#38BDF8)", border: "none", color: "#0B1120", padding: "9px 16px", borderRadius: 8, cursor: "pointer", fontFamily: S.f, fontSize: 12, fontWeight: 700 }}>+ Add peptide</button>
      </div>
      <p style={{ color: S.d, fontSize: 13, marginBottom: 12 }}>Track what you&apos;ve taken, when you took it, and when the next dose is due. All data stays on this device.</p>
      <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(250,200,50,.05)", border: "1px solid " + S.wbr, marginBottom: 18, fontSize: 11, color: S.d, lineHeight: 1.5 }}>
        <strong style={{ color: S.w }}>Disclaimer —</strong> This tool is for personal organization only. It is not medical advice, dosing guidance, or a substitute for a licensed clinician.
      </div>

      {stack.length === 0 && !stackForm && (
        <div style={{ textAlign: "center", padding: "50px 20px", background: S.card, borderRadius: 12, border: "1px solid " + S.br }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>📋</div>
          <p style={{ fontSize: 14, color: S.t, marginBottom: 4, fontWeight: 500 }}>Your stack is empty.</p>
          <p style={{ fontSize: 12, color: S.d, marginBottom: 16 }}>Add a peptide to start tracking.</p>
          <button onClick={()=>setStackForm({ pepId: "", dose: "", doseUnit: "mcg", frequency: "daily", notes: "" })} style={{ background: S.ab, border: "1px solid " + S.abr, color: S.a, padding: "9px 18px", borderRadius: 8, cursor: "pointer", fontFamily: S.f, fontSize: 13, fontWeight: 500 }}>+ Add your first peptide</button>
        </div>
      )}

      {stackForm && (
        <Card style={{ marginBottom: 14, border: "1px solid " + S.abr }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Add peptide to stack</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: S.d, display: "block", marginBottom: 4 }}>Peptide</label>
            <select value={stackForm.pepId} onChange={(e)=>setStackForm({ ...stackForm, pepId: e.target.value })} style={{ width: "100%", padding: "10px 12px", background: S.surf, border: "1px solid " + S.br, borderRadius: 8, color: S.t, fontFamily: S.f, fontSize: 13 }}>
              <option value="">— pick one —</option>
              {pepKeys.map((id) => <option key={id} value={id}>{PEPS[id].name} ({PEPS[id].cat})</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: S.d, display: "block", marginBottom: 4 }}>Dose</label>
              <input type="text" inputMode="decimal" value={stackForm.dose} onChange={(e)=>setStackForm({ ...stackForm, dose: e.target.value.replace(/[^0-9.]/g,"") })} placeholder="e.g. 250" style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", background: S.surf, border: "1px solid " + S.br, borderRadius: 8, color: S.t, fontSize: 14, fontFamily: "monospace" }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: S.d, display: "block", marginBottom: 4 }}>Unit</label>
              <select value={stackForm.doseUnit} onChange={(e)=>setStackForm({ ...stackForm, doseUnit: e.target.value })} style={{ width: "100%", padding: "10px 12px", background: S.surf, border: "1px solid " + S.br, borderRadius: 8, color: S.t, fontFamily: S.f, fontSize: 13 }}>
                <option value="mcg">mcg</option>
                <option value="mg">mg</option>
                <option value="units">units</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: S.d, display: "block", marginBottom: 4 }}>Frequency</label>
            <select value={stackForm.frequency} onChange={(e)=>setStackForm({ ...stackForm, frequency: e.target.value })} style={{ width: "100%", padding: "10px 12px", background: S.surf, border: "1px solid " + S.br, borderRadius: 8, color: S.t, fontFamily: S.f, fontSize: 13 }}>
              {FREQ_OPTIONS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, color: S.d, display: "block", marginBottom: 4 }}>Notes (optional)</label>
            <textarea value={stackForm.notes} onChange={(e)=>setStackForm({ ...stackForm, notes: e.target.value })} rows={2} placeholder="e.g. morning, subcutaneous, cycle 1" style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", background: S.surf, border: "1px solid " + S.br, borderRadius: 8, color: S.t, fontFamily: S.f, fontSize: 13, resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button onClick={()=>setStackForm(null)} style={{ background: "transparent", border: "1px solid " + S.br, color: S.d, padding: "9px 16px", borderRadius: 8, cursor: "pointer", fontFamily: S.f, fontSize: 12 }}>Cancel</button>
            <button disabled={!stackForm.pepId || !stackForm.dose} onClick={()=>stackAdd(stackForm)} style={{ background: stackForm.pepId && stackForm.dose ? "linear-gradient(135deg,#5EEAD4,#38BDF8)" : S.surf, border: "none", color: stackForm.pepId && stackForm.dose ? "#0B1120" : S.m, padding: "9px 18px", borderRadius: 8, cursor: stackForm.pepId && stackForm.dose ? "pointer" : "not-allowed", fontFamily: S.f, fontSize: 12, fontWeight: 700 }}>Save</button>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {stack.map((s) => {
          const p = PEPS[s.pepId]; if (!p) return null;
          const freqH = freqHours(s.frequency);
          const nextTs = s.lastInjection ? s.lastInjection + freqH * 3600 * 1000 : null;
          const msRemaining = nextTs ? nextTs - Date.now() : null;
          return (
            <Card key={s.id}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                    <Link href={peptideUrl(s.pepId)} style={{ fontSize: 17, fontWeight: 600, margin: 0, color: S.t }}>{p.name}</Link>
                    <span style={{ fontSize: 10, color: S.a, background: S.ab, padding: "2px 8px", borderRadius: 4 }}>{p.cat}</span>
                  </div>
                  <div style={{ fontSize: 12, color: S.d }}>{s.dose} {s.doseUnit} · {freqLabel(s.frequency)} · half-life {HALF_LIVES[s.pepId] || "—"}</div>
                </div>
                <button onClick={()=>stackRemove(s.id)} title="Remove" style={{ background: "transparent", border: "none", color: S.m, cursor: "pointer", padding: "4px 8px", fontSize: 14 }}>×</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, background: S.surf, borderRadius: 8, padding: 12, marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 9, color: S.m, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2 }}>Last taken</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: S.t }}>{formatAgo(s.lastInjection)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: S.m, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2 }}>Next due</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: msRemaining !== null ? dueColor(msRemaining, freqH) : S.m }}>{msRemaining !== null ? formatDueIn(msRemaining) : "—"}</div>
                </div>
              </div>
              {s.notes && <div style={{ fontSize: 11, color: S.d, fontStyle: "italic", marginBottom: 10, padding: "6px 10px", background: S.surf, borderRadius: 6 }}>{s.notes}</div>}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8 }}>
                <button onClick={()=>stackUpdate(s.id, { lastInjection: Date.now() })} style={{ background: S.ab, border: "1px solid " + S.abr, color: S.a, padding: "10px 16px", borderRadius: 8, cursor: "pointer", fontFamily: S.f, fontSize: 13, fontWeight: 600 }}>✓ Log injection now</button>
                <button onClick={()=>downloadReminder(s, p.name)} title="Add a recurring reminder to your calendar" style={{ background: "transparent", border: "1px solid " + S.br, color: S.t, padding: "10px 12px", borderRadius: 8, cursor: "pointer", fontFamily: S.f, fontSize: 12, fontWeight: 500, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5 }}>🔔 Remind me</button>
              </div>
            </Card>
          );
        })}
      </div>
      {stack.length > 0 && <p style={{ fontSize: 10, color: S.m, textAlign: "center", marginTop: 16 }}>Saved to this device only. Clearing your browser data will erase your stack.</p>}
    </div>
  );
}
