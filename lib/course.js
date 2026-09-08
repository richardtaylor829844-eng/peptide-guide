/**
 * The Peptide Course.
 *
 * Everything the course page and lesson pages render comes from here, so
 * changing a price, a title or a lesson is one edit.
 *
 * The line this course holds, agreed 2026-09-08: it is publishing. It explains
 * how and why each compound is used and what the research shows, to an
 * audience. It never gives one person a plan, never promises an outcome, and
 * never links to a vendor. Lessons are written to that line. Keep them there.
 *
 * Lesson bodies are arrays of blocks:
 *   { t: "p",    text }            paragraph
 *   { t: "h",    text }            sub-heading
 *   { t: "list", items: [] }       bullets
 *   { t: "note", text }            teal callout
 *   { t: "warn", text }            amber callout
 *
 * A module with status "outline" shows its lesson titles and summaries on the
 * course page but has no bodies yet. Fill them in and flip the status.
 */

export const COURSE = {
  name: "The Peptide Course",
  short: "Course",
  tagline: "How peptides are actually sourced, handled, and used. In order, with sources, from someone who has been on the vendor side.",
  founderPrice: 97,
  price: 197,
  membershipPrice: 24,
  /** "presale" shows founder pricing and the reserve form. "live" shows the full price. */
  status: "presale",
  founderSeats: 100,
  eta: "Late fall 2026",
  /** If set, the founder button links straight to checkout. Otherwise it collects an email. */
  checkoutUrl: process.env.NEXT_PUBLIC_COURSE_CHECKOUT_URL || "",
};

export const MODULES = [
  {
    n: 0,
    slug: "start-here",
    title: "Start here",
    summary: "What this course is, what it is not, and how to get the most out of it.",
    status: "ready",
    lessons: [
      {
        slug: "how-to-use-this-course",
        title: "How to use this course",
        minutes: 6,
        free: true,
        summary: "Read it in order once. Then use it as a reference.",
        body: [
          { t: "p", text: "The internet has more peptide information than anyone could read, and almost none of it is in order. A forum post about dosing sits next to a vendor's marketing sits next to a rat study from 2011, and you are left to work out which of them to believe and what to do first." },
          { t: "p", text: "This course is the order. It starts with the decisions that go wrong most expensively, which are made before a vial ever arrives, and it ends with how to keep up once you know the basics. The compounds themselves sit in the middle, because knowing what BPC-157 does is useless if what you bought is not BPC-157." },
          { t: "h", text: "The first time through" },
          { t: "list", items: [
            "Read modules one and two before anything else, even if you already have a vial in the fridge. Sourcing and handling are where most of the money and most of the risk are.",
            "Module three is long. Read the sections for the goals you care about and skim the rest. Every compound is written to the same template so you can compare them.",
            "Modules four and five are the ones people skip and regret. Stacking and expectations are where the second-order mistakes live.",
          ] },
          { t: "h", text: "After that" },
          { t: "p", text: "Come back to it the way you would a manual. Every compound page has the same headings, and the sourcing checklist in module one is meant to be open in another tab when you are looking at a vendor." },
          { t: "note", text: "Founding members get every update to this material for as long as it exists. When a compound's evidence changes, the lesson changes, and you are told what moved." },
        ],
      },
      {
        slug: "the-legal-reality",
        title: "The legal reality, in plain terms",
        minutes: 8,
        free: true,
        summary: "What research-use-only means, what is actually approved, and the line this course holds.",
        body: [
          { t: "p", text: "Almost every compound in this course is sold in the United States as a research chemical, labelled for research use only and not for human consumption. That label is doing legal work for the seller. It is not a description of who buys it." },
          { t: "h", text: "Three categories, not one" },
          { t: "list", items: [
            "Approved drugs. Semaglutide, tirzepatide, tesamorelin and a handful of others are FDA-approved medicines with a prescription route. The same molecule sold as a research chemical is the same molecule with none of the manufacturing oversight.",
            "Compounds with a history in medicine elsewhere. Thymosin alpha-1 is an approved drug in dozens of countries. Cerebrolysin is prescribed across Europe and Asia. Approval somewhere is not approval here, but it does mean human safety data exists.",
            "Everything else. BPC-157, TB-500, GHK-Cu, epithalon and most of the list have animal studies, small human trials at best, and no approved use anywhere. In 2023 the FDA placed several of them, BPC-157 included, in a category that bars compounding pharmacies from making them. The research-chemical market is where they live now.",
          ] },
          { t: "h", text: "What the label means for you" },
          { t: "p", text: "Buying a research chemical is not a crime for most of these compounds, because most are not scheduled. What you lose is every protection a medicine carries: no manufacturing standard, no batch recall, no pharmacist, no adverse-event reporting. Module one exists because the only quality control in this market is the one you do yourself." },
          { t: "h", text: "The line this course holds" },
          { t: "p", text: "This is education. It explains how each compound is used and why, what the research shows, what people report, and what goes wrong. It does not sell peptides, does not link to anyone who does, and does not tell any individual what to take. Members' questions are answered as questions about the material, not as plans for a person. That is not caution for its own sake. It is what lets the course say everything else plainly." },
          { t: "warn", text: "Nothing here replaces a clinician who knows your history. Several of these compounds affect hormones, blood sugar or blood pressure, and interact with common medications. Module five covers when that conversation is not optional." },
        ],
      },
    ],
  },
  {
    n: 1,
    slug: "sourcing",
    title: "Before you buy",
    summary: "The vendor landscape, how to read a certificate of analysis, and the red flags that cost people money.",
    status: "ready",
    lessons: [
      {
        slug: "the-vendor-landscape",
        title: "The vendor landscape",
        minutes: 9,
        free: true,
        summary: "Who actually makes this stuff, who resells it, and why the same vial costs $30 from one site and $90 from another.",
        body: [
          { t: "p", text: "Very few peptide vendors make peptides. The synthesis happens at a small number of contract manufacturers, most of them in China, and everyone downstream is buying bulk powder, having it filled into vials, and putting a label on it. The brand you see is a label and a website. What matters is what is behind it." },
          { t: "h", text: "The four kinds of seller" },
          { t: "list", items: [
            "Bulk manufacturers. They sell by the gram to businesses. They rarely sell to individuals, and when a site claims to be one and sells single vials, it is not.",
            "Established resellers. They buy bulk, contract the vialing, test each batch, and publish the results. The good ones have been around for years and their certificates trace to a named independent lab.",
            "Drop-ship brands. A website, a payment page, and a supplier they have never visited. Their certificate, if there is one, came from the supplier and has never been checked. Most of the market looks like this.",
            "Telehealth and compounding. For the approved compounds, a prescription route exists and it is the only one with a manufacturing standard behind it. For everything else, it does not.",
          ] },
          { t: "h", text: "Why prices vary so much" },
          { t: "p", text: "Bulk peptide is cheap. A vial that retails for $60 can carry a few dollars of actual compound. The price difference between vendors is testing, filling standards, insurance against the payment processor shutting them down, and margin. A very low price is usually a drop-ship brand skipping the first two. A very high one is often a brand rather than a better product." },
          { t: "p", text: "The useful question is never what does it cost. It is what did they test, who tested it, and can I see it. The next lesson is how to read the answer." },
          { t: "note", text: "This course does not recommend vendors and never will. A recommendation is a sale by another name, and the lesson would be out of date the week a supplier changed. What you get instead is the checklist that lets you judge any of them yourself." },
        ],
      },
      {
        slug: "reading-a-certificate-of-analysis",
        title: "Reading a certificate of analysis",
        minutes: 14,
        free: false,
        summary: "Purity, identity, endotoxin, sterility. What each test means, what a real one looks like, and what the numbers do and do not tell you.",
        body: [
          { t: "p", text: "A certificate of analysis, or COA, is a lab report for one batch of one compound. A vendor who cannot show you one has not tested the batch. A vendor who shows you one that does not say what you think it says is more common, and this lesson is about telling the difference." },
          { t: "h", text: "The tests that matter" },
          { t: "list", items: [
            "Purity, by HPLC. High-performance liquid chromatography separates the sample into everything in it and reports what fraction is the target peptide. A result of 98% or above is typical for a well-made batch. Below about 95% you are paying for impurities, and the impurities are usually truncated or mis-folded versions of the same peptide, which do nothing useful.",
            "Identity, by mass spectrometry. HPLC tells you how pure something is. It does not tell you what it is. Mass spec confirms the molecular weight matches the compound on the label. A purity number with no identity test is a purity number for an unknown substance.",
            "Endotoxin. Bacterial residue from manufacturing. It is measured because it causes fever and inflammation when injected. Anything intended for injection should show a low result, and a certificate for injectable material that skips this test skipped the test that matters for safety.",
            "Sterility, where claimed. A sterile-filled vial is tested for microbial growth. Most research-chemical vendors do not claim sterility, which is worth knowing before you assume it.",
          ] },
          { t: "h", text: "What a real certificate looks like" },
          { t: "list", items: [
            "It names the lab, and the lab exists. Independent labs the community has used for years publish their own report formats and, in some cases, let you verify a report number on their site. A certificate that names no lab was produced by the vendor.",
            "It names the batch or lot, and that lot matches the vial in your hand. A certificate for a different lot is a certificate for a different product.",
            "It shows the chromatogram, not just a number. A purity figure with no graph is a typed number.",
            "It is dated. Peptides degrade. A certificate from two years ago describes what the batch was, not what it is.",
          ] },
          { t: "h", text: "What the numbers do not tell you" },
          { t: "p", text: "Purity is a percentage of what is in the vial, not how much is in the vial. A 99% pure vial labelled 5 mg can contain 3 mg. The test for that is net peptide content, and almost nobody runs it. It also does not tell you how the vial was stored between the lab and your door, which is why module two starts with what to do when it arrives." },
          { t: "warn", text: "A certificate can be edited in any image program in five minutes. If a vendor's certificates all look identical, all show 99.x%, and none can be verified with the lab that supposedly issued them, treat them as marketing." },
        ],
      },
      {
        slug: "lot-numbers-and-third-party-testing",
        title: "Lot numbers, third-party testing, and checking for yourself",
        minutes: 8,
        free: false,
        summary: "How to tie a certificate to a vial, why independent testing changed the market, and how to send a sample yourself.",
        body: [
          { t: "p", text: "The lot number on a vial is the only thing connecting it to a test result. Everything in the previous lesson depends on that link, so it is worth understanding what a lot number is and is not." },
          { t: "h", text: "What a lot number tells you" },
          { t: "p", text: "A lot is one filling run of one batch of powder. Every vial from that run shares the number, and one certificate covers all of them. Some vendors encode information in the number itself, such as the strength or the fill date, and once you have seen a few from the same vendor the pattern is usually obvious. A lot number that never changes across months of orders is a vendor who prints one number on everything." },
          { t: "h", text: "Why independent testing matters" },
          { t: "p", text: "Around 2020 the community started paying independent labs to test vials bought at retail, and publishing the results. The effect was immediate. Vendors whose products came back underdosed or wrong lost customers within weeks, and the survivors started publishing per-lot certificates from the same labs. It is the closest thing this market has to a regulator, and it runs on people like you sending in a vial." },
          { t: "h", text: "Testing a vial yourself" },
          { t: "list", items: [
            "The labs that do this publish their prices and accept individual samples. A purity and identity test on one vial costs about what the vial did.",
            "Send an unopened vial from the lot you are asking about. An opened vial tests the handling, not the product.",
            "Ask for HPLC purity and mass spec identity at minimum. Add endotoxin if you care about injection safety, which you should.",
            "Compare the result with the vendor's certificate for the same lot. A small difference is normal. A large one, or a different compound, is the answer.",
          ] },
          { t: "note", text: "The pooled version of this is worth knowing about. Community groups regularly crowdfund tests of popular vendors and publish the results. Reading those before ordering is the single cheapest piece of due diligence there is." },
        ],
      },
      {
        slug: "red-flags-and-scams",
        title: "Red flags, scams, and how people lose money",
        minutes: 10,
        free: false,
        summary: "The patterns that repeat: fake certificates, the payment-processor shuffle, the vanishing vendor, and the underdosed bargain.",
        body: [
          { t: "p", text: "Most losses in this market are not dramatic. Nobody gets poisoned by a bottle of nothing. What happens is that people pay for compound they do not receive, in one of a handful of ways that repeat so reliably they can be listed." },
          { t: "h", text: "The patterns" },
          { t: "list", items: [
            "The certificate that fits everything. One lab report, one purity figure, every product, every month. It was made once.",
            "The payment shuffle. The vendor asks you to pay by wire, crypto, a cash app, or a card page under a different business name. Sometimes that is a legitimate vendor whose processor dropped them. Sometimes it is someone who will not be there next month. Either way you have no chargeback, so the amount at risk should be an amount you can lose.",
            "The launch discount that never ends. Perpetual 40% off means the list price was invented to be discounted from.",
            "The underdosed bargain. The vial is real, the compound is real, and there is half as much of it as the label says. It is the most common failure and the hardest to notice without testing, because a half dose of something that works still does something.",
            "The medical claims. A vendor page that says a compound heals, cures or treats anything is a vendor either ignorant of the law or ignoring it. The FDA writes to sellers over exactly those words, and a vendor with that exposure may not be around to honour an order.",
            "The vanishing act. Domain registered this year, no history anywhere, stock photos, one contact form. It might be new. It is more often a re-skin of a site that burned its last name.",
          ] },
          { t: "h", text: "What people do instead" },
          { t: "list", items: [
            "Order small first. One vial from a new vendor, tested or compared against a known one, before a larger order.",
            "Keep the packaging, the lot number and the certificate together until the vial is finished. If anything is wrong, that is the evidence.",
            "Pay in a way you can reverse when it is available, and treat non-reversible payment as the risk it is.",
            "Read the community test results before every order, not just the first one. Vendors change suppliers.",
          ] },
          { t: "warn", text: "Nothing bought this way carries a recall. If a batch is bad, the only notification you will get is from other buyers, which is one more reason the community testing threads are worth following." },
        ],
      },
      {
        slug: "when-it-arrives",
        title: "When it arrives",
        minutes: 6,
        free: false,
        summary: "The first ten minutes with a package: what to check, what to photograph, and what to put in the fridge.",
        body: [
          { t: "p", text: "The vial is at its most vulnerable between the vendor's fridge and yours. Heat in a delivery truck is the usual damage, and it is invisible. So the first job is not to open anything. It is to record what you received." },
          { t: "h", text: "The check" },
          { t: "list", items: [
            "Photograph the package, the label, and the lot number before anything is opened. If there is a dispute later, this is your side of it.",
            "Match the lot number to the certificate the vendor published. If they do not match, ask before you use it.",
            "Look at the powder. Lyophilized peptide is a white cake or a fine powder at the bottom of the vial. A yellowed, melted-looking or partly dissolved cake has seen heat or moisture.",
            "Check the seal and the stopper. A cracked cap or a stopper that has been punctured is a vial to return.",
          ] },
          { t: "h", text: "Storage before reconstitution" },
          { t: "p", text: "Sealed lyophilized powder is the stable form. Refrigerated, most peptides keep for many months and often longer. Frozen keeps longer still, though repeated freezing and thawing is worse than either. Room temperature for a few days in transit is usually survivable. A summer week in a mailbox often is not." },
          { t: "p", text: "Once water goes in, the clock changes completely, and that is where the next module starts." },
          { t: "note", text: "A simple habit that pays for itself: a label on each vial with the date it arrived and, later, the date it was reconstituted. Memory is not a storage system." },
        ],
      },
    ],
  },
  {
    n: 2,
    slug: "handling",
    title: "Handling it properly",
    summary: "Reconstitution done right, storage and stability, and the mistakes that waste vials.",
    status: "outline",
    lessons: [
      { slug: "reconstitution", title: "Reconstitution, and the mistakes that ruin a vial", minutes: 12, summary: "Bacteriostatic water, the arithmetic, why you run the water down the glass, and what shaking does to a peptide." },
      { slug: "the-math", title: "The math, once, so it never confuses you again", minutes: 8, summary: "Milligrams, millilitres and insulin-syringe units. Worked examples for the common vial sizes." },
      { slug: "storage-and-stability", title: "Storage and stability after mixing", minutes: 7, summary: "What 28 days means, which compounds are fussier than others, and the signs a reconstituted vial has gone off." },
      { slug: "administration-as-practised", title: "How these are administered in practice", minutes: 10, summary: "Subcutaneous injection as it is commonly done, sites, rotation, sterile technique, sharps disposal. Reported practice, not instruction." },
      { slug: "keeping-records", title: "Keeping records", minutes: 5, summary: "A log that lets you tell what changed. The template members use." },
    ],
  },
  {
    n: 3,
    slug: "the-compounds",
    title: "The compounds, by goal",
    summary: "Every compound on the reference site, written to one template: mechanism, evidence, how it is commonly used, what people report, side effects, interactions, who avoids it.",
    status: "outline",
    lessons: [
      { slug: "how-to-read-these-pages", title: "How to read these pages", minutes: 5, summary: "The template, what 'commonly used' means, and how evidence strength is graded throughout." },
      { slug: "recovery-and-repair", title: "Recovery and repair", minutes: 25, summary: "BPC-157, TB-500 and the Wolverine blend. The animal evidence, the human gap, and how they are used together." },
      { slug: "growth-hormone-axis", title: "The growth hormone axis", minutes: 30, summary: "CJC-1295 with and without DAC, ipamorelin, sermorelin, tesamorelin. Pulses versus bleed, timing, and the blood-sugar question." },
      { slug: "metabolic", title: "Metabolic and weight", minutes: 30, summary: "Semaglutide, tirzepatide, retatrutide, AOD-9604. Titration as practised, the muscle-loss conversation, and what changed when compounding was restricted." },
      { slug: "longevity-and-mitochondria", title: "Longevity and mitochondria", minutes: 20, summary: "Epithalon, MOTS-c, NAD+, SS-31, pinealon. Where the evidence is strong, where it is thin, and why cycling is the norm." },
      { slug: "skin-and-hair", title: "Skin, hair and cosmetic", minutes: 15, summary: "GHK-Cu and the Glow and Klow blends. Topical versus injected, and what the copper is doing." },
      { slug: "cognition-and-mood", title: "Cognition and mood", minutes: 18, summary: "Selank, semax, cerebrolysin. The Russian clinical history, nasal versus injected, and what to expect." },
      { slug: "sexual-function", title: "Sexual function", minutes: 12, summary: "PT-141 and kisspeptin. Mechanism, the nausea problem, and timing." },
      { slug: "immune", title: "Immune and inflammation", minutes: 15, summary: "Thymosin alpha-1, LL-37, KPV. Approved elsewhere, studied here, used cautiously." },
      { slug: "tanning", title: "Melanotan 1 and 2", minutes: 10, summary: "What they do, the mole question, and why this is the compound most people are warned off." },
    ],
  },
  {
    n: 4,
    slug: "stacking",
    title: "Building a stack",
    summary: "One variable at a time, what pairs, what conflicts, and how cycling actually works.",
    status: "outline",
    lessons: [
      { slug: "one-variable", title: "One variable at a time", minutes: 8, summary: "Why starting three compounds at once tells you nothing, and the order people use instead." },
      { slug: "what-pairs", title: "What pairs, and why", minutes: 14, summary: "The stacks on the reference site, explained: the mechanism behind each pairing." },
      { slug: "what-conflicts", title: "What conflicts", minutes: 10, summary: "Compounds that compete, overlap or compound each other's side effects." },
      { slug: "cycling", title: "Cycling and timing", minutes: 10, summary: "On and off periods as practised, receptor sensitivity, and the compounds where cycling is not optional." },
      { slug: "tracking", title: "Tracking what happened", minutes: 6, summary: "Markers people track, how often, and what a real change looks like against noise." },
    ],
  },
  {
    n: 5,
    slug: "expectations-and-safety",
    title: "Expectations and safety",
    summary: "Timelines, plateaus, side effects, interactions, and when to stop.",
    status: "outline",
    lessons: [
      { slug: "timelines", title: "What to expect and when", minutes: 10, summary: "Compound by compound: what people notice first, when, and what never shows up." },
      { slug: "side-effects", title: "Side effects, common and rare", minutes: 12, summary: "The ones almost everyone gets, the ones that mean stop, and the ones that mean a clinician today." },
      { slug: "interactions", title: "Interactions with medications", minutes: 12, summary: "Blood sugar, blood pressure, thyroid, anticoagulants, hormones. Where the overlap is real." },
      { slug: "labs", title: "Bloodwork people run", minutes: 8, summary: "Baseline and follow-up markers commonly tracked, and what they are for." },
      { slug: "when-to-stop", title: "When to stop", minutes: 6, summary: "The signals, and the difference between a side effect and a reason." },
    ],
  },
  {
    n: 6,
    slug: "staying-current",
    title: "Staying current",
    summary: "How to read a study, how to filter hype, and how the rules are changing.",
    status: "outline",
    lessons: [
      { slug: "reading-a-study", title: "Reading a study without a science degree", minutes: 12, summary: "Rats versus people, dose scaling, sample size, who funded it, and the abstracts that lie by omission." },
      { slug: "hype-filters", title: "Hype filters", minutes: 8, summary: "The tells in an influencer post, a vendor page, and a forum thread." },
      { slug: "regulation", title: "How the rules are changing", minutes: 10, summary: "The 2023 compounding decision, the GLP-1 shortage and what ended it, and where enforcement is going." },
      { slug: "the-digest", title: "The members' digest", minutes: 4, summary: "How updates reach you, and how to ask a question about the material." },
    ],
  },
];

export const READY_LESSON_COUNT = MODULES.reduce(
  (n, m) => n + m.lessons.filter((l) => l.body).length, 0,
);
export const TOTAL_LESSON_COUNT = MODULES.reduce((n, m) => n + m.lessons.length, 0);
export const TOTAL_MINUTES = MODULES.reduce(
  (n, m) => n + m.lessons.reduce((a, l) => a + (l.minutes || 0), 0), 0,
);

export const moduleBySlug = (slug) => MODULES.find((m) => m.slug === slug);
export const lessonBySlug = (moduleSlug, lessonSlug) => {
  const m = moduleBySlug(moduleSlug);
  if (!m) return null;
  const l = m.lessons.find((x) => x.slug === lessonSlug);
  return l ? { module: m, lesson: l } : null;
};
export const lessonUrl = (m, l) => `/course/${m.slug}/${l.slug}`;

/** Previous and next lesson across module boundaries, for the pager. */
export function neighbours(moduleSlug, lessonSlug) {
  const flat = [];
  for (const m of MODULES) for (const l of m.lessons) flat.push({ m, l });
  const i = flat.findIndex((x) => x.m.slug === moduleSlug && x.l.slug === lessonSlug);
  return { prev: i > 0 ? flat[i - 1] : null, next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : null };
}
