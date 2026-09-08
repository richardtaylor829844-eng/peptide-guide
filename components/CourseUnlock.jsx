"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { S } from "@/lib/data";

/** Founder code entry. On success the page re-renders with access. */
export function CourseUnlock() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!code.trim()) { setError("Enter your founder code."); return; }
    setState("busy"); setError("");
    try {
      const r = await fetch("/api/course/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { setState("done"); router.refresh(); return; }
      setError(j.error || "That did not work. Try again.");
      setState("idle");
    } catch {
      setError("Could not reach the server. Try again in a moment.");
      setState("idle");
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
      <input
        value={code}
        onChange={(e) => { setCode(e.target.value); if (error) setError(""); }}
        placeholder="Founder code"
        autoComplete="off"
        aria-label="Founder code"
        style={{ flex: "1 1 180px", background: S.surf, border: "1px solid " + S.br, color: S.t, padding: "10px 12px", borderRadius: 8, fontFamily: S.f, fontSize: 13 }}
      />
      <button
        type="submit"
        disabled={state === "busy"}
        style={{ background: S.ab, border: "1px solid " + S.abr, color: S.a, padding: "10px 16px", borderRadius: 8, fontFamily: S.f, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
      >
        {state === "busy" ? "Checking…" : "Unlock"}
      </button>
      {error && <div style={{ flexBasis: "100%", fontSize: 12, color: S.w }}>{error}</div>}
    </form>
  );
}
