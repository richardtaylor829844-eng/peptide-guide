import { S } from "@/lib/data";

export const metadata = {
  title: "Privacy Policy",
  description: "How Peptide Reference Guide collects, uses, and shares information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", lineHeight: 1.2 }}>Privacy Policy</h1>
      <p style={{ fontSize: 12, color: S.m, marginBottom: 22 }}>Last updated: May 2026</p>
      <div style={{ fontSize: 13, color: S.t, lineHeight: 1.7 }}>
        <p style={{ marginTop: 0 }}>This Privacy Policy describes how Peptide Reference Guide (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;) collects, uses, and shares information when you use this website.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>1. Information we collect</h2>
        <ul style={{ paddingLeft: 20, margin: "4px 0 12px" }}>
          <li style={{ marginBottom: 4 }}><strong>Email address</strong> — when you subscribe to our mailing list.</li>
          <li style={{ marginBottom: 4 }}><strong>Content you submit to the AI chat</strong> — questions or descriptions you type are transmitted to our AI provider to generate responses.</li>
          <li style={{ marginBottom: 4 }}><strong>Local data stored on your device</strong> — disclaimer acknowledgment and stack entries are saved in your browser&apos;s localStorage. This data stays on your device and is not transmitted to us.</li>
          <li style={{ marginBottom: 4 }}><strong>Standard server logs</strong> — our hosting provider automatically records IP addresses, user agents, and timestamps for security and diagnostics.</li>
        </ul>

        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>2. How we use your information</h2>
        <p style={{ marginTop: 0 }}>We use your email address to send research updates, educational content, and occasional commercial offers from partner companies in the peptide, health, and wellness industries.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>3. Sharing with partners</h2>
        <p style={{ marginTop: 0 }}>We may share your email address with commercial partners for marketing purposes. By subscribing, you consent to this sharing. You can withdraw this consent at any time by unsubscribing from any email.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>4. Service providers</h2>
        <p style={{ marginTop: 0 }}>We use third-party services to operate this site, including hosting (Vercel, Cloudflare), email delivery (Formspree), and AI responses (Anthropic). These providers process information on our behalf under their own privacy terms.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>5. Your rights</h2>
        <ul style={{ paddingLeft: 20, margin: "4px 0 12px" }}>
          <li style={{ marginBottom: 4 }}><strong>Unsubscribe:</strong> Every marketing email includes a one-click unsubscribe link.</li>
          <li style={{ marginBottom: 4 }}><strong>Access or delete:</strong> You may request a copy of the personal information we hold about you, or request deletion, by emailing the address below.</li>
          <li style={{ marginBottom: 4 }}><strong>California (CCPA / CPRA):</strong> California residents have the right to know what personal information we collect, to request deletion, and to opt out of sale or sharing.</li>
          <li style={{ marginBottom: 4 }}><strong>EU / UK (GDPR / UK GDPR):</strong> If you are located in the EU or UK, the legal basis for our processing is your consent, which you may withdraw at any time.</li>
        </ul>

        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>6. Children</h2>
        <p style={{ marginTop: 0 }}>This site is not intended for or directed at anyone under 18 years old.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "24px 0 8px", color: S.t }}>7. Contact</h2>
        <p style={{ marginTop: 0, marginBottom: 0 }}>Questions, requests, or complaints can be directed to: <strong style={{ color: S.a }}>privacy@peptidereferenceguide.com</strong></p>
      </div>
    </div>
  );
}
