import Link from "next/link";
import { Card } from "@/components/Card";
import { S } from "@/lib/data";

export const metadata = {
  title: "Peptides, in Plain English",
  description: "What peptides are, why researchers care, and what to know before going further. No jargon.",
  alternates: { canonical: "/intro" },
};

export default function IntroPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <Link href="/" style={{ background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "8px 14px", borderRadius: 8, fontFamily: S.f, fontSize: 12, fontWeight: 500, marginBottom: 20, display: "inline-flex", alignItems: "center", gap: 6 }}>← Home</Link>
      <div style={{ fontSize: 36, marginBottom: 6 }}>📖</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 }}>Peptides, in Plain English</h1>
      <p style={{ fontSize: 14, color: S.d, marginBottom: 26, lineHeight: 1.6 }}>If you've never heard of peptides before, this is for you. No jargon, no marketing, just the basics.</p>

      <Card style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", color: S.t }}>So… what actually <em>is</em> a peptide?</h2>
        <p style={{ fontSize: 14, color: S.t, lineHeight: 1.7, margin: "0 0 10px" }}>A peptide is a short chain of amino acids. Amino acids are the building blocks of protein — the same stuff in chicken, eggs, and the muscles on your own body. When you string a handful of them together, you get a peptide. String hundreds together, you get a protein.</p>
        <p style={{ fontSize: 14, color: S.t, lineHeight: 1.7, margin: "0 0 10px" }}>Your body makes thousands of peptides on its own, every day. Some of them act like <strong style={{ color: S.a }}>tiny text messages</strong> your cells send to each other: "heal this tear," "release more of this hormone," "calm down the inflammation over here," "turn on this gene."</p>
        <p style={{ fontSize: 14, color: S.d, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>Think of peptides as biological signals. Each one tells a specific part of your body to do a specific thing.</p>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", color: S.t }}>Why are researchers interested?</h2>
        <p style={{ fontSize: 14, color: S.t, lineHeight: 1.7, margin: "0 0 10px" }}>Three reasons, mostly:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 10 }}>
          {[
            { t: "They're very specific.", d: "A peptide usually only talks to one type of cell or receptor. That means fewer side effects than a drug that affects your whole system." },
            { t: "Levels drop as you age.", d: "Your body makes less of some key peptides over time — growth hormone releasers, collagen signals, repair molecules. Research looks at whether restoring them helps." },
            { t: "Some already work as medicine.", d: "Semaglutide (Ozempic, Wegovy) is a peptide. Tesamorelin is a peptide. Sermorelin was the first peptide drug approved in the US. These aren't fringe — they're already in use." },
          ].map((p, i) => (
            <div key={i} style={{ padding: "10px 14px", background: S.surf, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: S.t, marginBottom: 3 }}>{p.t}</div>
              <div style={{ fontSize: 12, color: S.d, lineHeight: 1.5 }}>{p.d}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: S.d, lineHeight: 1.6, margin: 0 }}>Scientists are studying peptides for: recovery from injury, weight loss, inflammation, aging, immune function, brain health, hormones, and sexual function.</p>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", color: S.t }}>How are peptides different from drugs?</h2>
        <p style={{ fontSize: 14, color: S.t, lineHeight: 1.7, margin: "0 0 10px" }}>Most pharmaceutical drugs are tiny synthetic chemicals that bind to many things in the body at once — which is why they tend to have long side-effect lists. Peptides, by contrast, usually <strong>mimic molecules your body already recognizes</strong>. That makes them more targeted.</p>
        <p style={{ fontSize: 14, color: S.t, lineHeight: 1.7, margin: "0 0 10px" }}>The tradeoff: your stomach breaks peptides down before they can work, so they almost always have to be <strong>injected</strong> (usually under the skin, like insulin). Some nasal sprays exist, and oral versions are being developed, but most research peptides are subcutaneous injections.</p>
        <p style={{ fontSize: 14, color: S.d, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>Short version: peptides work with your body's own signaling, rather than forcing it.</p>
      </Card>

      <Card style={{ background: "rgba(94,234,212,.04)", border: "1px solid " + S.abr, marginBottom: 14 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", color: S.a }}>A few things worth knowing</h2>
        <p style={{ fontSize: 13, color: S.t, lineHeight: 1.7, margin: "0 0 10px" }}>Four quick orientation points to help you get the most out of the research on this site:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            "Peptide research is one of the most actively studied areas in medicine right now. A handful (like Semaglutide and Tesamorelin) have full FDA approval. Many others are still in research and are backed by years of published studies you can read yourself.",
            "Supplier quality is the one variable you fully control. Research-grade labs that run independent third-party testing and publish Certificates of Analysis are easy to identify once you know what to look for. The home page has a checklist you can use.",
            "The science keeps getting better. Each peptide page here shows the published studies behind it and the year they came out, so you can see for yourself how active and current the research is.",
            "This site is a great starting point. For personal decisions, a licensed clinician who knows your health history is the ideal next step: they can connect the research you've learned about here to your specific situation.",
          ].map((item, i) => (
            <div key={i} style={{ fontSize: 13, color: S.d, lineHeight: 1.6, display: "flex", gap: 8 }}>
              <span style={{ color: S.a, flexShrink: 0, fontWeight: 700 }}>✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
        <Link href="/concerns" style={{ background: "linear-gradient(135deg,#5EEAD4,#38BDF8)", color: "#0B1120", padding: "12px 22px", borderRadius: 8, fontFamily: S.f, fontSize: 13, fontWeight: 700 }}>Browse peptides by concern →</Link>
        <Link href="/peptides" style={{ background: S.ab, border: "1px solid " + S.abr, color: S.a, padding: "12px 22px", borderRadius: 8, fontFamily: S.f, fontSize: 13, fontWeight: 600 }}>See all peptides</Link>
      </div>
    </div>
  );
}
