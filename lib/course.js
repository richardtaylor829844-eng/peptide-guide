/**
 * The Peptide Course.
 *
 * Everything the course page and lesson pages render comes from here, so
 * changing a price, a title or a lesson is one edit.
 *
 * Written for a complete beginner: someone who has never learned about
 * peptides, is curious, and wants to understand how people use them in daily
 * life, training and sport. Short sentences. Every technical word is explained
 * the first time it appears. Nothing assumes prior knowledge.
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
 */

import { MODULE_3 } from "./course-m3";
import { MODULE_4, MODULE_5, MODULE_6 } from "./course-m4to6";

export const COURSE = {
  name: "The Peptide Course",
  short: "Course",
  tagline: "Peptides explained from zero. What they are, how people actually buy, mix and use them, and what to expect. Written for beginners, by someone who has been on the vendor side.",
  founderPrice: 97,
  price: 197,
  membershipPrice: 24,
  /** "presale" shows founder pricing and the reserve form. "live" shows the full price. */
  status: "presale",
  founderSeats: 100,
  eta: "Open now",
  /** If set, the founder button links straight to checkout. Otherwise it collects an email. */
  checkoutUrl: process.env.NEXT_PUBLIC_COURSE_CHECKOUT_URL || "",
};

export const MODULES = [
  {
    n: 0,
    slug: "start-here",
    title: "Start here",
    summary: "What peptides are, what this course is, and the few words you need before anything else.",
    status: "ready",
    lessons: [
      {
        slug: "how-to-use-this-course",
        title: "How to use this course",
        minutes: 6,
        free: true,
        summary: "What a peptide is, in one page, and how to read the rest.",
        body: [
          { t: "p", text: "Let's start at the very beginning, because most guides don't." },
          { t: "h", text: "What a peptide is" },
          { t: "p", text: "Your body runs on messages. Cells tell each other to heal, to grow, to burn fat, to sleep, to calm down. Many of those messages are carried by peptides: tiny chains of amino acids, the same building blocks that make up protein in food and muscle." },
          { t: "p", text: "Your body makes thousands of peptides every day. Insulin is one. So is the hormone that makes you sleepy at night. A peptide is not a drug in the usual sense. It is a signal. Give the body a specific signal and a specific part of it responds." },
          { t: "fig", id: "signal", caption: "A peptide is a message. It travels to a cell, fits a receptor like a key in a lock, and the cell does what the message says." },
          { t: "p", text: "The peptides in this course are copies of those natural signals, made in a lab. Some are approved medicines you may have heard of, like the weight-loss shots. Most are not approved for anything yet and are sold online as \"research chemicals.\" People buy them anyway, for recovery from injury, better sleep, fat loss, skin, focus, and more. This course explains how that world actually works." },
          { t: "h", text: "Why this course exists" },
          { t: "p", text: "If you search for peptides online you will find forum posts, vendor ads, and scientific papers all mixed together. None of it is in order, and most of it assumes you already know the basics. People end up buying something they don't understand, from someone they can't check, and using it in a way they copied from a stranger." },
          { t: "p", text: "This course puts it in order. It starts with the decisions that cost people the most money, which happen before anything arrives in the mail. It ends with how to keep learning once you know the basics. The peptides themselves are in the middle, because knowing what BPC-157 does is useless if the vial you bought isn't really BPC-157." },
          { t: "h", text: "The first time through" },
          { t: "list", items: [
            "Read the next lesson, the words you'll see. It's short, and every other lesson uses those words.",
            "Read modules one and two before anything else, even if you already have a vial in the fridge. Buying and handling are where most of the money and most of the risk are.",
            "Module three is the big one: every peptide, explained the same way. Read the ones for the goals you care about and skim the rest.",
            "Modules four and five are the ones people skip and regret. They cover combining peptides, what to expect, and staying safe.",
          ] },
          { t: "h", text: "After that" },
          { t: "p", text: "Come back to it like a manual. Every peptide page has the same headings, so you can look things up fast. The buying checklist in module one is meant to be open in another tab while you look at a vendor's website." },
          { t: "note", text: "Founding members get every update to this material for as long as it exists. When the science changes on a peptide, the lesson changes, and you're told what moved." },
        ],
      },
      {
        slug: "the-words-you-will-see",
        title: "The words you'll see",
        minutes: 7,
        free: true,
        summary: "Twenty terms, explained in plain English. Everything else in the course builds on these.",
        body: [
          { t: "p", text: "You don't need a science background for this course. You do need these words. Read them once. You can come back any time." },
          { t: "h", text: "About the peptides themselves" },
          { t: "list", items: [
            "Peptide: a short chain of amino acids that acts as a signal in the body. Small enough that your stomach breaks it down, which is why most are injected instead of swallowed.",
            "Compound: just a general word for \"the substance.\" Used so we don't say \"peptide\" a hundred times.",
            "Research chemical, or RUO (research use only): the legal label on most peptides sold online. It means the seller is not allowed to say it's for people. It says nothing about who actually buys it.",
            "FDA-approved: officially allowed as a medicine in the United States, after big safety trials. Only a few peptides in this course are. The rest are not, which means nobody has done those trials.",
            "Half-life: how long it takes for half of a dose to leave your body. A short half-life means it wears off fast and is used more often. A long one means once a week can be enough.",
            "Mechanism: the way a compound works. What it tells the body to do.",
          ] },
          { t: "h", text: "About buying" },
          { t: "list", items: [
            "Vendor: a company that sells peptides. Almost none of them make peptides. They buy powder in bulk and put it in vials.",
            "Vial: the tiny glass bottle a peptide arrives in, usually holding a dry powder.",
            "COA, certificate of analysis: a lab report saying what is in one batch of vials, and how pure it is. The single most important document in this course.",
            "Lot number, or batch number: the code on a vial that connects it to its lab report. No lot number, no proof.",
            "Purity: what percentage of the powder is actually the peptide you paid for. Measured by a lab.",
            "Third-party testing: when someone other than the seller tests the product. It's the only testing that counts.",
          ] },
          { t: "h", text: "About using" },
          { t: "list", items: [
            "Reconstitution: mixing the dry powder with sterile water so you can measure it. Sounds technical. It's a two-minute job.",
            "Bacteriostatic water, or BAC water: sterile water with a small amount of preservative. It's what people mix peptides with, because the vial gets used over several weeks.",
            "Subcutaneous, or subq: an injection into the fat just under the skin, with a tiny insulin needle. This is how almost all peptides are taken. Millions of people with diabetes do it daily.",
            "Dose: how much you take at once, usually written in micrograms (mcg) or milligrams (mg). One milligram is a thousand micrograms.",
            "Cycle: taking a compound for a set time, then stopping for a set time.",
            "Stack: using two or more compounds together.",
            "Side effect: something the compound does that you didn't want. Some are harmless, some mean stop.",
          ] },
          { t: "h", text: "About the evidence" },
          { t: "list", items: [
            "Animal study: tested in mice or rats. It's a hint, not proof. Most peptide research is this.",
            "Human trial: tested in people, ideally against a fake version (a placebo) so we know the effect is real. This is what actually counts, and most peptides don't have it.",
            "WADA: the World Anti-Doping Agency. It keeps the list of banned substances for tested sports. Most peptides in this course are on it. If you compete in a sport with drug testing, that matters a lot, and it's flagged wherever it applies.",
          ] },
          { t: "note", text: "That's it. If a lesson ever uses a word not on this list, it explains the word in the same sentence." },
        ],
      },
      {
        slug: "the-legal-reality",
        title: "The legal reality, in plain terms",
        minutes: 8,
        free: true,
        summary: "What \"research use only\" really means, what's actually approved, and the line this course holds.",
        body: [
          { t: "p", text: "Almost every peptide in this course is sold in the United States with a label that says \"for research use only, not for human consumption.\" That label protects the seller. It doesn't describe the buyer. Here is what is really going on." },
          { t: "h", text: "Three kinds of peptide, not one" },
          { t: "list", items: [
            "Approved medicines. Semaglutide (the drug in Ozempic and Wegovy), tirzepatide (Mounjaro, Zepbound), tesamorelin, and a few others are real FDA-approved drugs. A doctor can prescribe them. The same molecule sold as a \"research chemical\" is chemically the same thing, made with none of the safety checks a medicine gets.",
            "Medicines somewhere else. Thymosin alpha-1 is an approved drug in more than thirty countries. Cerebrolysin is prescribed in hospitals across Europe and Asia. Being approved abroad isn't the same as approved here, but it does mean real safety data on people exists.",
            "Everything else. BPC-157, TB-500, GHK-Cu, epithalon and most of the list have animal studies, maybe a small human study, and no approval anywhere. In 2023 the FDA even blocked compounding pharmacies from making several of them, including BPC-157. The online research-chemical market is the only place they live now.",
          ] },
          { t: "h", text: "What the label means for you" },
          { t: "p", text: "For most of these compounds, buying them is not a crime. They aren't controlled substances like steroids or narcotics. What you give up is every protection a medicine comes with. Nobody checks the factory. Nobody recalls a bad batch. There's no pharmacist, no warning label, and no one to report a problem to. Module one exists because in this market, the only quality control is the one you do yourself." },
          { t: "h", text: "If you play a tested sport" },
          { t: "p", text: "One more thing that beginners often don't know. The World Anti-Doping Agency bans nearly every peptide in this course, including the recovery ones people think of as harmless. If you compete in anything with drug testing, from college sports to certain amateur leagues to fitness competitions, using these can end your season. Each peptide lesson says whether it's banned." },
          { t: "h", text: "The line this course holds" },
          { t: "p", text: "This is education. It explains how each peptide is used and why, what the research shows, what people report, and what goes wrong. It doesn't sell peptides. It doesn't link to anyone who does. And it never tells any one person what to take, because that's a decision for you and a clinician who knows your health. Questions from members are answered as questions about the material, not as plans for a person. That rule is what lets the course say everything else plainly." },
          { t: "warn", text: "Nothing here replaces a doctor who knows your history. Several of these compounds change hormone levels, blood sugar or blood pressure, and interact with common medications. Module five covers when that conversation is not optional." },
        ],
      },
    ],
  },
  {
    n: 1,
    slug: "sourcing",
    title: "Before you buy",
    summary: "Who really sells this stuff, how to read a lab report, and the scams that cost beginners the most.",
    status: "ready",
    lessons: [
      {
        slug: "the-vendor-landscape",
        title: "The vendor landscape",
        minutes: 9,
        free: true,
        summary: "Who actually makes peptides, who resells them, and why one site charges $30 and another charges $90 for the same vial.",
        body: [
          { t: "p", text: "Here is the first thing to understand about peptide vendors: almost none of them make peptides. The actual manufacturing happens at a small number of chemical factories, mostly in China. Everyone else buys powder from those factories in bulk, has it put into little vials, and sticks a label on. The brand you see is a label and a website. What matters is what's behind it." },
          { t: "fig", id: "supply-chain", caption: "Every brand is buying the same powder from the same factories. What separates them is whether anyone tested it." },
          { t: "h", text: "The four kinds of seller" },
          { t: "list", items: [
            "Bulk manufacturers. They sell by the gram to businesses. They rarely sell to individuals. If a website claims to be a manufacturer and sells single vials, it isn't one.",
            "Established resellers. They buy bulk, contract out the vial-filling, test every batch, and publish the results. The good ones have been around for years, and their lab reports come from a named independent lab you can look up.",
            "Drop-ship brands. A website, a checkout page, and a supplier they've never seen. Their lab report, if they have one, came from the supplier and nobody checked it. Most of the market looks like this.",
            "Telehealth clinics and compounding pharmacies. For the few approved peptides, a doctor and a licensed pharmacy is the only route with real manufacturing standards behind it. For everything else, that route doesn't exist.",
          ] },
          { t: "h", text: "Why prices are all over the place" },
          { t: "p", text: "Bulk peptide is cheap. A vial that sells for $60 might contain a few dollars of actual compound. The difference between vendors is testing, filling standards, insurance against their payment processor shutting them down, and profit. A very low price usually means a drop-ship brand skipping the testing. A very high price is often just a brand name." },
          { t: "p", text: "So the useful question is never \"what does it cost?\" It's \"what did they test, who tested it, and can I see it?\" The next lesson teaches you to read the answer." },
          { t: "note", text: "This course does not recommend vendors and never will. A recommendation is a sale by another name, and it would be out of date the week a vendor changed suppliers. What you get instead is the checklist to judge any of them yourself." },
        ],
      },
      {
        slug: "reading-a-certificate-of-analysis",
        title: "Reading a lab report (the COA)",
        minutes: 14,
        free: true,
        summary: "The four tests that matter, what a real report looks like, and what the numbers don't tell you.",
        body: [
          { t: "p", text: "A certificate of analysis, or COA, is a lab report for one batch of one peptide. If a vendor can't show you one, they didn't test the batch. If they show you one that doesn't say what you think it says, that's more common, and this lesson is about telling the difference. Ten minutes here saves more money than anything else in the course." },
          { t: "fig", id: "coa-anatomy", caption: "What a real lab report looks like, and the four things to check before you trust it." },
          { t: "h", text: "The four tests that matter" },
          { t: "list", items: [
            "Purity. A machine called HPLC separates the powder into everything that's in it and reports what fraction is the peptide you wanted. Think of it as \"how much of this is the real thing.\" 98% or higher is normal for a good batch. Below about 95%, you're paying for junk, usually broken or misshapen copies of the peptide that do nothing.",
            "Identity. Purity tells you how pure something is. It doesn't tell you what it is. A second test, mass spectrometry, checks that the molecule weighs what the real peptide should weigh. A purity number with no identity test is a purity number for a mystery powder.",
            "Endotoxin. Leftover bacterial residue from manufacturing. It matters because injecting it causes fever and inflammation. Anything meant for injection should show a low endotoxin result. A report that skips this test skipped the one that matters most for safety.",
            "Sterility, if they claim it. A sterile-filled vial gets tested for germs. Most research-chemical vendors don't claim sterility at all, which is worth knowing before you assume it.",
          ] },
          { t: "h", text: "What a real report looks like" },
          { t: "list", items: [
            "It names the lab, and the lab is real. A few independent labs have tested peptides for the community for years and have their own report format. Some let you type in the report number on their website to confirm it. A report with no lab name was made by the vendor.",
            "It names the batch, and that batch matches the vial in your hand. A report for a different batch is a report for a different product.",
            "It shows the graph, not just a number. The purity test produces a chart with peaks. A report that's only a typed \"99.2%\" with no chart is just a typed number.",
            "It's dated. Peptides break down over time. A report from two years ago tells you what the batch was, not what it is now.",
          ] },
          { t: "h", text: "What the numbers don't tell you" },
          { t: "p", text: "Purity is a percentage of what's in the vial. It is not how much is in the vial. A vial that is 99% pure and labeled 5 mg can contain 3 mg. The test for that, called net peptide content, is one almost nobody runs. The report also doesn't tell you how the vial was stored between the lab and your door, which is why module two starts with what to do when a package arrives." },
          { t: "warn", text: "A lab report can be faked in any photo-editing app in five minutes. If every report on a vendor's site looks identical, every purity is 99-point-something, and none can be checked with the lab that supposedly issued them, treat them as advertising." },
        ],
      },
      {
        slug: "lot-numbers-and-third-party-testing",
        title: "Lot numbers, independent testing, and checking for yourself",
        minutes: 8,
        free: false,
        summary: "How to connect a report to a vial, why community testing changed the market, and how to send in a vial yourself.",
        body: [
          { t: "p", text: "The lot number on a vial is the only thing connecting it to a lab report. Everything in the last lesson depends on that link, so it's worth understanding what a lot number is and isn't." },
          { t: "h", text: "What a lot number tells you" },
          { t: "p", text: "A lot is one filling run of one batch of powder. Every vial from that run shares the number, and one lab report covers all of them. Some vendors hide information in the number, like the strength or the fill date, and once you've seen a few from the same vendor the pattern jumps out. A lot number that never changes over months of orders is a vendor printing one number on everything." },
          { t: "h", text: "Why independent testing matters" },
          { t: "p", text: "Around 2020, people in the peptide community started paying independent labs to test vials bought at retail and posting the results publicly. The effect was fast. Vendors whose products came back underdosed or fake lost customers within weeks. The ones that survived started publishing real per-batch reports. It's the closest thing this market has to a regulator, and it runs on people like you sending in a vial." },
          { t: "h", text: "Testing a vial yourself" },
          { t: "list", items: [
            "The labs that do this list their prices and take samples from individuals. A purity and identity test on one vial costs about what the vial did.",
            "Send an unopened vial from the batch you're asking about. An opened vial tests your handling, not the product.",
            "Ask for purity and identity at minimum. Add endotoxin if you care about injection safety, which you should.",
            "Compare the result to the vendor's report for the same batch. A small difference is normal. A big one, or a different compound entirely, is your answer.",
          ] },
          { t: "note", text: "Even cheaper: community groups regularly pool money to test popular vendors and publish the results. Reading those before you order is the single best piece of homework there is." },
        ],
      },
      {
        slug: "red-flags-and-scams",
        title: "Red flags, scams, and how beginners lose money",
        minutes: 10,
        free: false,
        summary: "The patterns that repeat: fake reports, weird payment requests, the vanishing vendor, and the underdosed bargain.",
        body: [
          { t: "p", text: "Most losses in this market aren't dramatic. Nobody gets poisoned by a bottle of nothing. What happens is that people pay for peptide they don't receive, in a handful of ways that repeat so reliably they can be listed." },
          { t: "h", text: "The patterns" },
          { t: "list", items: [
            "The one-size-fits-all report. One lab report, one purity number, every product, every month. It was made once and copied.",
            "The payment shuffle. The vendor asks you to pay by wire transfer, crypto, a cash app, or a card page under a different business name. Sometimes that's a legitimate vendor whose payment processor dropped them. Sometimes it's someone who won't exist next month. Either way you can't dispute the charge, so only send an amount you can afford to lose.",
            "The sale that never ends. \"40% off\" forever means the full price was invented to be discounted from.",
            "The underdosed bargain. The vial is real, the peptide is real, and there's half as much as the label says. This is the most common failure and the hardest to notice without testing, because half a dose of something that works still does something.",
            "Medical claims on the site. A vendor page that says a peptide \"heals,\" \"cures\" or \"treats\" anything either doesn't know the law or is ignoring it. The FDA sends warning letters over exactly those words, and a vendor with that exposure may not be around to honor your order.",
            "The brand-new vendor. Website registered this year, no history anywhere, stock photos, one contact form. Maybe they're new. More often it's a reskin of a site that burned its last name.",
          ] },
          { t: "h", text: "What careful buyers do instead" },
          { t: "list", items: [
            "Order small first. One vial from a new vendor, tested or compared against one you trust, before a bigger order.",
            "Keep the packaging, the lot number and the lab report together until the vial is finished. If something's wrong, that's your evidence.",
            "Pay in a way you can reverse whenever it's offered, and treat non-reversible payment as the risk it is.",
            "Read community test results before every order, not just the first one. Vendors change suppliers.",
          ] },
          { t: "warn", text: "Nothing bought this way can be recalled. If a batch is bad, the only warning you'll get is from other buyers, which is one more reason the community testing threads are worth following." },
        ],
      },
      {
        slug: "when-it-arrives",
        title: "When it arrives",
        minutes: 6,
        free: false,
        summary: "The first ten minutes with a package: what to check, what to photograph, and what goes in the fridge.",
        body: [
          { t: "p", text: "A vial is at its most fragile between the vendor's fridge and yours. A hot delivery truck is the usual damage, and you can't see it. So the first job isn't to open anything. It's to record what showed up." },
          { t: "h", text: "The check" },
          { t: "list", items: [
            "Take photos of the package, the label, and the lot number before you open anything. If there's a dispute later, this is your side of it.",
            "Match the lot number to the lab report the vendor published. If they don't match, ask before you use it.",
            "Look at the powder. Freeze-dried peptide is a white cake or fine powder at the bottom of the vial. A yellowed, melted-looking or partly dissolved cake has seen heat or moisture.",
            "Check the cap and the rubber stopper. A cracked cap or a stopper with a hole in it is a vial to send back.",
          ] },
          { t: "h", text: "Storage before you mix it" },
          { t: "p", text: "Sealed, dry powder is the stable form. In the fridge, most peptides keep for many months, often longer. The freezer keeps them longer still, but freezing and thawing over and over is worse than either. A few days at room temperature in transit is usually fine. A summer week in a mailbox often isn't." },
          { t: "p", text: "Once water goes in, the clock changes completely. That's where the next module starts." },
          { t: "note", text: "A habit that pays for itself: put a label on each vial with the date it arrived and, later, the date you mixed it. Memory is not a storage system." },
        ],
      },
    ],
  },
  {
    n: 2,
    slug: "handling",
    title: "Handling it properly",
    summary: "Mixing, measuring, storing, and the mistakes that quietly ruin a vial.",
    status: "ready",
    lessons: [
      {
        slug: "reconstitution",
        title: "Mixing a vial, and the mistakes that ruin one",
        minutes: 12,
        free: false,
        summary: "What bacteriostatic water is, why you run it down the glass, and why you never shake a peptide.",
        body: [
          { t: "p", text: "A vial arrives as a dry powder. \"Reconstitution\" is the fancy word for adding sterile water to turn it into a liquid you can measure. It takes two minutes. It's also where a surprising number of vials get quietly ruined, because peptides are fragile in ways that pills and powders aren't." },
          { t: "h", text: "What goes in" },
          { t: "list", items: [
            "Bacteriostatic water, usually called BAC water. It's sterile water with a tiny bit of preservative (0.9% benzyl alcohol) that stops germs growing in a vial you'll be poking a needle into for weeks. It comes in 30 mL bottles and it's what almost everyone uses.",
            "Plain sterile water works for a single use but has no preservative. A vial mixed with it is a one-day vial.",
            "Nothing else. Not tap water, not distilled water from the store, not saline unless a specific peptide calls for it. The failure isn't dramatic. The vial just grows germs, or the peptide falls apart.",
          ] },
          { t: "h", text: "How it's done" },
          { t: "steps", items: [
            "Let both vials come to room temperature first. Cold glass and warm water means condensation and a harder draw.",
            "Wipe both rubber stoppers with an alcohol swab and let them dry. The stopper is the only barrier between the room and your solution.",
            "Draw the water into a syringe. The next lesson covers how much. One to two milliliters is typical for common vial sizes.",
            "Push the needle into the peptide vial at an angle and let the water run slowly down the inside of the glass. Don't squirt it straight onto the powder. The powder dissolves from the edges.",
            "Swirl gently, or just leave it alone for a few minutes. It clears on its own.",
            "Write the date on it and put it in the fridge.",
          ] },
          { t: "fig", id: "reconstitution", caption: "The whole job, in six steps. Step four is the one people get wrong." },
          { t: "h", text: "Why you never shake it" },
          { t: "p", text: "A peptide is a folded chain, like a tiny piece of origami. Shaking makes foam, and foam is a huge amount of air touching water. On that surface the chains unfold and stick to each other into clumps. Those clumps don't work, and they can irritate the skin where they're injected. The vial looks the same. It just does less. Swirl, never shake, and if it foams anyway, leave it in the fridge until the foam is gone before drawing from it." },
          { t: "h", text: "The other ways vials get ruined" },
          { t: "list", items: [
            "Too much water. A 3 mL vial can't hold 3 mL of water plus the air already inside. Pressure builds, the stopper leaks, and the solution is compromised. Two milliliters in a 3 mL vial is the usual ceiling.",
            "Pushing air in first. People who've drawn medication before sometimes inject air to equalise pressure. Peptide vials are vacuum sealed and pull the water in on their own if you release the plunger slowly.",
            "Reusing needles. A needle used once is dull and no longer sterile. Every draw is a fresh needle.",
            "Heat and light. A mixed vial left on the counter for an afternoon, or next to a window, has aged weeks.",
            "Mixing two peptides in one vial. It saves one injection and costs stability, because each peptide has its own chemistry. Blends sold pre-mixed were designed for it. A kitchen-table mix wasn't.",
          ] },
          { t: "warn", text: "Cloudiness that doesn't clear, floating bits, or a color change after mixing means the vial doesn't get used. Peptide solutions are clear and colorless, or at most very faintly yellow." },
        ],
      },
      {
        slug: "the-math",
        title: "The math, once, so it never confuses you again",
        minutes: 8,
        free: false,
        summary: "Milligrams, milliliters and syringe units. Worked examples for the common vial sizes.",
        body: [
          { t: "p", text: "Every question about mixing and measuring is the same three-line calculation. Learn it once and the free calculator on this site becomes a double-check instead of a crutch." },
          { t: "h", text: "The three lines" },
          { t: "list", items: [
            "Strength of the mix = milligrams in the vial ÷ milliliters of water you added. A 5 mg vial with 2 mL of water is 2.5 mg per mL.",
            "Switch to micrograms, because doses are usually written in them. There are 1,000 micrograms in a milligram, so 2.5 mg per mL is 2,500 mcg per mL.",
            "Amount to draw = the dose ÷ the strength. A 250 mcg dose from a 2,500 mcg per mL vial is 0.1 mL.",
          ] },
          { t: "h", text: "Turning milliliters into syringe units" },
          { t: "p", text: "Insulin syringes aren't marked in milliliters. They're marked in \"units,\" and on a standard syringe 100 units equals 1 mL. So one unit is 0.01 mL, and 0.1 mL is 10 units. That's the whole conversion: milliliters times 100 equals units." },
          { t: "fig", id: "syringe", caption: "The conversion in one picture. Once you see that 100 units is 1 mL, the rest is arithmetic." },
          { t: "h", text: "Worked examples" },
          { t: "list", items: [
            "5 mg vial, 2 mL water, 250 mcg dose. 5 ÷ 2 = 2.5 mg/mL = 2,500 mcg/mL. 250 ÷ 2,500 = 0.1 mL = 10 units.",
            "10 mg vial, 2 mL water, 500 mcg dose. 10 ÷ 2 = 5 mg/mL = 5,000 mcg/mL. 500 ÷ 5,000 = 0.1 mL = 10 units.",
            "5 mg vial, 2 mL water, 0.25 mg dose. 2.5 mg/mL. 0.25 ÷ 2.5 = 0.1 mL = 10 units.",
            "2 mg vial, 1 mL water, 100 mcg dose. 2 mg/mL = 2,000 mcg/mL. 100 ÷ 2,000 = 0.05 mL = 5 units.",
          ] },
          { t: "h", text: "How much water to use" },
          { t: "p", text: "More water means a weaker mix and a bigger volume per dose, which is easier to measure accurately. Tiny doses from a strong mix land on one or two units, where being off by half a unit is a big percentage error. Small vials with small doses generally get more water, up to what the vial can hold. Big doses from big vials get less." },
          { t: "note", text: "A 0.3 mL insulin syringe has half-unit marks and is the usual choice for doses under 30 units. A 1 mL syringe is easier to read for bigger volumes. Once you've done the math, write the units on the vial label so you never redo it from memory." },
        ],
      },
      {
        slug: "storage-and-stability",
        title: "Storage after mixing",
        minutes: 7,
        free: false,
        summary: "Where the \"28 days\" rule comes from, which peptides are fussier, and the signs a mixed vial has gone bad.",
        body: [
          { t: "p", text: "Before water goes in, a peptide is a stable powder. After, it's a liquid that is slowly falling apart. How slowly depends on the peptide, the temperature, and how many times the stopper gets punctured." },
          { t: "h", text: "Where 28 days comes from" },
          { t: "p", text: "You'll see \"28 days\" everywhere. It isn't a peptide number. It's the pharmacy rule for how long a multi-use vial with preservative is considered safe from contamination once opened. It's a germ limit. Some peptides are chemically fine well past it, others degrade sooner, and 28 days is the outer bound for the container either way." },
          { t: "h", text: "Which peptides are fussier" },
          { t: "list", items: [
            "The weight-loss peptides (semaglutide, tirzepatide) are built to be stable and generally hold up for weeks in the fridge.",
            "BPC-157 and TB-500 are reasonably tough in solution when kept cold.",
            "The growth hormone peptides (the CJC and ipamorelin family) are less forgiving and are usually used up within a few weeks rather than stretched.",
            "Anything that came as a blend has more than one peptide degrading at once, and is used at the pace of the least stable one.",
          ] },
          { t: "h", text: "The rules that hold for all of them" },
          { t: "list", items: [
            "In the fridge, 2 to 8 °C. Never frozen once mixed. Ice crystals do to a peptide what shaking does.",
            "Out of light. The box it came in is fine.",
            "Out of the fridge only for the minute it takes to draw a dose, then back. Not left on the counter.",
            "Dated on the label the day it was mixed, with the units per dose written next to it.",
          ] },
          { t: "h", text: "Signs it has gone bad" },
          { t: "list", items: [
            "Cloudiness or haze that wasn't there after it first cleared.",
            "Particles, strands or floaters.",
            "A color shift toward yellow or brown.",
            "A vial that's been punctured many times over many weeks, whatever it looks like.",
          ] },
          { t: "note", text: "Unmixed powder in the fridge keeps for months and often years. When in doubt, mix smaller amounts more often rather than one big vial that has to last." },
        ],
      },
      {
        slug: "administration-as-practiced",
        title: "How people actually take these",
        minutes: 10,
        free: false,
        summary: "Injections under the skin as they're commonly done, where, how often to rotate, keeping it clean, and getting rid of needles. Described, not prescribed.",
        body: [
          { t: "p", text: "This lesson describes what people who use peptides commonly do, so the words in later lessons make sense. It isn't a set of instructions. A nurse or doctor can teach the actual technique properly in ten minutes, and that's worth doing once." },
          { t: "h", text: "Why under the skin" },
          { t: "p", text: "Almost all peptides are injected into the layer of fat just under the skin, with a tiny insulin needle. That's called subcutaneous, or \"subq.\" It's the same technique millions of people with diabetes use every day. The needle is short and thin, it barely hurts, and the peptide absorbs slowly and evenly. Injecting into muscle is rare for peptides and doesn't help much." },
          { t: "h", text: "Where, and rotating" },
          { t: "list", items: [
            "The belly, a couple of inches away from the navel, is the most common spot. The outer thigh and the back of the upper arm are the alternatives.",
            "People rotate spots. The same spot twice in a row builds scar tissue and lumps that absorb unevenly. Moving clockwise around the belly is a common pattern.",
            "Some peptides are believed to work locally as well as throughout the body, and people using BPC-157 often inject near an injury. The evidence that this works better than injecting anywhere is thin. It's mentioned because it's common, not because it's proven.",
          ] },
          { t: "fig", id: "sites", caption: "Where people inject, and why they rotate." },
          { t: "h", text: "The technique, as people describe it" },
          { t: "steps", items: [
            "Wash hands. Swab the vial stopper and let it dry. Swab the skin and let it dry.",
            "Use a fresh insulin syringe, usually a very thin 29 to 31 gauge needle, for every injection. Draw the dose, tap any air bubbles to the top, and push them out.",
            "Pinch a fold of skin, put the needle in at a 45 to 90 degree angle depending on how much fat there is, push the plunger slowly, and hold for a few seconds before pulling out.",
            "Don't rub the spot. A little redness or a small bump that fades in a day is normal. Anything hot, spreading, or lasting is not, and module five covers it.",
          ] },
          { t: "h", text: "Other ways" },
          { t: "p", text: "Selank and semax are usually taken as nasal sprays, which is how they were developed. GHK-Cu is often put on the skin as a cream as well as injected. Swallowed versions of some peptides exist, and most get broken down by the stomach before they do anything, with a few exceptions covered in module three." },
          { t: "h", text: "Needles" },
          { t: "list", items: [
            "Never reuse a needle and never share one. Both are how infections and worse spread.",
            "Used syringes go in a sharps container, or a rigid, sealed, labeled plastic container where local rules allow it. Most pharmacies sell sharps containers and many take them back.",
            "Nothing sharp goes loose in the household trash.",
          ] },
          { t: "warn", text: "None of this replaces being shown once by someone qualified. Bad technique is the most common cause of the lumps, bruises and infections people report, and every one of them is avoidable." },
        ],
      },
      {
        slug: "keeping-records",
        title: "Keeping records",
        minutes: 5,
        free: false,
        summary: "A simple log that lets you tell what actually changed.",
        body: [
          { t: "p", text: "Most people who try a peptide can't say afterward whether it did anything. They changed three things that month and wrote none of them down. A log turns a guess into information. It's also your evidence if a batch turns out to be bad." },
          { t: "h", text: "What to write down" },
          { t: "list", items: [
            "The vial: which peptide, which vendor, the lot number, whether you have the lab report, the date it arrived, the date you mixed it, how much water, and the units per dose.",
            "Each dose: date, time, amount, where on the body.",
            "What else is true that week: sleep, training, diet changes, other supplements or medications started or stopped, being sick.",
            "What you noticed: effects, side effects, and nothing, which is also a result. One sentence a day is plenty.",
            "Numbers, if you track them: weight, waist, resting heart rate, blood pressure, and any bloodwork, with dates.",
          ] },
          { t: "h", text: "Why one thing at a time" },
          { t: "p", text: "A log can only tell you what caused an effect if only one thing changed. Start two peptides the same week, or a peptide and a new training program, and you'll never know which one did it. Module four is built on this idea, and the log is what makes it possible." },
          { t: "h", text: "The template" },
          { t: "p", text: "A notes app or a spreadsheet with one row per day and the columns above. Nothing fancier. Members can copy the sheet from the digest, but the tool matters far less than the habit of filling it in before the day is forgotten." },
          { t: "download", href: "/course/peptide-log-template.csv", label: "Download the log template (CSV, opens in any spreadsheet)" },
          { t: "note", text: "Review it weekly, not daily. Day-to-day is noise. Weekly patterns are what actually show whether something is happening." },
        ],
      },
    ],
  },
  MODULE_3,
  MODULE_4,
  MODULE_5,
  MODULE_6,
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
