/**
 * Course extras: module quizzes, printable checklists, goal paths, and the
 * seed for the members' Q&A. All plain data, edited here.
 *
 * Quizzes are for remembering, not grading. Nothing is stored. Each answer
 * comes with a one-line "why", because the why is the lesson.
 */

export const QUIZZES = {
  "start-here": [
    { q: "What is a peptide, in the plainest terms?", options: ["A type of steroid", "A short chain of amino acids that acts as a signal in the body", "A vitamin", "A kind of protein powder"], answer: 1, why: "A peptide is a message. Your body makes thousands a day. The ones in vials are lab-made copies of those signals." },
    { q: "What does \"research use only\" on a vial actually mean?", options: ["It has been tested on people", "It is FDA-approved", "The seller is not allowed to say it is for people", "It is illegal to own"], answer: 2, why: "The label protects the seller. It says nothing about who buys it, and nothing about quality." },
    { q: "Which of these peptides is an FDA-approved medicine?", options: ["BPC-157", "Semaglutide", "Epithalon", "TB-500"], answer: 1, why: "Semaglutide is the drug in Ozempic and Wegovy. BPC-157, epithalon and TB-500 are not approved anywhere." },
    { q: "If you compete in a drug-tested sport, which peptides are banned?", options: ["Only the growth hormone ones", "Only the weight-loss ones", "Nearly every peptide in this course", "None of them"], answer: 2, why: "WADA bans almost all of them, including the recovery peptides people think of as harmless." },
    { q: "Why does the course cover buying and handling before the peptides themselves?", options: ["Because those lessons are shorter", "Because knowing what a peptide does is useless if the vial isn't really that peptide", "Because the peptides are less important", "Because vendors asked for it"], answer: 1, why: "Most money and most risk sit in the decisions made before anything arrives." },
  ],
  sourcing: [
    { q: "How many peptide vendors actually manufacture peptides?", options: ["Most of them", "About half", "Almost none", "All of them"], answer: 2, why: "Manufacturing happens at a small number of factories. Everyone else buys powder and puts a label on it." },
    { q: "A lab report shows 99% purity and nothing else. What is missing?", options: ["Nothing, that is enough", "An identity test proving what the powder is", "The vendor's logo", "A photo of the vial"], answer: 1, why: "Purity says how pure something is, not what it is. Without an identity test it is a purity number for a mystery powder." },
    { q: "What connects a vial in your hand to a lab report?", options: ["The brand name", "The price", "The lot number", "The color of the cap"], answer: 2, why: "One lot is one filling run. The report covers that lot. No matching lot number, no proof." },
    { q: "A vendor only accepts crypto or wire transfer. What does that tell you?", options: ["They are more trustworthy", "You will not be able to dispute the charge, so only risk what you can lose", "Their prices are lower", "They are a manufacturer"], answer: 1, why: "Sometimes it is a legitimate vendor dropped by their processor. Sometimes not. Either way the money is unrecoverable." },
    { q: "The first thing to do when a package arrives is:", options: ["Mix it immediately", "Put it in the freezer", "Photograph the package, label and lot number before opening anything", "Throw away the box"], answer: 2, why: "If there is a dispute later, those photos are your side of it." },
  ],
  handling: [
    { q: "What do people mix peptides with?", options: ["Tap water", "Distilled water from the store", "Bacteriostatic water", "Saline, always"], answer: 2, why: "Bacteriostatic water has a small amount of preservative so a vial used over weeks does not grow germs." },
    { q: "Why must you never shake a mixed vial?", options: ["It makes it too cold", "Foam makes the peptide chains unfold and clump, and clumps do nothing", "It changes the color", "It is fine to shake it"], answer: 1, why: "Swirl, never shake. If it foams, leave it in the fridge until the foam is gone." },
    { q: "On a standard insulin syringe, 10 units equals how much?", options: ["1 mL", "0.5 mL", "0.1 mL", "0.01 mL"], answer: 2, why: "100 units is 1 mL, so milliliters times 100 equals units. 0.1 mL is 10 units." },
    { q: "Where does the \"28 days\" rule come from?", options: ["How long peptides last", "The pharmacy rule for how long an opened multi-use vial with preservative stays safe from germs", "A vendor recommendation", "The FDA"], answer: 1, why: "It is a germ limit for the container, not a chemistry fact about the peptide." },
    { q: "Why keep a log?", options: ["To impress the vendor", "So you can tell what actually changed, and have evidence if a batch is bad", "It is required by law", "To track spending"], answer: 1, why: "If you change three things at once and write none down, you learn nothing." },
  ],
  "the-compounds": [
    { q: "What does an evidence grade of C mean?", options: ["Approved medicine", "Tested in people but not approved", "Tested only in animals or cells", "Made up"], answer: 2, why: "Most of the market is grade C. Everything about human use is an educated guess." },
    { q: "Why does the semaglutide dose start low and step up over months?", options: ["To save money", "Because the stomach side effects depend on the dose and the body needs time to adjust", "Because the vials are small", "No reason"], answer: 1, why: "Skipping steps is where most of the vomiting comes from." },
    { q: "What do the growth hormone peptides actually do?", options: ["Give you growth hormone directly", "Ask your own pituitary to release more of what it already makes", "Block growth hormone", "Raise testosterone"], answer: 1, why: "That is why people choose them over synthetic growth hormone: the body's own limits stay in charge." },
    { q: "The most common side effect of the growth hormone peptides is:", options: ["Hair loss", "Water retention and tingling hands, a sign of too much", "Insomnia", "Weight gain"], answer: 1, why: "Puffy or tingling hands are the classic sign the dose is higher than needed." },
    { q: "Which peptide in this module has the most concrete documented harm?", options: ["Thymosin alpha-1", "Ipamorelin", "Melanotan 2", "KPV"], answer: 2, why: "New and changing moles, and melanoma reported after use. Regulators in several countries have issued warnings." },
  ],
  stacking: [
    { q: "How many new things should you change at once?", options: ["As many as you like", "One", "Two", "Three"], answer: 1, why: "One at a time, held long enough to judge, everything else steady. Otherwise you cannot tell what did what." },
    { q: "Which pairing has real pharmacology behind it?", options: ["Two weight-loss peptides", "A releasing peptide plus ipamorelin", "Melanotan 2 plus PT-141", "Any blend"], answer: 1, why: "They trigger growth hormone through two different doors, and together produce a bigger burst than either alone." },
    { q: "A blend is best used:", options: ["First, to save time", "After you have run each part separately and know it works for you", "Never", "Only for beginners"], answer: 1, why: "A blend is a conclusion, not a starting point." },
    { q: "Why do people take breaks from the growth hormone peptides?", options: ["Superstition", "The body adapts and bursts get smaller; breaks restore them", "They are expensive", "The FDA requires it"], answer: 1, why: "This is one of the few places cycling has a real mechanism." },
    { q: "The most honest measure an athlete has of whether something worked is:", options: ["How they feel the next morning", "The same lift, run or interval, logged the same way over weeks", "A forum post", "Their weight that day"], answer: 1, why: "It lasts, it fits the timeline, and it survives stopping. Daily feelings are noise." },
  ],
  "expectations-and-safety": [
    { q: "A recovery peptide has shown nothing after six weeks. The usual conclusion is:", options: ["Double the dose", "Wait six more months", "It did nothing. Write it down and stop", "Add two more peptides"], answer: 2, why: "A result is a result. Judge a peptide inside its window, then act on what you saw." },
    { q: "Puffy, tingling hands on a growth hormone peptide belong in which group?", options: ["Expected and fading", "Stop and rethink, usually the dose", "A doctor today", "Not a side effect"], answer: 1, why: "It is the classic sign of too much. Lower the dose; if it comes back, the peptide is wrong for you." },
    { q: "Severe, lasting belly pain on a weight-loss peptide means:", options: ["Take it with food", "A doctor, today", "Wait a week", "Lower the dose"], answer: 1, why: "Pancreatitis and gallbladder problems show up this way. That is not a peptide question any more." },
    { q: "Which two bloodwork markers matter most on the growth hormone peptides?", options: ["Iron and vitamin D", "IGF-1 and fasting blood sugar", "Cholesterol and liver enzymes", "Testosterone and estrogen"], answer: 1, why: "IGF-1 rising is the effect. Blood sugar rising is the cost." },
    { q: "The best time to decide what would make you stop is:", options: ["When it happens", "Before you start, written at the top of the log", "After a month", "Never"], answer: 1, why: "It is much easier to follow a rule you made calm than to make one mid-course." },
  ],
  "staying-current": [
    { q: "A study showed a peptide healed tendons. It was done in rats. What grade is that?", options: ["A", "B", "C", "D"], answer: 2, why: "Animal results do not transfer to people reliably. It is a hint, not proof." },
    { q: "The first question to ask about any study is:", options: ["Who published it", "Who was it in: cells, animals, or people", "How long the paper is", "Whether it has a graph"], answer: 1, why: "Most peptide studies are in cells or animals, and that changes everything about what they mean." },
    { q: "An influencer posts a transformation and names one peptide. The tell is:", options: ["The lighting", "Nothing else is mentioned: no diet, no training, no other drugs", "The caption length", "The music"], answer: 1, why: "The peptide is the sponsor, not the cause." },
    { q: "What did the FDA do in 2023?", options: ["Approved BPC-157", "Blocked compounding pharmacies from making several popular peptides", "Banned all peptides", "Nothing"], answer: 1, why: "The reason given was lack of human safety data. It pushed demand toward the research market." },
    { q: "In one line, the hype filter is:", options: ["Trust nobody", "Who benefits if I believe this, and what would they have to show me for it to be true?", "Only trust doctors", "Only trust forums"], answer: 1, why: "A source that benefits and cannot show anything is marketing, however it is dressed." },
  ],
};

export const CHECKLISTS = {
  "start-here": { title: "Before you start", free: true, items: [
    "I know what a peptide is: a lab-made copy of a signal my body already uses.",
    "I know that \"research use only\" describes the seller's legal position, not the product's quality.",
    "I know which peptides are approved medicines and which have only animal studies.",
    "If I compete in a tested sport, I have checked the WADA list. Almost everything here is on it.",
    "I have a clinician I can talk to, and I know which of my medications or conditions overlap with peptides (module five).",
    "I have decided, in writing, what would make me stop.",
  ] },
  sourcing: { title: "Before you buy: the vendor check", free: true, items: [
    "The vendor publishes a lab report (COA) for the exact batch I am buying.",
    "The report names a real, independent lab, and I can verify it with that lab.",
    "The report shows purity (HPLC) with the graph, not just a number.",
    "The report shows an identity test (mass spec) confirming what the powder is.",
    "The report shows an endotoxin result, since this is for injection.",
    "The report is dated within the last several months.",
    "The lot number on the report will match the lot number on the vial.",
    "Community test results for this vendor exist, and they are recent and clean.",
    "The website makes no medical claims (no \"heals,\" \"treats,\" \"cures\").",
    "The vendor has a history longer than this year.",
    "I can pay in a way I can dispute. If not, I am only sending what I can afford to lose.",
    "First order is small. One vial, checked, before anything bigger.",
  ] },
  handling: { title: "Mixing and handling", free: false, items: [
    "Bacteriostatic water, not tap, distilled, or plain sterile water.",
    "Both vials at room temperature. Both stoppers swabbed and dry.",
    "Water run slowly down the inside of the glass, never onto the powder.",
    "Swirled gently. Never shaken.",
    "Not overfilled: about 2 mL maximum in a 3 mL vial.",
    "The math done once and written on the label: mg ÷ mL = strength; dose ÷ strength = mL; mL × 100 = units.",
    "Label carries the mix date and the units per dose.",
    "Fridge at 2 to 8 °C, out of light, never frozen once mixed.",
    "Fresh needle every draw. Nothing reused, nothing shared.",
    "Sharps container ready before the first dose.",
    "Log started: vial details, each dose, what else changed, what I noticed.",
  ] },
  "the-compounds": { title: "Before choosing a peptide", free: false, items: [
    "I have read its evidence grade and I know what the grade means.",
    "I know how people commonly use it, and I know that is reported practice, not advice for me.",
    "I know the common side effects and which ones mean stop.",
    "I have checked its interactions against every medication I take.",
    "I have checked whether I am in a group that stays away from it.",
    "I know whether it is WADA-banned and whether that matters for me.",
    "I know what the peptide is supposed to do, so I will know if it did not.",
  ] },
  stacking: { title: "Adding a second peptide", free: false, items: [
    "The first peptide has been run long enough to judge, and I have judged it: kept or dropped.",
    "Nothing else is changing this month: training, diet, supplements, sleep, medications.",
    "The new one starts at a low reported dose.",
    "I have checked the two for clashes: same body system, shared side effects, blood sugar, blood pressure.",
    "If I am using a blend, I have already run its parts separately.",
    "I know whether this peptide is one that is cycled, and why.",
    "The log has a column for it.",
  ] },
  "expectations-and-safety": { title: "Safety and bloodwork", free: false, items: [
    "Baseline bloodwork done before starting: metabolic panel, cholesterol, fasting sugar and HbA1c, blood count, liver enzymes.",
    "Thyroid panel and IGF-1 if using the growth hormone group.",
    "Follow-up bloodwork scheduled at six to twelve weeks.",
    "I know the three side-effect groups: fading, lower the dose or stop, doctor today.",
    "I know the doctor-today list: severe belly pain, chest pain, fainting, allergic reaction, infection at a site, a changing mole.",
    "Every prescriber I have knows what I am taking.",
    "My stop rule is written at the top of the log.",
    "I will judge each peptide inside its expected window, not before and not forever.",
  ] },
  "staying-current": { title: "Reading a claim", free: false, items: [
    "Who was the study in: cells, animals, or people?",
    "How many people?",
    "Compared with what? Was there a placebo group?",
    "What was measured, and is it the thing I actually care about?",
    "At what dose, given how?",
    "Who paid for it?",
    "Does the person making the claim benefit if I believe it?",
    "Could they tell me the number of people in the study and what was measured?",
  ] },
};

/** Goal paths: a reading order of six lessons for a stated goal. Slugs are module/lesson. */
export const GOALS = [
  { id: "recovery", label: "Recover from an injury", blurb: "Tendons, joints, nagging pulls.", path: ["sourcing/reading-a-certificate-of-analysis", "handling/reconstitution", "the-compounds/how-to-read-these-pages", "the-compounds/recovery-and-repair", "expectations-and-safety/timelines", "stacking/one-variable"] },
  { id: "sleep", label: "Sleep and recovery from training", blurb: "Deeper sleep, better recovery, the growth hormone route.", path: ["sourcing/reading-a-certificate-of-analysis", "handling/the-math", "the-compounds/growth-hormone-axis", "stacking/cycling", "expectations-and-safety/labs", "expectations-and-safety/side-effects"] },
  { id: "fat", label: "Lose fat", blurb: "The weight-loss shots, done with eyes open.", path: ["start-here/the-legal-reality", "sourcing/red-flags-and-scams", "the-compounds/metabolic", "expectations-and-safety/interactions", "expectations-and-safety/labs", "expectations-and-safety/when-to-stop"] },
  { id: "focus", label: "Focus and mood", blurb: "The nasal peptides and what to expect.", path: ["start-here/the-words-you-will-see", "sourcing/the-vendor-landscape", "the-compounds/cognition-and-mood", "stacking/cycling", "expectations-and-safety/side-effects", "staying-current/hype-filters"] },
  { id: "skin", label: "Skin and hair", blurb: "GHK-Cu, cream versus needle, and the tanning warning.", path: ["the-compounds/how-to-read-these-pages", "the-compounds/skin-and-hair", "the-compounds/tanning", "handling/administration-as-practiced", "expectations-and-safety/timelines", "staying-current/reading-a-study"] },
  { id: "curious", label: "I'm just curious", blurb: "Understand the whole world in an evening.", path: ["start-here/how-to-use-this-course", "start-here/the-legal-reality", "sourcing/the-vendor-landscape", "the-compounds/how-to-read-these-pages", "staying-current/hype-filters", "staying-current/regulation"] },
];

/** Members' Q&A seed. Answers are about the material, never about a person. */
export const QA = [
  { q: "Is it legal for me to buy these?", a: "For most peptides in this course, buying is not a crime in the US, because they are not controlled substances. What you lose is every protection a medicine has. The legal exposure sits with sellers who make medical claims, not with buyers. The exception that matters to individuals is sport: WADA bans nearly all of them.", tags: ["legal"] },
  { q: "What is the single most important thing in the whole course?", a: "The lab report. If you learn to read a certificate of analysis and check the lot number, you will avoid most of the ways people lose money and most of the ways they get a product that is not what it says.", tags: ["sourcing"] },
  { q: "Why won't you recommend a vendor?", a: "A recommendation is a sale by another name, and it would be out of date the week a vendor changed suppliers. The checklist in module one lets you judge any vendor yourself, which is worth more than a name.", tags: ["sourcing"] },
  { q: "Can I take a peptide by mouth instead of injecting?", a: "Mostly no. The stomach breaks peptides down. BPC-157 is the well-known exception because it survives stomach acid, and KPV is small enough to be swallowed. Selank and semax go up the nose. For everything else, oral versions mostly do nothing.", tags: ["handling"] },
  { q: "What does it mean when a lesson says \"how people commonly use it\"?", a: "It is a description of reported practice from medical trials and the community, written so you do not have to go to a forum to find it. It is not a recommendation for you. Decisions about you belong with you and a clinician who knows your health.", tags: ["course"] },
  { q: "Why is there no dose calculator in the course?", a: "There is one, free, on the reference site. The math lesson teaches the three lines behind it so the calculator becomes a double-check rather than a crutch.", tags: ["handling"] },
  { q: "If a peptide has a C grade, is it useless?", a: "No. C means the evidence is in animals or cells, so human use is an educated guess. Plenty of people use grade C peptides. The grade tells you how much certainty you are buying, which is the honest way to make the decision.", tags: ["evidence"] },
  { q: "How do I know if a peptide worked?", a: "It lasts, it fits the timeline, and it survives stopping. The tracking lesson in module four covers it. For athletes the best measure is the same lift, run or interval logged the same way over weeks.", tags: ["tracking"] },
  { q: "What if I get a side effect not listed in the lesson?", a: "Consider the product before the peptide. A side effect that does not match the peptide's known profile is often a contamination or identity problem with the vial. The lot number in your log is what makes it possible to check.", tags: ["safety"] },
  { q: "Will the course be updated?", a: "Yes. When a good human trial moves a peptide's grade, when a regulator acts, or when community testing changes the picture, the lesson changes and the digest tells you what moved. Founders get every update for as long as the course exists.", tags: ["course"] },
];
