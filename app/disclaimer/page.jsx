import { S } from "@/lib/data";

export const metadata = {
  title: "Research-Use Disclaimer",
  description: "All peptides referenced on Peptide Reference Guide are for research use only and are not approved by the FDA for human consumption.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px", lineHeight: 1.2 }}>Research-Use Disclaimer</h1>
      <p style={{ fontSize: 12, color: S.m, marginBottom: 22 }}>Last updated: May 2026</p>
      <div style={{ fontSize: 13, color: S.t, lineHeight: 1.7 }}>
        <p>Peptide Reference Guide presents educational information on peptide compounds based on published research. All peptides referenced on this site are <strong style={{ color: S.w }}>for research use only</strong> — they are not approved by the FDA or any other regulatory body for human consumption, treatment, cure, or diagnosis of any medical condition.</p>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>Not medical advice</h2>
        <p>Content on this site is educational only and is not a substitute for professional medical, clinical, or pharmacological guidance. Nothing here should be interpreted as a recommendation to take any substance. Consult a licensed physician before making decisions related to your health.</p>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>Tools are for organization only</h2>
        <p>The reconstitution calculator, stack tracker, and half-life references are for organizational convenience. They do not constitute medical dosing guidance or clinical advice.</p>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>No guarantee of accuracy</h2>
        <p>Information reflects our interpretation of published literature and may not be current, complete, or accurate. Research on peptide compounds is evolving.</p>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>Limitation of liability</h2>
        <p>You release Peptide Reference Guide, its operators, employees, affiliates, and advertisers from any claims, damages, or injuries arising from your use of this site or any information contained herein.</p>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>Local-law compliance</h2>
        <p>You are responsible for compliance with applicable laws in your jurisdiction. Access from jurisdictions where peptide content is restricted is prohibited.</p>
      </div>
    </div>
  );
}
