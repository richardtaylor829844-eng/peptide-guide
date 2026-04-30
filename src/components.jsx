import { useState, useEffect } from 'react';
import { S, DISCLAIMER_VERSION, AD_LINK, AD_BRAND, AD_LOGO, COMPACT_AD_LINK } from './data.js';

export function DisclaimerGate() {
  const [accepted, setAccepted] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("pg-disclaimer");
      if (!saved || saved !== DISCLAIMER_VERSION) {
        setAccepted(false);
      }
    } catch (e) {
      setAccepted(false);
    }
  }, []);

  function onAccept() {
    try { window.localStorage.setItem("pg-disclaimer", DISCLAIMER_VERSION); } catch (e) {}
    setAccepted(true);
  }

  function onLeave() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "about:blank";
    }
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
            <input type="checkbox" checked={checked} onChange={(e)=>setChecked(e.target.checked)} style={{marginTop:2,flexShrink:0,width:16,height:16,accentColor:S.a}}/>
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

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) { setIsInstalled(true); return; }
    if (window.navigator.standalone === true) { setIsInstalled(true); return; }
    function onBeforeInstall(e) { e.preventDefault(); setDeferredPrompt(e); }
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  if (isInstalled || dismissed) return null;
  if (!deferredPrompt && !isIOS) return null;

  async function onInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
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
          <button onClick={()=>setDismissed(true)} title="Dismiss" style={{background:"transparent",border:"none",color:S.m,cursor:"pointer",padding:"6px 10px",fontSize:16,lineHeight:1}}>×</button>
        </div>
      </div>
      {showIOSModal && (
        <div onClick={()=>setShowIOSModal(false)} style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:20}}>
          <div onClick={(e)=>e.stopPropagation()} style={{background:S.card,borderRadius:14,padding:24,maxWidth:380,width:"100%",border:"1px solid "+S.abr}}>
            <div style={{fontSize:32,marginBottom:8,textAlign:"center"}}>📱</div>
            <h3 style={{fontSize:18,fontWeight:700,margin:"0 0 4px",textAlign:"center",color:S.t}}>Install on iPhone</h3>
            <p style={{fontSize:12,color:S.d,marginBottom:18,textAlign:"center"}}>iPhone needs three quick taps — Apple doesn't let apps install themselves.</p>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
              {[{n:"1",t:"Tap the Share button",s:"The square with an arrow pointing up, at the bottom of Safari."},{n:"2",t:"Scroll and tap \"Add to Home Screen\"",s:"It's in the menu that slides up."},{n:"3",t:"Tap Add (top right)",s:"PeptideGuide will appear on your home screen like an app."}].map((step) => (
                <div key={step.n} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:24,height:24,borderRadius:12,background:S.ab,color:S.a,fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{step.n}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:S.t,marginBottom:2}}>{step.t}</div>
                    <div style={{fontSize:11,color:S.d,lineHeight:1.4}}>{step.s}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={()=>setShowIOSModal(false)} style={{width:"100%",background:S.ab,border:"1px solid "+S.abr,color:S.a,padding:"10px 16px",borderRadius:8,cursor:"pointer",fontFamily:S.f,fontSize:13,fontWeight:600}}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Card(props) {
  const isClickable = !!props.onClick;
  const mergedStyle = Object.assign({background:S.card,borderRadius:14,padding:22,border:"1px solid "+S.br,cursor:isClickable?"pointer":"default",transition:"all .2s"}, props.style||{});
  const origBorderColor = (mergedStyle.border || "").split(" ").slice(2).join(" ") || S.br;
  return (
    <div onClick={props.onClick} style={mergedStyle}
      onMouseEnter={(e)=>{if(isClickable){e.currentTarget.style.borderColor=S.abr;e.currentTarget.style.transform="translateY(-2px)"}}}
      onMouseLeave={(e)=>{if(isClickable){e.currentTarget.style.borderColor=origBorderColor;e.currentTarget.style.transform="none"}}}>
      {props.children}
    </div>
  );
}

export function AdSlot(props) {
  if (props.compact) {
    return (
      <div style={{marginTop:props.mt||0,marginBottom:props.mb||0}}>
        <div style={{fontSize:8,color:S.m,textTransform:"uppercase",letterSpacing:".16em",marginBottom:4,textAlign:"center"}}>Advertisement</div>
        <a href={COMPACT_AD_LINK} target="_blank" rel="sponsored noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap",textDecoration:"none",padding:"12px 18px",borderRadius:8,background:"linear-gradient(135deg,#EFE6D4 0%,#DED0B6 100%)",border:"1px solid rgba(31,41,55,.12)",transition:"all .2s"}}
          onMouseEnter={(e)=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 6px 18px rgba(0,0,0,.2)"}}
          onMouseLeave={(e)=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
          <div style={{display:"flex",alignItems:"baseline",gap:14,flex:1,minWidth:200,flexWrap:"wrap"}}>
            <div style={{fontSize:24,fontWeight:400,color:"#1F2937",letterSpacing:"-.03em",lineHeight:1}}>vuori</div>
            <div style={{fontSize:11,color:"#3B4654",lineHeight:1.4}}>Performance apparel, inspired by the coast.</div>
          </div>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#1F2937",color:"#F5EFE5",padding:"8px 16px",borderRadius:2,fontSize:10,fontWeight:600,whiteSpace:"nowrap",textTransform:"uppercase",letterSpacing:".14em"}}>Shop</div>
        </a>
      </div>
    );
  }
  return (
    <div style={{marginTop:props.mt||0,marginBottom:props.mb||0}}>
      <div style={{fontSize:9,color:S.m,textTransform:"uppercase",letterSpacing:".14em",marginBottom:6,textAlign:"center"}}>Advertisement</div>
      <a href={AD_LINK} target="_blank" rel="sponsored noopener noreferrer" style={{display:"block",textDecoration:"none",padding:"28px 30px",borderRadius:10,background:"linear-gradient(135deg,#0F2647 0%,#1A3A6B 55%,#0F2647 100%)",border:"1px solid rgba(245,97,77,.25)",transition:"all .2s"}}
        onMouseEnter={(e)=>{e.currentTarget.style.borderColor="rgba(245,97,77,.6)";e.currentTarget.style.boxShadow="0 10px 32px rgba(0,0,0,.4)"}}
        onMouseLeave={(e)=>{e.currentTarget.style.borderColor="rgba(245,97,77,.25)";e.currentTarget.style.boxShadow="none"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
          <div style={{flex:1,minWidth:240}}>
            <div style={{fontSize:10,color:"#9CB4D8",letterSpacing:".2em",fontWeight:600,marginBottom:10,textTransform:"uppercase"}}>Healthcare Revenue Cycle</div>
            <img src={AD_LOGO} alt={AD_BRAND} style={{height:44,width:"auto",display:"block",marginBottom:12}}/>
            <div style={{fontSize:14,color:"#fff",marginBottom:14,lineHeight:1.45,fontWeight:400,maxWidth:440}}>Prevent denials, underpayments, and DRG downgrades — solved at the root cause, done for you.</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"5px 16px"}}>
              {["Denials prevention","Charge capture","DRG & coding audit","Done-for-you service"].map((f,i) => (
                <div key={i} style={{fontSize:11,color:"#D4DEED",display:"flex",alignItems:"center",gap:6,letterSpacing:".01em"}}>
                  <span style={{color:"#F5614D",fontWeight:700,flexShrink:0}}>→</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#F5614D",color:"#fff",padding:"13px 24px",borderRadius:30,fontSize:12,fontWeight:600,whiteSpace:"nowrap",letterSpacing:".03em"}}>Request Demo →</div>
        </div>
      </a>
    </div>
  );
}
