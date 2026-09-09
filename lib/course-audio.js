/**
 * Narration file names are a hash of the lesson and the course token, so the
 * audio for a paid lesson cannot be guessed. The same hash is computed by
 * scripts/audio-text.mjs when the files are generated. Server-side only.
 */
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { join } from "node:path";

export function audioUrlFor(moduleSlug, lessonSlug) {
  const token = process.env.COURSE_COOKIE_TOKEN;
  if (!token) return null;
  const id = createHash("sha1").update(`${moduleSlug}/${lessonSlug}:${token}`).digest("hex").slice(0, 20);
  const file = join(process.cwd(), "public", "course", "audio", `${id}.m4a`);
  return existsSync(file) ? `/course/audio/${id}.m4a` : null;
}
