/**
 * Extra, page-specific content for the free reference pages.
 *
 * Why this exists: Search Console showed 38 reference pages "discovered,
 * currently not indexed." The pages returned 200, had no noindex, and were in
 * the sitemap; Google simply judged them thin (94 to 284 words of templated
 * text). The fix is real, page-specific content: an at-a-glance card drawn
 * from the course, a set of questions answered in words specific to each
 * compound, and a written introduction for every concern and stack page.
 */
import { MODULE_3 } from "./course-m3";
import { HALF_LIVES } from "./data";

/* ---------- at-a-glance cards, pulled from the course so the two never drift ---------- */
const norm = (s) => String(s).toLowerCase().replace(/\(.*?\)/g, "").replace(/^the /, "").replace(/\bblend\b/g, "").replace(/\bno dac\b/, "without dac").replace(/[^a-z0-9]+/g, " ").trim();
const CARDS = {};
for (const l of MODULE_3.lessons) for (const b of l.body || []) if (b.t === "card") CARDS[norm(b.name)] = { ...b, lesson: l.slug };
export function cardForName(name) {
  return CARDS[norm(name)] || null;
}

/* ---------- approval status, in one sentence each, for the FAQ ---------- */
const APPROVAL = {
  semaglutide: "Yes. Semaglutide is FDA-approved as Ozempic (diabetes) and Wegovy (weight). The research-chemical version is the same molecule without the manufacturing checks or a prescriber.",
  tirzepatide: "Yes. Tirzepatide is FDA-approved as Mounjaro (diabetes) and Zepbound (weight). The research-chemical version is the same molecule without the manufacturing checks or a prescriber.",
  tesamorelin: "Yes, for one use: reducing belly fat in people with HIV-related fat buildup. Every other use is off-label.",
  sermorelin: "It was, in 1997, for children who do not make enough growth hormone, and was later withdrawn for business reasons rather than safety. Compounding pharmacies can still supply it with a prescription.",
  pt141: "Yes, as Vyleesi, for low sexual desire in premenopausal women. Use in men is off-label.",
  mt1: "Yes, as a slow-release implant called Scenesse, for a rare genetic condition that makes sunlight painful. The injected powder sold for tanning has no approval.",
  ss31: "Yes, as of 2025, for Barth syndrome, a rare inherited mitochondrial disease. Its use for general aging or performance is unproven.",
  ta1: "Not in the United States, but it is an approved medicine in more than thirty other countries, mainly for hepatitis B and C.",
  cerebrolysin: "Not in the United States. It is prescribed in hospitals across Europe and Asia for stroke, brain injury and dementia, with mixed trial results.",
  selank: "Not in the United States. It is an approved anti-anxiety medicine in Russia, as a nasal solution.",
  semax: "Not in the United States. It is approved in Russia for stroke recovery and cognitive complaints.",
  retatrutide: "Not yet. It is in final-stage trials and has no approved dose anywhere. Anyone using it outside a trial is doing the trial's job without the monitoring.",
  aod9604: "No. Its developer ran human weight-loss trials in the 2000s that failed, and it was dropped. A later food-safety designation is not approval.",
  nad: "It is not a drug in the usual sense; it is a molecule every cell makes. Injected and infused NAD+ is sold by clinics with very little controlled evidence behind it.",
  glutathione: "It is a natural antioxidant rather than a drug. IV and injected glutathione have drawn regulator warnings in several countries over skin-lightening use.",
};
const DEFAULT_APPROVAL = (name) => `No. ${name} is not approved for human use anywhere. It is sold as a research chemical, which means no manufacturing standard, no batch recall and no one to report a problem to. The only quality control is the buyer's own.`;

/* ---------- per-peptide questions, answered from the data ---------- */
export function faqFor(p) {
  const card = cardForName(p.name);
  const half = HALF_LIVES[p.key];
  const out = [
    {
      q: `What is ${p.name} used for?`,
      a: `Researchers have studied ${p.name} for ${p.areas.slice(0, 3).map((x) => x.toLowerCase()).join(", ")}${p.areas.length > 3 ? ", and more" : ""}. In plain terms: ${p.plain}`,
    },
    { q: `Is ${p.name} FDA-approved?`, a: APPROVAL[p.key] || DEFAULT_APPROVAL(p.name) },
  ];
  if (card) {
    out.push({
      q: `How is ${p.name} usually taken?`,
      a: `The commonly reported pattern is ${card.route.charAt(0).toLowerCase() + card.route.slice(1)}, ${card.often.charAt(0).toLowerCase() + card.often.slice(1)}, for ${card.length.charAt(0).toLowerCase() + card.length.slice(1)}. That describes reported practice from trials and the community. It is not a recommendation for anyone, and several of these compounds interact with common medications.`,
    });
    out.push({
      q: `How strong is the evidence for ${p.name}?`,
      a: `Grade ${card.grade} on this site's A-to-D scale. ${card.grade.startsWith("A") ? "A means approved as a medicine somewhere, with large controlled trials behind that use." : card.grade.startsWith("B") ? "B means tested in people, but not approved for the use people buy it for." : card.grade.startsWith("C") ? "C means tested only in animals or cells, so everything about human use is an educated guess." : "D means stories and vendor copy."} ${card.note}`,
    });
    out.push({
      q: `Is ${p.name} banned in drug-tested sport?`,
      a: card.wada === "Banned"
        ? `Yes. ${p.name} is on the World Anti-Doping Agency prohibited list. Anyone who competes in a sport with drug testing, from college athletics to fitness competitions, can fail a test for it.`
        : `It is not specifically listed by the World Anti-Doping Agency, but tested athletes should check the current list and their federation's rules, since related compounds and blends often are.`,
    });
  }
  if (half) {
    out.push({ q: `How long does ${p.name} stay in the body?`, a: `The half-life, the time for half a dose to leave the body, is about ${half}. A short half-life means it wears off fast and is taken more often; a long one means once a week can be enough. Stored as a dry powder it keeps for months in the fridge; once mixed with water it is used within a few weeks.` });
  }
  return out;
}

/* ---------- written introductions for the concern pages ---------- */
export const CONCERN_INTROS = {
  recovery: [
    "Injury recovery is where most people first hear about peptides, usually from a training partner who swears a nagging tendon or a slow-healing pull turned around on one. The two compounds at the center of that story, BPC-157 and TB-500, have a large body of animal research behind them and almost no controlled human trials. That gap matters. It means the reports are real experiences from real people, and it also means nobody has measured how much of the effect is the peptide and how much is time and rest.",
    "If you are here because something is not healing, the order of operations is a diagnosis first. A peptide cannot fix a tear that needs surgery, and it can mask pain that is telling you something. Read the compound pages below for what the research shows, what people report, and who stays away. Then, if you want the full picture on buying a real vial, mixing it, and judging whether it did anything, the course covers recovery peptides in one lesson.",
  ],
  gut: [
    "Gut problems bring a different kind of reader: someone who has tried diets, probiotics and a specialist, and found peptides while looking for anything that has not been tried yet. The compounds studied here, BPC-157 and KPV in particular, are unusual in that some survive stomach acid, which is why oral use exists for them when almost every other peptide has to be injected.",
    "The research is animal work on gut lining repair and inflammation, plus one drug-company trial of a BPC-157 relative for bowel disease that was never taken further. People report symptom relief within two to three weeks, or nothing. Anyone with blood in the stool, unexplained weight loss, or a diagnosed bowel disease belongs with a gastroenterologist first, and that is not a disclaimer, it is the sequence that works.",
  ],
  weight: [
    "Weight loss is the one category where the peptides are mainstream medicine. Semaglutide and tirzepatide are FDA-approved drugs backed by the largest weight-loss trials ever run, with roughly 15 to 21 percent body weight lost over a year and a half at the top doses. Retatrutide is close behind in final trials. That changes what the research-chemical version is: the same molecule, without the manufacturing checks, the prescriber, or the slow ramp-up schedule the trials used to keep people safe.",
    "The compound pages below cover how each one works and what the evidence shows. The things people get wrong are the schedule, skipping dose steps, which is where most of the vomiting comes from, and muscle loss, which is the side effect that matters most to anyone who trains. A prescription route exists for these, and that is the honest recommendation. The course explains the research-market version because people use it either way.",
  ],
  aging: [
    "Anti-aging is the category with the biggest promises and the thinnest evidence. Epithalon, MOTS-c, NAD+ and pinealon are taken for effects on processes measured in years, which means the honest expectation is that you will not feel them working. The one exception is SS-31, which after two decades of trials became an approved drug in 2025 for a rare mitochondrial disease, and remains unproven in healthy people.",
    "None of that means the category is worthless. It means the buyer is placing a small bet on animal data, and should know that is what they are doing. The pages below grade each compound's evidence honestly. If you want one takeaway before reading: the oral NAD+ precursor pills are the cheapest and best-studied option here, and everything injected is a step down in evidence and a step up in cost.",
  ],
  immune: [
    "Immune support has one compound with a real medical record and several with mechanism stories. Thymosin alpha-1 is an approved medicine in more than thirty countries with decades of clinical use and a nearly clean safety profile; it is the one people run through a heavy training block or a bad season with the least worry. LL-37, KPV and glutathione have lab and animal work, and much less in people.",
    "The honest gap is that the trials for the popular use, getting sick less often if you are otherwise healthy, do not exist for any of them. What exists for thymosin alpha-1 is a very good safety record and people extrapolating from it. The compound pages below say which is which.",
  ],
  brain: [
    "The brain and focus peptides are an odd corner of the market: selank, semax and cerebrolysin are all approved medicines somewhere other than the United States, so real human data exists, in journals and languages most buyers never read. The research market sells them with none of that context. Selank and semax are nasal sprays taken as needed; cerebrolysin is a course of large intramuscular injections and by far the most demanding compound on this site to use.",
    "People report calm without drowsiness from selank, focus and drive from semax, and sharper thinking over a course of cerebrolysin. Tolerance with daily use is common enough that courses stay short. Anyone already on anxiety, depression or ADHD medication is exactly the person whose prescriber needs to know before adding any of these.",
  ],
  skin: [
    "Skin and hair splits into two very different things. GHK-Cu, the copper peptide, has small controlled human trials of creams showing firmer skin and shallower wrinkles, which is why it appears in real skincare products; the injected version has no human trials and stings badly. The tanning peptides, melanotan 1 and 2, are the compounds on this site with the most concrete documented harm: new and changing moles, and melanoma reported after use, with formal warnings from regulators in several countries.",
    "If you want one rule for this category: the cheapest option, a GHK-Cu cream, is also the one with the evidence. The pages below cover each compound, and the tanning page is worth reading in full before anyone considers it.",
  ],
  sleep: [
    "Sleep and growth hormone go together because the largest natural growth hormone release happens in the first hours of sleep, and the peptides in this category work by making that release bigger. They do not supply growth hormone. They ask the pituitary to release more of what it already makes, which keeps the body's own limits in charge. That is the whole reason people choose them over synthetic growth hormone.",
    "Deeper sleep and vivid dreams are the first thing most people notice, usually within a week. Changes in body composition take months. The catch is blood sugar: growth hormone works against insulin, and anyone who is prediabetic or diabetic notices it first. The pages below cover each compound; the common pattern experienced users land on is a short-acting releasing peptide plus ipamorelin, before bed, on an empty stomach, in blocks of eight to twelve weeks.",
  ],
  sexual: [
    "Sexual health here means two compounds and a tanning peptide with a side effect. PT-141 is FDA-approved as Vyleesi for low sexual desire in premenopausal women, works on desire in the brain rather than on blood flow, and is used off-label by men; nausea is its defining side effect. Kisspeptin sits at the top of the hormone chain that controls testosterone and estrogen, has been used in single doses in fertility research, and has no established use outside a lab. Melanotan 2 raises libido as a side effect of tanning and carries the mole warnings covered on its own page.",
    "For desire, PT-141 is the one with the evidence and the approval. The rest is interesting biology. Anyone with uncontrolled high blood pressure or heart disease stays away from PT-141, because it raises pressure for a few hours after each dose.",
  ],
};

/* ---------- why-these-together notes for the stack pages ---------- */
export const STACK_NOTES = {
  wolverine: "BPC-157 and TB-500 are paired because they are thought to work differently: one on blood vessel growth and local repair signals, the other on helping repair cells move to damaged tissue and calming inflammation there. Each has animal evidence on its own. Neither has human evidence together, and there is no study of the combination at all; its popularity comes from the market, not the science. The practical catch is that the two are normally taken on different schedules, daily for BPC-157 and twice a week for TB-500, so a single blended vial compromises one of them. People who want to learn what works for them run the two separately first, then blend once they know.",
  glow: "The Glow blend adds GHK-Cu, the copper peptide that drives collagen production, to the recovery pair, on the logic that skin repair and tissue repair share pathways. Each part has evidence alone: GHK-Cu as a cream in small human trials, the other two in animals. The combination has none. The thing that trips people up is GHK-Cu's injection sting, which is near universal, and which makes people quit the whole blend over a side effect that belongs to one component. Three compounds in one vial also means three sets of possible side effects and no way to tell which one did what.",
  klow: "Klow is Glow plus KPV, a tiny anti-inflammatory piece of a natural hormone that is studied for gut and skin inflammation in animals. Four peptides in one vial is the point where careful users stop and ask what they are actually trying to fix, because a blend this broad is a way of not deciding. If the goal is gut inflammation, KPV alone is cheap and mild. If the goal is an injury, the recovery pair is the relevant part. The blend is for someone who has already run the parts separately and wants convenience, not for a first purchase.",
  cjcipa: "This is the one pairing on the site with real pharmacology behind it. CJC-1295 without DAC copies the hormone that tells the pituitary to release growth hormone and makes each release bigger; ipamorelin triggers a release through a different door while quieting the hormone that would normally shut it down. Together they produce a bigger natural burst than either alone, in human studies of the individual pieces. It is taken before bed on an empty stomach, because that is when the natural burst is largest and food blunts it, usually in blocks of eight to twelve weeks with IGF-1 and fasting blood sugar checked.",
  tesamipa: "The same logic as the CJC and ipamorelin pairing, with tesamorelin, the only FDA-approved growth hormone releasing peptide, in place of CJC-1295. Tesamorelin's approval is for belly fat in people with HIV-related fat buildup, and it has trial data on liver fat in others, which is why this is sold as the premium version. It is also by far the most expensive compound in the group. The pattern, the timing and the blood-sugar caution are the same as for the standard pairing.",
};
