import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseUnlock } from "@/components/CourseUnlock";
import { PrintButton } from "@/components/PrintButton";
import { FounderReserve } from "@/components/FounderReserve";
import { S } from "@/lib/data";
import { MODULES, moduleBySlug } from "@/lib/course";
import { CHECKLISTS } from "@/lib/course-extras";
import { hasCourseAccess } from "@/lib/course-access";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { module: slug } = await params;
  const c = CHECKLISTS[slug];
  if (!c) return { title: "Checklist not found" };
  return { title: `${c.title} — checklist — The Peptide Course`, robots: c.free ? undefined : { index: false } };
}

export default async function ChecklistPage({ params }) {
  const { module: slug } = await params;
  const m = moduleBySlug(slug);
  const c = CHECKLISTS[slug];
  if (!m || !c) notFound();
  const unlocked = c.free || (await hasCourseAccess());

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <style>{`@media print { nav, footer, .no-print { display: none !important } body { background: #fff !important; color: #000 !important } .sheet { color: #000 !important } .sheet * { color: #000 !important; border-color: #999 !important; background: #fff !important } }`}</style>
      <div className="no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
        <Link href="/course" style={{ background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 500 }}>← The course</Link>
        <Link href={`/course/${m.slug}`} style={{ background: S.surf, border: "1px solid " + S.br, color: S.d, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12 }}>Module {String(m.n).padStart(2, "0")}</Link>
        {unlocked && <PrintButton />}
      </div>

      <div className="sheet">
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".12em", color: S.a, marginBottom: 6 }}>CHECKLIST · MODULE {String(m.n).padStart(2, "0")}</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 }}>{c.title}</h1>
        <p style={{ fontSize: 13, color: S.d, margin: "0 0 20px" }}>One page. Print it, screenshot it, or keep it open in a tab. Every line is a lesson in this module, compressed.</p>
        {unlocked ? (
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
            {c.items.map((x, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 12px", border: "1px solid " + S.br, borderRadius: 8, background: S.card }}>
                <span style={{ flexShrink: 0, width: 18, height: 18, border: "2px solid " + S.a, borderRadius: 4, marginTop: 2 }} />
                <span style={{ fontSize: 14, lineHeight: 1.55, color: S.t }}>{x}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div style={{ background: S.surf, border: "1px solid " + S.br, borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>This checklist is for members</div>
            <p style={{ fontSize: 13, color: S.d, margin: "0 0 14px" }}>The buying checklist is free. The rest come with the course.</p>
            <FounderReserve compact />
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid " + S.br }}><div style={{ fontSize: 12, color: S.d, marginBottom: 8 }}>Already a founder?</div><CourseUnlock /></div>
          </div>
        )}
      </div>

      <div className="no-print" style={{ marginTop: 28, paddingTop: 16, borderTop: "1px solid " + S.br }}>
        <div style={{ fontSize: 11, color: S.m, marginBottom: 8 }}>All checklists</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {MODULES.filter((x) => CHECKLISTS[x.slug]).map((x) => (
            <Link key={x.slug} href={`/course/checklists/${x.slug}`} style={{ fontSize: 12, color: x.slug === slug ? S.a : S.t, background: x.slug === slug ? S.ab : S.surf, border: "1px solid " + (x.slug === slug ? S.abr : S.br), padding: "6px 10px", borderRadius: 999 }}>
              {CHECKLISTS[x.slug].title}{CHECKLISTS[x.slug].free ? " · free" : ""}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
