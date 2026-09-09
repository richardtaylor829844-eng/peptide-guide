import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { CourseUnlock } from "@/components/CourseUnlock";
import { FounderReserve } from "@/components/FounderReserve";
import { S } from "@/lib/data";
import { COURSE, MODULES, lessonBySlug, lessonUrl, neighbours } from "@/lib/course";
import { hasCourseAccess } from "@/lib/course-access";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { module: ms, lesson: ls } = await params;
  const hit = lessonBySlug(ms, ls);
  if (!hit || !hit.lesson.body) return { title: "Lesson not found" };
  const { module: m, lesson: l } = hit;
  return {
    title: `${l.title} — ${m.title} — The Peptide Course`,
    description: l.summary,
    alternates: { canonical: `/course/${m.slug}/${l.slug}` },
    robots: l.free ? undefined : { index: false, follow: true },
  };
}

function Block({ b }) {
  if (b.t === "h") return <h2 style={{ fontSize: 17, fontWeight: 700, margin: "22px 0 8px", color: S.t }}>{b.text}</h2>;
  if (b.t === "list") return (
    <ul style={{ margin: "0 0 12px", paddingLeft: 20, fontSize: 14, color: S.t, lineHeight: 1.7 }}>
      {b.items.map((x, i) => <li key={i} style={{ marginBottom: 6 }}>{x}</li>)}
    </ul>
  );
  if (b.t === "note" || b.t === "warn") {
    const warn = b.t === "warn";
    return (
      <div style={{ margin: "14px 0", padding: "12px 14px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, color: S.t, background: warn ? S.wb : S.ab, border: "1px solid " + (warn ? S.wbr : S.abr) }}>
        {b.text}
      </div>
    );
  }
  return <p style={{ fontSize: 14, color: S.t, lineHeight: 1.75, margin: "0 0 12px" }}>{b.text}</p>;
}

export default async function LessonPage({ params, searchParams }) {
  const { module: ms, lesson: ls } = await params;
  const sp = (await searchParams) || {};
  const welcome = sp.welcome === "1";
  const hit = lessonBySlug(ms, ls);
  if (!hit || !hit.lesson.body) notFound();
  const { module: m, lesson: l } = hit;
  const unlocked = l.free || (await hasCourseAccess());
  const { prev, next } = neighbours(m.slug, l.slug);
  const body = unlocked ? l.body : l.body.slice(0, 1);

  return (
    <article style={{ maxWidth: 720, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        <Link href="/course" style={{ background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 500 }}>← The course</Link>
        <Link href={`/course/${m.slug}`} style={{ background: S.surf, border: "1px solid " + S.br, color: S.d, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 500 }}>Module {String(m.n).padStart(2, "0")}: {m.title}</Link>
      </div>

      <div style={{ fontSize: 11, color: S.m, marginBottom: 6 }}>{l.minutes} min read {l.free ? "· free lesson" : ""}</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, margin: "0 0 6px" }}>{l.title}</h1>
      <p style={{ fontSize: 14, color: S.d, lineHeight: 1.6, margin: "0 0 22px" }}>{l.summary}</p>

      {welcome && unlocked && (
        <div style={{ margin: "0 0 18px", padding: "12px 14px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, color: S.t, background: S.ab, border: "1px solid " + S.abr }}>
          <strong style={{ color: S.a }}>You are in.</strong> Every lesson is unlocked on this browser for a year. To read on another device, open the confirmation link from your receipt there; it unlocks the same way. Questions about the material: reply to any course email.
        </div>
      )}
      {body.map((b, i) => <Block key={i} b={b} />)}

      {!unlocked && (
        <Card style={{ marginTop: 10, background: S.surf }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: S.t, marginBottom: 6 }}>The rest of this lesson is for members</div>
          <p style={{ fontSize: 13, color: S.d, lineHeight: 1.6, margin: "0 0 14px" }}>
            {COURSE.status === "presale"
              ? `Founding members get every lesson, now, at $${COURSE.founderPrice} instead of $${COURSE.price}.`
              : `Join the course to read every lesson and keep every update.`}
          </p>
          <FounderReserve compact />
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid " + S.br }}>
            <div style={{ fontSize: 12, color: S.d, marginBottom: 8 }}>Already a founder? Enter your code.</div>
            <CourseUnlock />
          </div>
        </Card>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 30, paddingTop: 16, borderTop: "1px solid " + S.br, flexWrap: "wrap" }}>
        {prev && prev.l.body ? (
          <Link href={lessonUrl(prev.m, prev.l)} style={{ fontSize: 13, color: S.d }}>← {prev.l.title}</Link>
        ) : <span />}
        {next && next.l.body ? (
          <Link href={lessonUrl(next.m, next.l)} style={{ fontSize: 13, color: S.a, fontWeight: 600 }}>{next.l.title} →</Link>
        ) : (
          <span style={{ fontSize: 12, color: S.m }}>Next lesson is being written</span>
        )}
      </div>
    </article>
  );
}
