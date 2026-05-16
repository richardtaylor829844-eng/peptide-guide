import { Calc } from "@/components/Calc";
import { S } from "@/lib/data";

export const metadata = {
  title: "Reconstitution Calculator",
  description: "Calculate the right peptide reconstitution: concentration, draw volume per dose, and number of doses per vial. For research reference only.",
  alternates: { canonical: "/calc" },
};

export default function CalcPage() {
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Reconstitution Calculator</h1>
      <p style={{ color: S.d, fontSize: 14, marginBottom: 16 }}>
        Figure out your concentration and volume per dose.
      </p>
      <Calc />
    </div>
  );
}
