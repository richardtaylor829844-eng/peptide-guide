import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { S } from "@/lib/data";
import { MODULES, moduleBySlug, lessonUrl } from "@/lib/course";
import { CHECKLISTS } from "@/lib/course-extras";

export async function generateStaticParams() {
  return MODULES.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }) {
  const { module: slug } = await params;
  const m = moduleBySlug(slug);
  if (!m) return { title: "Module not found" };
  return { title: `${m.title} — The Peptide Course`, description: m.summary, alternates: { canonical: `/course/${m.slug}` } };
}

export default async function ModulePage({ params }) {
  const { module: slug } = await params;
  const m = moduleBySlug(slug);
  if (!m) notFound();
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <Link href="/course" style={{ background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 500, marginBottom: 20, display: "inline-flex" }}>← The course</Link>
      <div style={{ fontSize: 11, color: S.a, fontWeight: 700, letterSpacing: ".08em", marginBottom: 4 }}>MODULE {String(m.n).padStart(2, "0")}</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.2 }}>{m.title}</h1>
      <p style={{ fontSize: 14, color: S.d, lineHeight: 1.6, marginBottom: 20 }}>{m.summary}</p>
      {CHECKLISTS[m.slug] && (
        <Link href={`/course/checklists/${m.slug}`} style={{ display: "block", marginBottom: 12, padding: "10px 14px", borderRadius: 10, background: S.card, border: "1px solid " + S.abr, fontSize: 13, color: S.t }}>
          <strong style={{ color: S.a }}>One-page checklist:</strong> {CHECKLISTS[m.slug].title}{CHECKLISTS[m.slug].free ? " · free" : ""} →
        </Link>
      )}
      <Card>
        {m.lessons.map((l) => {
          const written = !!l.body;
          const inner = (
            <div style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "10px 0", borderTop: "1px solid " + S.br }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: written ? S.t : S.d, fontWeight: 600 }}>{l.title}</div>
                <div style={{ fontSize: 12, color: S.d, lineHeight: 1.5 }}>{l.summary}</div>
              </div>
              {l.free && written && <span style={{ fontSize: 10, color: S.a, background: S.ab, padding: "1px 6px", borderRadius: 4 }}>free</span>}
              {!written && <span style={{ fontSize: 10, color: S.m }}>in progress</span>}
              <span style={{ fontSize: 11, color: S.m, whiteSpace: "nowrap" }}>{l.minutes} min</span>
            </div>
          );
          return written ? <Link key={l.slug} href={lessonUrl(m, l)} style={{ display: "block" }}>{inner}</Link> : <div key={l.slug}>{inner}</div>;
        })}
      </Card>
    </div>
  );
}
