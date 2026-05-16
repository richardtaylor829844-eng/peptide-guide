import { MyStack } from "@/components/MyStack";

export const metadata = {
  title: "My Stack — Peptide Tracker",
  description: "Track what peptides you're researching, when you last dosed, and when the next dose is due. All data stays on your device.",
  alternates: { canonical: "/my-stack" },
};

export default function MyStackPage() {
  return <MyStack />;
}
