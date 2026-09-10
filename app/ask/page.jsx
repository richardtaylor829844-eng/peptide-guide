import { Card } from "@/components/Card";
import { AskAI } from "@/components/AskAI";
import { S } from "@/lib/data";

export const metadata = {
  title: "Ask the AI About Peptide Research",
  description: "Describe what you're dealing with and get a plain-English pointer to peptide research relevant to your situation.",
  alternates: { canonical: "/ask" },
};

export default function AskPage() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Ask Our AI</h1>
      <p style={{ color: S.d, fontSize: 14, marginBottom: 16 }}>
        Describe what you are dealing with and I'll point you to the right peptides.
      </p>
      <AskAI />
      <Card href="/course" style={{ marginTop: 14, background: "linear-gradient(135deg,rgba(94,234,212,.12),rgba(56,189,248,.06))", border: "1px solid rgba(94,234,212,.3)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: S.t, marginBottom: 2 }}>Want the whole picture instead of one answer at a time?</div>
        <div style={{ fontSize: 12, color: S.d }}>The Peptide Course puts it in order: buying, mixing, every compound, combining, safety. Six lessons free. <s style={{ color: S.m }}>$79</s> <strong style={{ color: S.a }}>$29</strong> for the first 100. →</div>
      </Card>
      <div style={{ marginTop: 10, fontSize: 10, color: S.m, textAlign: "center" }}>
        This AI shares research info only. Not medical advice. Talk to a doctor for personal guidance.
      </div>
    </div>
  );
}
