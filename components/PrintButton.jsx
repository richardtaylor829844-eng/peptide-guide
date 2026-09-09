"use client";
import { S } from "@/lib/data";
export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} style={{ marginLeft: "auto", background: S.ab, border: "1px solid " + S.abr, color: S.a, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
      Print or save as PDF
    </button>
  );
}
