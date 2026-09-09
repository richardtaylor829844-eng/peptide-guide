import Link from "next/link";
import { Card } from "@/components/Card";
import { JsonLd } from "@/components/JsonLd";
import { FounderReserve } from "@/components/FounderReserve";
import { S, SITE_URL, SITE_NAME } from "@/lib/data";
import { COURSE, MODULES, READY_LESSON_COUNT, TOTAL_LESSON_COUNT, TOTAL_MINUTES, lessonUrl } from "@/lib/course";
import { GoalPicker } from "@/components/GoalPicker";
import { GOALS } from "@/lib/course-extras";

export const metadata = {
  title: `${COURSE.name} — Sourcing, handling and how each peptide is used`,
  description: COURSE.tagline,
  alternates: { canonical: "/course" },
  openGraph: {
    title: COURSE.name,
    description: COURSE.tagline,
    url: `${SITE_URL}/course`,
    type: "website",
  },
};

const H2 = ({ children }) => (
  <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px", color: S.t }}>{children}</h2>
);
const P = ({ children, dim }) => (
  <p style={{ fontSize: 14, color: dim ? S.d : S.t, lineHeight: 1.7, margin: "0 0 10px" }}>{children}</p>
);

export default function CoursePage() {
  const lessonIndex = Object.fromEntries(MODULES.flatMap((m) => m.lessons.map((l) => [`${m.slug}/${l.slug}`, { title: l.title, minutes: l.minutes, free: l.free }])));
  const hours = Math.round(TOTAL_MINUTES / 60 * 10) / 10;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: COURSE.name,
    description: COURSE.tagline,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    offers: {
      "@type": "Offer",
      price: COURSE.status === "presale" ? COURSE.founderPrice : COURSE.price,
      priceCurrency: "USD",
      availability: COURSE.status === "presale" ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
      url: `${SITE_URL}/course`,
    },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `PT${Math.round(TOTAL_MINUTES)}M` },
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <JsonLd data={jsonLd} />

      {/* hero */}
      <div style={{ padding: "12px 0 24px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, color: S.a, background: S.ab, border: "1px solid " + S.abr, padding: "4px 10px", borderRadius: 999, marginBottom: 14, fontWeight: 600 }}>
          {COURSE.status === "presale" ? `Founding members · first ${COURSE.founderSeats} at $${COURSE.founderPrice} · then $${COURSE.price}` : "Open"}
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.15, margin: "0 0 12px" }}>{COURSE.name}</h1>
        <p style={{ fontSize: 16, color: S.d, lineHeight: 1.65, margin: "0 0 20px", maxWidth: 600 }}>{COURSE.tagline}</p>
        <FounderReserve />
      </div>

      <div style={{ marginBottom: 14 }}><GoalPicker goals={GOALS} lessons={lessonIndex} /></div>

      {/* what it is */}
      <Card style={{ marginBottom: 14 }}>
        <H2>The reference site tells you what a compound is. This tells you what to do with that.</H2>
        <P>Peptide Reference Guide has pages on more than thirty compounds, and they are free and staying free. What they cannot do is put the decisions in order. Which vendor. Whether the certificate is real. How much water. What to run first. What a normal side effect looks like against one that means stop.</P>
        <P>This course is that order. It was written by someone who has spent time on the vendor side of this market, reading certificates, chasing labs, and watching where buyers lose money. It explains how each compound is commonly used and why, what the research actually shows, and what people report. Plainly, with sources, and without selling you anything at the end.</P>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginTop: 14 }}>
          {[
            [`${MODULES.length}`, "modules"],
            [`${TOTAL_LESSON_COUNT}`, "lessons"],
            [`~${hours} h`, "to read, or listen"],
            ["12", "diagrams, 7 quizzes, 7 checklists"],
          ].map(([n, l]) => (
            <div key={l} style={{ background: S.surf, borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: S.a }}>{n}</div>
              <div style={{ fontSize: 11, color: S.d }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* curriculum */}
      <div style={{ margin: "26px 0 10px", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <H2>What is in it</H2>
        <div style={{ fontSize: 11, color: S.m }}>{READY_LESSON_COUNT === TOTAL_LESSON_COUNT ? `All ${TOTAL_LESSON_COUNT} lessons written. Free lessons are marked.` : `${READY_LESSON_COUNT} of ${TOTAL_LESSON_COUNT} lessons written so far. Free lessons are marked.`}</div>
      </div>
      {MODULES.map((m) => (
        <Card key={m.slug} style={{ marginBottom: 10, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: S.a, fontWeight: 700, letterSpacing: ".08em" }}>{String(m.n).padStart(2, "0")}</span>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: S.t }}>{m.title}</h3>
            {m.status === "outline" && <span style={{ fontSize: 10, color: S.m, marginLeft: "auto" }}>in progress</span>}
          </div>
          <div style={{ fontSize: 13, color: S.d, lineHeight: 1.5, marginBottom: 10 }}>{m.summary}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {m.lessons.map((l) => {
              const written = !!l.body;
              const row = (
                <div style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 13, padding: "5px 0", borderTop: "1px solid " + S.br }}>
                  <span style={{ color: written ? S.t : S.d, flex: 1 }}>{l.title}</span>
                  {l.free && written && <span style={{ fontSize: 10, color: S.a, background: S.ab, padding: "1px 6px", borderRadius: 4 }}>free</span>}
                  <span style={{ fontSize: 11, color: S.m, whiteSpace: "nowrap" }}>{l.minutes} min</span>
                </div>
              );
              return written ? <Link key={l.slug} href={lessonUrl(m, l)}>{row}</Link> : <div key={l.slug}>{row}</div>;
            })}
          </div>
        </Card>
      ))}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 8, margin: "18px 0 6px" }}>
        {[
          ["/course/checklists/sourcing", "Buying checklist", "free, printable"],
          ["/course/qa", "Members' questions", "searchable answers"],
          ["/course/handling/keeping-records", "Log template", "in the records lesson"],
          ["/course/terms", "Course terms", "refunds and the line"],
        ].map(([href, t, sub]) => (
          <Link key={href} href={href} style={{ background: S.card, border: "1px solid " + S.br, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: S.t }}>{t}</div>
            <div style={{ fontSize: 11, color: S.m }}>{sub}</div>
          </Link>
        ))}
      </div>

      {/* who for */}
      <Card style={{ marginTop: 26, marginBottom: 14 }}>
        <H2>Who it is for</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: S.a, marginBottom: 6 }}>Written for</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: S.t, lineHeight: 1.7 }}>
              <li>People who have read the forums and still do not know who to trust</li>
              <li>Anyone about to place a first order, or who has one in the fridge and is not sure it is real</li>
              <li>People already using one compound who want to understand the rest before adding anything</li>
              <li>Anyone who wants the research read for them, honestly, including where it is thin</li>
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: S.w, marginBottom: 6 }}>Not for</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: S.d, lineHeight: 1.7 }}>
              <li>Anyone looking for a personal protocol. The course explains how compounds are used. It does not tell you what to take.</li>
              <li>Anyone hoping for a vendor list. There is none, and there will never be one.</li>
              <li>Anyone under 18, pregnant, or managing a condition without a clinician involved</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* the line */}
      <Card style={{ background: "rgba(252,211,77,.05)", border: "1px solid " + S.wbr, marginBottom: 14 }}>
        <H2>The line this course holds</H2>
        <P>This is education, and it is careful about staying that. It does not sell peptides. It does not link to anyone who does, take a commission, or recommend a vendor. It never gives an individual a plan, and the members' questions are answered as questions about the material. It does not promise you any result. What it does is explain, in order and in plain language, how these compounds are sourced, handled and used, and what the evidence says. Most compounds discussed are not approved for human use in the United States. See the <Link href="/disclaimer" style={{ color: S.a }}>full disclaimer</Link>.</P>
      </Card>

      {/* founder terms */}
      <Card style={{ marginBottom: 14 }}>
        <H2>Founding members</H2>
        <P>The first {COURSE.founderSeats} people pay ${COURSE.founderPrice} instead of ${COURSE.price}, get every lesson immediately, keep every update for as long as the course exists, and get the members' digest and question line for the first year at no charge (${COURSE.membershipPrice} a month after that, optional, cancel any time).</P>
        <P dim>Payment is one time, through Stripe, and access is immediate: the confirmation page unlocks every lesson on this browser, and the same link unlocks it anywhere else. If it is not what you expected, say so within fourteen days and the whole amount comes back.</P>
        <div style={{ marginTop: 12 }}><FounderReserve compact /></div>
      </Card>

      {/* faq */}
      <Card style={{ marginBottom: 14 }}>
        <H2>Questions</H2>
        {[
          ["Do you sell peptides?", "No. Nothing on this site or in the course is for sale except the course. No vendor links, no codes, no commissions."],
          ["Will it tell me what to take?", "No. It explains how each compound is commonly used and why, what the research shows, and what people report. Decisions about you belong with you and a clinician who knows your history."],
          ["Is this medical advice?", "No. It is published education about research compounds, most of which are not approved for human use. It is not a substitute for a physician."],
          ["Can I listen instead of read?", "Yes. Every lesson has a narrated version at the top for members. It is a synthetic voice for now; a recorded one is on the list."],
          ["Why is it not free like the rest of the site?", "The reference pages are free because they are reference. This is weeks of writing, reading, and keeping current, and the price is what makes keeping it current possible."],
          ["What if I already know the basics?", "Then modules one and two will still probably change how you buy. If they do not, the refund covers it."],
          ["Where are the full terms?", "On the course terms page: what you are buying, the fourteen-day refund, and the education-only line, in plain English."],
        ].map(([q, a]) => (
          <div key={q} style={{ padding: "10px 0", borderTop: "1px solid " + S.br }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: S.t, marginBottom: 3 }}>{q}</div>
            <div style={{ fontSize: 13, color: S.d, lineHeight: 1.6 }}>{a}</div>
          </div>
        ))}
      </Card>

      <div style={{ textAlign: "center", padding: "20px 0 10px" }}>
        <Link href={lessonUrl(MODULES[0], MODULES[0].lessons[0])} style={{ background: S.ab, border: "1px solid " + S.abr, color: S.a, padding: "12px 22px", borderRadius: 8, fontFamily: S.f, fontSize: 13, fontWeight: 600, display: "inline-block" }}>
          Read the first lesson free →
        </Link>
      </div>
    </div>
  );
}
