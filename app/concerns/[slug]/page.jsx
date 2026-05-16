import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import {
  CONCERNS, CONCERN_SLUGS, concernBySlug,
  PEPS, S, SITE_URL, SITE_NAME, peptideUrl,
} from "@/lib/data";

export async function generateStaticParams() {
  return CONCERNS.map((c) => ({ slug: CONCERN_SLUGS[c.id] }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = concernBySlug(slug);
  if (!c) return { title: "Concern not found" };
  return {
    title: `Peptides for ${c.label}`,
    description: `Peptides researchers have studied for ${c.sub.toLowerCase()}.`,
    alternates: { canonical: `/concerns/${slug}` },
  };
}

export default async function ConcernPage({ params }) {
  const { slug } = await params;
  const c = concernBySlug(slug);
  if (!c) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Peptides for ${c.label}`,
    description: `Peptides researchers have studied for ${c.sub.toLowerCase()}.`,
    url: `${SITE_URL}/concerns/${slug}`,
    publisher: { "@type": "Organization", name: SITE_NAME },
    hasPart: c.peps.map((pid) => ({
      "@type": "Article",
      name: PEPS[pid]?.name,
      url: `${SITE_URL}${peptideUrl(pid)}`,
    })),
  };

  return (
    <div>
      <JsonLd data={jsonLd} />
      <Link href="/concerns" style={{ background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 500, marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 6 }}>
        ← All Concerns
      </Link>
      <div style={{ fontSize: 36, marginBottom: 8 }}>{c.icon}</div>
      <h1 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 4px" }}>Peptides for {c.label}</h1>
      <p style={{ fontSize: 14, color: S.d, marginBottom: 24 }}>
        Peptides researchers have studied for {c.sub.toLowerCase()}.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {c.peps.map((pid) => {
          const p = PEPS[pid];
          if (!p) return null;
          return (
            <Card key={pid} href={peptideUrl(pid)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{p.name}</h2>
                <span style={{ fontSize: 10, color: S.a, background: S.ab, padding: "3px 8px", borderRadius: 4 }}>{p.best}</span>
              </div>
              <p style={{ fontSize: 14, color: S.d, lineHeight: 1.6, margin: "0 0 12px" }}>{p.plain}</p>
              <div style={{ fontSize: 12, color: S.a }}>Learn more →</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
