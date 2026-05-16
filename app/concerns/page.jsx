import { Card } from "@/components/Card";
import { CONCERNS, S, concernUrl } from "@/lib/data";

export const metadata = {
  title: "Browse Peptides by Concern",
  description: "Pick what you're dealing with — injury recovery, weight loss, anti-aging, immunity, sleep, brain, skin, or sexual health — and see which peptides researchers have studied for it.",
  alternates: { canonical: "/concerns" },
};

export default function ConcernsIndexPage() {
  return (
    <div>
      <h1 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 4px" }}>Browse by Concern</h1>
      <p style={{ color: S.d, fontSize: 14, marginBottom: 24 }}>
        Pick a category and we'll show you the peptides research has focused on for it.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 12 }}>
        {CONCERNS.map((c) => (
          <Card key={c.id} href={concernUrl(c.id)}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
            <h2 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 4px" }}>{c.label}</h2>
            <p style={{ fontSize: 13, color: S.d, margin: "0 0 10px" }}>{c.sub}</p>
            <div style={{ fontSize: 11, color: S.a }}>{c.peps.length} peptides studied</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
