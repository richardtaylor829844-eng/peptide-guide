import Link from "next/link";
import { Card } from "@/components/Card";
import { S } from "@/lib/data";
import { COURSE } from "@/lib/course";

export const metadata = {
  title: "Course terms — The Peptide Course",
  description: "What you are buying, what it is not, refunds, access, and the education-only line the course holds.",
  alternates: { canonical: "/course/terms" },
};

const H = ({ children }) => <h2 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 8px", color: S.t }}>{children}</h2>;
const P = ({ children }) => <p style={{ fontSize: 14, color: S.t, lineHeight: 1.7, margin: "0 0 10px" }}>{children}</p>;

export default function CourseTermsPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <Link href="/course" style={{ background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 500, marginBottom: 20, display: "inline-flex" }}>← The course</Link>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 }}>Course terms</h1>
      <p style={{ fontSize: 13, color: S.d, margin: "0 0 20px" }}>Plain English, because the course is. Last updated 8 September 2026.</p>

      <Card style={{ marginBottom: 12 }}>
        <H>Who is selling this</H>
        <P>The Peptide Course is published by Peptide Reference Guide, operated by RT LLC, Boise, Idaho, United States. Payments are processed by Stripe. Questions about these terms: reply to any course email.</P>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <H>What you are buying</H>
        <P>Access to the written lessons, diagrams, narration, checklists, quizzes and members' question pages of The Peptide Course, as they exist now and as they are updated, for as long as the course is published. Founding members also receive the members' digest and question line at no charge for twelve months from purchase; after that it is optional at ${COURSE.membershipPrice} a month, cancel any time.</P>
        <P>Access is for you, on your own devices. Sharing the access link or code, or reposting the material, ends access without refund.</P>
      </Card>

      <Card style={{ marginBottom: 12, background: "rgba(252,211,77,.05)", border: "1px solid " + S.wbr }}>
        <H>What this is, and what it is not</H>
        <P>The course is education. It describes what peptides are, how the research market works, how compounds are commonly used, what published research shows, and what people report. It is written for a general audience and does not take your health, medications or circumstances into account.</P>
        <P>It is not medical advice, diagnosis or treatment, and nothing in it is a recommendation that you use any compound. Most compounds discussed are not approved for human use in the United States, and many are prohibited in tested sport. Members' questions are answered as questions about the material; questions about what you personally should do are referred to a licensed clinician. No vendor is recommended and no product is sold or linked.</P>
        <P>By buying, you confirm you are at least 18 and that you will not treat the course as a substitute for a clinician who knows your history.</P>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <H>Refunds</H>
        <P>If the course is not what you expected, say so by replying to your receipt within fourteen days of purchase and the full amount is refunded, no questions. After fourteen days, purchases are final. Membership payments after the founder year can be canceled at any time and are not refunded for the period already paid.</P>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <H>Access and changes</H>
        <P>Access is granted on the browser where you completed checkout and on any device where you open your confirmation link. If access fails, reply to your receipt and it will be fixed by hand. Lessons are updated as evidence and rules change; the digest records what changed. If the course is ever discontinued, members will be given at least ninety days' notice and a way to keep the material.</P>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <H>Limitation of liability</H>
        <P>To the fullest extent permitted by law, RT LLC's liability to you in connection with the course is limited to the amount you paid for it. The course is provided as-is, and RT LLC is not responsible for decisions you make or outcomes you experience from using any compound described in it.</P>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <H>Privacy</H>
        <P>Your email and purchase record are kept to provide access, the digest and support, and are not sold. Card details are handled by Stripe and never seen by us. The site's <Link href="/privacy" style={{ color: S.a }}>privacy policy</Link> applies.</P>
      </Card>

      <Card>
        <H>Governing law</H>
        <P>These terms are governed by the laws of the State of Idaho, United States. If any part is found unenforceable, the rest still applies.</P>
        <p style={{ fontSize: 12, color: S.m, margin: 0 }}>This page will be revised after review by counsel. The education-only line above is not going to change.</p>
      </Card>
    </div>
  );
}
