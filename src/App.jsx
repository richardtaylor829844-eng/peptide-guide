import { useState, useEffect, useRef } from "react";

// ============================================================
// CONFIG — edit these two URLs after you deploy the backend
// ============================================================
// 1. Your Cloudflare Worker URL (see worker.js + DEPLOY.md)
var CHAT_ENDPOINT = "https://peptide-proxy.richardtaylor829844.workers.dev";
// 2. Your email provider's form endpoint (Mailchimp embed URL,
//    ConvertKit form URL, Formspree URL, etc.) — see DEPLOY.md
var EMAIL_ENDPOINT = "https://formspree.io/f/mrerlwak";
// 3. Your peptide store link (used in ad slots)
var AD_LINK = "https://eksbrand.com/";
var AD_BRAND = "EKS Brand";
var AD_LOGO = "https://eksbrand.com/cdn/shop/files/X-Brand-Logo_1600x.png?v=1614298337";
// ============================================================

var CONCERNS = [
  {id:"recovery",label:"Injury & Recovery",icon:"🩹",sub:"Muscle, tendon, joint, or tissue healing",peps:["bpc157","tb500","ll37","wolverine"]},
  {id:"gut",label:"Gut Health",icon:"💚",sub:"Digestion, inflammation, leaky gut",peps:["bpc157","kpv","glutathione","klow"]},
  {id:"weight",label:"Weight Loss",icon:"⚡",sub:"Fat loss, appetite, metabolism",peps:["semaglutide","tirzepatide","retatrutide","aod9604"]},
  {id:"aging",label:"Anti-Aging",icon:"✨",sub:"Longevity, energy, cellular health",peps:["epithalon","ss31","nad","motsc","ghkcu"]},
  {id:"immune",label:"Immune Support",icon:"🛡️",sub:"Immunity, inflammation, defense",peps:["ta1","kpv","ll37","glutathione"]},
  {id:"brain",label:"Brain & Focus",icon:"🧠",sub:"Memory, mood, mental clarity",peps:["selank","semax","cerebrolysin","pinealon"]},
  {id:"skin",label:"Skin & Hair",icon:"💫",sub:"Collagen, glow, hair growth, tanning",peps:["ghkcu","mt1","mt2","glow"]},
  {id:"sleep",label:"Sleep & Growth Hormone",icon:"🌙",sub:"Better sleep, GH, recovery",peps:["cjcipa","ipamorelin","sermorelin","tesamorelin","tesamipa","cjcnodac"]},
  {id:"sexual",label:"Sexual Health",icon:"❤️",sub:"Libido, performance, hormones",peps:["pt141","kisspeptin","mt2"]}
];
var PEPS = {
  bpc157:{name:"BPC-157",cat:"Recovery",mw:"1419.5 Da",best:"Injury recovery, gut issues",why:"One of the most popular recovery peptides. Researched for gut healing, tendon/ligament repair, and tissue recovery.",plain:"Think of it as your body's natural repair signal, amplified. Researchers have studied it for everything from gut lining repair to injured tendons.",areas:["Gut healing and protection","Tendon and ligament repair","Muscle recovery","Joint inflammation","Wound healing"],studies:[{t:"BPC 157 in inflammatory bowel disease trials",j:"Curr Pharm Des",y:2011}],seq:"15 amino acid chain from gastric juice",store:"Keep frozen as powder. Refrigerate once mixed."},
  tb500:{name:"TB-500",cat:"Recovery",mw:"4963 Da",best:"Tissue repair, inflammation",why:"A synthetic version of a protein your body already makes. Studied for helping cells migrate to injury sites.",plain:"Your body sends TB-4 to damaged areas naturally. TB-500 is the research version of that repair signal.",areas:["Cell migration to injuries","Heart tissue repair","Reducing inflammation","Hair regrowth","Wound healing"],studies:[{t:"Thymosin B4 promotes cardiac cell migration",j:"Nature",y:2004}],seq:"Active fragment of Thymosin Beta-4",store:"Keep frozen as powder. Refrigerate once mixed."},
  ll37:{name:"LL-37",cat:"Recovery",mw:"4493 Da",best:"Infections, wound healing",why:"Your body's own antimicrobial weapon. Fights bacteria, breaks up biofilms, helps wounds heal.",plain:"Your immune system's first line of defense — kills harmful bacteria and helps repair the damage they cause.",areas:["Fighting bacterial infections","Breaking up biofilms","Wound healing","Immune defense","Skin healing"],studies:[{t:"LL-37 the only human cathelicidin",j:"Biochim Biophys Acta",y:2006}],seq:"37 amino acid antimicrobial peptide",store:"Keep frozen as powder. Refrigerate once mixed."},
  kpv:{name:"KPV",cat:"Immune",mw:"342 Da",best:"Gut inflammation, immune balance",why:"A tiny 3-amino-acid peptide that calms inflammation by turning down NF-kB, one of the body's main inflammation switches.",plain:"If inflammation is a fire, KPV helps turn off the alarm system that keeps adding fuel. Especially studied for gut inflammation.",areas:["Calming gut inflammation","Reducing intestinal swelling","Skin inflammation","Immune system balance","Antimicrobial effects"],studies:[{t:"KPV nanoparticles reduce intestinal inflammation",j:"Biomaterials",y:2020}],seq:"3 amino acids: Lys-Pro-Val",store:"Keep frozen as powder. Refrigerate once mixed."},
  ta1:{name:"Thymosin Alpha-1",cat:"Immune",mw:"3108 Da",best:"Immune boost, fighting illness",why:"One of the most proven immune peptides. Approved as a medication in 35+ countries.",plain:"This is the real deal — approved in dozens of countries. It trains your immune system to work better.",areas:["Boosting T-cell function","Fighting viral infections","Immune system training","Vaccination response","Recovery from illness"],studies:[{t:"Thymosin alpha-1 comprehensive review",j:"Expert Opin Biol Ther",y:2010}],seq:"28 amino acids from the thymus gland",store:"Keep frozen as powder. Refrigerate once mixed."},
  glutathione:{name:"Glutathione",cat:"Immune",mw:"307 Da",best:"Detox, overall health",why:"Called the master antioxidant. Every cell uses it. Levels drop as you age.",plain:"Your body's #1 detox and defense molecule. If you're feeling run down or toxic, your glutathione is probably low.",areas:["Detoxification","Reducing oxidative stress","Liver protection","Immune cell fuel","Anti-aging"],studies:[{t:"Glutathione metabolism and health",j:"J Nutr",y:2004}],seq:"3 amino acids: Glu-Cys-Gly",store:"Keep frozen as powder. Refrigerate once mixed."},
  ghkcu:{name:"GHK-Cu",cat:"Longevity",mw:"404 Da",best:"Skin, hair, anti-aging",why:"A copper peptide your body makes less of as you age. May turn on 4,000+ repair genes.",plain:"Your skin made tons of this when you were young. By 60, you have almost none. Research shows it restarts collagen production and DNA repair.",areas:["Collagen production","Skin tightening and glow","Hair growth","Wound healing","Gene activation for repair"],studies:[{t:"GHK peptide modulates cellular pathways",j:"Biomed Res Int",y:2015}],seq:"3 amino acids + copper",store:"Keep frozen as powder. Refrigerate once mixed."},
  ss31:{name:"SS-31",cat:"Longevity",mw:"641 Da",best:"Energy, cellular aging",why:"Goes directly into your mitochondria and repairs them. One of few peptides in human clinical trials.",plain:"As you age, your cells' engines break down and you lose energy. SS-31 is like a mechanic that fixes each cell's engine from the inside.",areas:["Mitochondrial repair","Cellular energy","Heart function","Kidney protection","Exercise performance"],studies:[{t:"Elamipretide in Barth syndrome trial",j:"Genet Med",y:2021}],seq:"4 amino acids targeting mitochondria",store:"Keep frozen as powder. Refrigerate once mixed."},
  epithalon:{name:"Epithalon",cat:"Longevity",mw:"390 Da",best:"Aging, sleep, telomeres",why:"The only peptide shown to activate telomerase — the enzyme that protects your DNA caps from shortening.",plain:"Your DNA has protective caps that get shorter every time cells divide. Epithalon may help rebuild them.",areas:["Telomere protection","Sleep and melatonin regulation","Circadian rhythm reset","Anti-aging genes","Antioxidant defense"],studies:[{t:"Epithalon induces telomerase in human cells",j:"Bull Exp Biol Med",y:2003}],seq:"4 amino acids: Ala-Glu-Asp-Gly",store:"Keep frozen as powder. Refrigerate once mixed."},
  motsc:{name:"MOTS-c",cat:"Longevity",mw:"2175 Da",best:"Metabolism, fitness, aging",why:"Called exercise in a molecule. Your mitochondria make this naturally and it mimics working out.",plain:"Your body releases MOTS-c when you exercise. It helps burn fat and improve insulin sensitivity — even without the gym.",areas:["Exercise mimetic effects","Blood sugar regulation","Fat metabolism","Physical performance","Metabolic protection"],studies:[{t:"MOTS-c regulates physical decline",j:"Nat Commun",y:2020}],seq:"16 amino acids from mitochondrial DNA",store:"Keep frozen as powder. Refrigerate once mixed."},
  nad:{name:"NAD+",cat:"Longevity",mw:"663 Da",best:"Energy, aging, brain fog",why:"A coenzyme that drops 50% by middle age. Low NAD+ means low energy, poor DNA repair, faster aging.",plain:"NAD+ is fuel for your cells' repair machinery. When it drops with age, everything starts breaking down faster.",areas:["Cellular energy","DNA repair","Longevity gene activation","Brain function","Metabolism"],studies:[{t:"NAD+ repletion improves mitochondrial function",j:"Science",y:2016}],seq:"Coenzyme (not a peptide)",store:"Keep frozen as powder. Refrigerate once mixed."},
  pinealon:{name:"Pinealon",cat:"Cognitive",mw:"404 Da",best:"Brain health, neuroprotection",why:"A Russian-developed bioregulator for brain and nervous system support.",plain:"A tiny 3-amino-acid peptide studied for protecting brain cells and supporting cognitive function as you age.",areas:["Brain cell protection","Nervous system support","Cognitive aging","Pineal gland function","Neuroprotection"],studies:[{t:"Neuroprotective EDR peptide in Alzheimer's models",j:"Bull Exp Biol Med",y:2016}],seq:"3 amino acids: Glu-Asp-Arg",store:"Keep frozen as powder. Refrigerate once mixed."},
  cjcnodac:{name:"CJC-1295 No DAC",cat:"Growth Hormone",mw:"3368 Da",best:"GH optimization, sleep",why:"Tells your pituitary to release growth hormone in natural pulses — like when you were younger.",plain:"As you age, your GH pulses weaken. This peptide turns up the volume without flooding your system.",areas:["Natural GH pulse stimulation","Better sleep","Fat loss","Lean muscle","Recovery"],studies:[{t:"Modified GRF(1-29) in healthy subjects",j:"J Clin Endocrinol Metab",y:2006}],seq:"29 amino acid GHRH analog",store:"Keep frozen as powder. Refrigerate once mixed."},
  cjcdac:{name:"CJC-1295 with DAC",cat:"Growth Hormone",mw:"~3647 Da",best:"Sustained GH elevation",why:"Long-acting version. Keeps GH elevated for almost a week per dose.",plain:"Same idea but stays active 6-8 days instead of hours. Simpler dosing, less natural pulsing.",areas:["Sustained GH elevation","Once-weekly dosing","IGF-1 increase","Body composition"],studies:[{t:"Prolonged GH after CJC-1295-DAC",j:"J Clin Endocrinol Metab",y:2006}],seq:"GHRH analog + albumin-binding complex",store:"Keep frozen as powder. Refrigerate once mixed."},
  ipamorelin:{name:"Ipamorelin",cat:"Growth Hormone",mw:"712 Da",best:"Clean GH boost, sleep",why:"The cleanest GH booster. Unlike older ones, it doesn't spike cortisol or prolactin.",plain:"Most GH peptides have side effects. Ipamorelin is the exception — boosts GH cleanly without messing with stress hormones.",areas:["Clean GH release","No cortisol spike","Bone density","Lean muscle","Better sleep"],studies:[{t:"Ipamorelin induces GH release",j:"Growth Horm IGF Res",y:1998}],seq:"5 amino acid ghrelin mimetic",store:"Keep frozen as powder. Refrigerate once mixed."},
  sermorelin:{name:"Sermorelin",cat:"Growth Hormone",mw:"3358 Da",best:"GH decline, sleep quality",why:"The OG of GH peptides. Originally FDA-approved in 1997 (Geref), later withdrawn from US market for commercial reasons — still available via compounding pharmacies.",plain:"The GH peptide with the longest clinical history. Used for decades in research and hormone clinics. Less potent than newer options but the most data behind it.",areas:["Longest clinical history","Natural GH stimulation","Deep sleep","Age-related GH decline","Lean body mass"],studies:[{t:"Sermorelin for adult GH insufficiency",j:"Clin Interv Aging",y:2012}],seq:"First 29 amino acids of GHRH",store:"Keep frozen as powder. Refrigerate once mixed."},
  tesamorelin:{name:"Tesamorelin",cat:"Growth Hormone",mw:"5136 Da",best:"Belly fat, metabolic health",why:"The only GH peptide with full FDA approval for therapeutic use. Approved for reducing belly fat.",plain:"FDA-approved to shrink dangerous belly fat. Also studied for brain health and liver fat. The gold standard.",areas:["FDA-approved for belly fat","Visceral fat reduction","Liver fat (NAFLD)","Cognitive function","IGF-1 normalization"],studies:[{t:"Tesamorelin reduces liver fat",j:"Hepatology",y:2019}],seq:"44 amino acid stabilized GHRH",store:"Keep frozen as powder. Refrigerate once mixed."},
  selank:{name:"Selank",cat:"Cognitive",mw:"752 Da",best:"Anxiety, focus, mood",why:"Anti-anxiety peptide approved in Russia. Works like a benzo without sedation or addiction. Boosts BDNF.",plain:"Calms anxiety and sharpens your mind at the same time. Anti-anxiety without the drowsiness.",areas:["Anxiety relief without sedation","Brain growth factor (BDNF)","Memory improvement","Mood stabilization","Focus and clarity"],studies:[{t:"Selank enhances neurotrophic factors",j:"Bull Exp Biol Med",y:2006}],seq:"7 amino acid tuftsin analog",store:"Keep frozen as powder. Refrigerate once mixed."},
  semax:{name:"Semax",cat:"Cognitive",mw:"814 Da",best:"Focus, brain health",why:"Approved in Russia for stroke recovery. Boosts BDNF and NGF — your brain's fertilizer.",plain:"Helps your brain grow new connections and protect existing ones. Used for stroke patients and cognitive decline.",areas:["Brain growth factors","Stroke recovery","Focus and attention","Neuroprotection","Mood and motivation"],studies:[{t:"Semax affects 1,000+ genes",j:"BMC Genomics",y:2014}],seq:"7 amino acid ACTH fragment",store:"Keep frozen as powder. Refrigerate once mixed."},
  cerebrolysin:{name:"Cerebrolysin",cat:"Cognitive",mw:"Mixture",best:"Brain injury, cognitive decline",why:"A mix of brain growth factors used in hospitals in 50+ countries for stroke and brain injuries.",plain:"A cocktail of brain repair proteins. The most clinically tested brain peptide — used in real hospitals.",areas:["Stroke recovery","Alzheimer's research","Brain injury repair","Memory and learning","Brain cell growth"],studies:[{t:"Cerebrolysin for acute stroke",j:"Cochrane Database",y:2020}],seq:"Mixture of neuropeptides",store:"Refrigerate the ampule. Do not freeze. Use soon after opening."},
  aod9604:{name:"AOD-9604",cat:"Metabolic",mw:"1815 Da",best:"Fat loss, joint health",why:"The fat-burning part of growth hormone without the side effects. No blood sugar issues.",plain:"Scientists took just the fat-burning part of GH and made it its own peptide. Fat loss without the downsides.",areas:["Fat burning without GH sides","No IGF-1 increase","No blood sugar impact","Joint/cartilage support","FDA GRAS status"],studies:[{t:"AOD9604 stimulates lipolysis",j:"Int J Obes",y:2000}],seq:"Fragment of GH (aa 177-191)",store:"Keep frozen as powder. Refrigerate once mixed."},
  semaglutide:{name:"Semaglutide",cat:"Metabolic",mw:"4114 Da",best:"Significant weight loss",why:"The blockbuster (Ozempic/Wegovy). FDA-approved with trials showing 15-17% weight reduction.",plain:"The one everyone is talking about. FDA-approved, backed by the biggest weight loss trials ever.",areas:["FDA-approved weight loss","Appetite suppression","Blood sugar control","Heart health","Liver fat reduction"],studies:[{t:"STEP trials for obesity",j:"N Engl J Med",y:2021}],seq:"Modified GLP-1 with fatty acid",store:"Keep frozen as powder. Refrigerate once mixed."},
  tirzepatide:{name:"Tirzepatide",cat:"Metabolic",mw:"4814 Da",best:"Maximum weight loss",why:"Hits TWO receptors. Beats semaglutide in head-to-head trials (up to 22.5% weight loss).",plain:"If semaglutide is impressive, tirzepatide is the upgrade. Outperformed Ozempic in every trial.",areas:["Beats semaglutide","Dual hormone pathway","Up to 22.5% weight loss","Better blood sugar","FDA-approved"],studies:[{t:"Tirzepatide vs semaglutide",j:"N Engl J Med",y:2024}],seq:"Dual GIP/GLP-1 agonist",store:"Keep frozen as powder. Refrigerate once mixed."},
  retatrutide:{name:"Retatrutide",cat:"Metabolic",mw:"~4600 Da",best:"Cutting-edge weight loss",why:"THREE receptors. Phase 2 showed 24.2% weight reduction — more than anything before it.",plain:"Triple action: suppresses appetite, burns more energy, AND clears liver fat. Nothing else hits all three.",areas:["Triple receptor activation","24%+ weight loss","Increased energy burn","Liver fat clearance","Next-generation"],studies:[{t:"Retatrutide for obesity Phase 2",j:"N Engl J Med",y:2023}],seq:"Triple GIP/GLP-1/Glucagon agonist",store:"Keep frozen as powder. Refrigerate once mixed."},
  pt141:{name:"PT-141",cat:"Sexual Health",mw:"1025 Da",best:"Libido, sexual function",why:"FDA-approved (Vyleesi) for low sex drive. Works in the brain, not blood vessels — different from Viagra.",plain:"Viagra works on plumbing. PT-141 works on desire. Activates arousal centers in your brain. Works for both men and women.",areas:["Brain-based arousal","Works for men and women","FDA-approved for HSDD","Different from Viagra","Melanocortin pathway"],studies:[{t:"Bremelanotide for HSDD",j:"Obstet Gynecol",y:2019}],seq:"Cyclic 7 amino acid peptide",store:"Keep frozen as powder. Refrigerate once mixed."},
  kisspeptin:{name:"Kisspeptin",cat:"Sexual Health",mw:"5861 Da",best:"Hormones, fertility",why:"The master switch for reproductive hormones. Triggers the entire hormone cascade.",plain:"The ignition key for your reproductive system. Triggers GnRH which triggers everything downstream.",areas:["Hormone cascade activation","Fertility support","LH/FSH stimulation","IVF research","Reproductive health"],studies:[{t:"Kisspeptin triggers egg maturation in IVF",j:"J Clin Invest",y:2014}],seq:"Hypothalamic neuropeptide",store:"Keep frozen as powder. Refrigerate once mixed."},
  mt1:{name:"Melanotan 1",cat:"Skin",mw:"1647 Da",best:"Skin protection, tanning",why:"FDA-approved (Scenesse). Stimulates melanin for natural UV protection.",plain:"Tells your skin to produce more melanin. FDA-approved with real clinical safety data.",areas:["FDA-approved","Natural melanin production","UV protection","Skin pigmentation","DNA repair in skin"],studies:[{t:"Afamelanotide for EPP Phase III",j:"N Engl J Med",y:2015}],seq:"13 amino acid a-MSH analog",store:"Keep frozen as powder. Refrigerate once mixed."},
  mt2:{name:"Melanotan 2",cat:"Skin",mw:"1024 Da",best:"Tanning, multiple benefits",why:"Broader-acting: tanning + appetite suppression + libido boost.",plain:"Does several things: tanning, appetite reduction, and libido. Less targeted but more versatile than MT-1.",areas:["Tanning and pigmentation","Appetite suppression","Sexual function boost","Multiple receptor activation"],studies:[{t:"Melanotan II for tanning",j:"Br J Dermatol",y:2009}],seq:"Cyclic a-MSH analog",store:"Keep frozen as powder. Refrigerate once mixed."},
  wolverine:{name:"Wolverine Blend",cat:"Blends",mw:"BPC-157 + TB-500",best:"Injury recovery, healing",why:"The most popular recovery stack. BPC-157 heals + TB-500 sends repair cells to the injury.",plain:"Two best recovery peptides combined. BPC-157 heals from the inside while TB-500 sends repair cells to the injury.",areas:["Dual repair pathways","Faster tissue healing","Joint and tendon recovery","Reduced inflammation","Comprehensive recovery"],studies:[{t:"See individual BPC-157 and TB-500 data",j:"Multiple",y:2020}],seq:"BPC-157 + TB-500 combined",store:"Keep frozen as powder. Refrigerate once mixed."},
  glow:{name:"Glow Blend",cat:"Blends",mw:"GHK-Cu + BPC-157 + TB-500",best:"Skin, recovery, anti-aging",why:"Wolverine + GHK-Cu for collagen. Three peptides covering tissue repair, collagen, and gene activation.",plain:"Everything in Wolverine plus a copper peptide that rebuilds collagen and activates repair genes. The full package.",areas:["Collagen + tissue repair","Skin rejuvenation","Wound healing","Gene activation","Anti-aging + recovery"],studies:[{t:"See individual component data",j:"Multiple",y:2020}],seq:"GHK-Cu + BPC-157 + TB-500",store:"Keep frozen as powder. Refrigerate once mixed."},
  klow:{name:"Klow Blend",cat:"Blends",mw:"4 peptides combined",best:"Full-spectrum healing",why:"The everything blend: tissue repair + collagen + immune modulation + inflammation control.",plain:"The full toolkit: heal tissue, build collagen, calm inflammation, balance your immune system. Four peptides working together.",areas:["Complete tissue repair","Immune system balance","Gut inflammation","Collagen production","Multi-pathway healing"],studies:[{t:"See individual component data",j:"Multiple",y:2020}],seq:"GHK-Cu + KPV + BPC-157 + TB-500",store:"Keep frozen as powder. Refrigerate once mixed."},
  cjcipa:{name:"CJC/Ipamorelin Blend",cat:"Blends",mw:"CJC-1295 + Ipamorelin",best:"Growth hormone, sleep",why:"The gold standard GH stack. CJC triggers GH release, Ipamorelin amplifies it.",plain:"Two peptides that hit different GH switches in your brain. The combo is stronger than either alone.",areas:["Amplified GH release","Better deep sleep","Fat loss","Lean muscle support","Recovery and repair"],studies:[{t:"See individual data",j:"Multiple",y:2010}],seq:"CJC-1295 No DAC + Ipamorelin",store:"Keep frozen as powder. Refrigerate once mixed."},
  tesamipa:{name:"Tesamorelin/Ipamorelin",cat:"Blends",mw:"Tesamorelin + Ipamorelin",best:"Premium GH optimization",why:"The premium stack: FDA-approved Tesamorelin + cleanest GH booster.",plain:"Combines an FDA-approved GH peptide with the most selective GH booster. The premium choice.",areas:["FDA-approved component","Clean GH elevation","Belly fat targeting","Metabolic improvement","Premium GH stack"],studies:[{t:"See individual data",j:"Multiple",y:2015}],seq:"Tesamorelin + Ipamorelin",store:"Keep frozen as powder. Refrigerate once mixed."}
};
// Published / commonly-reported half-life values (educational reference, not dosing advice)
var HALF_LIVES = {
  bpc157:"~4 hours",tb500:"~2 hours (long tissue retention)",ll37:"~30 minutes",kpv:"Short (~30 min)",
  ta1:"~2 hours",glutathione:"~10 minutes (IV)",ghkcu:"~2 hours",ss31:"~2.5 hours",
  epithalon:"Short — downstream effects last much longer",motsc:"Minutes (effects via gene expression)",
  nad:"~9 hours (systemic)",pinealon:"Short (~hours)",cjcnodac:"~30 minutes",cjcdac:"~8 days",
  ipamorelin:"~2 hours",sermorelin:"~10–20 minutes",tesamorelin:"~35 minutes",
  selank:"Short — effects up to 72h",semax:"Short — effects up to 24h",cerebrolysin:"Variable (protein mix)",
  aod9604:"~30 minutes",semaglutide:"~7 days",tirzepatide:"~5 days",retatrutide:"~6 days",
  pt141:"~2 hours",kisspeptin:"~28 minutes",mt1:"~1 hour",mt2:"~33 minutes",
  wolverine:"4h (BPC) + 2h (TB-500)",glow:"Varies by component",klow:"Varies by component",
  cjcipa:"30min (CJC) + 2h (Ipa)",tesamipa:"35min (Tesa) + 2h (Ipa)"
};
var S = {
  bg:"#0B1120",card:"#141D2F",surf:"#0E1528",
  a:"#5EEAD4",ab:"rgba(94,234,212,.08)",abr:"rgba(94,234,212,.15)",
  t:"#E2E8F0",d:"#94A3B8",m:"#64748B",br:"rgba(255,255,255,.06)",
  w:"#FCD34D",wb:"rgba(252,211,77,.08)",wbr:"rgba(252,211,77,.15)",
  f:"'Outfit',sans-serif"
};
var DISCLAIMER_VERSION = "2026-04-20";
function DisclaimerGate(props) {
  var acceptedS = useState(true); var accepted = acceptedS[0]; var setAccepted = acceptedS[1];
  var checkedS = useState(false); var checked = checkedS[0]; var setChecked = checkedS[1];
  useEffect(function(){
    try {
      var saved = window.localStorage.getItem("pg-disclaimer");
      if (!saved || saved !== DISCLAIMER_VERSION) {
        setAccepted(false);
      }
    } catch(e) {
      setAccepted(false);
    }
  }, []);
  function onAccept(){
    try { window.localStorage.setItem("pg-disclaimer", DISCLAIMER_VERSION); } catch(e) {}
    setAccepted(true);
  }
  function onLeave(){
    window.location.href = "https://www.google.com/";
  }
  if (accepted) return null;
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,padding:20,fontFamily:S.f}}>
      <div style={{background:S.card,borderRadius:14,padding:0,maxWidth:560,width:"100%",maxHeight:"92vh",border:"1px solid "+S.abr,display:"flex",flexDirection:"column",boxShadow:"0 25px 80px rgba(0,0,0,.6)"}}>
        <div style={{padding:"22px 26px 16px",borderBottom:"1px solid "+S.br}}>
          <div style={{fontSize:26,marginBottom:4}}>⚠️</div>
          <h2 style={{fontSize:18,fontWeight:700,margin:0,color:S.t}}>Important Notice — Please Read</h2>
          <p style={{fontSize:11,color:S.m,margin:"4px 0 0"}}>You must accept these terms to continue using this site.</p>
        </div>
        <div style={{padding:"16px 26px",overflow:"auto",flex:1,fontSize:12,color:S.d,lineHeight:1.6}}>
          <p style={{marginTop:0,color:S.t,fontWeight:500}}>PeptideGuide presents educational information on peptide compounds based on published research. All peptides referenced on this site are <strong style={{color:S.w}}>for research use only</strong> — they are not approved by the FDA or any other regulatory body for human consumption, treatment, cure, or diagnosis of any medical condition.</p>
          <p style={{color:S.t,marginBottom:10}}>By clicking "I Understand and Accept," you acknowledge and agree that:</p>
          <ol style={{paddingLeft:18,marginTop:0,marginBottom:14}}>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>You are at least 18 years of age</strong> and legally capable of entering into this agreement.</li>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>This site does not provide medical advice.</strong> Content is educational only and is not a substitute for professional medical, clinical, or pharmacological guidance. Nothing here should be interpreted as a recommendation to take any substance.</li>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>Peptides are not for human consumption.</strong> Any decision to handle, use, or administer any substance referenced here is made solely at your own risk. Consult a licensed physician before making decisions related to your health.</li>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>No guarantee of accuracy.</strong> Information reflects our interpretation of published literature and may not be current, complete, or accurate. Research on peptide compounds is evolving.</li>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>You release the site operators from all liability.</strong> You agree to hold harmless PeptideGuide, its operators, employees, affiliates, and advertisers from any claims, damages, or injuries arising from your use of this site or any information contained herein.</li>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>Tools are for organization only.</strong> The scheduler, calculator, stack tracker, and half-life references are for organizational convenience. They do not constitute medical dosing guidance or clinical advice.</li>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>Advertisements are not endorsements.</strong> Third-party ads appear on this site. Advertisers have no editorial influence. We may receive compensation for ad placements or referrals.</li>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>You are responsible for local-law compliance.</strong> Access from jurisdictions where peptide content is restricted is prohibited.</li>
          </ol>
          <p style={{marginBottom:0,fontSize:11,color:S.m,fontStyle:"italic"}}>This agreement is governed by the laws of the United States. If any provision is found unenforceable, the remainder remains in effect.</p>
        </div>
        <div style={{padding:"16px 26px 22px",borderTop:"1px solid "+S.br}}>
          <label style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",marginBottom:14}}>
            <input type="checkbox" checked={checked} onChange={function(e){setChecked(e.target.checked)}} style={{marginTop:2,flexShrink:0,width:16,height:16,accentColor:S.a}}/>
            <span style={{fontSize:12,color:S.t,lineHeight:1.5}}>I have read and understood the above. I affirm I am 18+ and I accept these terms.</span>
          </label>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button disabled={!checked} onClick={onAccept} style={{flex:1,minWidth:180,background:checked?"linear-gradient(135deg,#5EEAD4,#38BDF8)":S.surf,border:"none",color:checked?"#0B1120":S.m,padding:"12px 20px",borderRadius:8,cursor:checked?"pointer":"not-allowed",fontFamily:S.f,fontSize:13,fontWeight:700}}>I Understand and Accept</button>
            <button onClick={onLeave} style={{background:"transparent",border:"1px solid "+S.br,color:S.d,padding:"12px 20px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500}}>Leave site</button>
          </div>
        </div>
      </div>
    </div>
  );
}
function InstallPrompt() {
  var dpS = useState(null); var deferredPrompt = dpS[0]; var setDeferredPrompt = dpS[1];
  var dismissedS = useState(false); var dismissed = dismissedS[0]; var setDismissed = dismissedS[1];
  var iosModalS = useState(false); var showIOSModal = iosModalS[0]; var setShowIOSModal = iosModalS[1];
  var installedS = useState(false); var isInstalled = installedS[0]; var setIsInstalled = installedS[1];
  var isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  useEffect(function(){
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) { setIsInstalled(true); return; }
    if (window.navigator.standalone === true) { setIsInstalled(true); return; }
    function onBeforeInstall(e){ e.preventDefault(); setDeferredPrompt(e); }
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return function(){ window.removeEventListener("beforeinstallprompt", onBeforeInstall); };
  }, []);
  if (isInstalled || dismissed) return null;
  if (!deferredPrompt && !isIOS) return null;
  async function onInstall(){
    if (deferredPrompt) {
      deferredPrompt.prompt();
      var choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") setIsInstalled(true);
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  }
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap",padding:"12px 16px",borderRadius:10,background:"linear-gradient(135deg,rgba(94,234,212,.08),rgba(56,189,248,.08))",border:"1px solid "+S.abr,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10,flex:1,minWidth:200}}>
          <span style={{fontSize:20}}>📱</span>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:S.t}}>Install PeptideGuide on your phone</div>
            <div style={{fontSize:11,color:S.d}}>One tap. No app store. Opens full-screen from your home screen.</div>
          </div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <button onClick={onInstall} style={{background:"linear-gradient(135deg,#5EEAD4,#38BDF8)",border:"none",color:"#0B1120",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:700,whiteSpace:"nowrap"}}>Install</button>
          <button onClick={function(){setDismissed(true)}} title="Dismiss" style={{background:"transparent",border:"none",color:S.m,cursor:"pointer",padding:"6px 10px",fontSize:16,lineHeight:1}}>×</button>
        </div>
      </div>
      {showIOSModal && (
        <div onClick={function(){setShowIOSModal(false)}} style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:20}}>
          <div onClick={function(e){e.stopPropagation()}} style={{background:S.card,borderRadius:14,padding:24,maxWidth:380,width:"100%",border:"1px solid "+S.abr}}>
            <div style={{fontSize:32,marginBottom:8,textAlign:"center"}}>📱</div>
            <h3 style={{fontSize:18,fontWeight:700,margin:"0 0 4px",textAlign:"center",color:S.t}}>Install on iPhone</h3>
            <p style={{fontSize:12,color:S.d,marginBottom:18,textAlign:"center"}}>iPhone needs three quick taps — Apple doesn't let apps install themselves.</p>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
              {[{n:"1",t:"Tap the Share button",s:"The square with an arrow pointing up, at the bottom of Safari."},{n:"2",t:"Scroll and tap \"Add to Home Screen\"",s:"It's in the menu that slides up."},{n:"3",t:"Tap Add (top right)",s:"PeptideGuide will appear on your home screen like an app."}].map(function(step){
                return <div key={step.n} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:24,height:24,borderRadius:12,background:S.ab,color:S.a,fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{step.n}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:S.t,marginBottom:2}}>{step.t}</div>
                    <div style={{fontSize:11,color:S.d,lineHeight:1.4}}>{step.s}</div>
                  </div>
                </div>;
              })}
            </div>
            <button onClick={function(){setShowIOSModal(false)}} style={{width:"100%",background:S.ab,border:"1px solid "+S.abr,color:S.a,padding:"10px 16px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:600}}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}
// ----- Stack helpers -----
var FREQ_OPTIONS = [
  {id:"daily",label:"Daily",hours:24},
  {id:"twice-daily",label:"Twice daily",hours:12},
  {id:"eod",label:"Every other day",hours:48},
  {id:"3x-week",label:"3× per week (every 56h)",hours:56},
  {id:"weekly",label:"Weekly",hours:168}
];
function freqHours(id){ for(var i=0;i<FREQ_OPTIONS.length;i++){ if(FREQ_OPTIONS[i].id===id) return FREQ_OPTIONS[i].hours; } return 24; }
function freqLabel(id){ for(var i=0;i<FREQ_OPTIONS.length;i++){ if(FREQ_OPTIONS[i].id===id) return FREQ_OPTIONS[i].label; } return id; }
function formatAgo(ts){
  if(!ts) return "Never logged";
  var ms = Date.now() - ts;
  if (ms < 60000) return "Just now";
  var m = Math.floor(ms/60000);
  if (m < 60) return m + "m ago";
  var h = Math.floor(m/60);
  if (h < 24) return h + "h " + (m%60) + "m ago";
  var d = Math.floor(h/24);
  return d + "d " + (h%24) + "h ago";
}
function formatDueIn(ms){
  if (ms <= 0) {
    var over = Math.abs(ms);
    var m = Math.floor(over/60000);
    if (m < 60) return "Overdue " + m + "m";
    var h = Math.floor(m/60);
    if (h < 24) return "Overdue " + h + "h " + (m%60) + "m";
    var d = Math.floor(h/24);
    return "Overdue " + d + "d";
  }
  var m = Math.floor(ms/60000);
  if (m < 60) return "In " + m + "m";
  var h = Math.floor(m/60);
  if (h < 24) return "In " + h + "h " + (m%60) + "m";
  var d = Math.floor(h/24);
  return "In " + d + "d " + (h%24) + "h";
}
function dueColor(ms, frequencyHours){
  var freqMs = frequencyHours * 3600 * 1000;
  if (ms <= 0) return "#F87171"; // overdue — red
  if (ms < freqMs * 0.15) return "#FCD34D"; // <15% remaining — amber
  return "#5EEAD4"; // plenty of time — teal
}
function icsFreqRule(freqId){
  if (freqId === "daily") return "FREQ=DAILY";
  if (freqId === "twice-daily") return "FREQ=DAILY;INTERVAL=1";
  if (freqId === "eod") return "FREQ=DAILY;INTERVAL=2";
  if (freqId === "3x-week") return "FREQ=WEEKLY;BYDAY=MO,WE,FR";
  if (freqId === "weekly") return "FREQ=WEEKLY";
  return "FREQ=DAILY";
}
function icsFormatDate(d){
  var pad = function(n){return (n<10?"0":"")+n;};
  return d.getUTCFullYear() + pad(d.getUTCMonth()+1) + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + "00Z";
}
function downloadReminder(entry, peptideName){
  var freqH = freqHours(entry.frequency);
  var startMs = entry.lastInjection ? entry.lastInjection + freqH*3600*1000 : Date.now() + freqH*3600*1000;
  // If the computed start is in the past, bump forward by the frequency
  while (startMs < Date.now()) startMs += freqH*3600*1000;
  var start = new Date(startMs);
  var end = new Date(startMs + 15*60*1000); // 15-min event
  var summary = peptideName + " — " + entry.dose + " " + entry.doseUnit;
  var desc = "Scheduled from PeptideGuide My Stack." + (entry.notes ? " Notes: " + entry.notes : "");
  var lines = [
    "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//PeptideGuide//MyStack//EN","CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:"+entry.id+"@peptideguide",
    "DTSTAMP:"+icsFormatDate(new Date()),
    "DTSTART:"+icsFormatDate(start),
    "DTEND:"+icsFormatDate(end),
    "RRULE:"+icsFreqRule(entry.frequency),
    "SUMMARY:"+summary.replace(/,/g,"\\,").replace(/\n/g," "),
    "DESCRIPTION:"+desc.replace(/,/g,"\\,").replace(/\n/g," "),
    "BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:"+summary.replace(/,/g,"\\,"),"TRIGGER:-PT0M","END:VALARM",
    "END:VEVENT","END:VCALENDAR"
  ];
  var ics = lines.join("\r\n");
  var blob = new Blob([ics], {type:"text/calendar;charset=utf-8"});
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "peptide-" + entry.pepId + ".ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function(){URL.revokeObjectURL(url);}, 1000);
}
function Card(props) {
  var isClickable = !!props.onClick;
  var mergedStyle = Object.assign({background:S.card,borderRadius:14,padding:22,border:"1px solid "+S.br,cursor:isClickable?"pointer":"default",transition:"all .2s"},props.style||{});
  var origBorderColor = (mergedStyle.border || "").split(" ").slice(2).join(" ") || S.br;
  return (
    <div onClick={props.onClick} style={mergedStyle}
      onMouseEnter={function(e){if(isClickable){e.currentTarget.style.borderColor=S.abr;e.currentTarget.style.transform="translateY(-2px)"}}}
      onMouseLeave={function(e){if(isClickable){e.currentTarget.style.borderColor=origBorderColor;e.currentTarget.style.transform="none"}}}>
      {props.children}
    </div>
  );
}
function AdSlot(props) {
  if (props.compact) {
    return (
      <div style={{marginTop:props.mt||0,marginBottom:props.mb||0}}>
        <div style={{fontSize:8,color:S.m,textTransform:"uppercase",letterSpacing:".16em",marginBottom:4,textAlign:"center"}}>Advertisement</div>
        <a href={AD_LINK} target="_blank" rel="sponsored noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap",textDecoration:"none",padding:"10px 16px",borderRadius:6,background:"#0A0A0A",border:"1px solid rgba(207,255,5,.35)",transition:"all .2s"}}
          onMouseEnter={function(e){e.currentTarget.style.borderColor="#CFFF05";e.currentTarget.style.boxShadow="0 0 22px rgba(207,255,5,.18)"}}
          onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(207,255,5,.35)";e.currentTarget.style.boxShadow="none"}}>
          <div style={{display:"flex",alignItems:"center",gap:14,flex:1,minWidth:200,flexWrap:"wrap"}}>
            <img src={AD_LOGO} alt={AD_BRAND} style={{height:26,width:"auto",display:"block"}}/>
            <div style={{fontSize:10,color:"#CFFF05",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase"}}>Free shipping over $150</div>
          </div>
          <div style={{display:"inline-flex",alignItems:"center",gap:4,background:"#CFFF05",color:"#0A0A0A",padding:"7px 16px",borderRadius:2,fontSize:10,fontWeight:800,whiteSpace:"nowrap",textTransform:"uppercase",letterSpacing:".18em"}}>Shop →</div>
        </a>
      </div>
    );
  }
  return (
    <div style={{marginTop:props.mt||0,marginBottom:props.mb||0}}>
      <div style={{fontSize:9,color:S.m,textTransform:"uppercase",letterSpacing:".14em",marginBottom:6,textAlign:"center"}}>Advertisement</div>
      <a href={AD_LINK} target="_blank" rel="sponsored noopener noreferrer" style={{display:"block",textDecoration:"none",padding:"26px 28px",borderRadius:8,background:"linear-gradient(120deg,#0A0A0A 0%,#141414 55%,#0A0A0A 100%)",border:"1px solid rgba(207,255,5,.35)",transition:"all .2s",position:"relative",overflow:"hidden"}}
        onMouseEnter={function(e){e.currentTarget.style.borderColor="#CFFF05";e.currentTarget.style.boxShadow="0 0 32px rgba(207,255,5,.15)"}}
        onMouseLeave={function(e){e.currentTarget.style.borderColor="rgba(207,255,5,.35)";e.currentTarget.style.boxShadow="none"}}>
        <div style={{position:"absolute",top:0,right:0,width:"45%",height:"100%",background:"linear-gradient(135deg,transparent 40%,rgba(0,229,255,.06) 100%)",pointerEvents:"none"}}/>
        <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:20}}>
          <div style={{flex:1,minWidth:220}}>
            <div style={{fontSize:10,color:"#CFFF05",letterSpacing:".2em",fontWeight:800,marginBottom:10,textTransform:"uppercase"}}>Motocross · Off-Road · BMX · Snow</div>
            <img src={AD_LOGO} alt={AD_BRAND} style={{height:42,width:"auto",display:"block",marginBottom:10}}/>
            <div style={{fontSize:13,color:"#A1A1AA",marginBottom:14,lineHeight:1.5,fontStyle:"italic"}}>Goggles built for the dirt, the park, and everything downhill.</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"5px 14px"}}>
              {["4-Layer factory foam","Anti-fog lenses","Tear-off compatible","Interchangeable lenses"].map(function(f,i){
                return <div key={i} style={{fontSize:11,color:"#E4E4E7",display:"flex",alignItems:"center",gap:6,letterSpacing:".01em"}}>
                  <span style={{color:"#CFFF05",fontWeight:700,flexShrink:0}}>▸</span>
                  <span>{f}</span>
                </div>;
              })}
            </div>
            <div style={{fontSize:11,color:"#CFFF05",marginTop:12,fontWeight:700,letterSpacing:".06em",textTransform:"uppercase"}}>🔥 Free shipping on orders $150+</div>
          </div>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#CFFF05",color:"#0A0A0A",padding:"13px 24px",borderRadius:2,fontSize:12,fontWeight:800,whiteSpace:"nowrap",textTransform:"uppercase",letterSpacing:".18em"}}>Shop Now →</div>
        </div>
      </a>
    </div>
  );
}
export default function App() {
  var vs = useState("home"); var view = vs[0]; var setView = vs[1];
  var ss = useState(null); var sel = ss[0]; var setSel = ss[1];
  var cs = useState(null); var con = cs[0]; var setCon = cs[1];
  var ms = useState([]); var msgs = ms[0]; var setMsgs = ms[1];
  var is = useState(""); var inp = is[0]; var setInp = is[1];
  var ls = useState(false); var ld = ls[0]; var setLd = ls[1];
  var mgs = useState("10"); var mgStr = mgs[0]; var setMgStr = mgs[1];
  var mls = useState("2"); var mlStr = mls[0]; var setMlStr = mls[1];
  var ds = useState("250"); var doseStr = ds[0]; var setDoseStr = ds[1];
  var du = useState("mcg"); var doseUnit = du[0]; var setDoseUnit = du[1];
  var es = useState(""); var email = es[0]; var setEmail = es[1];
  var sb = useState(false); var submitted = sb[0]; var setSubmitted = sb[1];
  var sbErr = useState(""); var subErr = sbErr[0]; var setSubErr = sbErr[1];
  var sbLoad = useState(false); var subLoad = sbLoad[0]; var setSubLoad = sbLoad[1];
  var srS = useState(""); var searchQ = srS[0]; var setSearchQ = srS[1];
  var cfS = useState("all"); var catFilter = cfS[0]; var setCatFilter = cfS[1];
  var stackS = useState([]); var stack = stackS[0]; var setStack = stackS[1];
  var stackFormS = useState(null); var stackForm = stackFormS[0]; var setStackForm = stackFormS[1];
  var tickS = useState(0); var tickT = tickS[0]; var setTick = tickS[1];
  var endRef = useRef(null);
  // Load stack from localStorage on mount
  useEffect(function(){
    try { var raw = window.localStorage.getItem("peptide-stack-v1"); if (raw) setStack(JSON.parse(raw)); } catch(e) {}
  }, []);
  // Save stack whenever it changes
  useEffect(function(){
    try { window.localStorage.setItem("peptide-stack-v1", JSON.stringify(stack)); } catch(e) {}
  }, [stack]);
  // Tick every minute so "next due" re-renders
  useEffect(function(){
    var t = setInterval(function(){ setTick(function(x){return x+1}); }, 60000);
    return function(){ clearInterval(t); };
  }, []);
  function stackAdd(entry){
    var id = String(Date.now()) + Math.random().toString(36).slice(2,6);
    setStack(stack.concat([Object.assign({id:id,lastInjection:null,notes:""}, entry)]));
    setStackForm(null);
  }
  function stackUpdate(id, changes){
    setStack(stack.map(function(s){ return s.id===id ? Object.assign({}, s, changes) : s; }));
  }
  function stackRemove(id){
    if (typeof window!=="undefined" && !window.confirm("Remove this from your stack?")) return;
    setStack(stack.filter(function(s){ return s.id !== id; }));
  }
  useEffect(function(){if(endRef.current)endRef.current.scrollIntoView({behavior:"smooth"})},[msgs]);
  useEffect(function(){window.scrollTo(0,0)},[view,sel,con]);
  var mg = parseFloat(mgStr) || 0;
  var ml = parseFloat(mlStr) || 0;
  var doseRaw = parseFloat(doseStr) || 0;
  var doseMcg = doseUnit === "mg" ? doseRaw * 1000 : doseRaw;
  var conc = ml > 0 ? (mg * 1000) / ml : 0;
  var pepKeys = Object.keys(PEPS);
  var allCats = ["all"].concat(Array.from(new Set(pepKeys.map(function(k){return PEPS[k].cat}))));
  var filteredPepKeys = pepKeys.filter(function(id){
    var p = PEPS[id];
    var q = searchQ.trim().toLowerCase();
    var matchesSearch = q === "" || p.name.toLowerCase().indexOf(q) !== -1 || p.plain.toLowerCase().indexOf(q) !== -1 || p.best.toLowerCase().indexOf(q) !== -1 || p.cat.toLowerCase().indexOf(q) !== -1;
    var matchesCat = catFilter === "all" || p.cat === catFilter;
    return matchesSearch && matchesCat;
  });
  async function sendChat(){
    if(!inp.trim()||ld)return;
    var msg = inp.trim(); setInp("");
    setMsgs(function(p){return p.concat([{r:"u",t:msg}])});
    setLd(true);
    try {
      var resp = await fetch(CHAT_ENDPOINT,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({message:msg})
      });
      if(!resp.ok){
        var errMsg = "Sorry, I had trouble connecting (error "+resp.status+").";
        if(resp.status === 429) errMsg = "Lots of questions coming in right now. Please wait a moment and try again.";
        setMsgs(function(p){return p.concat([{r:"a",t:errMsg}])});
        setLd(false);
        return;
      }
      var data = await resp.json();
      var reply = "";
      if(data.content){
        for(var i=0;i<data.content.length;i++){
          if(data.content[i].text) reply += data.content[i].text;
        }
      }
      setMsgs(function(p){return p.concat([{r:"a",t:reply||"Hmm, I didn't get a response. Try rephrasing your question."}])});
    } catch(err) {
      setMsgs(function(p){return p.concat([{r:"a",t:"Having trouble connecting right now. Try again in a moment."}])});
    }
    setLd(false);
  }
  async function submitEmail(){
    if(!email.trim() || subLoad) return;
    var e = email.trim();
    // basic email shape check
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){
      setSubErr("That email doesn't look right — double-check it?");
      return;
    }
    setSubErr("");
    setSubLoad(true);
    try {
      var resp = await fetch(EMAIL_ENDPOINT,{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({email:e})
      });
      if(resp.ok){
        setSubmitted(true);
      } else {
        setSubErr("Couldn't subscribe right now — try again in a moment.");
      }
    } catch(err){
      setSubErr("Couldn't subscribe right now — try again in a moment.");
    }
    setSubLoad(false);
  }
  return (
    <div style={{fontFamily:S.f,background:S.bg,color:S.t,minHeight:"100vh"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <DisclaimerGate/>
      <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(11,17,32,.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid "+S.br,padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap",minHeight:56}}>
        <div onClick={function(){setView("home");setSel(null);setCon(null)}} onMouseEnter={function(e){e.currentTarget.style.opacity="0.75"}} onMouseLeave={function(e){e.currentTarget.style.opacity="1"}} style={{cursor:"pointer",fontWeight:700,fontSize:17,transition:"opacity .15s",userSelect:"none"}} title="Back to home">
          <span style={{color:S.a}}>Peptide</span>Guide
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"flex-end"}}>
          {[["home","Home"],["all","All Peptides"],["stack","My Stack"],["calc","Calculator"],["chat","Ask AI"]].map(function(x){
            return <button key={x[0]} onClick={function(){setView(x[0]);setSel(null);setCon(null)}} style={{background:view===x[0]?S.ab:"transparent",border:"1px solid "+(view===x[0]?S.abr:"transparent"),color:view===x[0]?S.a:S.t,padding:"8px 14px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:500,transition:"all .15s"}}>{x[1]}</button>
          })}
        </div>
      </nav>
      <main style={{maxWidth:900,margin:"0 auto",padding:"24px 20px"}}>
        {view==="home" && (
          <div>
            <AdSlot compact mb={8}/>
            <InstallPrompt/>
            <div style={{textAlign:"center",padding:"32px 0 32px"}}>
              <h1 style={{fontSize:30,fontWeight:700,lineHeight:1.2,margin:"0 0 10px"}}>What do you need help with?</h1>
              <p style={{fontSize:15,color:S.d,maxWidth:460,margin:"0 auto"}}>Tap your concern and we'll show you which peptides researchers have studied for it.</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12,marginBottom:32}}>
              {CONCERNS.map(function(c){
                return (
                  <Card key={c.id} onClick={function(){setCon(c);setView("concern")}}>
                    <div style={{fontSize:28,marginBottom:8}}>{c.icon}</div>
                    <h3 style={{fontSize:17,fontWeight:600,margin:"0 0 4px"}}>{c.label}</h3>
                    <p style={{fontSize:13,color:S.d,margin:"0 0 10px"}}>{c.sub}</p>
                    <div style={{fontSize:11,color:S.a}}>{c.peps.length} peptides studied</div>
                  </Card>
                );
              })}
            </div>
            <Card style={{background:"linear-gradient(135deg,rgba(239,68,68,.06),rgba(251,146,60,.06))",border:"1px solid rgba(239,68,68,.15)",marginBottom:14}}>
              <div style={{fontSize:32,marginBottom:8}}>⚠️</div>
                <h3 style={{fontSize:18,fontWeight:700,margin:"0 0 6px"}}>Are Your Peptides Actually Safe?</h3>
                <p style={{fontSize:13,color:S.d,margin:"0 0 10px",lineHeight:1.5}}>Most online peptide sellers are reselling cheap, unverified product from overseas labs with no real quality control. No sterility testing. No endotoxin testing. No way to verify what's actually in the vial. And since most peptides are injected, you're putting whatever is in that vial directly into your body.</p>
                <p style={{fontSize:13,color:S.t,margin:"0 0 10px",lineHeight:1.5,fontWeight:500}}>What you should demand from any supplier:</p>
                <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:12}}>
                  {["American made — manufactured in the USA, not imported and relabeled","Pharmaceutical grade — not just 'research grade' from an unknown lab","GMP certified facility — the same manufacturing standard as real medications","99%+ purity verified by third-party testing","Actual milligram content tested to be at or above the label — not rounded up on an underfilled vial","Third-party sterility testing on every batch","Third-party endotoxin testing on every batch","Certificate of Analysis (COA) included with every single peptide","All testing documents viewable and downloadable — not hidden or 'available upon request'"].map(function(item,i){
                    return <div key={i} style={{fontSize:12,color:S.t,display:"flex",alignItems:"flex-start",gap:8}}>
                      <span style={{color:"#5EEAD4",fontWeight:700,flexShrink:0}}>✓</span>
                      <span>{item}</span>
                    </div>;
                  })}
                </div>
                <p style={{fontSize:13,color:"#F87171",margin:"0 0 4px",lineHeight:1.5,fontWeight:500}}>If your supplier can't check every one of these boxes, you don't know what you're putting in your body.</p>
                <p style={{fontSize:12,color:S.d,margin:"0 0 12px",lineHeight:1.5}}>Many sellers claim "99% purity" but can't show you the documents to prove it. Many claim "USA made" but operate from a virtual office with no lab. And many quietly round their labels up — a vial sold as "10mg" tests at 7mg and they pocket the rest, every order, forever. Always ask to see the actual test results — and if they can't show them to you instantly, walk away.</p>
                <button onClick={function(){setView("chat")}} style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",color:"#FCA5A5",padding:"8px 16px",borderRadius:6,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500}}>Have questions about supplier quality? Ask our AI →</button>
            </Card>
            <Card onClick={function(){setView("calc")}} style={{background:"linear-gradient(135deg,rgba(94,234,212,.06),rgba(56,189,248,.06))",border:"1px solid "+S.abr,marginBottom:20}}>
              <div style={{fontSize:32,marginBottom:8}}>🧪</div>
              <h3 style={{fontSize:18,fontWeight:700,margin:"0 0 6px"}}>Reconstitution Calculator</h3>
              <p style={{fontSize:13,color:S.d,margin:"0 0 10px",lineHeight:1.5}}>Got your peptides but not sure how to mix them? Our calculator tells you exactly how much water to add and how much to draw per dose.</p>
              <div style={{fontSize:13,color:S.a,fontWeight:600}}>Open Calculator →</div>
            </Card>
            <div style={{textAlign:"center",marginBottom:24}}>
              <p style={{fontSize:13,color:S.m,marginBottom:10}}>Not sure what you need?</p>
              <button onClick={function(){setView("chat")}} style={{background:S.ab,border:"1px solid "+S.abr,color:S.a,padding:"10px 24px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:500}}>Ask the AI →</button>
            </div>
            <AdSlot mb={20}/>
            <Card style={{background:"linear-gradient(135deg,rgba(94,234,212,.06),rgba(56,189,248,.06))",border:"1px solid "+S.abr,textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:24,marginBottom:6}}>📬</div>
              <h3 style={{fontSize:18,fontWeight:700,margin:"0 0 6px"}}>Stay in the Loop</h3>
              <p style={{fontSize:13,color:S.d,margin:"0 0 16px",maxWidth:460,marginLeft:"auto",marginRight:"auto"}}>Get peptide research updates, new compound breakdowns, and exclusive access to pharmaceutical-grade sourcing — straight to your inbox.</p>
              {!submitted ? (
                <div>
                  <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",maxWidth:440,margin:"0 auto"}}>
                    <input value={email} onChange={function(e){setEmail(e.target.value);setSubErr("")}} onKeyDown={function(e){if(e.key==="Enter")submitEmail()}} placeholder="Enter your email" type="email" style={{flex:1,minWidth:200,padding:"11px 14px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13,outline:"none"}} />
                    <button disabled={subLoad} onClick={submitEmail} style={{background:"linear-gradient(135deg,#5EEAD4,#38BDF8)",border:"none",color:"#0B1120",padding:"11px 24px",borderRadius:8,cursor:subLoad?"wait":"pointer",fontFamily:S.f,fontSize:13,fontWeight:600,opacity:subLoad?0.7:1}}>{subLoad?"…":"Subscribe"}</button>
                  </div>
                  {subErr && <div style={{fontSize:12,color:"#F87171",marginTop:8}}>{subErr}</div>}
                </div>
              ) : (
                <div style={{fontSize:14,color:S.a,fontWeight:500}}>You're in. Watch your inbox.</div>
              )}
              <p style={{fontSize:10,color:S.m,marginTop:10,marginBottom:0}}>No spam. Unsubscribe anytime.</p>
            </Card>
          </div>
        )}
        {view==="concern" && con && (
          <div>
            <button onClick={function(){setView("home");setCon(null)}} style={{background:S.surf,border:"1px solid "+S.br,color:S.t,padding:"8px 14px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500,marginBottom:20,display:"inline-flex",alignItems:"center",gap:6}}>← Home</button>
            <div style={{fontSize:36,marginBottom:8}}>{con.icon}</div>
            <h1 style={{fontSize:26,fontWeight:700,margin:"0 0 4px"}}>{con.label}</h1>
            <p style={{fontSize:14,color:S.d,marginBottom:24}}>Peptides researchers have studied for {con.sub.toLowerCase()}</p>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {con.peps.map(function(pid){
                var p = PEPS[pid]; if(!p) return null;
                return (
                  <Card key={pid} onClick={function(){setSel(pid);setView("detail")}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                      <h3 style={{fontSize:18,fontWeight:600,margin:0}}>{p.name}</h3>
                      <span style={{fontSize:10,color:S.a,background:S.ab,padding:"3px 8px",borderRadius:4}}>{p.best}</span>
                    </div>
                    <p style={{fontSize:14,color:S.d,lineHeight:1.6,margin:"0 0 12px"}}>{p.plain}</p>
                    <div style={{fontSize:12,color:S.a}}>Learn more</div>
                  </Card>
                );
              })}
            </div>
            <div style={{marginTop:24}}><AdSlot/></div>
          </div>
        )}
        {view==="detail" && sel && PEPS[sel] && (function(){
          var p = PEPS[sel];
          var related = Object.keys(PEPS).filter(function(k){return k !== sel && PEPS[k].cat === p.cat}).slice(0,3);
          return (
            <div>
              <button onClick={function(){setSel(null);setView(con?"concern":"all")}} style={{background:S.surf,border:"1px solid "+S.br,color:S.t,padding:"8px 14px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500,marginBottom:20,display:"inline-flex",alignItems:"center",gap:6}}>← {con ? con.label : "All Peptides"}</button>
              <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:6}}>
                <h1 style={{fontSize:28,fontWeight:700,margin:0}}>{p.name}</h1>
                <span style={{fontSize:11,color:S.a,background:S.ab,border:"1px solid "+S.abr,padding:"4px 10px",borderRadius:16,fontWeight:500}}>{p.best}</span>
              </div>
              <p style={{fontSize:15,color:S.d,marginBottom:20}}>{p.why}</p>
              <Card style={{background:S.wb,border:"1px solid "+S.wbr,marginBottom:14}}>
                <h3 style={{fontSize:14,fontWeight:600,marginBottom:6,color:S.w}}>In Plain English</h3>
                <p style={{fontSize:14,lineHeight:1.7,margin:0}}>{p.plain}</p>
              </Card>
              <Card style={{marginBottom:14}}>
                <h3 style={{fontSize:14,fontWeight:600,marginBottom:10}}>What Researchers Have Studied It For</h3>
                {p.areas.map(function(a,i){return <div key={i} style={{padding:"8px 12px",background:S.surf,borderRadius:6,marginBottom:4,fontSize:13,display:"flex",gap:8}}><span style={{color:S.a}}>+</span>{a}</div>})}
              </Card>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:S.br,borderRadius:10,overflow:"hidden",marginBottom:14}}>
                {[["Molecular Weight",p.mw],["Half-Life",HALF_LIVES[sel]||"—"],["Source",p.seq],["Storage",p.store],["Category",p.cat]].map(function(x,i){return <div key={i} style={{background:S.card,padding:"12px 14px"}}><div style={{fontSize:9,color:S.m,textTransform:"uppercase",letterSpacing:".08em",marginBottom:3}}>{x[0]}</div><div style={{fontSize:12,fontWeight:500}}>{x[1]}</div></div>})}
              </div>
              <Card style={{marginBottom:14}}>
                <h3 style={{fontSize:14,fontWeight:600,marginBottom:8}}>Published Research</h3>
                {p.studies.map(function(st,i){return <div key={i} style={{padding:"8px 12px",background:S.surf,borderRadius:6,marginBottom:4}}><div style={{fontSize:12,fontWeight:500,marginBottom:2}}>{st.t}</div><div style={{fontSize:10,color:S.m,fontStyle:"italic"}}>{st.j} ({st.y})</div></div>})}
              </Card>
              {related.length > 0 && (
                <div style={{marginBottom:14}}>
                  <h3 style={{fontSize:14,fontWeight:600,marginBottom:10,color:S.t}}>You might also look at</h3>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
                    {related.map(function(rid){
                      var rp = PEPS[rid];
                      return (
                        <Card key={rid} onClick={function(){setSel(rid);window.scrollTo(0,0)}} style={{padding:16}}>
                          <h4 style={{fontSize:14,fontWeight:600,margin:"0 0 4px"}}>{rp.name}</h4>
                          <p style={{fontSize:11,color:S.d,margin:"0 0 6px",lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{rp.plain}</p>
                          <div style={{fontSize:10,color:S.a}}>{rp.best} →</div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
              <AdSlot/>
            </div>
          );
        })()}
        {view==="all" && (
          <div>
            <h2 style={{fontSize:24,fontWeight:700,marginBottom:4}}>All Peptides</h2>
            <p style={{color:S.d,fontSize:13,marginBottom:16}}>{pepKeys.length} compounds available</p>
            <div style={{marginBottom:16}}>
              <div style={{position:"relative",marginBottom:10}}>
                <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:14,color:S.m,pointerEvents:"none"}}>🔍</span>
                <input value={searchQ} onChange={function(e){setSearchQ(e.target.value)}} placeholder="Search by name, benefit, or category..." style={{width:"100%",boxSizing:"border-box",padding:"10px 14px 10px 38px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13,outline:"none"}}/>
                {searchQ && <button onClick={function(){setSearchQ("")}} style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",color:S.d,cursor:"pointer",padding:"4px 8px",fontSize:14}}>✕</button>}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {allCats.map(function(c){
                  var active = catFilter === c;
                  return <button key={c} onClick={function(){setCatFilter(c)}} style={{background:active?S.ab:"transparent",border:"1px solid "+(active?S.abr:S.br),color:active?S.a:S.d,padding:"5px 12px",borderRadius:14,cursor:"pointer",fontFamily:S.f,fontSize:11,fontWeight:500}}>{c === "all" ? "All" : c}</button>
                })}
              </div>
            </div>
            {filteredPepKeys.length === 0 ? (
              <div style={{textAlign:"center",padding:"40px 20px",color:S.d}}>
                <div style={{fontSize:32,marginBottom:8}}>🔍</div>
                <p style={{fontSize:14,marginBottom:4}}>No peptides match your search.</p>
                <button onClick={function(){setSearchQ("");setCatFilter("all")}} style={{background:"transparent",border:"1px solid "+S.br,color:S.a,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontFamily:S.f,fontSize:12,marginTop:8}}>Clear filters</button>
              </div>
            ) : (
              <div>
                <p style={{fontSize:11,color:S.m,marginBottom:10}}>Showing {filteredPepKeys.length} of {pepKeys.length}</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12}}>
                  {filteredPepKeys.map(function(id){
                    var p = PEPS[id];
                    return (
                      <Card key={id} onClick={function(){setSel(id);setView("detail")}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                          <span style={{fontSize:10,color:S.a,background:S.ab,padding:"2px 6px",borderRadius:4}}>{p.cat}</span>
                          <span style={{fontSize:9,color:S.m}}>{p.mw}</span>
                        </div>
                        <h3 style={{fontSize:16,fontWeight:600,margin:"0 0 4px"}}>{p.name}</h3>
                        <p style={{fontSize:12,color:S.d,margin:"0 0 8px",lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"}}>{p.plain}</p>
                        <div style={{fontSize:11,color:S.a}}>{p.best}</div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        {view==="calc" && (
          <div>
            <h2 style={{fontSize:24,fontWeight:700,marginBottom:4}}>Reconstitution Calculator</h2>
            <p style={{color:S.d,fontSize:13,marginBottom:16}}>Figure out your concentration and volume per dose</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
              <Card>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12,color:S.d,display:"block",marginBottom:4}}>Peptide amount (mg)</label>
                  <input type="text" inputMode="decimal" value={mgStr} onChange={function(e){setMgStr(e.target.value.replace(/[^0-9.]/g,""))}} style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontSize:16,fontFamily:"monospace"}}/>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12,color:S.d,display:"block",marginBottom:4}}>Water added (mL)</label>
                  <input type="text" inputMode="decimal" value={mlStr} onChange={function(e){setMlStr(e.target.value.replace(/[^0-9.]/g,""))}} style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontSize:16,fontFamily:"monospace"}}/>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12,color:S.d,display:"block",marginBottom:4}}>Desired dose</label>
                  <div style={{display:"flex",gap:8}}>
                    <input type="text" inputMode="decimal" value={doseStr} onChange={function(e){setDoseStr(e.target.value.replace(/[^0-9.]/g,""))}} style={{flex:1,padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontSize:16,fontFamily:"monospace"}}/>
                    <div style={{display:"flex",borderRadius:8,overflow:"hidden",border:"1px solid "+S.br}}>
                      <button onClick={function(){setDoseUnit("mcg")}} style={{background:doseUnit==="mcg"?S.ab:S.surf,border:"none",color:doseUnit==="mcg"?S.a:S.d,padding:"10px 14px",cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:600}}>mcg</button>
                      <button onClick={function(){setDoseUnit("mg")}} style={{background:doseUnit==="mg"?S.ab:S.surf,border:"none",borderLeft:"1px solid "+S.br,color:doseUnit==="mg"?S.a:S.d,padding:"10px 14px",cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:600}}>mg</button>
                    </div>
                  </div>
                </div>
                <div style={{fontSize:12,color:S.d,padding:10,background:S.surf,borderRadius:6}}>Use bacteriostatic water (recommended)</div>
              </Card>
              <Card>
                <div style={{background:"linear-gradient(135deg,rgba(94,234,212,.1),rgba(56,189,248,.1))",borderRadius:12,padding:22,marginBottom:14,border:"1px solid "+S.abr,textAlign:"center"}}>
                  <div style={{fontSize:11,color:S.d,marginBottom:2,textTransform:"uppercase",letterSpacing:"0.08em"}}>Draw on your syringe</div>
                  <div style={{fontSize:42,fontWeight:700,color:S.a,fontFamily:"monospace",lineHeight:1.1}}>{conc > 0 && doseMcg > 0 ? ((doseMcg/conc)*100).toFixed(1) : "—"}</div>
                  <div style={{fontSize:16,fontWeight:600,color:S.a,marginTop:2}}>units</div>
                  {conc > 0 && doseMcg > 0 && <div style={{fontSize:12,color:S.d,marginTop:6}}>({(doseMcg/conc).toFixed(3)} mL on a U-100 insulin syringe)</div>}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                  <div style={{background:S.surf,borderRadius:8,padding:14}}>
                    <div style={{fontSize:11,color:S.d,marginBottom:2}}>Concentration</div>
                    <div style={{fontSize:18,fontWeight:700}}>{conc > 0 ? conc.toLocaleString() : "—"}</div>
                    <div style={{fontSize:11,color:S.d}}>mcg/mL</div>
                  </div>
                  <div style={{background:S.surf,borderRadius:8,padding:14}}>
                    <div style={{fontSize:11,color:S.d,marginBottom:2}}>Doses per vial</div>
                    <div style={{fontSize:18,fontWeight:700}}>{doseMcg > 0 ? Math.floor((mg*1000)/doseMcg) : "—"}</div>
                    {doseMcg > 0 && <div style={{fontSize:11,color:S.d}}>at {doseStr} {doseUnit} each</div>}
                  </div>
                </div>
                <div style={{fontSize:10,color:S.m,padding:8,background:"rgba(250,200,50,.05)",borderRadius:4}}>For lab reference only. Talk to a doctor for medical guidance.</div>
              </Card>
            </div>
          </div>
        )}
        {view==="chat" && (
          <div style={{maxWidth:640,margin:"0 auto"}}>
            <h2 style={{fontSize:24,fontWeight:700,marginBottom:4}}>Ask Our AI</h2>
            <p style={{color:S.d,fontSize:13,marginBottom:16}}>Describe what you are dealing with and I will point you to the right peptides.</p>
            <Card style={{height:420,display:"flex",flexDirection:"column",padding:0,overflow:"hidden"}}>
              <div style={{flex:1,overflow:"auto",padding:16}}>
                {msgs.length===0 && (
                  <div style={{textAlign:"center",paddingTop:50}}>
                    <div style={{fontSize:28,marginBottom:10}}>💬</div>
                    <p style={{fontSize:14,fontWeight:500,marginBottom:4}}>Tell me what's going on</p>
                    <p style={{fontSize:12,color:S.d,marginBottom:16}}>I will explain which peptides have been researched for your situation.</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"}}>
                      {["I have a nagging knee injury","I want to lose weight","My gut has been messed up","I feel tired and old","I can't focus or think clearly"].map(function(q,i){
                        return <button key={i} onClick={function(){setInp(q)}} style={{background:S.surf,border:"1px solid "+S.br,color:S.t,padding:"8px 14px",borderRadius:20,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500}}>{q}</button>
                      })}
                    </div>
                  </div>
                )}
                {msgs.map(function(m,i){
                  return <div key={i} style={{display:"flex",justifyContent:m.r==="u"?"flex-end":"flex-start",marginBottom:10}}>
                    <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:10,background:m.r==="u"?S.ab:S.surf,border:"1px solid "+(m.r==="u"?S.abr:S.br)}}>
                      <div style={{fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{m.t}</div>
                    </div>
                  </div>
                })}
                {ld && <div style={{fontSize:12,color:S.m,padding:8}}>Thinking...</div>}
                <div ref={endRef}/>
              </div>
              <div style={{padding:"12px 14px",borderTop:"1px solid "+S.br,display:"flex",gap:8,alignItems:"flex-end"}}>
                <textarea value={inp} onChange={function(e){setInp(e.target.value)}} onKeyDown={function(e){if(e.key==="Enter" && !e.shiftKey){e.preventDefault();sendChat()}}} placeholder="Describe what you need help with..." rows={1} style={{flex:1,padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13,outline:"none",resize:"none",minHeight:42,maxHeight:120,lineHeight:1.4}}/>
                <button onClick={sendChat} style={{background:"linear-gradient(135deg,#5EEAD4,#38BDF8)",border:"none",color:"#0B1120",padding:"10px 16px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:600,height:42}}>Send</button>
              </div>
            </Card>
            <div style={{marginTop:10,fontSize:10,color:S.m,textAlign:"center"}}>This AI shares research info only. Not medical advice. Talk to a doctor for personal guidance.</div>
          </div>
        )}
        {view==="stack" && (
          <div>
            <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:6}}>
              <h2 style={{fontSize:24,fontWeight:700,margin:0}}>My Stack</h2>
              <button onClick={function(){setStackForm({pepId:"",dose:"",doseUnit:"mcg",frequency:"daily",notes:""})}} style={{background:"linear-gradient(135deg,#5EEAD4,#38BDF8)",border:"none",color:"#0B1120",padding:"9px 16px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:700}}>+ Add peptide</button>
            </div>
            <p style={{color:S.d,fontSize:13,marginBottom:12}}>Track what you've taken, when you took it, and when the next dose is due. All data stays on this device.</p>
            <div style={{padding:"10px 14px",borderRadius:8,background:"rgba(250,200,50,.05)",border:"1px solid "+S.wbr,marginBottom:18,fontSize:11,color:S.d,lineHeight:1.5}}>
              <strong style={{color:S.w}}>Disclaimer —</strong> This tool is for personal organization only. It is not medical advice, dosing guidance, or a substitute for a licensed clinician. Peptides discussed on this site are for research use only. Consult a physician for anything related to your health.
            </div>
            {stack.length === 0 && !stackForm && (
              <div style={{textAlign:"center",padding:"50px 20px",background:S.card,borderRadius:12,border:"1px solid "+S.br}}>
                <div style={{fontSize:36,marginBottom:10}}>📋</div>
                <p style={{fontSize:14,color:S.t,marginBottom:4,fontWeight:500}}>Your stack is empty.</p>
                <p style={{fontSize:12,color:S.d,marginBottom:16}}>Add a peptide to start tracking.</p>
                <button onClick={function(){setStackForm({pepId:"",dose:"",doseUnit:"mcg",frequency:"daily",notes:""})}} style={{background:S.ab,border:"1px solid "+S.abr,color:S.a,padding:"9px 18px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:500}}>+ Add your first peptide</button>
              </div>
            )}
            {stackForm && (
              <Card style={{marginBottom:14,border:"1px solid "+S.abr}}>
                <h3 style={{fontSize:15,fontWeight:600,marginBottom:12}}>Add peptide to stack</h3>
                <div style={{marginBottom:12}}>
                  <label style={{fontSize:11,color:S.d,display:"block",marginBottom:4}}>Peptide</label>
                  <select value={stackForm.pepId} onChange={function(e){setStackForm(Object.assign({},stackForm,{pepId:e.target.value}))}} style={{width:"100%",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13}}>
                    <option value="">— pick one —</option>
                    {pepKeys.map(function(id){return <option key={id} value={id}>{PEPS[id].name} ({PEPS[id].cat})</option>})}
                  </select>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:10,marginBottom:12}}>
                  <div>
                    <label style={{fontSize:11,color:S.d,display:"block",marginBottom:4}}>Dose</label>
                    <input type="text" inputMode="decimal" value={stackForm.dose} onChange={function(e){setStackForm(Object.assign({},stackForm,{dose:e.target.value.replace(/[^0-9.]/g,"")}))}} placeholder="e.g. 250" style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontSize:14,fontFamily:"monospace"}}/>
                  </div>
                  <div>
                    <label style={{fontSize:11,color:S.d,display:"block",marginBottom:4}}>Unit</label>
                    <select value={stackForm.doseUnit} onChange={function(e){setStackForm(Object.assign({},stackForm,{doseUnit:e.target.value}))}} style={{width:"100%",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13}}>
                      <option value="mcg">mcg</option>
                      <option value="mg">mg</option>
                      <option value="iu">IU</option>
                      <option value="units">units</option>
                    </select>
                  </div>
                </div>
                <div style={{marginBottom:12}}>
                  <label style={{fontSize:11,color:S.d,display:"block",marginBottom:4}}>Frequency</label>
                  <select value={stackForm.frequency} onChange={function(e){setStackForm(Object.assign({},stackForm,{frequency:e.target.value}))}} style={{width:"100%",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13}}>
                    {FREQ_OPTIONS.map(function(f){return <option key={f.id} value={f.id}>{f.label}</option>})}
                  </select>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:11,color:S.d,display:"block",marginBottom:4}}>Notes (optional)</label>
                  <textarea value={stackForm.notes} onChange={function(e){setStackForm(Object.assign({},stackForm,{notes:e.target.value}))}} rows={2} placeholder="e.g. morning, subcutaneous, cycle 1" style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13,resize:"vertical"}}/>
                </div>
                <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                  <button onClick={function(){setStackForm(null)}} style={{background:"transparent",border:"1px solid "+S.br,color:S.d,padding:"9px 16px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12}}>Cancel</button>
                  <button disabled={!stackForm.pepId || !stackForm.dose} onClick={function(){stackAdd(stackForm)}} style={{background:stackForm.pepId && stackForm.dose ? "linear-gradient(135deg,#5EEAD4,#38BDF8)" : S.surf,border:"none",color:stackForm.pepId && stackForm.dose ? "#0B1120" : S.m,padding:"9px 18px",borderRadius:8,cursor:stackForm.pepId && stackForm.dose ? "pointer" : "not-allowed",fontFamily:S.f,fontSize:12,fontWeight:700}}>Save</button>
                </div>
              </Card>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {stack.map(function(s){
                var p = PEPS[s.pepId]; if(!p) return null;
                var freqH = freqHours(s.frequency);
                var nextTs = s.lastInjection ? s.lastInjection + freqH*3600*1000 : null;
                var msRemaining = nextTs ? nextTs - Date.now() : null;
                return (
                  <Card key={s.id}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10,marginBottom:8,flexWrap:"wrap"}}>
                      <div>
                        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:2}}>
                          <h3 onClick={function(){setSel(s.pepId);setView("detail");setCon(null)}} style={{fontSize:17,fontWeight:600,margin:0,cursor:"pointer"}}>{p.name}</h3>
                          <span style={{fontSize:10,color:S.a,background:S.ab,padding:"2px 8px",borderRadius:4}}>{p.cat}</span>
                        </div>
                        <div style={{fontSize:12,color:S.d}}>{s.dose} {s.doseUnit} · {freqLabel(s.frequency)} · half-life {HALF_LIVES[s.pepId] || "—"}</div>
                      </div>
                      <button onClick={function(){stackRemove(s.id)}} title="Remove" style={{background:"transparent",border:"none",color:S.m,cursor:"pointer",padding:"4px 8px",fontSize:14}}>×</button>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,background:S.surf,borderRadius:8,padding:12,marginBottom:10}}>
                      <div>
                        <div style={{fontSize:9,color:S.m,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Last taken</div>
                        <div style={{fontSize:13,fontWeight:500,color:S.t}}>{formatAgo(s.lastInjection)}</div>
                      </div>
                      <div>
                        <div style={{fontSize:9,color:S.m,textTransform:"uppercase",letterSpacing:".08em",marginBottom:2}}>Next due</div>
                        <div style={{fontSize:13,fontWeight:600,color:msRemaining!==null?dueColor(msRemaining,freqH):S.m}}>{msRemaining!==null?formatDueIn(msRemaining):"—"}</div>
                      </div>
                    </div>
                    {s.notes && <div style={{fontSize:11,color:S.d,fontStyle:"italic",marginBottom:10,padding:"6px 10px",background:S.surf,borderRadius:6}}>{s.notes}</div>}
                    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:8}}>
                      <button onClick={function(){stackUpdate(s.id,{lastInjection:Date.now()})}} style={{background:S.ab,border:"1px solid "+S.abr,color:S.a,padding:"10px 16px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:600}}>✓ Log injection now</button>
                      <button onClick={function(){downloadReminder(s, p.name)}} title="Add a recurring reminder to your calendar" style={{background:"transparent",border:"1px solid "+S.br,color:S.t,padding:"10px 12px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:5}}>🔔 Remind me</button>
                    </div>
                  </Card>
                );
              })}
            </div>
            {stack.length > 0 && <p style={{fontSize:10,color:S.m,textAlign:"center",marginTop:16}}>Saved to this device only. Clearing your browser data will erase your stack.</p>}
          </div>
        )}
      </main>
      <footer style={{borderTop:"1px solid "+S.br,marginTop:40}}>
        <div style={{maxWidth:900,margin:"0 auto",padding:"24px 20px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:20}}>
          <div style={{minWidth:180}}>
            <div onClick={function(){setView("home");setSel(null);setCon(null)}} style={{fontWeight:700,fontSize:15,marginBottom:6,cursor:"pointer"}}>
              <span style={{color:S.a}}>Peptide</span>Guide
            </div>
            <div style={{fontSize:10,color:S.m,lineHeight:1.6}}>Research-backed peptide education.<br/>© {new Date().getFullYear()} PeptideGuide.</div>
          </div>
          <div style={{flex:1,maxWidth:520,fontSize:10,color:S.m,lineHeight:1.7,textAlign:"right"}}>
            <p style={{margin:"0 0 6px"}}>All products referenced are for research use only. Content reflects published scientific literature and is not medical advice, diagnosis, or treatment.</p>
            <p style={{margin:0}}>Consult a licensed physician before starting any new health regimen. Peptides discussed on this site are not FDA-approved except where explicitly noted.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
