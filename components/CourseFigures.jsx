/**
 * Course figures: inline SVG diagrams, one per teaching moment.
 *
 * Diagrams rather than photos on purpose. A photo of a vial teaches nothing.
 * A picture of the four tests on a lab report, or the growth hormone pulses
 * next to the steady "bleed", is the thing a reader remembers. All SVG, so
 * they are crisp on every screen, weigh nothing, and match the site's dark
 * palette. Add a figure by adding an entry to FIGURES and a { t: "fig", id }
 * block in a lesson.
 */
import { S } from "@/lib/data";

const T = "#E2E8F0", D = "#94A3B8", M = "#64748B", A = "#5EEAD4", W = "#FCD34D", BG = "#0E1528", CARD = "#141D2F", R = "#F87171", G = "#4ADE80";
const f = "'Outfit',sans-serif";

const txt = (x, y, s, o = {}) => (
  <text x={x} y={y} fill={o.fill || T} fontSize={o.size || 12} fontFamily={f} fontWeight={o.w || 500} textAnchor={o.a || "start"} opacity={o.op || 1}>{s}</text>
);

/* 0.1  A peptide is a message */
function Signal() {
  return (
    <svg viewBox="0 0 640 220" role="img" aria-label="A peptide travels to a cell, fits a receptor, and the cell responds">
      <defs><marker id="arw" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill={A} /></marker></defs>
      {/* peptide chain */}
      {[0,1,2,3,4].map(i => <circle key={i} cx={60 + i * 22} cy={110} r={9} fill={A} opacity={0.9} />)}
      {[0,1,2,3].map(i => <line key={i} x1={69 + i * 22} y1={110} x2={73 + i * 22} y2={110} stroke={A} strokeWidth="3" />)}
      {txt(104, 150, "Peptide", { a: "middle", w: 700 })}
      {txt(104, 168, "a short chain of amino acids", { a: "middle", size: 11, fill: D })}
      {/* arrow */}
      <line x1="180" y1="110" x2="270" y2="110" stroke={A} strokeWidth="2" markerEnd="url(#arw)" />
      {txt(225, 98, "travels", { a: "middle", size: 11, fill: D })}
      {/* cell */}
      <ellipse cx="430" cy="110" rx="150" ry="80" fill={CARD} stroke={M} strokeWidth="1.5" />
      <path d="M282 96 q-14 14 0 28" fill="none" stroke={A} strokeWidth="3" />
      <rect x="284" y="98" width="14" height="24" rx="3" fill={BG} stroke={A} strokeWidth="1.5" />
      {txt(305, 96, "Receptor", { size: 11, w: 700 })}
      {txt(305, 110, "a lock that only", { size: 10, fill: D })}
      {txt(305, 122, "this key fits", { size: 10, fill: D })}
      {txt(430, 104, "Cell", { a: "middle", w: 700, size: 14 })}
      {txt(430, 122, "responds: heal, grow,", { a: "middle", size: 11, fill: D })}
      {txt(430, 136, "burn fat, sleep, calm down", { a: "middle", size: 11, fill: D })}
      {txt(320, 208, "Your body sends thousands of these messages a day. A peptide in a vial is a lab-made copy of one.", { a: "middle", size: 11, fill: M })}
    </svg>
  );
}

/* 1.1  Supply chain */
function SupplyChain() {
  const steps = [
    ["Factory", "makes bulk powder", "mostly in China"],
    ["Bulk", "sold by the gram", "to businesses"],
    ["Vial filling", "contracted out", "tested, or not"],
    ["Brand", "a label and a website", "what you see"],
    ["You", "the only quality", "control left"],
  ];
  return (
    <svg viewBox="0 0 640 170" role="img" aria-label="The peptide supply chain from factory to buyer">
      <defs><marker id="arw2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill={M} /></marker></defs>
      {steps.map((s, i) => {
        const x = 20 + i * 124;
        return (
          <g key={s[0]}>
            <rect x={x} y="40" width="104" height="80" rx="10" fill={i === 4 ? "rgba(94,234,212,.08)" : CARD} stroke={i === 4 ? A : M} strokeWidth="1.5" />
            {txt(x + 52, 66, s[0], { a: "middle", w: 700, size: 13, fill: i === 4 ? A : T })}
            {txt(x + 52, 86, s[1], { a: "middle", size: 10, fill: D })}
            {txt(x + 52, 100, s[2], { a: "middle", size: 10, fill: D })}
            {i < 4 && <line x1={x + 106} y1="80" x2={x + 120} y2="80" stroke={M} strokeWidth="2" markerEnd="url(#arw2)" />}
          </g>
        );
      })}
      {txt(320, 150, "Almost no vendor makes peptides. Every brand is buying the same powder. The difference is testing.", { a: "middle", size: 11, fill: M })}
    </svg>
  );
}

/* 1.2  Anatomy of a lab report */
function CoaAnatomy() {
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label="A certificate of analysis with the four tests that matter highlighted">
      <rect x="30" y="16" width="300" height="298" rx="6" fill="#F8FAFC" />
      <rect x="30" y="16" width="300" height="34" rx="6" fill="#E2E8F0" />
      {txt(46, 38, "CERTIFICATE OF ANALYSIS", { fill: "#0F172A", w: 700, size: 12 })}
      {txt(46, 70, "Lab: Independent Analytical Ltd", { fill: "#0F172A", size: 10, w: 600 })}
      {txt(46, 86, "Sample: BPC-157  5 mg   Lot: 2409-B17", { fill: "#334155", size: 10 })}
      {txt(46, 102, "Date: 12 Aug 2026", { fill: "#334155", size: 10 })}
      <line x1="46" y1="112" x2="314" y2="112" stroke="#CBD5E1" />
      {txt(46, 132, "Purity (HPLC)", { fill: "#0F172A", size: 10, w: 600 })}{txt(300, 132, "98.7%", { fill: "#0F172A", size: 10, a: "end", w: 700 })}
      {txt(46, 152, "Identity (Mass spec)", { fill: "#0F172A", size: 10, w: 600 })}{txt(300, 152, "1419.6 Da  ✓", { fill: "#0F172A", size: 10, a: "end", w: 700 })}
      {txt(46, 172, "Endotoxin (LAL)", { fill: "#0F172A", size: 10, w: 600 })}{txt(300, 172, "< 0.5 EU/mg", { fill: "#0F172A", size: 10, a: "end", w: 700 })}
      {txt(46, 192, "Sterility", { fill: "#0F172A", size: 10, w: 600 })}{txt(300, 192, "not claimed", { fill: "#64748B", size: 10, a: "end" })}
      {/* chromatogram */}
      <rect x="46" y="206" width="268" height="90" fill="#FFFFFF" stroke="#CBD5E1" />
      <polyline points="50,290 90,290 110,288 130,289 150,286 165,212 172,290 200,290 220,287 240,289 260,290 300,290" fill="none" stroke="#0F172A" strokeWidth="1.5" />
      {txt(180, 302, "one tall peak = one clean compound", { fill: "#64748B", size: 9, a: "middle" })}
      {/* callouts */}
      {[
        [120, "1  Lab named, and real", "A report with no lab was written by the vendor."],
        [170, "2  Lot matches your vial", "Different lot, different product."],
        [220, "3  All four tests present", "Purity alone is a number for a mystery powder."],
        [270, "4  The graph, not just a number", "A typed 99% with no chart is just typing."],
      ].map(([y, h, s]) => (
        <g key={h}>
          <circle cx="352" cy={y - 4} r="4" fill={A} />
          {txt(366, y, h, { w: 700, size: 12 })}
          {txt(366, y + 16, s, { size: 10, fill: D })}
        </g>
      ))}
      {txt(335, 316, "This one is fine. The next lesson shows how to check it.", { size: 10, fill: M })}
    </svg>
  );
}

/* 2.1  Mixing, six steps */
function Reconstitution() {
  const steps = ["Both vials to room temp", "Swab both stoppers, let dry", "Draw the water", "Run it down the glass, slowly", "Swirl gently. Never shake", "Date it, fridge it"];
  return (
    <svg viewBox="0 0 640 210" role="img" aria-label="Six steps to mix a vial">
      {steps.map((s, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const x = 20 + col * 206, y = 16 + row * 92;
        return (
          <g key={s}>
            <rect x={x} y={y} width="190" height="76" rx="10" fill={CARD} stroke={M} />
            <circle cx={x + 24} cy={y + 24} r="13" fill={A} />
            {txt(x + 24, y + 29, String(i + 1), { a: "middle", fill: "#0B1120", w: 800, size: 13 })}
            {txt(x + 46, y + 29, s, { w: 600, size: 12 })}
            {i === 3 && <g><line x1={x + 60} y1={y + 44} x2={x + 60} y2={y + 66} stroke={A} strokeWidth="2" /><path d={`M${x + 60} ${y + 66} q0 4 6 4`} fill="none" stroke={A} strokeWidth="2" />{txt(x + 74, y + 60, "not onto the powder", { size: 10, fill: D })}</g>}
            {i === 4 && <g>{txt(x + 46, y + 52, "foam = broken peptide", { size: 10, fill: W })}</g>}
            {i === 5 && <g>{txt(x + 46, y + 52, "2 to 8 °C, out of light", { size: 10, fill: D })}</g>}
          </g>
        );
      })}
    </svg>
  );
}

/* 2.2  Syringe units */
function Syringe() {
  return (
    <svg viewBox="0 0 640 190" role="img" aria-label="An insulin syringe marked in units, showing that 10 units is 0.1 millilitres">
      <rect x="60" y="70" width="420" height="40" rx="8" fill={CARD} stroke={M} strokeWidth="1.5" />
      <rect x="60" y="76" width="42" height="28" rx="4" fill={A} opacity="0.85" />
      <rect x="480" y="82" width="90" height="16" fill={M} />
      <rect x="570" y="86" width="50" height="8" fill={D} />
      {[0,10,20,30,40,50,60,70,80,90,100].map(u => {
        const x = 60 + u * 4.2;
        return <g key={u}><line x1={x} y1={u % 50 === 0 ? 56 : 62} x2={x} y2="70" stroke={T} strokeWidth={u % 50 === 0 ? 2 : 1} />{u % 20 === 0 && txt(x, 50, String(u), { a: "middle", size: 10, fill: D })}</g>;
      })}
      {txt(81, 133, "10 units", { a: "middle", w: 700, fill: A })}
      {txt(81, 148, "= 0.1 mL", { a: "middle", size: 11, fill: D })}
      {txt(480, 133, "100 units = 1 mL", { a: "middle", w: 700 })}
      {txt(480, 148, "so millilitres × 100 = units", { a: "middle", size: 11, fill: D })}
      {txt(320, 178, "5 mg vial + 2 mL water = 2.5 mg/mL.  A 250 mcg dose = 0.1 mL = 10 units.", { a: "middle", size: 11, fill: M })}
    </svg>
  );
}

/* 2.4  Injection sites */
function Sites() {
  return (
    <svg viewBox="0 0 640 300" role="img" aria-label="Common injection sites under the skin: belly, outer thigh, back of the upper arm">
      {/* simple torso */}
      <g transform="translate(200,10)">
        <circle cx="120" cy="30" r="22" fill={CARD} stroke={M} />
        <path d="M70 70 q50 -20 100 0 l18 110 q-68 22 -136 0 z" fill={CARD} stroke={M} />
        <path d="M70 70 l-30 90 l16 4 l30 -80" fill={CARD} stroke={M} />
        <path d="M170 70 l30 90 l-16 4 l-30 -80" fill={CARD} stroke={M} />
        <path d="M82 180 l-8 100 l28 0 l14 -96" fill={CARD} stroke={M} />
        <path d="M158 180 l8 100 l-28 0 l-14 -96" fill={CARD} stroke={M} />
        {/* zones */}
        <circle cx="120" cy="132" r="26" fill="rgba(94,234,212,.18)" stroke={A} strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="120" cy="132" r="6" fill={BG} stroke={M} />
        <ellipse cx="60" cy="118" rx="9" ry="20" fill="rgba(94,234,212,.18)" stroke={A} strokeWidth="1.5" strokeDasharray="4 3" />
        <ellipse cx="180" cy="118" rx="9" ry="20" fill="rgba(94,234,212,.18)" stroke={A} strokeWidth="1.5" strokeDasharray="4 3" />
        <ellipse cx="88" cy="230" rx="11" ry="28" fill="rgba(94,234,212,.18)" stroke={A} strokeWidth="1.5" strokeDasharray="4 3" />
        <ellipse cx="152" cy="230" rx="11" ry="28" fill="rgba(94,234,212,.18)" stroke={A} strokeWidth="1.5" strokeDasharray="4 3" />
      </g>
      {txt(40, 60, "Belly", { w: 700, fill: A })}
      {txt(40, 78, "most common. Two inches", { size: 11, fill: D })}
      {txt(40, 92, "or more from the navel", { size: 11, fill: D })}
      {txt(40, 150, "Back of upper arm", { w: 700, fill: A })}
      {txt(40, 168, "harder to reach alone", { size: 11, fill: D })}
      {txt(40, 240, "Outer thigh", { w: 700, fill: A })}
      {txt(40, 258, "easy to see, easy to rotate", { size: 11, fill: D })}
      {txt(470, 60, "Rotate", { w: 700, fill: T })}
      {txt(470, 78, "Same spot twice in a row", { size: 11, fill: D })}
      {txt(470, 92, "builds lumps that absorb", { size: 11, fill: D })}
      {txt(470, 106, "unevenly. Move around", { size: 11, fill: D })}
      {txt(470, 120, "the clock.", { size: 11, fill: D })}
      {txt(470, 170, "Fresh needle", { w: 700, fill: T })}
      {txt(470, 188, "every single time.", { size: 11, fill: D })}
      {txt(470, 202, "29 to 31 gauge, short.", { size: 11, fill: D })}
      {txt(320, 290, "Described, not prescribed. Have a nurse show you once.", { a: "middle", size: 11, fill: M })}
    </svg>
  );
}

/* 3.1  Evidence ladder */
function EvidenceLadder() {
  const rows = [
    ["A", "Approved medicine, big trials", "semaglutide, tesamorelin, thymosin alpha-1", G],
    ["B", "Tested in people, not approved for this", "ipamorelin, sermorelin for aging, PT-141 in men", A],
    ["C", "Animals and cells only", "BPC-157, TB-500, GHK-Cu injected, epithalon", W],
    ["D", "Stories and vendor copy", "most of what you read online", R],
  ];
  return (
    <svg viewBox="0 0 640 210" role="img" aria-label="Evidence grades A to D with examples">
      {rows.map((r, i) => {
        const y = 14 + i * 48;
        return (
          <g key={r[0]}>
            <rect x="20" y={y} width="600" height="40" rx="8" fill={CARD} stroke={M} />
            <rect x="20" y={y} width="44" height="40" rx="8" fill={r[3]} opacity="0.9" />
            {txt(42, y + 27, r[0], { a: "middle", fill: "#0B1120", w: 800, size: 18 })}
            {txt(78, y + 18, r[1], { w: 700, size: 12 })}
            {txt(78, y + 33, r[2], { size: 10, fill: D })}
          </g>
        );
      })}
    </svg>
  );
}

/* 3.3  Pulses vs bleed */
function Pulses() {
  const pulse = (x0) => `M${x0} 120 q4 -70 8 0`;
  return (
    <svg viewBox="0 0 640 220" role="img" aria-label="Natural growth hormone pulses compared with a steady elevation">
      <line x1="40" y1="120" x2="300" y2="120" stroke={M} />
      <line x1="340" y1="120" x2="600" y2="120" stroke={M} />
      {txt(170, 22, "Natural, and short-acting peptides", { a: "middle", w: 700 })}
      {txt(470, 22, "CJC-1295 with DAC", { a: "middle", w: 700 })}
      {[60, 110, 160, 210, 260].map(x => <path key={x} d={pulse(x)} fill="none" stroke={A} strokeWidth="2.5" />)}
      <path d="M60 120 q6 -30 10 -32 l200 0" fill="none" stroke={A} strokeWidth="2.5" />
      {txt(170, 140, "bursts, biggest in early sleep", { a: "middle", size: 11, fill: D })}
      {txt(470, 140, "raised for about a week per dose", { a: "middle", size: 11, fill: D })}
      {txt(170, 158, "closer to how the body works", { a: "middle", size: 11, fill: D })}
      {txt(470, 158, "convenient; people call it a \"bleed\"", { a: "middle", size: 11, fill: D })}
      {txt(40, 200, "time →", { size: 10, fill: M })}
      {txt(340, 200, "time →", { size: 10, fill: M })}
    </svg>
  );
}

/* 3.4  GLP-1 staircase */
function Titration() {
  const steps = [["0.25", 1], ["0.5", 2], ["1.0", 3], ["1.7", 4], ["2.4", 5]];
  return (
    <svg viewBox="0 0 640 220" role="img" aria-label="Semaglutide dose steps: each held at least four weeks">
      <line x1="60" y1="180" x2="600" y2="180" stroke={M} />
      {steps.map(([d, n], i) => {
        const x = 60 + i * 108, h = 24 * n;
        return (
          <g key={d}>
            <rect x={x} y={180 - h} width="100" height={h} fill={i === 4 ? A : "rgba(94,234,212,.35)"} />
            {txt(x + 50, 172 - h, `${d} mg`, { a: "middle", w: 700, size: 12 })}
            {txt(x + 50, 198, "4+ weeks", { a: "middle", size: 10, fill: D })}
          </g>
        );
      })}
      {txt(320, 22, "The approved semaglutide schedule. The steps are the safety mechanism.", { a: "middle", size: 12, w: 600 })}
      {txt(320, 40, "Skipping a step is where most of the vomiting comes from.", { a: "middle", size: 11, fill: W })}
    </svg>
  );
}

/* 4.1  One variable */
function OneVariable() {
  return (
    <svg viewBox="0 0 640 220" role="img" aria-label="Changing one thing at a time versus three at once">
      {txt(160, 24, "One at a time", { a: "middle", w: 700, fill: G })}
      {txt(480, 24, "Three at once", { a: "middle", w: 700, fill: R })}
      {[["Peptide A", 40], ["judge it", 90], ["Peptide B", 140]].map(([l, y], i) => (
        <g key={l}><rect x="40" y={y} width="240" height="34" rx="8" fill={CARD} stroke={i === 1 ? A : M} />{txt(160, y + 22, l, { a: "middle", size: 12, w: i === 1 ? 700 : 500, fill: i === 1 ? A : T })}</g>
      ))}
      {txt(160, 200, "you learn what each one does", { a: "middle", size: 11, fill: D })}
      <rect x="360" y="40" width="240" height="134" rx="8" fill={CARD} stroke={R} />
      {txt(480, 74, "Peptide A + B + C", { a: "middle", w: 700 })}
      {txt(480, 96, "+ new training plan", { a: "middle", size: 11, fill: D })}
      {txt(480, 112, "+ new diet", { a: "middle", size: 11, fill: D })}
      {txt(480, 146, "felt different a month later", { a: "middle", size: 11, fill: D })}
      {txt(480, 200, "you learn nothing", { a: "middle", size: 11, fill: R })}
    </svg>
  );
}

/* 5.1  Timelines */
function Timeline() {
  const bands = [
    ["Hours to days", "nasal brain peptides · PT-141 · sleep changes on GH peptides · appetite drop on GLP-1s", 20],
    ["Weeks", "recovery peptides · weight coming off · gut peptides", 70],
    ["Months", "body composition on GH peptides · GHK-Cu cream · tesamorelin belly fat", 120],
    ["Never, measurably", "epithalon · pinealon · MOTS-c · injected NAD+", 170],
  ];
  return (
    <svg viewBox="0 0 640 220" role="img" aria-label="When effects show up, from hours to never">
      {bands.map(([h, s, y], i) => (
        <g key={h}>
          <rect x="20" y={y} width="600" height="40" rx="8" fill={CARD} stroke={i === 3 ? W : M} />
          {txt(34, y + 17, h, { w: 700, size: 12, fill: i === 3 ? W : A })}
          {txt(34, y + 32, s, { size: 10, fill: D })}
        </g>
      ))}
    </svg>
  );
}

/* 5.2  Triage */
function Triage() {
  const cols = [
    ["Expected, fading", "injection-spot bump · early nausea · vivid dreams", G, "keep going"],
    ["Stop and rethink", "puffy hands · vomiting · dizziness · a changing mole", W, "usually the dose"],
    ["A doctor, today", "severe belly pain · chest pain · allergic reaction · infection", R, "not a peptide question"],
  ];
  return (
    <svg viewBox="0 0 640 200" role="img" aria-label="Side effects sorted into three groups">
      {cols.map((c, i) => {
        const x = 20 + i * 204;
        return (
          <g key={c[0]}>
            <rect x={x} y="16" width="192" height="160" rx="10" fill={CARD} stroke={c[2]} strokeWidth="1.5" />
            <circle cx={x + 24} cy="40" r="8" fill={c[2]} />
            {txt(x + 40, 45, c[0], { w: 700, size: 13 })}
            {c[1].split(" · ").map((s, j) => txt(x + 16, 76 + j * 18, "• " + s, { size: 11, fill: D }))}
            {txt(x + 16, 162, c[3], { size: 11, fill: c[2], w: 700 })}
          </g>
        );
      })}
    </svg>
  );
}

export const FIGURES = {
  signal: Signal,
  "supply-chain": SupplyChain,
  "coa-anatomy": CoaAnatomy,
  reconstitution: Reconstitution,
  syringe: Syringe,
  sites: Sites,
  "evidence-ladder": EvidenceLadder,
  pulses: Pulses,
  titration: Titration,
  "one-variable": OneVariable,
  timeline: Timeline,
  triage: Triage,
};

export function Figure({ id, caption }) {
  const F = FIGURES[id];
  if (!F) return null;
  return (
    <figure style={{ margin: "22px 0", padding: "14px 14px 10px", background: S.surf, border: "1px solid " + S.br, borderRadius: 12 }}>
      <div style={{ width: "100%" }}><F /></div>
      {caption && <figcaption style={{ fontSize: 12, color: S.m, marginTop: 8, lineHeight: 1.5 }}>{caption}</figcaption>}
    </figure>
  );
}
