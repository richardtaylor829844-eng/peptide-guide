import { useState, useEffect, useRef } from "react";
import {
  CHAT_ENDPOINT, EMAIL_ENDPOINT,
  S, CONCERNS, PEPS, HALF_LIVES, FREQ_OPTIONS
} from "./data.js";
import { freqHours, freqLabel, formatAgo, formatDueIn, dueColor, downloadReminder } from "./utils.js";
import { DisclaimerGate, InstallPrompt, Card } from "./components.jsx";

export default function App() {
  const [view, setView] = useState("home");
  const [sel, setSel] = useState(null);
  const [con, setCon] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState("");
  const [ld, setLd] = useState(false);
  const [mgStr, setMgStr] = useState("10");
  const [mlStr, setMlStr] = useState("2");
  const [doseStr, setDoseStr] = useState("250");
  const [doseUnit, setDoseUnit] = useState("mcg");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [subErr, setSubErr] = useState("");
  const [subLoad, setSubLoad] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [gateEmail, setGateEmail] = useState("");
  const [gateLoading, setGateLoading] = useState(false);
  const [gateErr, setGateErr] = useState("");
  const [stack, setStack] = useState([]);
  const [stackForm, setStackForm] = useState(null);
  const [, setTick] = useState(0);
  const endRef = useRef(null);

  // Load stack + unlock state from localStorage on mount
  useEffect(() => {
    try { const raw = window.localStorage.getItem("peptide-stack-v1"); if (raw) setStack(JSON.parse(raw)); } catch (e) {}
    try { if (window.localStorage.getItem("pg-email-unlocked") === "1") setEmailUnlocked(true); } catch (e) {}
  }, []);

  async function submitGateEmail() {
    const e = gateEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      setGateErr("That email doesn't look right — double-check it?");
      return;
    }
    setGateErr("");
    setGateLoading(true);
    try {
      const resp = await fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email: e, source: "unlock-gate" })
      });
      if (resp.ok) {
        try { window.localStorage.setItem("pg-email-unlocked", "1"); } catch (e) {}
        setEmailUnlocked(true);
        setGateEmail("");
      } else {
        setGateErr("Couldn't sign you up right now — try again in a moment.");
      }
    } catch (err) {
      setGateErr("Couldn't sign you up right now — try again in a moment.");
    }
    setGateLoading(false);
  }

  function dismissGate() {
    setView("home");
    setSel(null);
    setCon(null);
    setGateEmail("");
    setGateErr("");
  }

  // Email gates disabled for now — everything is free.
  const GATED_VIEWS = [];
  const showEmailGate = !emailUnlocked && GATED_VIEWS.indexOf(view) >= 0;

  useEffect(() => {
    try { window.localStorage.setItem("peptide-stack-v1", JSON.stringify(stack)); } catch (e) {}
  }, [stack]);

  // Tick every minute so "next due" re-renders
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 60000);
    return () => clearInterval(t);
  }, []);

  function stackAdd(entry) {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 6);
    setStack(stack.concat([Object.assign({ id, lastInjection: null, notes: "" }, entry)]));
    setStackForm(null);
  }
  function stackUpdate(id, changes) {
    setStack(stack.map((s) => s.id === id ? Object.assign({}, s, changes) : s));
  }
  function stackRemove(id) {
    if (typeof window !== "undefined" && !window.confirm("Remove this from your stack?")) return;
    setStack(stack.filter((s) => s.id !== id));
  }

  useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth" }) }, [msgs]);
  useEffect(() => { window.scrollTo(0, 0) }, [view, sel, con]);

  const mg = parseFloat(mgStr) || 0;
  const ml = parseFloat(mlStr) || 0;
  const doseRaw = parseFloat(doseStr) || 0;
  const doseMcg = doseUnit === "mg" ? doseRaw * 1000 : doseRaw;
  const conc = ml > 0 ? (mg * 1000) / ml : 0;
  const pepKeys = Object.keys(PEPS);
  const allCats = ["all"].concat(Array.from(new Set(pepKeys.map((k) => PEPS[k].cat))));
  const filteredPepKeys = pepKeys.filter((id) => {
    const p = PEPS[id];
    const q = searchQ.trim().toLowerCase();
    const matchesSearch = q === "" || p.name.toLowerCase().indexOf(q) !== -1 || p.plain.toLowerCase().indexOf(q) !== -1 || p.best.toLowerCase().indexOf(q) !== -1 || p.cat.toLowerCase().indexOf(q) !== -1;
    const matchesCat = catFilter === "all" || p.cat === catFilter;
    return matchesSearch && matchesCat;
  });

  async function sendChat() {
    if (!inp.trim() || ld) return;
    const msg = inp.trim();
    setInp("");
    setMsgs((p) => p.concat([{ r: "u", t: msg }]));
    setLd(true);
    try {
      const resp = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      });
      if (!resp.ok) {
        let errMsg = "Sorry, I had trouble connecting (error " + resp.status + ").";
        if (resp.status === 429) errMsg = "Lots of questions coming in right now. Please wait a moment and try again.";
        setMsgs((p) => p.concat([{ r: "a", t: errMsg }]));
        setLd(false);
        return;
      }
      const data = await resp.json();
      let reply = "";
      if (data.content) {
        for (let i = 0; i < data.content.length; i++) {
          if (data.content[i].text) reply += data.content[i].text;
        }
      }
      setMsgs((p) => p.concat([{ r: "a", t: reply || "Hmm, I didn't get a response. Try rephrasing your question." }]));
    } catch (err) {
      setMsgs((p) => p.concat([{ r: "a", t: "Having trouble connecting right now. Try again in a moment." }]));
    }
    setLd(false);
  }

  async function submitEmail() {
    if (!email.trim() || subLoad) return;
    const e = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      setSubErr("That email doesn't look right — double-check it?");
      return;
    }
    setSubErr("");
    setSubLoad(true);
    try {
      const resp = await fetch(EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email: e })
      });
      if (resp.ok) {
        setSubmitted(true);
      } else {
        setSubErr("Couldn't subscribe right now — try again in a moment.");
      }
    } catch (err) {
      setSubErr("Couldn't subscribe right now — try again in a moment.");
    }
    setSubLoad(false);
  }

  return (
    <div style={{fontFamily:S.f,background:S.bg,color:S.t,minHeight:"100vh",overflowX:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <DisclaimerGate/>
      {showEmailGate && (
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.82)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,padding:20,fontFamily:S.f}}>
          <div style={{background:S.card,borderRadius:14,padding:0,maxWidth:460,width:"100%",border:"1px solid "+S.abr,boxShadow:"0 25px 70px rgba(0,0,0,.55)",overflow:"hidden"}}>
            <div style={{padding:"26px 26px 0",textAlign:"center"}}>
              <div style={{fontSize:32,marginBottom:8}}>🤖</div>
              <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 6px",color:S.t,lineHeight:1.25}}>Unlock the AI assistant</h2>
              <p style={{fontSize:13,color:S.d,margin:"0 0 18px",lineHeight:1.55}}>Drop your email to chat with our peptide research AI. Everything else on the site stays free.</p>
            </div>
            <div style={{padding:"0 26px 18px"}}>
              <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:18}}>
                {[
                  "Ask anything about peptide research in plain English",
                  "Tailored answers based on what you describe",
                  "Free — supported by occasional partner emails"
                ].map((b, i) => (
                  <div key={i} style={{fontSize:12,color:S.t,display:"flex",gap:8,alignItems:"flex-start"}}>
                    <span style={{color:S.a,fontWeight:700,flexShrink:0}}>✓</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <input value={gateEmail} onChange={(e)=>{setGateEmail(e.target.value);setGateErr("")}} onKeyDown={(e)=>{if(e.key==="Enter")submitGateEmail()}} placeholder="you@email.com" type="email" autoFocus style={{width:"100%",boxSizing:"border-box",padding:"12px 14px",background:S.surf,border:"1px solid "+(gateErr?"#F87171":S.br),borderRadius:8,color:S.t,fontFamily:S.f,fontSize:14,outline:"none",marginBottom:gateErr?6:14}}/>
              {gateErr && <div style={{fontSize:11,color:"#F87171",marginBottom:10}}>{gateErr}</div>}
              <button disabled={gateLoading} onClick={submitGateEmail} style={{width:"100%",background:gateLoading?S.surf:"linear-gradient(135deg,#5EEAD4,#38BDF8)",border:"none",color:gateLoading?S.m:"#0B1120",padding:"13px 18px",borderRadius:8,cursor:gateLoading?"wait":"pointer",fontFamily:S.f,fontSize:14,fontWeight:700,marginBottom:10}}>{gateLoading?"…":"Unlock the AI"}</button>
              <button onClick={dismissGate} style={{width:"100%",background:"transparent",border:"none",color:S.d,padding:"8px 0",cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500}}>Maybe later — keep browsing</button>
            </div>
            <div style={{padding:"14px 26px",borderTop:"1px solid "+S.br,background:S.surf}}>
              <p style={{fontSize:10,color:S.m,margin:0,textAlign:"center",lineHeight:1.5}}>We'll send peptide research updates and occasional offers from our partners. No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      )}
      <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(11,17,32,.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid "+S.br,padding:"8px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap",minHeight:56}}>
        <div onClick={()=>{setView("home");setSel(null);setCon(null)}} onMouseEnter={(e)=>e.currentTarget.style.opacity="0.75"} onMouseLeave={(e)=>e.currentTarget.style.opacity="1"} style={{cursor:"pointer",transition:"opacity .15s",userSelect:"none",display:"flex",alignItems:"center"}} title="Back to home">
          <img src="/logo.png" alt="Peptide Reference Guide" style={{height:72,width:"auto",display:"block"}}/>
        </div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap",justifyContent:"flex-end",flex:"1 1 260px",minWidth:0}}>
          {[["home","Home"],["all","Peptides"],["stack","Stack"],["calc","Calc"],["chat","Ask AI"]].map((x) => (
            <button key={x[0]} onClick={()=>{setView(x[0]);setSel(null);setCon(null)}} style={{background:view===x[0]?S.ab:"transparent",border:"1px solid "+(view===x[0]?S.abr:"transparent"),color:view===x[0]?S.a:S.t,padding:"6px 10px",borderRadius:7,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500,transition:"all .15s",whiteSpace:"nowrap"}}>{x[1]}</button>
          ))}
        </div>
      </nav>
      <main style={{maxWidth:900,margin:"0 auto",padding:"24px 20px"}}>
        {view==="home" && (
          <div>
            <InstallPrompt/>
            <Card onClick={()=>setView("learn")} style={{background:"linear-gradient(135deg,rgba(99,102,241,.10),rgba(56,189,248,.08))",border:"1px solid rgba(99,102,241,.25)",marginBottom:14,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap",padding:"14px 18px"}}>
              <div style={{fontSize:28,flexShrink:0}}>📖</div>
              <div style={{flex:1,minWidth:180}}>
                <div style={{fontSize:14,fontWeight:700,color:S.t,marginBottom:1}}>New to peptides?</div>
                <div style={{fontSize:12,color:S.d}}>Start with the plain-English explainer — what they are, why researchers care, what to know.</div>
              </div>
              <div style={{fontSize:12,color:"#A5B4FC",fontWeight:600,whiteSpace:"nowrap"}}>Read intro →</div>
            </Card>
            <div style={{textAlign:"center",padding:"32px 0 32px"}}>
              <h1 style={{fontSize:30,fontWeight:700,lineHeight:1.2,margin:"0 0 10px"}}>What do you need help with?</h1>
              <p style={{fontSize:15,color:S.d,maxWidth:460,margin:"0 auto"}}>Tap your concern and we'll show you which peptides researchers have studied for it.</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12,marginBottom:32}}>
              {CONCERNS.map((c) => (
                <Card key={c.id} onClick={()=>{setCon(c);setView("concern")}}>
                  <div style={{fontSize:28,marginBottom:8}}>{c.icon}</div>
                  <h3 style={{fontSize:17,fontWeight:600,margin:"0 0 4px"}}>{c.label}</h3>
                  <p style={{fontSize:13,color:S.d,margin:"0 0 10px"}}>{c.sub}</p>
                  <div style={{fontSize:11,color:S.a}}>{c.peps.length} peptides studied</div>
                </Card>
              ))}
            </div>
            <Card style={{background:"linear-gradient(135deg,rgba(239,68,68,.06),rgba(251,146,60,.06))",border:"1px solid rgba(239,68,68,.15)",marginBottom:14}}>
              <div style={{fontSize:32,marginBottom:8}}>⚠️</div>
              <h3 style={{fontSize:18,fontWeight:700,margin:"0 0 6px"}}>Are Your Peptides Actually Safe?</h3>
              <p style={{fontSize:13,color:S.d,margin:"0 0 10px",lineHeight:1.5}}>Most online peptide sellers are reselling cheap, unverified product from overseas labs with no real quality control. No sterility testing. No endotoxin testing. No way to verify what's actually in the vial. And since most peptides are injected, you're putting whatever is in that vial directly into your body.</p>
              <p style={{fontSize:13,color:S.t,margin:"0 0 10px",lineHeight:1.5,fontWeight:500}}>What you should demand from any supplier:</p>
              <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:12}}>
                {["American made — manufactured in the USA, not imported and relabeled","GMP certified facility — the same manufacturing standard as real medications","99%+ purity verified by third-party testing","Third-party sterility testing","Third-party endotoxin testing","Certificate of Analysis (COA) included with every single peptide","All testing documents viewable and downloadable — not hidden or 'available upon request'"].map((item, i) => (
                  <div key={i} style={{fontSize:12,color:S.t,display:"flex",alignItems:"flex-start",gap:8}}>
                    <span style={{color:"#5EEAD4",fontWeight:700,flexShrink:0}}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{fontSize:13,color:"#F87171",margin:"0 0 4px",lineHeight:1.5,fontWeight:500}}>If your supplier can't check every one of these boxes, you don't know what you're putting in your body.</p>
              <p style={{fontSize:12,color:S.d,margin:"0 0 12px",lineHeight:1.5}}>Many sellers claim "99% purity" but can't show you the documents to prove it. Many claim "USA made" but operate from a virtual office with no lab. Always ask to see the actual test results — and if they can't show them to you instantly, walk away.</p>
              <button onClick={()=>setView("chat")} style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.2)",color:"#FCA5A5",padding:"8px 16px",borderRadius:6,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500}}>Have questions about supplier quality? Ask our AI →</button>
            </Card>
            <Card onClick={()=>setView("calc")} style={{background:"linear-gradient(135deg,rgba(94,234,212,.06),rgba(56,189,248,.06))",border:"1px solid "+S.abr,marginBottom:20}}>
              <div style={{fontSize:32,marginBottom:8}}>🧪</div>
              <h3 style={{fontSize:18,fontWeight:700,margin:"0 0 6px"}}>Reconstitution Calculator</h3>
              <p style={{fontSize:13,color:S.d,margin:"0 0 10px",lineHeight:1.5}}>Got your peptides but not sure how to mix them? Our calculator tells you exactly how much water to add and how much to draw per dose.</p>
              <div style={{fontSize:13,color:S.a,fontWeight:600}}>Open Calculator →</div>
            </Card>
            <div style={{textAlign:"center",marginBottom:24}}>
              <p style={{fontSize:13,color:S.m,marginBottom:10}}>Not sure what you need?</p>
              <button onClick={()=>setView("chat")} style={{background:S.ab,border:"1px solid "+S.abr,color:S.a,padding:"10px 24px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:500}}>Ask the AI →</button>
            </div>
            {!emailUnlocked && (
              <Card style={{background:"linear-gradient(135deg,rgba(94,234,212,.06),rgba(56,189,248,.06))",border:"1px solid "+S.abr,textAlign:"center",marginBottom:16}}>
                <div style={{fontSize:24,marginBottom:6}}>📬</div>
                <h3 style={{fontSize:18,fontWeight:700,margin:"0 0 6px"}}>Stay in the Loop</h3>
                <p style={{fontSize:13,color:S.d,margin:"0 0 16px",maxWidth:460,marginLeft:"auto",marginRight:"auto"}}>Get peptide research updates, new compound breakdowns, and occasional offers from our partners — straight to your inbox.</p>
                {!submitted ? (
                  <div>
                    <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",maxWidth:440,margin:"0 auto"}}>
                      <input value={email} onChange={(e)=>{setEmail(e.target.value);setSubErr("")}} onKeyDown={(e)=>{if(e.key==="Enter")submitEmail()}} placeholder="Enter your email" type="email" style={{flex:1,minWidth:200,padding:"11px 14px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13,outline:"none"}}/>
                      <button disabled={subLoad} onClick={submitEmail} style={{background:"linear-gradient(135deg,#5EEAD4,#38BDF8)",border:"none",color:"#0B1120",padding:"11px 24px",borderRadius:8,cursor:subLoad?"wait":"pointer",fontFamily:S.f,fontSize:13,fontWeight:600,opacity:subLoad?0.7:1}}>{subLoad?"…":"Subscribe"}</button>
                    </div>
                    {subErr && <div style={{fontSize:12,color:"#F87171",marginTop:8}}>{subErr}</div>}
                  </div>
                ) : (
                  <div style={{fontSize:14,color:S.a,fontWeight:500}}>You're in. Watch your inbox.</div>
                )}
                <p style={{fontSize:10,color:S.m,marginTop:10,marginBottom:0}}>No spam. Unsubscribe anytime.</p>
              </Card>
            )}
          </div>
        )}
        {view==="concern" && con && (
          <div>
            <button onClick={()=>{setView("home");setCon(null)}} style={{background:S.surf,border:"1px solid "+S.br,color:S.t,padding:"8px 14px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500,marginBottom:20,display:"inline-flex",alignItems:"center",gap:6}}>← Home</button>
            <div style={{fontSize:36,marginBottom:8}}>{con.icon}</div>
            <h1 style={{fontSize:26,fontWeight:700,margin:"0 0 4px"}}>{con.label}</h1>
            <p style={{fontSize:14,color:S.d,marginBottom:24}}>Peptides researchers have studied for {con.sub.toLowerCase()}</p>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {con.peps.map((pid) => {
                const p = PEPS[pid]; if (!p) return null;
                return (
                  <Card key={pid} onClick={()=>{setSel(pid);setView("detail")}}>
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
          </div>
        )}
        {view==="detail" && sel && PEPS[sel] && (() => {
          const p = PEPS[sel];
          const related = Object.keys(PEPS).filter((k) => k !== sel && PEPS[k].cat === p.cat).slice(0, 3);
          return (
            <div>
              <button onClick={()=>{setSel(null);setView(con?"concern":"all")}} style={{background:S.surf,border:"1px solid "+S.br,color:S.t,padding:"8px 14px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500,marginBottom:20,display:"inline-flex",alignItems:"center",gap:6}}>← {con ? con.label : "All Peptides"}</button>
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
                {p.areas.map((a, i) => <div key={i} style={{padding:"8px 12px",background:S.surf,borderRadius:6,marginBottom:4,fontSize:13,display:"flex",gap:8}}><span style={{color:S.a}}>+</span>{a}</div>)}
              </Card>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:S.br,borderRadius:10,overflow:"hidden",marginBottom:14}}>
                {[["Molecular Weight",p.mw],["Half-Life",HALF_LIVES[sel]||"—"],["Source",p.seq],["Storage",p.store],["Category",p.cat]].map((x, i) => <div key={i} style={{background:S.card,padding:"12px 14px"}}><div style={{fontSize:9,color:S.m,textTransform:"uppercase",letterSpacing:".08em",marginBottom:3}}>{x[0]}</div><div style={{fontSize:12,fontWeight:500}}>{x[1]}</div></div>)}
              </div>
              <Card style={{marginBottom:14}}>
                <h3 style={{fontSize:14,fontWeight:600,marginBottom:8}}>Published Research</h3>
                {p.studies.map((st, i) => <div key={i} style={{padding:"8px 12px",background:S.surf,borderRadius:6,marginBottom:4}}><div style={{fontSize:12,fontWeight:500,marginBottom:2}}>{st.t}</div><div style={{fontSize:10,color:S.m,fontStyle:"italic"}}>{st.j} ({st.y})</div></div>)}
              </Card>
              {related.length > 0 && (
                <div style={{marginBottom:14}}>
                  <h3 style={{fontSize:14,fontWeight:600,marginBottom:10,color:S.t}}>You might also look at</h3>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
                    {related.map((rid) => {
                      const rp = PEPS[rid];
                      return (
                        <Card key={rid} onClick={()=>{setSel(rid);window.scrollTo(0,0)}} style={{padding:16}}>
                          <h4 style={{fontSize:14,fontWeight:600,margin:"0 0 4px"}}>{rp.name}</h4>
                          <p style={{fontSize:11,color:S.d,margin:"0 0 6px",lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{rp.plain}</p>
                          <div style={{fontSize:10,color:S.a}}>{rp.best} →</div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
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
                <input value={searchQ} onChange={(e)=>setSearchQ(e.target.value)} placeholder="Search by name, benefit, or category..." style={{width:"100%",boxSizing:"border-box",padding:"10px 14px 10px 38px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13,outline:"none"}}/>
                {searchQ && <button onClick={()=>setSearchQ("")} style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",color:S.d,cursor:"pointer",padding:"4px 8px",fontSize:14}}>✕</button>}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {allCats.map((c) => {
                  const active = catFilter === c;
                  return <button key={c} onClick={()=>setCatFilter(c)} style={{background:active?S.ab:"transparent",border:"1px solid "+(active?S.abr:S.br),color:active?S.a:S.d,padding:"5px 12px",borderRadius:14,cursor:"pointer",fontFamily:S.f,fontSize:11,fontWeight:500}}>{c === "all" ? "All" : c}</button>;
                })}
              </div>
            </div>
            {filteredPepKeys.length === 0 ? (
              <div style={{textAlign:"center",padding:"40px 20px",color:S.d}}>
                <div style={{fontSize:32,marginBottom:8}}>🔍</div>
                <p style={{fontSize:14,marginBottom:4}}>No peptides match your search.</p>
                <button onClick={()=>{setSearchQ("");setCatFilter("all")}} style={{background:"transparent",border:"1px solid "+S.br,color:S.a,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontFamily:S.f,fontSize:12,marginTop:8}}>Clear filters</button>
              </div>
            ) : (
              <div>
                <p style={{fontSize:11,color:S.m,marginBottom:10}}>Showing {filteredPepKeys.length} of {pepKeys.length}</p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12}}>
                  {filteredPepKeys.map((id) => {
                    const p = PEPS[id];
                    return (
                      <Card key={id} onClick={()=>{setSel(id);setView("detail")}}>
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
                  <input type="text" inputMode="decimal" value={mgStr} onChange={(e)=>setMgStr(e.target.value.replace(/[^0-9.]/g,""))} style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontSize:16,fontFamily:"monospace"}}/>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12,color:S.d,display:"block",marginBottom:4}}>Water added (mL)</label>
                  <input type="text" inputMode="decimal" value={mlStr} onChange={(e)=>setMlStr(e.target.value.replace(/[^0-9.]/g,""))} style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontSize:16,fontFamily:"monospace"}}/>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12,color:S.d,display:"block",marginBottom:4}}>Desired dose</label>
                  <div style={{display:"flex",gap:8}}>
                    <input type="text" inputMode="decimal" value={doseStr} onChange={(e)=>setDoseStr(e.target.value.replace(/[^0-9.]/g,""))} style={{flex:1,padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontSize:16,fontFamily:"monospace"}}/>
                    <div style={{display:"flex",borderRadius:8,overflow:"hidden",border:"1px solid "+S.br}}>
                      <button onClick={()=>setDoseUnit("mcg")} style={{background:doseUnit==="mcg"?S.ab:S.surf,border:"none",color:doseUnit==="mcg"?S.a:S.d,padding:"10px 14px",cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:600}}>mcg</button>
                      <button onClick={()=>setDoseUnit("mg")} style={{background:doseUnit==="mg"?S.ab:S.surf,border:"none",borderLeft:"1px solid "+S.br,color:doseUnit==="mg"?S.a:S.d,padding:"10px 14px",cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:600}}>mg</button>
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
                      {["I have a nagging knee injury","I want to lose weight","My gut has been messed up","I feel tired and old","I can't focus or think clearly"].map((q, i) => (
                        <button key={i} onClick={()=>setInp(q)} style={{background:S.surf,border:"1px solid "+S.br,color:S.t,padding:"8px 14px",borderRadius:20,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500}}>{q}</button>
                      ))}
                    </div>
                  </div>
                )}
                {msgs.map((m, i) => (
                  <div key={i} style={{display:"flex",justifyContent:m.r==="u"?"flex-end":"flex-start",marginBottom:10}}>
                    <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:10,background:m.r==="u"?S.ab:S.surf,border:"1px solid "+(m.r==="u"?S.abr:S.br)}}>
                      <div style={{fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{m.t}</div>
                    </div>
                  </div>
                ))}
                {ld && <div style={{fontSize:12,color:S.m,padding:8}}>Thinking...</div>}
                <div ref={endRef}/>
              </div>
              <div style={{padding:"12px 14px",borderTop:"1px solid "+S.br,display:"flex",gap:8,alignItems:"flex-end"}}>
                <textarea value={inp} onChange={(e)=>setInp(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter" && !e.shiftKey){e.preventDefault();sendChat()}}} placeholder="Describe what you need help with..." rows={1} style={{flex:1,padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13,outline:"none",resize:"none",minHeight:42,maxHeight:120,lineHeight:1.4}}/>
                <button onClick={sendChat} style={{background:"linear-gradient(135deg,#5EEAD4,#38BDF8)",border:"none",color:"#0B1120",padding:"10px 16px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:600,height:42}}>Send</button>
              </div>
            </Card>
            <div style={{marginTop:10,fontSize:10,color:S.m,textAlign:"center"}}>This AI shares research info only. Not medical advice. Talk to a doctor for personal guidance.</div>
          </div>
        )}
        {view==="learn" && (
          <div style={{maxWidth:720,margin:"0 auto"}}>
            <button onClick={()=>setView("home")} style={{background:S.surf,border:"1px solid "+S.br,color:S.t,padding:"8px 14px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500,marginBottom:20,display:"inline-flex",alignItems:"center",gap:6}}>← Home</button>
            <div style={{fontSize:36,marginBottom:6}}>📖</div>
            <h1 style={{fontSize:28,fontWeight:700,margin:"0 0 6px",lineHeight:1.2}}>Peptides, in Plain English</h1>
            <p style={{fontSize:14,color:S.d,marginBottom:26,lineHeight:1.6}}>If you've never heard of peptides before, this is for you. No jargon, no marketing, just the basics.</p>

            <Card style={{marginBottom:14}}>
              <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 10px",color:S.t}}>So… what actually <em>is</em> a peptide?</h2>
              <p style={{fontSize:14,color:S.t,lineHeight:1.7,margin:"0 0 10px"}}>A peptide is a short chain of amino acids. Amino acids are the building blocks of protein — the same stuff in chicken, eggs, and the muscles on your own body. When you string a handful of them together, you get a peptide. String hundreds together, you get a protein.</p>
              <p style={{fontSize:14,color:S.t,lineHeight:1.7,margin:"0 0 10px"}}>Your body makes thousands of peptides on its own, every day. Some of them act like <strong style={{color:S.a}}>tiny text messages</strong> your cells send to each other: "heal this tear," "release more of this hormone," "calm down the inflammation over here," "turn on this gene."</p>
              <p style={{fontSize:14,color:S.d,lineHeight:1.7,margin:0,fontStyle:"italic"}}>Think of peptides as biological signals. Each one tells a specific part of your body to do a specific thing.</p>
            </Card>

            <Card style={{marginBottom:14}}>
              <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 10px",color:S.t}}>Why are researchers interested?</h2>
              <p style={{fontSize:14,color:S.t,lineHeight:1.7,margin:"0 0 10px"}}>Three reasons, mostly:</p>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:10}}>
                {[
                  {t:"They're very specific.",d:"A peptide usually only talks to one type of cell or receptor. That means fewer side effects than a drug that affects your whole system."},
                  {t:"Levels drop as you age.",d:"Your body makes less of some key peptides over time — growth hormone releasers, collagen signals, repair molecules. Research looks at whether restoring them helps."},
                  {t:"Some already work as medicine.",d:"Semaglutide (Ozempic, Wegovy) is a peptide. Tesamorelin is a peptide. Sermorelin was the first peptide drug approved in the US. These aren't fringe — they're already in use."}
                ].map((p, i) => (
                  <div key={i} style={{padding:"10px 14px",background:S.surf,borderRadius:8}}>
                    <div style={{fontSize:13,fontWeight:600,color:S.t,marginBottom:3}}>{p.t}</div>
                    <div style={{fontSize:12,color:S.d,lineHeight:1.5}}>{p.d}</div>
                  </div>
                ))}
              </div>
              <p style={{fontSize:13,color:S.d,lineHeight:1.6,margin:0}}>Scientists are studying peptides for: recovery from injury, weight loss, inflammation, aging, immune function, brain health, hormones, and sexual function.</p>
            </Card>

            <Card style={{marginBottom:14}}>
              <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 10px",color:S.t}}>How are peptides different from drugs?</h2>
              <p style={{fontSize:14,color:S.t,lineHeight:1.7,margin:"0 0 10px"}}>Most pharmaceutical drugs are tiny synthetic chemicals that bind to many things in the body at once — which is why they tend to have long side-effect lists. Peptides, by contrast, usually <strong>mimic molecules your body already recognizes</strong>. That makes them more targeted.</p>
              <p style={{fontSize:14,color:S.t,lineHeight:1.7,margin:"0 0 10px"}}>The tradeoff: your stomach breaks peptides down before they can work, so they almost always have to be <strong>injected</strong> (usually under the skin, like insulin). Some nasal sprays exist, and oral versions are being developed, but most research peptides are subcutaneous injections.</p>
              <p style={{fontSize:14,color:S.d,lineHeight:1.7,margin:0,fontStyle:"italic"}}>Short version: peptides work with your body's own signaling, rather than forcing it.</p>
            </Card>

            <Card style={{background:"rgba(252,211,77,.05)",border:"1px solid "+S.wbr,marginBottom:14}}>
              <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 10px",color:S.w}}>What to know before going further</h2>
              <p style={{fontSize:13,color:S.t,lineHeight:1.7,margin:"0 0 10px"}}>Peptide research is exciting, but here's the honest reality:</p>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {[
                  "Most peptides aren't FDA-approved for human use. That doesn't mean they're unsafe — it means the FDA hasn't finished evaluating them. Some have decades of research, some have almost none.",
                  "Quality varies enormously between suppliers. A 'BPC-157' vial from one vendor can be 99% pure with verified testing, and from another vendor it can contain almost none of the compound on the label.",
                  "Long-term safety data is limited for most peptides. Short-term studies look promising; we don't always know what 20 years of use looks like.",
                  "Nothing on this site is medical advice. Peptides can interact with medications, affect hormones, and cause side effects. If you're considering personal use, work with a licensed clinician who can evaluate your specific situation."
                ].map((item, i) => (
                  <div key={i} style={{fontSize:13,color:S.d,lineHeight:1.6,display:"flex",gap:8}}>
                    <span style={{color:S.w,flexShrink:0,fontWeight:700}}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card style={{marginBottom:14}}>
              <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 10px",color:S.t}}>How this site works</h2>
              <p style={{fontSize:14,color:S.t,lineHeight:1.7,margin:"0 0 10px"}}>We summarize what researchers have published about individual peptides, in language you don't need a biology degree to follow. You can:</p>
              <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
                {[
                  {t:"Browse by concern",d:"Pick a goal — injury recovery, weight loss, sleep, etc. — and see which peptides research has focused on for it."},
                  {t:"Browse all peptides",d:"Scan the full library alphabetically or filter by category."},
                  {t:"Ask the AI",d:"Describe what you're dealing with and get a plain-English pointer to relevant research."},
                  {t:"Use the tools",d:"Reconstitution calculator and stack tracker are included for organizational purposes."}
                ].map((p, i) => (
                  <div key={i} style={{fontSize:13,color:S.t,display:"flex",gap:10,padding:"6px 10px",background:S.surf,borderRadius:6}}>
                    <span style={{color:S.a,fontWeight:700,flexShrink:0}}>→</span>
                    <div>
                      <div style={{fontWeight:600,marginBottom:1}}>{p.t}</div>
                      <div style={{fontSize:12,color:S.d,lineHeight:1.5}}>{p.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{fontSize:12,color:S.m,lineHeight:1.6,margin:0,fontStyle:"italic"}}>All content is based on published literature and reflects research — not medical recommendations.</p>
            </Card>

            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginTop:24}}>
              <button onClick={()=>setView("home")} style={{background:"linear-gradient(135deg,#5EEAD4,#38BDF8)",border:"none",color:"#0B1120",padding:"12px 22px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:700}}>Browse peptides by concern →</button>
              <button onClick={()=>setView("all")} style={{background:S.ab,border:"1px solid "+S.abr,color:S.a,padding:"12px 22px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:600}}>See all peptides</button>
            </div>
          </div>
        )}
        {view==="privacy" && (
          <div style={{maxWidth:720,margin:"0 auto"}}>
            <button onClick={()=>setView("home")} style={{background:S.surf,border:"1px solid "+S.br,color:S.t,padding:"8px 14px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500,marginBottom:20,display:"inline-flex",alignItems:"center",gap:6}}>← Home</button>
            <h1 style={{fontSize:26,fontWeight:700,margin:"0 0 4px",lineHeight:1.2}}>Privacy Policy</h1>
            <p style={{fontSize:12,color:S.m,marginBottom:22}}>Last updated: April 2026</p>
            <div style={{fontSize:13,color:S.t,lineHeight:1.7}}>
              <p style={{marginTop:0}}>This Privacy Policy describes how Peptide Reference Guide ("we," "our," "us") collects, uses, and shares information when you use this website.</p>

              <h2 style={{fontSize:16,fontWeight:700,margin:"24px 0 8px",color:S.t}}>1. Information we collect</h2>
              <p style={{marginTop:0}}>We collect the following information:</p>
              <ul style={{paddingLeft:20,margin:"4px 0 12px"}}>
                <li style={{marginBottom:4}}><strong>Email address</strong> — when you subscribe to our mailing list or unlock gated features.</li>
                <li style={{marginBottom:4}}><strong>Content you submit to the AI chat</strong> — questions or descriptions you type are transmitted to our AI provider to generate responses.</li>
                <li style={{marginBottom:4}}><strong>Local data stored on your device</strong> — your disclaimer acknowledgment, peptide stack entries, and subscription status are saved in your browser's localStorage. This data stays on your device and is not transmitted to us.</li>
                <li style={{marginBottom:4}}><strong>Standard server logs</strong> — our hosting provider automatically records IP addresses, user agents, and timestamps for security and diagnostics.</li>
              </ul>

              <h2 style={{fontSize:16,fontWeight:700,margin:"24px 0 8px",color:S.t}}>2. How we use your information</h2>
              <p style={{marginTop:0}}>We use your email address to:</p>
              <ul style={{paddingLeft:20,margin:"4px 0 12px"}}>
                <li style={{marginBottom:4}}>Send peptide research updates and educational content.</li>
                <li style={{marginBottom:4}}>Send occasional commercial offers from partner companies in the peptide, health, and wellness industries.</li>
                <li style={{marginBottom:4}}>Respond to inquiries you send us.</li>
              </ul>
              <p style={{marginTop:0}}>We use AI chat inputs only to generate responses in real time. We may retain conversation logs for service-improvement purposes.</p>

              <h2 style={{fontSize:16,fontWeight:700,margin:"24px 0 8px",color:S.t}}>3. Sharing with partners</h2>
              <p style={{marginTop:0}}>We may share your email address with commercial partners for marketing purposes. These partners may include peptide suppliers, health and wellness brands, and related service providers. By subscribing, you consent to this sharing. You can withdraw this consent at any time by unsubscribing from any email.</p>

              <h2 style={{fontSize:16,fontWeight:700,margin:"24px 0 8px",color:S.t}}>4. Service providers</h2>
              <p style={{marginTop:0}}>We use third-party services to operate this site, including:</p>
              <ul style={{paddingLeft:20,margin:"4px 0 12px"}}>
                <li style={{marginBottom:4}}>Hosting and delivery (Vercel, Cloudflare)</li>
                <li style={{marginBottom:4}}>Email collection and delivery (Formspree and our email marketing providers)</li>
                <li style={{marginBottom:4}}>AI chat responses (Anthropic)</li>
              </ul>
              <p style={{marginTop:0}}>These providers process information on our behalf under their own privacy terms.</p>

              <h2 style={{fontSize:16,fontWeight:700,margin:"24px 0 8px",color:S.t}}>5. Cookies and local storage</h2>
              <p style={{marginTop:0}}>We do not currently use third-party tracking cookies. We use browser localStorage to remember your disclaimer acceptance, your peptide stack entries, and whether you have unlocked full access to the site. You can clear this at any time via your browser settings.</p>

              <h2 style={{fontSize:16,fontWeight:700,margin:"24px 0 8px",color:S.t}}>6. Your rights</h2>
              <ul style={{paddingLeft:20,margin:"4px 0 12px"}}>
                <li style={{marginBottom:4}}><strong>Unsubscribe:</strong> Every marketing email we send includes a one-click unsubscribe link.</li>
                <li style={{marginBottom:4}}><strong>Access or delete your data:</strong> You may request a copy of the personal information we hold about you, or request deletion, by emailing us at the address below.</li>
                <li style={{marginBottom:4}}><strong>California (CCPA / CPRA):</strong> California residents have the right to know what personal information we collect, to request deletion, and to opt out of sale or sharing of personal information for cross-context behavioral advertising.</li>
                <li style={{marginBottom:4}}><strong>EU / UK (GDPR / UK GDPR):</strong> If you are located in the EU or UK, the legal basis for our processing is your consent, which you may withdraw at any time.</li>
              </ul>

              <h2 style={{fontSize:16,fontWeight:700,margin:"24px 0 8px",color:S.t}}>7. Data retention</h2>
              <p style={{marginTop:0}}>We retain email addresses until you unsubscribe or request deletion. Server logs are typically retained for 30-90 days by our hosting providers.</p>

              <h2 style={{fontSize:16,fontWeight:700,margin:"24px 0 8px",color:S.t}}>8. Children</h2>
              <p style={{marginTop:0}}>This site is not intended for or directed at anyone under 18 years old. We do not knowingly collect information from children.</p>

              <h2 style={{fontSize:16,fontWeight:700,margin:"24px 0 8px",color:S.t}}>9. Security</h2>
              <p style={{marginTop:0}}>We use industry-standard security practices, but no online service is 100% secure. You submit information to this site at your own risk.</p>

              <h2 style={{fontSize:16,fontWeight:700,margin:"24px 0 8px",color:S.t}}>10. Changes to this policy</h2>
              <p style={{marginTop:0}}>We may update this policy from time to time. Material changes will be noted with a revised "Last updated" date. Continued use of the site after changes constitutes acceptance of the revised policy.</p>

              <h2 style={{fontSize:16,fontWeight:700,margin:"24px 0 8px",color:S.t}}>11. Contact</h2>
              <p style={{marginTop:0,marginBottom:0}}>Questions, requests, or complaints about this policy can be directed to: <strong style={{color:S.a}}>privacy@peptideguide.com</strong> (update this before launch).</p>
            </div>
          </div>
        )}
        {view==="stack" && (
          <div>
            <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:6}}>
              <h2 style={{fontSize:24,fontWeight:700,margin:0}}>My Stack</h2>
              <button onClick={()=>setStackForm({pepId:"",dose:"",doseUnit:"mcg",frequency:"daily",notes:""})} style={{background:"linear-gradient(135deg,#5EEAD4,#38BDF8)",border:"none",color:"#0B1120",padding:"9px 16px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:700}}>+ Add peptide</button>
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
                <button onClick={()=>setStackForm({pepId:"",dose:"",doseUnit:"mcg",frequency:"daily",notes:""})} style={{background:S.ab,border:"1px solid "+S.abr,color:S.a,padding:"9px 18px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:500}}>+ Add your first peptide</button>
              </div>
            )}
            {stackForm && (
              <Card style={{marginBottom:14,border:"1px solid "+S.abr}}>
                <h3 style={{fontSize:15,fontWeight:600,marginBottom:12}}>Add peptide to stack</h3>
                <div style={{marginBottom:12}}>
                  <label style={{fontSize:11,color:S.d,display:"block",marginBottom:4}}>Peptide</label>
                  <select value={stackForm.pepId} onChange={(e)=>setStackForm(Object.assign({},stackForm,{pepId:e.target.value}))} style={{width:"100%",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13}}>
                    <option value="">— pick one —</option>
                    {pepKeys.map((id) => <option key={id} value={id}>{PEPS[id].name} ({PEPS[id].cat})</option>)}
                  </select>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:10,marginBottom:12}}>
                  <div>
                    <label style={{fontSize:11,color:S.d,display:"block",marginBottom:4}}>Dose</label>
                    <input type="text" inputMode="decimal" value={stackForm.dose} onChange={(e)=>setStackForm(Object.assign({},stackForm,{dose:e.target.value.replace(/[^0-9.]/g,"")}))} placeholder="e.g. 250" style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontSize:14,fontFamily:"monospace"}}/>
                  </div>
                  <div>
                    <label style={{fontSize:11,color:S.d,display:"block",marginBottom:4}}>Unit</label>
                    <select value={stackForm.doseUnit} onChange={(e)=>setStackForm(Object.assign({},stackForm,{doseUnit:e.target.value}))} style={{width:"100%",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13}}>
                      <option value="mcg">mcg</option>
                      <option value="mg">mg</option>
                      <option value="units">units</option>
                    </select>
                  </div>
                </div>
                <div style={{marginBottom:12}}>
                  <label style={{fontSize:11,color:S.d,display:"block",marginBottom:4}}>Frequency</label>
                  <select value={stackForm.frequency} onChange={(e)=>setStackForm(Object.assign({},stackForm,{frequency:e.target.value}))} style={{width:"100%",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13}}>
                    {FREQ_OPTIONS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:11,color:S.d,display:"block",marginBottom:4}}>Notes (optional)</label>
                  <textarea value={stackForm.notes} onChange={(e)=>setStackForm(Object.assign({},stackForm,{notes:e.target.value}))} rows={2} placeholder="e.g. morning, subcutaneous, cycle 1" style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",background:S.surf,border:"1px solid "+S.br,borderRadius:8,color:S.t,fontFamily:S.f,fontSize:13,resize:"vertical"}}/>
                </div>
                <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                  <button onClick={()=>setStackForm(null)} style={{background:"transparent",border:"1px solid "+S.br,color:S.d,padding:"9px 16px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12}}>Cancel</button>
                  <button disabled={!stackForm.pepId || !stackForm.dose} onClick={()=>stackAdd(stackForm)} style={{background:stackForm.pepId && stackForm.dose ? "linear-gradient(135deg,#5EEAD4,#38BDF8)" : S.surf,border:"none",color:stackForm.pepId && stackForm.dose ? "#0B1120" : S.m,padding:"9px 18px",borderRadius:8,cursor:stackForm.pepId && stackForm.dose ? "pointer" : "not-allowed",fontFamily:S.f,fontSize:12,fontWeight:700}}>Save</button>
                </div>
              </Card>
            )}
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {stack.map((s) => {
                const p = PEPS[s.pepId]; if (!p) return null;
                const freqH = freqHours(s.frequency);
                const nextTs = s.lastInjection ? s.lastInjection + freqH * 3600 * 1000 : null;
                const msRemaining = nextTs ? nextTs - Date.now() : null;
                return (
                  <Card key={s.id}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10,marginBottom:8,flexWrap:"wrap"}}>
                      <div>
                        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:2}}>
                          <h3 onClick={()=>{setSel(s.pepId);setView("detail");setCon(null)}} style={{fontSize:17,fontWeight:600,margin:0,cursor:"pointer"}}>{p.name}</h3>
                          <span style={{fontSize:10,color:S.a,background:S.ab,padding:"2px 8px",borderRadius:4}}>{p.cat}</span>
                        </div>
                        <div style={{fontSize:12,color:S.d}}>{s.dose} {s.doseUnit} · {freqLabel(s.frequency)} · half-life {HALF_LIVES[s.pepId] || "—"}</div>
                      </div>
                      <button onClick={()=>stackRemove(s.id)} title="Remove" style={{background:"transparent",border:"none",color:S.m,cursor:"pointer",padding:"4px 8px",fontSize:14}}>×</button>
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
                      <button onClick={()=>stackUpdate(s.id,{lastInjection:Date.now()})} style={{background:S.ab,border:"1px solid "+S.abr,color:S.a,padding:"10px 16px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:600}}>✓ Log injection now</button>
                      <button onClick={()=>downloadReminder(s, p.name)} title="Add a recurring reminder to your calendar" style={{background:"transparent",border:"1px solid "+S.br,color:S.t,padding:"10px 12px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:12,fontWeight:500,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:5}}>🔔 Remind me</button>
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
            <div onClick={()=>{setView("home");setSel(null);setCon(null)}} style={{marginBottom:8,cursor:"pointer",display:"inline-block"}}>
              <img src="/logo.png" alt="Peptide Reference Guide" style={{height:56,width:"auto",display:"block"}}/>
            </div>
            <div style={{fontSize:10,color:S.m,lineHeight:1.6,marginBottom:8}}>Research-backed peptide education.<br/>© {new Date().getFullYear()} Peptide Reference Guide.</div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <a onClick={(e)=>{e.preventDefault();setView("privacy")}} href="#" style={{fontSize:10,color:S.d,textDecoration:"none",borderBottom:"1px dotted "+S.m,cursor:"pointer"}}>Privacy Policy</a>
              <a onClick={(e)=>{e.preventDefault();setView("learn")}} href="#" style={{fontSize:10,color:S.d,textDecoration:"none",borderBottom:"1px dotted "+S.m,cursor:"pointer"}}>About Peptides</a>
            </div>
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
