import { Card } from "@/components/Card";
import { PEPS, STACK_KEYS, STACK_SLUGS, S } from "@/lib/data";

export const metadata = {
  title: "Peptide Stacks & Blends",
  description: "Researched peptide combinations: Wolverine, Glow, Klow, CJC/Ipamorelin, Tesamorelin/Ipamorelin and more.",
  alternates: { canonical: "/stacks" },
};

export default function StacksIndexPage() {
  return (
    <div>
      <h1 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 4px" }}>Peptide Stacks &amp; Blends</h1>
      <p style={{ color: S.d, fontSize: 14, marginBottom: 24 }}>
        Combinations researchers have studied for synergistic effects.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
        {STACK_KEYS.map((id) => {
          const p = PEPS[id];
          return (
            <Card key={id} href={`/stacks/${STACK_SLUGS[id]}`}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: S.a, background: S.ab, padding: "2px 6px", borderRadius: 4 }}>{p.cat}</span>
                <span style={{ fontSize: 9, color: S.m }}>{p.mw}</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 4px" }}>{p.name}</h2>
              <p style={{ fontSize: 13, color: S.d, margin: "0 0 8px", lineHeight: 1.5 }}>{p.plain}</p>
              <div style={{ fontSize: 11, color: S.a }}>{p.best} →</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
