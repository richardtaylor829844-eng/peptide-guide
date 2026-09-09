# The Peptide Course: launch checklist

Six steps. Only the first blocks a sale. The content is live and the checkout wiring is built.
Written 8 Sept 2026. Course page: https://peptidereferenceguide.com/course

---

## 1. Stripe: the only thing between you and a sale (you, ~30 minutes)

Everything else is built. I cannot create the account. Do this once:

1. Go to dashboard.stripe.com and start an account under **RT LLC**. Have the EIN and the business bank account ready.
2. When it asks what you sell, use this wording:
   - Industry: **Education** → **Online courses / e-learning**
   - Description: *"An online course about peptide research: how research compounds are sourced, handled and studied. Educational content only. We sell no physical products and no supplements."*
   - Website: https://peptidereferenceguide.com/course
3. **Products → Add product**: name `The Peptide Course, founding member`, price `$97.00`, one-time.
4. **Payment links → New** for that product. Then, in the link's settings, **After payment → Don't show confirmation page, redirect customers to your website**, and paste exactly:
   `https://peptidereferenceguide.com/api/course/verify?session_id={CHECKOUT_SESSION_ID}`
   That redirect is what unlocks the course the second they pay. Keep "collect customer email" on.
5. **Developers → API keys → Create restricted key**. Name it `course-verify`, give it **Checkout Sessions: Read** only, nothing else. Copy it once; Stripe will not show it again.
6. Send me two things: the Payment Link URL and the restricted key. I set `NEXT_PUBLIC_COURSE_CHECKOUT_URL` and `STRIPE_SECRET_KEY` in Vercel, redeploy, and the reserve form becomes a buy button.

**What happens after a purchase, with nobody involved:** Stripe sends the buyer to the verify route, the route asks Stripe whether that checkout was paid, sets the access cookie, adds the buyer's email to the Formspree list tagged `course-purchase`, and lands them on lesson one with a welcome note. The confirmation link in their Stripe receipt unlocks any other device the same way. Refunds: Stripe dashboard, one click; the fourteen-day promise is on the page.

If Stripe declines or later reviews the account, the fallback is a high-risk broker (PaymentCloud is the usual name). Most education accounts sail through.

**Do not** put a vendor link, a discount code, or any Response Peptide reference anywhere on the site. That is what turns an education account into a "pseudo-pharmaceutical" account in a reviewer's eyes.

## 2. One hour with a lawyer (you, this week)

Find one who works with supplement, telehealth or wellness companies. Search terms: *"FDA regulatory attorney supplements"* or *"dietary supplement lawyer"* plus Boise, or use a national firm that does flat-fee consults. Expect $300 to $600 for the hour.

Send this before the call:

> I run a free reference website about peptide research compounds and am launching a paid online course about them. The course explains how these compounds are sourced, handled and commonly used, and what the research shows. It does not sell any products, has no vendor links and takes no commissions. Members will be able to ask questions about the material. I want to confirm (a) that publishing this as education keeps me outside FDA and state drug-marketing rules, (b) where a members' Q&A has to stop so it is not practising medicine, (c) what disclaimers and terms the course needs, and (d) whether running it under my existing Idaho LLC (RT LLC) plus a media liability policy is the right structure. Three free sample lessons are at https://peptidereferenceguide.com/course.

Take notes. Whatever they say about the Q&A line goes into the course terms and into how the digest answers questions.

## 3. Insurance under RT LLC (you, one hour)

You already have RT LLC in Idaho, so this step is short.

- **Confirm the LLC has an EIN and a business bank account.** Stripe pays out to the account and asks for the EIN at signup. If either is missing: irs.gov for the EIN (free, ten minutes), any business checking for the account.
- **Insurance**: search *"media liability insurance online course"* or *"professional liability for content creators"*. Hiscox, Next and Thimble all quote online. Apply in RT LLC's name. What you want covered: content-based claims (defamation, negligent information) and general liability. Expect a few hundred dollars a year. Bring the lawyer's notes to the application.
- The course site can stay branded Peptide Reference Guide; RT LLC is the entity behind it. Add "Peptide Reference Guide is operated by RT LLC, Boise, Idaho" to the site's terms when the lawyer signs off on the wording.

## 4. The founder email (you send, I wrote it)

The list is in Formspree (the Ask AI signups). Export it as CSV from the Formspree dashboard. Send from whatever tool you already have; if none, a free Mailchimp or Resend account is enough for one send.

**Subject:** The course is coming. Founders first.

> Hi,
>
> You signed up on Peptide Reference Guide, so you're hearing this before anyone else.
>
> I've spent the last few months writing the thing the site couldn't be: the decisions, in order. Which vendor. Whether the certificate is real. How much water. What to run first. What a normal side effect looks like against one that means stop. It's a course, it's written from the vendor side of this market, and it does not sell you anything at the end. No vendor links, no codes, ever.
>
> The first three lessons are free and up now:
> https://peptidereferenceguide.com/course
>
> The first 100 people in get it for $97 instead of $197, every lesson as it's finished, every update forever, and the members' digest for a year. Reserving is free and doesn't charge you anything. When it opens you get a link and a week to decide.
>
> If you've ever bought a vial and wondered whether it was real, module one alone will change how you buy.
>
> Richard
> Peptide Reference Guide

Send it once. Reply to every response personally. The number of reservations that come back is the demand signal.

## 5. Writing (me)

- All six modules, 36 lessons: **written 8 Sept.** Three are free.
- What remains on the writing side is revision from founder questions, and updates as evidence moves.
- Richard's read-through: the compound lessons in module 3 carry reported dose ranges and evidence grades. Read them once as the owner before the founder email goes out, and flag anything that reads wrong.

## 6. Founder launch (both of us)

The content is done and access is automatic on purchase:
1. When the 100th founder buys, or whenever you decide, change the Payment Link price to $197 in Stripe and flip `COURSE.status` to `"live"` in `lib/course.js`.
2. The founder code in `.env.local` (`COURSE_ACCESS_CODE`) is now only for people who reserved by email before checkout existed, and for hand-fixing an access problem.
3. Collect every question buyers ask. Confused questions are defects in the lessons. Fix, then open to full price.

---

### Reference

- Course content: `lib/course.js` (prices, status, every lesson)
- Access gate: `lib/course-access.js`, `app/api/course/unlock/route.js`
- Env (Vercel, project `peptide-guide`, production): `COURSE_ACCESS_CODE`, `COURSE_COOKIE_TOKEN`; and once Stripe exists, `NEXT_PUBLIC_COURSE_CHECKOUT_URL` and `STRIPE_SECRET_KEY` (restricted, Checkout Sessions read)
- Purchase → access: `app/api/course/verify/route.js`
- Extras: quizzes, checklists, goal paths, Q&A seed in `lib/course-extras.js`; terms at `/course/terms`; narration built by `scripts/audio-text.mjs` then `scripts/audio-build.sh` (swap the voice there when a real TTS key exists)
- Deploys on push to `main`. Two Vercel projects exist; the domain is on `peptide-guide`. Ignore `peptide-reference-guide`.
