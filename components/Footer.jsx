import Link from "next/link";
import { S } from "@/lib/data";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid " + S.br, marginTop: 40 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
        <div style={{ minWidth: 180 }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, cursor: "pointer", display: "inline-block" }}>
            <span style={{ color: S.a }}>Peptide</span> Reference Guide
          </Link>
          <div style={{ fontSize: 10, color: S.m, lineHeight: 1.6, marginBottom: 8 }}>
            Research-backed peptide education.<br />© {new Date().getFullYear()} Peptide Reference Guide.
          </div>
          <a href="https://animalpeptideguide.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: S.a, background: S.ab, border: "1px solid " + S.abr, padding: "5px 10px", borderRadius: 12, fontWeight: 600, marginBottom: 10 }}>
            🐾 Sister site: Animal Peptide Guide (for pets) →
          </a>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/peptides" style={{ fontSize: 10, color: S.d, borderBottom: "1px dotted " + S.m }}>All Peptides</Link>
            <Link href="/concerns" style={{ fontSize: 10, color: S.d, borderBottom: "1px dotted " + S.m }}>Concerns</Link>
            <Link href="/stacks" style={{ fontSize: 10, color: S.d, borderBottom: "1px dotted " + S.m }}>Stacks</Link>
            <Link href="/intro" style={{ fontSize: 10, color: S.d, borderBottom: "1px dotted " + S.m }}>About Peptides</Link>
            <Link href="/disclaimer" style={{ fontSize: 10, color: S.d, borderBottom: "1px dotted " + S.m }}>Disclaimer</Link>
            <Link href="/privacy" style={{ fontSize: 10, color: S.d, borderBottom: "1px dotted " + S.m }}>Privacy Policy</Link>
          </div>
        </div>
        <div style={{ flex: 1, maxWidth: 520, fontSize: 10, color: S.m, lineHeight: 1.7, textAlign: "right" }}>
          <p style={{ margin: "0 0 6px" }}>All products referenced are for research use only. Content reflects published scientific literature and is not medical advice, diagnosis, or treatment.</p>
          <p style={{ margin: 0 }}>Consult a licensed physician before starting any new health regimen. Peptides discussed on this site are not FDA-approved except where explicitly noted.</p>
        </div>
      </div>
    </footer>
  );
}
