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
      <div style={{ marginTop: 10, fontSize: 10, color: S.m, textAlign: "center" }}>
        This AI shares research info only. Not medical advice. Talk to a doctor for personal guidance.
      </div>
    </div>
  );
}
