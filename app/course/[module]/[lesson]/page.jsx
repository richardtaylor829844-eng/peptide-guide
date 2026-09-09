import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { CourseUnlock } from "@/components/CourseUnlock";
import { FounderReserve } from "@/components/FounderReserve";
import { S } from "@/lib/data";
import { COURSE, MODULES, lessonBySlug, lessonUrl, neighbours } from "@/lib/course";
import { hasCourseAccess } from "@/lib/course-access";
import { Figure } from "@/components/CourseFigures";
import { ModuleQuiz } from "@/components/ModuleQuiz";
import { QUIZZES, CHECKLISTS } from "@/lib/course-extras";
import { audioUrlFor } from "@/lib/course-audio";

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

const GRADE = { A: "#4ADE80", B: "#5EEAD4", C: "#FCD34D", D: "#F87171" };

function Block({ b }) {
  if (b.t === "h") return <h2 style={{ fontSize: 18, fontWeight: 700, margin: "26px 0 8px", color: S.t }}>{b.text}</h2>;
  if (b.t === "fig") return <Figure id={b.id} caption={b.caption} />;
  if (b.t === "card") {
    const g = (b.grade || "D").trim()[0];
    return (
      <div style={{ margin: "8px 0 16px", background: S.surf, border: "1px solid " + S.br, borderRadius: 12, padding: "12px 14px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "10px 14px", alignItems: "start" }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: GRADE[g] || GRADE.D, color: "#0B1120", fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, textAlign: "center" }}>{b.grade}</div>
        <div>
          <div style={{ fontSize: 13, color: S.t, lineHeight: 1.5, marginBottom: 8 }}>{b.note}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "6px 14px", fontSize: 12 }}>
            {[["How", b.route], ["How often", b.often], ["How long", b.length], ["Tested sport", b.wada]].map(([k, v]) => (
              <div key={k}><div style={{ fontSize: 10, letterSpacing: ".1em", fontWeight: 800, color: v === "Banned" ? S.w : S.m, marginBottom: 1 }}>{k.toUpperCase()}</div><div style={{ color: v === "Banned" ? S.w : S.d, lineHeight: 1.45 }}>{v}</div></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (b.t === "download") return (
    <a href={b.href} download style={{ display: "inline-flex", alignItems: "center", gap: 8, margin: "6px 0 14px", background: S.ab, border: "1px solid " + S.abr, color: S.a, padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
      ⬇ {b.label}
    </a>
  );
  if (b.t === "steps") return (
    <ol style={{ listStyle: "none", margin: "6px 0 14px", padding: 0, display: "grid", gap: 8 }}>
      {b.items.map((x, i) => (
        <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: S.surf, border: "1px solid " + S.br, borderRadius: 10, padding: "10px 12px" }}>
          <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 13, background: S.a, color: "#0B1120", fontWeight: 800, fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
          <span style={{ fontSize: 14, lineHeight: 1.6, color: S.t }}>{x}</span>
        </li>
      ))}
    </ol>
  );
  if (b.t === "list") return (
    <ul style={{ margin: "0 0 12px", paddingLeft: 20, fontSize: 14, color: S.t, lineHeight: 1.7 }}>
      {b.items.map((x, i) => <li key={i} style={{ marginBottom: 6 }}>{x}</li>)}
    </ul>
  );
  if (b.t === "note" || b.t === "warn") {
    const warn = b.t === "warn";
    return (
      <div style={{ margin: "14px 0", padding: "12px 14px 12px 16px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, color: S.t, background: warn ? S.wb : S.ab, borderLeft: "4px solid " + (warn ? S.w : S.a) }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".1em", color: warn ? S.w : S.a, display: "block", marginBottom: 3 }}>{warn ? "WATCH OUT" : "WORTH KNOWING"}</span>
        {b.text}
      </div>
    );
  }
  // Evidence paragraphs get a grade badge so the strength is visible at a glance.
  const m = /^The evidence:\s*([ABCD])\b/.exec(b.text || "");
  if (m) {
    const g = m[1];
    return (
      <p style={{ fontSize: 14, color: S.t, lineHeight: 1.75, margin: "0 0 12px", display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ flexShrink: 0, marginTop: 2, width: 26, height: 26, borderRadius: 6, background: GRADE[g], color: "#0B1120", fontWeight: 800, fontSize: 14, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{g}</span>
        <span>{b.text.replace(/^The evidence:\s*/, "Evidence: ")}</span>
      </p>
    );
  }
  // Compound entries: "What it is." "How people commonly use it." etc. get a bold lead.
  const lead = /^(What it is|How people commonly use it|What people notice|Side effects|Interactions|Who stays away)([^.]*)\.\s/.exec(b.text || "");
  if (lead) {
    const head = lead[1] + lead[2] + ".";
    return <p style={{ fontSize: 14, color: S.t, lineHeight: 1.75, margin: "0 0 12px" }}><strong style={{ color: S.a }}>{head}</strong> {b.text.slice(head.length).trim()}</p>;
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
  const audio = unlocked ? audioUrlFor(m.slug, l.slug) : null;
  const isLast = m.lessons[m.lessons.length - 1].slug === l.slug;
  const quiz = unlocked && isLast ? QUIZZES[m.slug] : null;
  const checklist = CHECKLISTS[m.slug];

  return (
    <article style={{ maxWidth: 720, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        <Link href="/course" style={{ background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 500 }}>← The course</Link>
        <Link href={`/course/${m.slug}`} style={{ background: S.surf, border: "1px solid " + S.br, color: S.d, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 500 }}>Module {String(m.n).padStart(2, "0")}: {m.title}</Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".12em", color: S.a, background: S.ab, border: "1px solid " + S.abr, padding: "3px 8px", borderRadius: 4 }}>MODULE {String(m.n).padStart(2, "0")}</span>
        <span style={{ fontSize: 11, color: S.m }}>{l.minutes} min read {l.free ? "· free lesson" : ""}</span>
      </div>
      <h1 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.15, margin: "0 0 6px" }}>{l.title}</h1>
      <p style={{ fontSize: 14, color: S.d, lineHeight: 1.6, margin: "0 0 22px" }}>{l.summary}</p>

      {welcome && unlocked && (
        <div style={{ margin: "0 0 18px", padding: "12px 14px", borderRadius: 8, fontSize: 13, lineHeight: 1.6, color: S.t, background: S.ab, border: "1px solid " + S.abr }}>
          <strong style={{ color: S.a }}>You are in.</strong> Every lesson is unlocked on this browser for a year. To read on another device, open the confirmation link from your receipt there; it unlocks the same way. Questions about the material: reply to any course email.
        </div>
      )}
      {audio && (
        <div style={{ margin: "0 0 18px", padding: "10px 12px", borderRadius: 10, background: S.surf, border: "1px solid " + S.br }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".12em", color: S.a, marginBottom: 6 }}>LISTEN INSTEAD · {l.minutes} MIN</div>
          <audio controls preload="none" src={audio} style={{ width: "100%", height: 36 }} />
        </div>
      )}
      {body.map((b, i) => <Block key={i} b={b} />)}
      {quiz && <ModuleQuiz title={`Module ${String(m.n).padStart(2, "0")}: ${m.title}`} questions={quiz} />}
      {unlocked && checklist && isLast && (
        <Link href={`/course/checklists/${m.slug}`} style={{ display: "block", marginTop: 14, padding: "12px 14px", borderRadius: 10, background: S.card, border: "1px solid " + S.br, fontSize: 13, color: S.t }}>
          <strong style={{ color: S.a }}>Printable checklist:</strong> {checklist.title} →
        </Link>
      )}

      {!unlocked && (
        <Card style={{ marginTop: 10, background: S.surf }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: S.t, marginBottom: 6 }}>The rest of this lesson is for members</div>
          <p style={{ fontSize: 13, color: S.d, lineHeight: 1.6, margin: "0 0 14px" }}>
            {COURSE.status === "presale"
              ? `Every lesson, the audio, the checklists and the quizzes, for $${COURSE.founderPrice} instead of $${COURSE.price} while the founder price lasts.`
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
