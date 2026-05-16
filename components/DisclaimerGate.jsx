"use client";
import { useState, useEffect } from "react";
import { S, DISCLAIMER_VERSION } from "@/lib/data";

export function DisclaimerGate() {
  const [accepted, setAccepted] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("pg-disclaimer");
      if (!saved || saved !== DISCLAIMER_VERSION) setAccepted(false);
    } catch (e) {
      setAccepted(false);
    }
  }, []);

  function onAccept() {
    try { window.localStorage.setItem("pg-disclaimer", DISCLAIMER_VERSION); } catch (e) {}
    setAccepted(true);
  }

  function onLeave() {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "about:blank";
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
          <p style={{marginTop:0,color:S.t,fontWeight:500}}>Peptide Reference Guide presents educational information on peptide compounds based on published research. All peptides referenced on this site are <strong style={{color:S.w}}>for research use only</strong> — they are not approved by the FDA or any other regulatory body for human consumption, treatment, cure, or diagnosis of any medical condition.</p>
          <p style={{color:S.t,marginBottom:10}}>By clicking "I Understand and Accept," you acknowledge and agree that:</p>
          <ol style={{paddingLeft:18,marginTop:0,marginBottom:14}}>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>You are at least 18 years of age</strong> and legally capable of entering into this agreement.</li>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>This site does not provide medical advice.</strong> Content is educational only and is not a substitute for professional medical, clinical, or pharmacological guidance. Nothing here should be interpreted as a recommendation to take any substance.</li>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>Peptides are not for human consumption.</strong> Any decision to handle, use, or administer any substance referenced here is made solely at your own risk. Consult a licensed physician before making decisions related to your health.</li>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>No guarantee of accuracy.</strong> Information reflects our interpretation of published literature and may not be current, complete, or accurate. Research on peptide compounds is evolving.</li>
            <li style={{marginBottom:8}}><strong style={{color:S.t}}>You release the site operators from all liability.</strong> You agree to hold harmless Peptide Reference Guide, its operators, employees, affiliates, and advertisers from any claims, damages, or injuries arising from your use of this site or any information contained herein.</li>
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
