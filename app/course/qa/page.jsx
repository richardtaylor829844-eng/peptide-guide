import Link from "next/link";
import { CourseUnlock } from "@/components/CourseUnlock";
import { FounderReserve } from "@/components/FounderReserve";
import { QaBoard } from "@/components/QaBoard";
import { S } from "@/lib/data";
import { QA } from "@/lib/course-extras";
import { hasCourseAccess } from "@/lib/course-access";

export const dynamic = "force-dynamic";
export const metadata = { title: "Members' questions — The Peptide Course", robots: { index: false } };

export default async function QaPage() {
  const unlocked = await hasCourseAccess();
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <Link href="/course" style={{ background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 500, marginBottom: 20, display: "inline-flex" }}>← The course</Link>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".12em", color: S.a, marginBottom: 6 }}>MEMBERS</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 }}>Questions, answered</h1>
      <p style={{ fontSize: 14, color: S.d, margin: "0 0 20px", lineHeight: 1.6 }}>Every question about the material that has been worth answering for everyone, searchable. Ask your own at the bottom.</p>
      {unlocked ? (
        <QaBoard items={QA} />
      ) : (
        <div style={{ background: S.surf, border: "1px solid " + S.br, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>The question line is for members</div>
          <p style={{ fontSize: 13, color: S.d, margin: "0 0 14px" }}>Founders get it free for the first year, along with every update to the course.</p>
          <FounderReserve compact />
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid " + S.br }}><div style={{ fontSize: 12, color: S.d, marginBottom: 8 }}>Already a founder?</div><CourseUnlock /></div>
        </div>
      )}
    </div>
  );
}
