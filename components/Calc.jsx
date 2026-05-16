"use client";
import { useState } from "react";
import { Card } from "@/components/Card";
import { S } from "@/lib/data";

export function Calc() {
  const [mgStr, setMgStr] = useState("10");
  const [mlStr, setMlStr] = useState("2");
  const [doseStr, setDoseStr] = useState("250");
  const [doseUnit, setDoseUnit] = useState("mcg");

  const mg = parseFloat(mgStr) || 0;
  const ml = parseFloat(mlStr) || 0;
  const doseRaw = parseFloat(doseStr) || 0;
  const doseMcg = doseUnit === "mg" ? doseRaw * 1000 : doseRaw;
  const conc = ml > 0 ? (mg * 1000) / ml : 0;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
      <Card>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, color: S.d, display: "block", marginBottom: 4 }}>Peptide amount (mg)</label>
          <input type="text" inputMode="decimal" value={mgStr} onChange={(e)=>setMgStr(e.target.value.replace(/[^0-9.]/g,""))} style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", background: S.surf, border: "1px solid " + S.br, borderRadius: 8, color: S.t, fontSize: 16, fontFamily: "monospace" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, color: S.d, display: "block", marginBottom: 4 }}>Water added (mL)</label>
          <input type="text" inputMode="decimal" value={mlStr} onChange={(e)=>setMlStr(e.target.value.replace(/[^0-9.]/g,""))} style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", background: S.surf, border: "1px solid " + S.br, borderRadius: 8, color: S.t, fontSize: 16, fontFamily: "monospace" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, color: S.d, display: "block", marginBottom: 4 }}>Desired dose</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="text" inputMode="decimal" value={doseStr} onChange={(e)=>setDoseStr(e.target.value.replace(/[^0-9.]/g,""))} style={{ flex: 1, padding: "10px 12px", background: S.surf, border: "1px solid " + S.br, borderRadius: 8, color: S.t, fontSize: 16, fontFamily: "monospace" }} />
            <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid " + S.br }}>
              <button onClick={()=>setDoseUnit("mcg")} style={{ background: doseUnit==="mcg" ? S.ab : S.surf, border: "none", color: doseUnit==="mcg" ? S.a : S.d, padding: "10px 14px", cursor: "pointer", fontFamily: S.f, fontSize: 13, fontWeight: 600 }}>mcg</button>
              <button onClick={()=>setDoseUnit("mg")} style={{ background: doseUnit==="mg" ? S.ab : S.surf, border: "none", borderLeft: "1px solid " + S.br, color: doseUnit==="mg" ? S.a : S.d, padding: "10px 14px", cursor: "pointer", fontFamily: S.f, fontSize: 13, fontWeight: 600 }}>mg</button>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: S.d, padding: 10, background: S.surf, borderRadius: 6 }}>Use bacteriostatic water (recommended)</div>
      </Card>
      <Card>
        <div style={{ background: "linear-gradient(135deg,rgba(94,234,212,.1),rgba(56,189,248,.1))", borderRadius: 12, padding: 22, marginBottom: 14, border: "1px solid " + S.abr, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: S.d, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>Draw on your syringe</div>
          <div style={{ fontSize: 42, fontWeight: 700, color: S.a, fontFamily: "monospace", lineHeight: 1.1 }}>
            {conc > 0 && doseMcg > 0 ? ((doseMcg/conc)*100).toFixed(1) : "—"}
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: S.a, marginTop: 2 }}>units</div>
          {conc > 0 && doseMcg > 0 && <div style={{ fontSize: 12, color: S.d, marginTop: 6 }}>({(doseMcg/conc).toFixed(3)} mL on a U-100 insulin syringe)</div>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <div style={{ background: S.surf, borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 11, color: S.d, marginBottom: 2 }}>Concentration</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{conc > 0 ? conc.toLocaleString() : "—"}</div>
            <div style={{ fontSize: 11, color: S.d }}>mcg/mL</div>
          </div>
          <div style={{ background: S.surf, borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 11, color: S.d, marginBottom: 2 }}>Doses per vial</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{doseMcg > 0 ? Math.floor((mg*1000)/doseMcg) : "—"}</div>
            {doseMcg > 0 && <div style={{ fontSize: 11, color: S.d }}>at {doseStr} {doseUnit} each</div>}
          </div>
        </div>
        <div style={{ fontSize: 10, color: S.m, padding: 8, background: "rgba(250,200,50,.05)", borderRadius: 4 }}>For lab reference only. Talk to a doctor for medical guidance.</div>
      </Card>
    </div>
  );
}
