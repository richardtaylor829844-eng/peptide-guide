"use client";
import { useState } from "react";
import Link from "next/link";
import { S } from "@/lib/data";

/** Pick a goal, get a six-lesson reading order. Beginners freeze at 37 lessons; this is the path. */
export function GoalPicker({ goals, lessons }) {
  const [id, setId] = useState(goals[0].id);
  const goal = goals.find((g) => g.id === id);
  return (
    <div style={{ background: S.card, border: "1px solid " + S.br, borderRadius: 14, padding: "18px 20px" }}>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".12em", color: S.a, marginBottom: 6 }}>WHERE TO START</div>
      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", color: S.t }}>What are you here for?</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {goals.map((g) => (
          <button key={g.id} type="button" onClick={() => setId(g.id)}
            style={{ background: g.id === id ? S.ab : S.surf, border: "1px solid " + (g.id === id ? S.abr : S.br), color: g.id === id ? S.a : S.t, padding: "7px 12px", borderRadius: 999, fontFamily: S.f, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {g.label}
          </button>
        ))}
      </div>
      <p style={{ fontSize: 13, color: S.d, margin: "0 0 10px" }}>{goal.blurb} Read these six, in this order, then branch out.</p>
      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 4 }}>
        {goal.path.map((slug, i) => {
          const l = lessons[slug];
          if (!l) return null;
          return (
            <li key={slug}>
              <Link href={`/course/${slug}`} style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "7px 10px", borderRadius: 8, background: S.surf, fontSize: 13 }}>
                <span style={{ color: S.a, fontWeight: 800, fontSize: 11 }}>{i + 1}</span>
                <span style={{ flex: 1, color: S.t }}>{l.title}</span>
                {l.free && <span style={{ fontSize: 10, color: S.a, background: S.ab, padding: "1px 6px", borderRadius: 4 }}>free</span>}
                <span style={{ fontSize: 11, color: S.m }}>{l.minutes} min</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
