// Dumps every lesson as plain narration text, one file per lesson, named by slug.
// The narration file name is a hash of the slug and the course token, so audio
// URLs cannot be guessed by someone without access.
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { MODULES } from "/private/tmp/claude-501/-Users-richardtaylor-taybin-theme/f67ee058-5889-4b0f-a4fd-66cf8cd17d1a/scratchpad/lib/course.mjs";
const token = process.env.COURSE_COOKIE_TOKEN || "";
const out = process.argv[2];
const clean = (s) => String(s).replace(/\s+/g, " ").replace(/’/g, "'").trim();
let n = 0;
for (const m of MODULES) for (const l of m.lessons) {
  const parts = [`${l.title}.`, clean(l.summary) + "."];
  for (const b of l.body || []) {
    if (b.t === "p" || b.t === "note" || b.t === "warn") parts.push(clean(b.text.replace(/^The evidence:/, "The evidence, grade")));
    else if (b.t === "h") parts.push(clean(b.text) + ".");
    else if (b.t === "list" || b.t === "steps") parts.push(...b.items.map((x, i) => (b.t === "steps" ? `Step ${i + 1}. ` : "") + clean(x)));
  }
  const id = createHash("sha1").update(`${m.slug}/${l.slug}:${token}`).digest("hex").slice(0, 20);
  writeFileSync(`${out}/${id}.txt`, parts.join("\n\n"));
  console.log(`${m.slug}/${l.slug} ${id} ${parts.join(" ").split(" ").length}w`);
  n++;
}
console.log(`${n} lessons`);
