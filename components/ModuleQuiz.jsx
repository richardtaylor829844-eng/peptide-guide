"use client";
import { useState } from "react";
import { S } from "@/lib/data";

/** Five questions, instant answers, nothing stored. For remembering, not grading. */
export function ModuleQuiz({ title, questions }) {
  const [picked, setPicked] = useState({});
  const answered = Object.keys(picked).length;
  const correct = questions.filter((q, i) => picked[i] === q.answer).length;

  return (
    <section style={{ marginTop: 34, background: S.card, border: "1px solid " + S.abr, borderRadius: 14, padding: "20px 22px" }}>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".12em", color: S.a, marginBottom: 4 }}>QUICK CHECK</div>
      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px", color: S.t }}>{title}</h2>
      <p style={{ fontSize: 12, color: S.m, margin: "0 0 16px" }}>Five questions. Nothing is scored or saved. The point is the explanation under each answer.</p>
      {questions.map((q, i) => {
        const p = picked[i];
        return (
          <div key={i} style={{ padding: "12px 0", borderTop: "1px solid " + S.br }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: S.t, marginBottom: 8 }}>{i + 1}. {q.q}</div>
            <div style={{ display: "grid", gap: 6 }}>
              {q.options.map((o, j) => {
                const chosen = p === j, right = j === q.answer, show = p !== undefined;
                const bg = show && right ? "rgba(74,222,128,.12)" : chosen ? "rgba(248,113,113,.12)" : S.surf;
                const br = show && right ? "#4ADE80" : chosen ? "#F87171" : S.br;
                return (
                  <button key={j} type="button" onClick={() => p === undefined && setPicked({ ...picked, [i]: j })} disabled={show}
                    style={{ textAlign: "left", background: bg, border: "1px solid " + br, color: S.t, padding: "9px 12px", borderRadius: 8, fontFamily: S.f, fontSize: 13, cursor: show ? "default" : "pointer", lineHeight: 1.5 }}>
                    {o}
                  </button>
                );
              })}
            </div>
            {p !== undefined && (
              <div style={{ marginTop: 8, fontSize: 13, color: S.d, lineHeight: 1.6 }}>
                <strong style={{ color: p === q.answer ? "#4ADE80" : S.w }}>{p === q.answer ? "Right." : "Not quite."}</strong> {q.why}
              </div>
            )}
          </div>
        );
      })}
      {answered === questions.length && (
        <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 8, background: S.ab, fontSize: 13, color: S.t }}>
          {correct} of {questions.length}. {correct === questions.length ? "That is the whole module in your head." : "Re-read the ones you missed; the explanation says which lesson."}
        </div>
      )}
    </section>
  );
}
