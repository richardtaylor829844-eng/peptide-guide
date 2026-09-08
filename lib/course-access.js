/**
 * Course access, server side.
 *
 * Founders get a code. The code is checked once by the unlock route, which
 * sets a long-lived cookie carrying a token that lives only in the environment.
 * Lesson pages compare the cookie against that token. No database, nothing to
 * leak, and swapping in a real purchase flow later means only the unlock route
 * changes.
 *
 * Both values are set in Vercel: COURSE_ACCESS_CODE (what founders type) and
 * COURSE_COOKIE_TOKEN (what the cookie carries). With either missing, nothing
 * unlocks, which is the safe failure.
 */
import { cookies } from "next/headers";

export const ACCESS_COOKIE = "pg-course-access";

export async function hasCourseAccess() {
  const token = process.env.COURSE_COOKIE_TOKEN;
  if (!token) return false;
  const jar = await cookies();
  return jar.get(ACCESS_COOKIE)?.value === token;
}
