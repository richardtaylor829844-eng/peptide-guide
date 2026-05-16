import { Card } from "@/components/Card";
import { PEPS, PEPTIDE_KEYS, S, peptideUrl } from "@/lib/data";

export const metadata = {
  title: "All Peptides — Compound Library",
  description: "Browse every peptide covered on Peptide Reference Guide, with plain-English summaries, molecular weight, half-life, and links to research.",
  alternates: { canonical: "/peptides" },
};

export default function PeptideIndexPage() {
  return (
    <div>
      <h1 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 4px" }}>All Peptides</h1>
      <p style={{ color: S.d, fontSize: 14, marginBottom: 24 }}>
        {PEPTIDE_KEYS.length} compounds in the library. Tap any peptide to read plain-English notes, mechanism, half-life, and published research.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 12 }}>
        {PEPTIDE_KEYS.map((id) => {
          const p = PEPS[id];
          return (
            <Card key={id} href={peptideUrl(id)}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: S.a, background: S.ab, padding: "2px 6px", borderRadius: 4 }}>{p.cat}</span>
                <span style={{ fontSize: 9, color: S.m }}>{p.mw}</span>
              </div>
              <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>{p.name}</h2>
              <p style={{ fontSize: 12, color: S.d, margin: "0 0 8px", lineHeight: 1.5 }}>{p.plain.slice(0, 130)}…</p>
              <div style={{ fontSize: 11, color: S.a }}>{p.best}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
