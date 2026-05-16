import Link from "next/link";
import { Card } from "@/components/Card";
import { CONCERNS, PEPS, S, CONCERN_SLUGS, peptideUrl, concernUrl } from "@/lib/data";

export const metadata = {
  title: "Peptide Reference Guide — Plain-English Peptide Research",
  description:
    "Browse 30+ peptides researchers have studied for recovery, weight loss, anti-aging, sleep, immunity, and more — in plain English.",
  alternates: { canonical: "/" },
};

const FEATURED_KEYS = ["retatrutide", "wolverine", "motsc", "nad", "glow"];

export default function HomePage() {
  return (
    <div>
      <Card href="/intro" style={{ background: "linear-gradient(135deg,rgba(99,102,241,.10),rgba(56,189,248,.08))", border: "1px solid rgba(99,102,241,.25)", marginBottom: 14, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", padding: "14px 18px" }}>
        <div style={{ fontSize: 28, flexShrink: 0 }}>📖</div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: S.t, marginBottom: 1 }}>New to peptides?</div>
          <div style={{ fontSize: 12, color: S.d }}>Start with the plain-English explainer — what they are, why researchers care, what to know.</div>
        </div>
        <div style={{ fontSize: 12, color: "#A5B4FC", fontWeight: 600, whiteSpace: "nowrap" }}>Read intro →</div>
      </Card>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10, gap: 8, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: S.t }}>Featured Compounds</h2>
          <div style={{ fontSize: 11, color: S.m }}>Quick starting points if you're not sure where to begin.</div>
        </div>
        <div className="pg-featured-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 10 }}>
          {FEATURED_KEYS.map((id) => {
            const p = PEPS[id];
            return (
              <Card key={id} href={peptideUrl(id)} style={{ padding: 14 }}>
                <div style={{ fontSize: 10, color: S.a, background: S.ab, padding: "2px 6px", borderRadius: 4, display: "inline-block", marginBottom: 6 }}>{p.cat}</div>
                <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>{p.name}</h3>
                <p style={{ fontSize: 11, color: S.d, margin: "0 0 6px", lineHeight: 1.4 }}>{p.best}</p>
                <div style={{ fontSize: 10, color: S.a }}>Learn more →</div>
              </Card>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "16px 0 28px" }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.2, margin: "0 0 10px" }}>What do you need help with?</h1>
        <p style={{ fontSize: 15, color: S.d, maxWidth: 460, margin: "0 auto" }}>
          Tap your concern and we'll show you which peptides researchers have studied for it.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 12, marginBottom: 32 }}>
        {CONCERNS.map((c) => (
          <Card key={c.id} href={concernUrl(c.id)}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
            <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 4px" }}>{c.label}</h3>
            <p style={{ fontSize: 13, color: S.d, margin: "0 0 10px" }}>{c.sub}</p>
            <div style={{ fontSize: 11, color: S.a }}>{c.peps.length} peptides studied</div>
          </Card>
        ))}
      </div>

      <Card style={{ background: "linear-gradient(135deg,rgba(239,68,68,.06),rgba(251,146,60,.06))", border: "1px solid rgba(239,68,68,.15)", marginBottom: 14 }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>Are Your Peptides Actually Safe?</h3>
        <p style={{ fontSize: 13, color: S.d, margin: "0 0 10px", lineHeight: 1.5 }}>Most online peptide sellers are reselling cheap, unverified product from overseas labs with no real quality control. No sterility testing. No endotoxin testing. No way to verify what's actually in the vial. And since most peptides are injected, you're putting whatever is in that vial directly into your body.</p>
        <p style={{ fontSize: 13, color: S.t, margin: "0 0 10px", lineHeight: 1.5, fontWeight: 500 }}>What you should demand from any supplier:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
          {["American made — manufactured in the USA, not imported and relabeled","GMP certified facility — the same manufacturing standard as real medications","99%+ purity verified by third-party testing","Third-party sterility testing","Third-party endotoxin testing","Certificate of Analysis (COA) included with every single peptide","All testing documents viewable and downloadable — not hidden or 'available upon request'"].map((item, i) => (
            <div key={i} style={{ fontSize: 12, color: S.t, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ color: "#5EEAD4", fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "#F87171", margin: "0 0 4px", lineHeight: 1.5, fontWeight: 500 }}>If your supplier can't check every one of these boxes, you don't know what you're putting in your body.</p>
        <p style={{ fontSize: 12, color: S.d, margin: "0 0 12px", lineHeight: 1.5 }}>Many sellers claim "99% purity" but can't show you the documents to prove it. Many claim "USA made" but operate from a virtual office with no lab. Always ask to see the actual test results — and if they can't show them to you instantly, walk away.</p>
        <Link href="/ask" style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", color: "#FCA5A5", padding: "8px 16px", borderRadius: 6, fontFamily: S.f, fontSize: 12, fontWeight: 500, display: "inline-block" }}>
          Have questions about supplier quality? Ask our AI →
        </Link>
      </Card>

      <Card href="/calc" style={{ background: "linear-gradient(135deg,rgba(94,234,212,.06),rgba(56,189,248,.06))", border: "1px solid " + S.abr, marginBottom: 20 }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🧪</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>Reconstitution Calculator</h3>
        <p style={{ fontSize: 13, color: S.d, margin: "0 0 10px", lineHeight: 1.5 }}>Got your peptides but not sure how to mix them? Our calculator tells you exactly how much water to add and how much to draw per dose.</p>
        <div style={{ fontSize: 13, color: S.a, fontWeight: 600 }}>Open Calculator →</div>
      </Card>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <p style={{ fontSize: 13, color: S.m, marginBottom: 10 }}>Not sure what you need?</p>
        <Link href="/ask" style={{ background: S.ab, border: "1px solid " + S.abr, color: S.a, padding: "10px 24px", borderRadius: 8, fontFamily: S.f, fontSize: 13, fontWeight: 500, display: "inline-block" }}>
          Ask the AI →
        </Link>
      </div>
    </div>
  );
}
