import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import {
  PEPS, PEPTIDE_KEYS, PEPTIDE_SLUGS, peptideBySlug,
  HALF_LIVES, S, SITE_URL, SITE_NAME, concernUrl, peptideUrl, CONCERNS,
} from "@/lib/data";

export async function generateStaticParams() {
  return PEPTIDE_KEYS.map((k) => ({ slug: PEPTIDE_SLUGS[k] }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = peptideBySlug(slug);
  if (!p) return { title: "Peptide not found" };
  return {
    title: `${p.name} — Mechanism, Half-Life & Research`,
    description: p.plain.slice(0, 160),
    alternates: { canonical: `/peptides/${slug}` },
    openGraph: {
      title: `${p.name} — Peptide Research Notes`,
      description: p.plain,
      url: `${SITE_URL}/peptides/${slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title: p.name, description: p.plain },
  };
}

export default async function PeptidePage({ params }) {
  const { slug } = await params;
  const p = peptideBySlug(slug);
  if (!p) notFound();

  // Concerns this peptide is studied for
  const studiedFor = CONCERNS.filter((c) => c.peps.includes(p.key));
  // Related: 3 peptides in the same category
  const related = Object.keys(PEPS)
    .filter((k) => k !== p.key && PEPS[k].cat === p.cat)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${p.name} — Mechanism, Half-Life & Research`,
    description: p.plain,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
    datePublished: "2026-01-01",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/peptides/${slug}` },
    about: { "@type": "MedicalEntity", name: p.name, description: p.plain },
  };

  return (
    <article>
      <JsonLd data={jsonLd} />
      <Link href="/peptides" style={{ background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 500, marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 6 }}>
        ← All Peptides
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{p.name}</h1>
        <span style={{ fontSize: 11, color: S.a, background: S.ab, border: "1px solid " + S.abr, padding: "4px 10px", borderRadius: 16, fontWeight: 500 }}>{p.best}</span>
      </div>
      <p style={{ fontSize: 15, color: S.d, marginBottom: 20 }}>{p.why}</p>

      <Card style={{ background: S.wb, border: "1px solid " + S.wbr, marginBottom: 14 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: S.w }}>In Plain English</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>{p.plain}</p>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>What Researchers Have Studied It For</h2>
        {p.areas.map((a, i) => (
          <div key={i} style={{ padding: "8px 12px", background: S.surf, borderRadius: 6, marginBottom: 4, fontSize: 13, display: "flex", gap: 8 }}>
            <span style={{ color: S.a }}>+</span>
            {a}
          </div>
        ))}
      </Card>

      {studiedFor.length > 0 && (
        <Card style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Studied for</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {studiedFor.map((c) => (
              <Link key={c.id} href={concernUrl(c.id)} style={{ background: S.ab, border: "1px solid " + S.abr, color: S.a, padding: "6px 12px", borderRadius: 16, fontSize: 12, fontWeight: 500 }}>
                {c.icon} {c.label}
              </Link>
            ))}
          </div>
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: S.br, borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
        {[["Molecular Weight", p.mw], ["Half-Life", HALF_LIVES[p.key] || "—"], ["Source", p.seq], ["Storage", p.store], ["Category", p.cat]].map((x, i) => (
          <div key={i} style={{ background: S.card, padding: "12px 14px" }}>
            <div style={{ fontSize: 9, color: S.m, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 3 }}>{x[0]}</div>
            <div style={{ fontSize: 12, fontWeight: 500 }}>{x[1]}</div>
          </div>
        ))}
      </div>

      <Card style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Published Research</h2>
        {p.studies.map((st, i) => (
          <div key={i} style={{ padding: "8px 12px", background: S.surf, borderRadius: 6, marginBottom: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{st.t}</div>
            <div style={{ fontSize: 10, color: S.m, fontStyle: "italic" }}>{st.j} ({st.y})</div>
          </div>
        ))}
      </Card>

      {related.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, color: S.t }}>You might also look at</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
            {related.map((rid) => {
              const rp = PEPS[rid];
              return (
                <Card key={rid} href={peptideUrl(rid)} style={{ padding: 16 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>{rp.name}</h3>
                  <p style={{ fontSize: 11, color: S.d, margin: "0 0 6px", lineHeight: 1.5 }}>{rp.plain.slice(0, 120)}…</p>
                  <div style={{ fontSize: 10, color: S.a }}>{rp.best} →</div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ marginTop: 24, padding: "12px 14px", borderRadius: 8, background: "rgba(250,200,50,.05)", border: "1px solid " + S.wbr, fontSize: 11, color: S.d, lineHeight: 1.5 }}>
        <strong style={{ color: S.w }}>Research-use disclaimer —</strong>{" "}
        {p.name} is referenced here for research education only. It is not approved by the FDA for human consumption, treatment, cure, or diagnosis of any condition. Nothing on this page is medical advice. Consult a licensed physician for anything related to your health.
      </div>
    </article>
  );
}
