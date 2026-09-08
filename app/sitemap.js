import {
  SITE_URL, PEPTIDE_KEYS, PEPTIDE_SLUGS, STACK_KEYS, STACK_SLUGS, CONCERNS, CONCERN_SLUGS,
} from "@/lib/data";

export default function sitemap() {
  const now = new Date();
  const staticRoutes = [
    { url: SITE_URL + "/", changeFrequency: "weekly", priority: 1.0 },
    { url: SITE_URL + "/peptides", changeFrequency: "weekly", priority: 0.9 },
    { url: SITE_URL + "/concerns", changeFrequency: "weekly", priority: 0.9 },
    { url: SITE_URL + "/stacks", changeFrequency: "weekly", priority: 0.8 },
    { url: SITE_URL + "/course", changeFrequency: "weekly", priority: 0.9 },
    { url: SITE_URL + "/intro", changeFrequency: "monthly", priority: 0.7 },
    { url: SITE_URL + "/calc", changeFrequency: "monthly", priority: 0.6 },
    { url: SITE_URL + "/ask", changeFrequency: "monthly", priority: 0.6 },
    { url: SITE_URL + "/my-stack", changeFrequency: "monthly", priority: 0.5 },
    { url: SITE_URL + "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
    { url: SITE_URL + "/privacy", changeFrequency: "yearly", priority: 0.3 },
  ].map((r) => ({ ...r, lastModified: now }));

  const peptideRoutes = PEPTIDE_KEYS.map((k) => ({
    url: SITE_URL + "/peptides/" + PEPTIDE_SLUGS[k],
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const stackRoutes = STACK_KEYS.map((k) => ({
    url: SITE_URL + "/stacks/" + STACK_SLUGS[k],
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const concernRoutes = CONCERNS.map((c) => ({
    url: SITE_URL + "/concerns/" + CONCERN_SLUGS[c.id],
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...peptideRoutes, ...stackRoutes, ...concernRoutes];
}
