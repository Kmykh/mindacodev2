"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════
   CSS — keyframes, all pure CSS
   ════════════════════════════════════════════════════════════ */
const STYLES = `
/* ── Typing dots ── */
@keyframes tdot { 0%,100%{transform:translateY(0);opacity:.45} 50%{transform:translateY(-4px);opacity:1} }
.svc-td1{animation:tdot 1s ease-in-out .0s infinite}
.svc-td2{animation:tdot 1s ease-in-out .2s infinite}
.svc-td3{animation:tdot 1s ease-in-out .4s infinite}
/* ── Chat bubbles ── */
@keyframes chatSlide {
  0%      {opacity:0;transform:translateY(12px) scaleX(.7)}
  18%,80% {opacity:1;transform:translateY(0) scaleX(1)}
  100%    {opacity:0;transform:translateY(-6px) scaleX(.9)}
}
.svc-c1{animation:chatSlide 3.6s ease-in-out .0s  infinite;transform-origin:left center}
.svc-c2{animation:chatSlide 3.6s ease-in-out .9s  infinite;transform-origin:right center}
.svc-c3{animation:chatSlide 3.6s ease-in-out 1.8s infinite;transform-origin:left center}
.svc-c4{animation:chatSlide 3.6s ease-in-out 2.7s infinite;transform-origin:right center}

/* ── Flow ── */
@keyframes fDot{
  0%   {left:0;                opacity:0;transform:scale(.4)}
  8%   {                       opacity:1;transform:scale(1)}
  88%  {                       opacity:1;transform:scale(1)}
  100% {left:calc(100% - 12px);opacity:0;transform:scale(.4)}
}
@keyframes nodeGlow{0%,100%{border-color:rgba(124,58,237,.3)}48%,52%{border-color:#7C3AED;box-shadow:0 0 10px rgba(124,58,237,.55)}}
.svc-fd1{animation:fDot 2.8s linear .0s infinite}
.svc-fd2{animation:fDot 2.8s linear 1.4s infinite}
.svc-fn1{animation:nodeGlow 2.8s ease-in-out .0s  infinite}
.svc-fn2{animation:nodeGlow 2.8s ease-in-out .93s infinite}
.svc-fn3{animation:nodeGlow 2.8s ease-in-out 1.87s infinite}

/* ── Calendar ── */
@keyframes calSel{0%,100%{background:rgba(255,255,255,.08);transform:scale(1)}40%,60%{background:#7C3AED;transform:scale(1.3)}}
@keyframes checkPop{0%,60%{opacity:0;transform:scale(.4)}72%,90%{opacity:1;transform:scale(1)}100%{opacity:0}}
.svc-ca{animation:calSel 5.2s ease-in-out .0s  infinite}
.svc-cb{animation:calSel 5.2s ease-in-out .8s  infinite}
.svc-cc{animation:calSel 5.2s ease-in-out 1.6s infinite}
.svc-cd{animation:calSel 5.2s ease-in-out 2.4s infinite}
.svc-ck{animation:checkPop 5.2s ease-in-out .0s infinite}

/* ── Browser load bar + lines ── */
@keyframes topBar{0%{width:0;opacity:1}80%{width:92%;opacity:1}100%{width:100%;opacity:0}}
@keyframes bL1{0%,100%{width:0;opacity:0}14%{opacity:1}50%,80%{width:76%;opacity:1}94%{width:0;opacity:0}}
@keyframes bL2{0%,100%{width:0;opacity:0}14%{opacity:1}50%,80%{width:58%;opacity:1}94%{width:0;opacity:0}}
@keyframes bL3{0%,100%{width:0;opacity:0}14%{opacity:1}50%,80%{width:66%;opacity:1}94%{width:0;opacity:0}}
.svc-tlb{animation:topBar 3.6s ease-in-out infinite}
.svc-br1{animation:bL1 3.6s ease-in-out .0s  infinite}
.svc-br2{animation:bL2 3.6s ease-in-out .55s infinite}
.svc-br3{animation:bL3 3.6s ease-in-out 1.1s infinite}

/* ── Cart ── */
@keyframes badgePop{0%,100%{transform:scale(1)}50%{transform:scale(1.4)}}
@keyframes orderRise{0%{opacity:0;transform:translateY(12px)}20%,72%{opacity:1;transform:translateY(0)}92%,100%{opacity:0;transform:translateY(-10px)}}
.svc-badge{animation:badgePop 1.6s ease-in-out infinite}
.svc-order{animation:orderRise 2.8s ease-in-out .3s infinite}

/* ── Phone notif ── */
@keyframes pNotif{0%{opacity:0;transform:translateY(30px)}18%,68%{opacity:1;transform:translateY(0)}88%,100%{opacity:0;transform:translateY(-22px)}}
.svc-pn{animation:pNotif 3.4s ease-in-out infinite}
@keyframes screenPulse{0%,100%{opacity:.3}50%{opacity:.7}}
.svc-scr{animation:screenPulse 2s ease-in-out infinite}

/* ── Neural ── */
@keyframes nLine{0%,100%{stroke-opacity:.1;stroke-width:1}50%{stroke-opacity:1;stroke-width:2.5}}
@keyframes nNode{0%,100%{opacity:.4;r:9}50%{opacity:1;r:11}}
@keyframes nOuter{0%,100%{opacity:.2;r:6}50%{opacity:.9;r:7}}
.svc-nl1{animation:nLine 4s ease-in-out .0s  infinite}
.svc-nl2{animation:nLine 4s ease-in-out .5s  infinite}
.svc-nl3{animation:nLine 4s ease-in-out 1.0s infinite}
.svc-nl4{animation:nLine 4s ease-in-out 1.5s infinite}
.svc-nl5{animation:nLine 4s ease-in-out .25s infinite}
.svc-nl6{animation:nLine 4s ease-in-out .75s infinite}
.svc-nc {animation:nNode  4s ease-in-out .2s  infinite}
.svc-no {animation:nOuter 4s ease-in-out .2s  infinite}

/* ── Servers + ECG ── */
@keyframes srv1{0%{height:30%}35%{height:84%}65%{height:38%}100%{height:30%}}
@keyframes srv2{0%{height:60%}28%{height:18%}72%{height:92%}100%{height:60%}}
@keyframes srv3{0%{height:44%}52%{height:14%}82%{height:76%}100%{height:44%}}
@keyframes ecgDash{0%{stroke-dashoffset:180}100%{stroke-dashoffset:0}}
.svc-sb1{animation:srv1 3.2s ease-in-out .0s  infinite}
.svc-sb2{animation:srv2 3.2s ease-in-out .45s infinite}
.svc-sb3{animation:srv3 3.2s ease-in-out .9s  infinite}
.svc-ecg{animation:ecgDash 2.4s linear infinite;stroke-dasharray:180}

/* ── Invoice bars ── */
@keyframes barUp{0%,100%{height:0;opacity:0}15%{opacity:1}50%,80%{opacity:1}90%{height:var(--h,60%);opacity:0}}
@keyframes invRow{0%,100%{opacity:0;transform:translateX(-10px)}22%,80%{opacity:1;transform:translateX(0)}}
@keyframes totalTick{0%,55%{opacity:0;transform:translateY(5px)}72%,94%{opacity:1;transform:translateY(0)}100%{opacity:0}}
.svc-bar1{animation:barUp 4s ease-in-out .0s  infinite;--h:65%}
.svc-bar2{animation:barUp 4s ease-in-out .5s  infinite;--h:82%}
.svc-bar3{animation:barUp 4s ease-in-out 1.0s infinite;--h:50%}
.svc-bar4{animation:barUp 4s ease-in-out 1.5s infinite;--h:74%}
.svc-ir1 {animation:invRow  4.5s ease-in-out .0s  infinite}
.svc-ir2 {animation:invRow  4.5s ease-in-out .6s  infinite}
.svc-ir3 {animation:invRow  4.5s ease-in-out 1.2s infinite}
.svc-itot{animation:totalTick 4.5s ease-in-out .0s infinite}

/* ── Arrow ── */
@keyframes arrX{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}
.svc-arr{animation:arrX 1.8s ease-in-out infinite;display:inline-block}


/* ── Row min-height ── */
.svc-row{min-height:360px}

/* ── Carrusel de servicios ── */
.svc-scroller{display:flex;gap:24px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:10px 5vw 10px}
.svc-scroller::-webkit-scrollbar{display:none}
.svc-panel{
  flex:0 0 auto;width:min(1060px,86vw);scroll-snap-align:center;
  border-radius:24px;border:1px solid rgba(124,58,237,0.18);
  background:linear-gradient(165deg,rgba(124,58,237,0.09) 0%,rgba(10,9,32,0.78) 45%,rgba(10,9,32,0.86) 100%);
  overflow:hidden;position:relative;
  transition:border-color .3s ease,box-shadow .3s ease;
}
.svc-panel:hover{border-color:rgba(124,58,237,0.42);box-shadow:0 0 60px rgba(124,58,237,0.13)}
.svc-arrow{
  width:48px;height:48px;border-radius:50%;flex-shrink:0;
  border:1px solid rgba(124,58,237,0.35);background:rgba(124,58,237,0.1);color:#a78bfa;
  display:flex;align-items:center;justify-content:center;cursor:pointer;
  transition:background .25s ease,color .25s ease,border-color .25s ease,box-shadow .25s ease,opacity .25s ease;
}
.svc-arrow:hover:not(:disabled){background:#7C3AED;color:#ffffff;border-color:#7C3AED;box-shadow:0 0 24px rgba(124,58,237,0.45)}
.svc-arrow:disabled{opacity:.25;cursor:default}
.svc-progress-wrap{height:2px;margin:24px 5vw 0;background:rgba(124,58,237,0.14);border-radius:2px;overflow:hidden}
.svc-progress{height:100%;width:100%;background:linear-gradient(90deg,#7C3AED,#a78bfa);transform:scaleX(0);transform-origin:left center;transition:transform .5s cubic-bezier(.22,1,.36,1)}

/* ── Responsive ── */
@media(max-width:1023px){
  .svc-row{flex-direction:column !important;padding:44px 24px !important;min-height:auto !important}
  .svc-frame-wrap{padding-top:14px !important;padding-left:14px !important;width:100% !important}
  .svc-frame{width:100% !important;height:200px !important}
  .svc-chip{display:none !important}
  /* Disable all CSS animations on mobile — prevents CPU/GPU jank from off-screen anims */
  .svc-td1,.svc-td2,.svc-td3,
  .svc-c1,.svc-c2,.svc-c3,.svc-c4,
  .svc-fd1,.svc-fd2,.svc-fn1,.svc-fn2,.svc-fn3,
  .svc-ca,.svc-cb,.svc-cc,.svc-cd,.svc-ck,
  .svc-tlb,.svc-br1,.svc-br2,.svc-br3,
  .svc-badge,.svc-order,
  .svc-pn,.svc-scr,
  .svc-nl1,.svc-nl2,.svc-nl3,.svc-nl4,.svc-nl5,.svc-nl6,.svc-nc,.svc-no,
  .svc-sb1,.svc-sb2,.svc-sb3,.svc-ecg,
  .svc-bar1,.svc-bar2,.svc-bar3,.svc-bar4,
  .svc-ir1,.svc-ir2,.svc-ir3,.svc-itot,
  .svc-arr { animation: none !important; }
}
@media(max-width:640px){
  .svc-row{padding:36px 20px !important;gap:32px !important}
  .svc-frame{height:180px !important}
  .svc-header-pad{padding:64px 20px 28px !important}
}
`;

/* ════════════════════════════════════════════════════════════
   Animations — vertically distributed, scaled up
   ════════════════════════════════════════════════════════════ */

function ChatAnim() {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:"10px", height:"100%", padding:"0 4px" }}>
      <div style={{ display:"flex", alignItems:"flex-end", gap:"8px" }}>
        <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:"rgba(124,58,237,0.25)", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:"#7C3AED" }} />
        </div>
        <div className="svc-c1" style={{ height:"44px", width:"62%", borderRadius:"16px 16px 16px 4px", background:"#7C3AED", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}>
          <div className="svc-td1" style={{ width:"6px", height:"6px", borderRadius:"50%", background:"rgba(255,255,255,0.85)" }} />
          <div className="svc-td2" style={{ width:"6px", height:"6px", borderRadius:"50%", background:"rgba(255,255,255,0.85)" }} />
          <div className="svc-td3" style={{ width:"6px", height:"6px", borderRadius:"50%", background:"rgba(255,255,255,0.85)" }} />
        </div>
      </div>
      <div className="svc-c2" style={{ height:"22px", width:"55%", borderRadius:"12px 12px 4px 12px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", alignSelf:"flex-end" }} />
      <div className="svc-c3" style={{ height:"22px", width:"68%", borderRadius:"12px 12px 12px 4px", background:"#7C3AED" }} />
      <div className="svc-c4" style={{ height:"22px", width:"44%", borderRadius:"12px 12px 4px 12px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", alignSelf:"flex-end" }} />
    </div>
  );
}

function FlowAnim() {
  const Node = ({ cls }: { cls:string }) => (
    <div className={cls} style={{ width:"60px", height:"38px", border:"1.5px solid rgba(124,58,237,0.3)", borderRadius:"7px", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:"rgba(124,58,237,0.4)" }} />
    </div>
  );
  const Connector = ({ idx }: { idx:number }) => (
    <div style={{ flex:1, height:"1.5px", background:"rgba(124,58,237,0.18)", position:"relative", minWidth:"16px" }}>
      <div className="svc-fd1" style={{ position:"absolute", top:"-5px", width:"12px", height:"12px", borderRadius:"50%", background:"#7C3AED" }} />
      {idx === 0 && <div className="svc-fd2" style={{ position:"absolute", top:"-5px", width:"12px", height:"12px", borderRadius:"50%", background:"rgba(124,58,237,0.4)" }} />}
    </div>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:"10px", height:"100%", padding:"0 4px" }}>
      <div style={{ textAlign:"center", fontSize:"9px", color:"rgba(124,58,237,0.55)", fontFamily:"var(--font-sans)", fontWeight:600, letterSpacing:"2px", textTransform:"uppercase", borderBottom:"1px solid rgba(124,58,237,0.12)", paddingBottom:"6px" }}>
        TRIGGER
      </div>
      <div style={{ display:"flex", alignItems:"center" }}>
        <Node cls="svc-fn1" /><Connector idx={0} /><Node cls="svc-fn2" /><Connector idx={1} /><Node cls="svc-fn3" />
      </div>
      <div style={{ textAlign:"center", fontSize:"9px", color:"rgba(124,58,237,0.55)", fontFamily:"var(--font-sans)", fontWeight:600, letterSpacing:"2px", textTransform:"uppercase", borderTop:"1px solid rgba(124,58,237,0.12)", paddingTop:"6px" }}>
        RESULTADO
      </div>
    </div>
  );
}

function CalendarAnim() {
  const hi: Record<number,string> = { 2:"svc-ca", 6:"svc-cb", 9:"svc-cc", 4:"svc-cd" };
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:"10px", height:"100%", padding:"0 6px" }}>
      <div style={{ textAlign:"center", fontSize:"10px", color:"rgba(255,255,255,0.45)", fontFamily:"var(--font-sans)", fontWeight:600, letterSpacing:"3px", textTransform:"uppercase" }}>
        JUNIO
      </div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
        <div style={{ display:"flex", gap:"6px" }}>
          {["L","M","X","J","V","S"].map(d => (
            <div key={d} style={{ width:"22px", fontSize:"9px", textAlign:"center", color:"rgba(255,255,255,0.22)", fontFamily:"var(--font-sans)" }}>{d}</div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(6,22px)", gap:"6px" }}>
          {Array.from({length:12},(_,i) => (
            <div key={i} className={hi[i]??""} style={{ width:"22px", height:"22px", borderRadius:"6px", background: hi[i]?undefined:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {i === 2 && <span className="svc-ck" style={{ fontSize:"11px", color:"white", fontWeight:700 }}>✓</span>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", justifyContent:"center" }}>
        <div style={{ fontSize:"10px", color:"rgba(124,58,237,0.7)", fontFamily:"var(--font-sans)", fontWeight:600, border:"1px solid rgba(124,58,237,0.25)", borderRadius:"100px", padding:"4px 14px" }}>
          ✓ Confirmado
        </div>
      </div>
    </div>
  );
}

function BrowserAnim() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", padding:"8px 4px" }}>
      <div style={{ border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", overflow:"hidden", width:"100%" }}>
        {/* Load bar */}
        <div style={{ height:"2px", background:"rgba(255,255,255,0.05)", overflow:"hidden" }}>
          <div className="svc-tlb" style={{ height:"100%", background:"#7C3AED" }} />
        </div>
        {/* Toolbar */}
        <div style={{ background:"rgba(255,255,255,0.04)", padding:"7px 10px", display:"flex", gap:"6px", alignItems:"center" }}>
          {[["#e05555",0.85],["#e0a030",0.72],["#38b260",0.72]].map(([c,o],i) => (
            <div key={i} style={{ width:"9px", height:"9px", borderRadius:"50%", background:c as string, opacity:o as number }} />
          ))}
          <div style={{ flex:1, height:"5px", borderRadius:"3px", background:"rgba(255,255,255,0.07)", marginLeft:"6px" }} />
        </div>
        {/* Hero banner */}
        <div style={{ height:"44px", background:"rgba(124,58,237,0.1)", borderBottom:"1px solid rgba(255,255,255,0.04)", display:"flex", alignItems:"center", padding:"0 12px", gap:"10px" }}>
          <div style={{ height:"8px", width:"42%", borderRadius:"3px", background:"rgba(124,58,237,0.4)" }} />
          <div style={{ height:"6px", width:"22%", borderRadius:"3px", background:"rgba(255,255,255,0.1)" }} />
        </div>
        {/* Content lines */}
        <div style={{ padding:"12px 14px", display:"flex", flexDirection:"column", gap:"9px" }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{ height:"6px", borderRadius:"3px", background:"rgba(255,255,255,0.06)", overflow:"hidden" }}>
              <div className={`svc-br${Math.min(n,3)}`} style={{ height:"100%", borderRadius:"3px", background:"#7C3AED", opacity: n===4 ? 0.45 : 1 }} />
            </div>
          ))}
          {/* CTA button mock */}
          <div style={{ marginTop:"4px", height:"22px", width:"50%", borderRadius:"6px", background:"rgba(124,58,237,0.18)", border:"1px solid rgba(124,58,237,0.3)" }} />
        </div>
      </div>
    </div>
  );
}

function CartAnim() {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:"10px", height:"100%", padding:"4px 6px" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"2px" }}>
        <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.35)", fontFamily:"var(--font-sans)", fontWeight:600, letterSpacing:"3px", textTransform:"uppercase" }}>
          CARRITO
        </span>
        <div style={{ position:"relative" }}>
          <svg width="22" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <div className="svc-badge" style={{ position:"absolute", top:"-8px", right:"-10px", width:"16px", height:"16px", borderRadius:"50%", background:"#7C3AED", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:"9px", fontWeight:800, color:"white", fontFamily:"var(--font-sans)" }}>5</span>
          </div>
        </div>
      </div>
      {/* Product rows */}
      {[["App Web Pro","S/ 2,400"],["Mantenimiento","S/ 350"],["Hosting AWS","S/ 120"]].map(([name,price],i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 10px", borderRadius:"8px", background:"rgba(124,58,237,0.06)", border:"1px solid rgba(124,58,237,0.1)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ width:"7px", height:"7px", borderRadius:"2px", background:"#7C3AED", flexShrink:0 }} />
            <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.55)", fontFamily:"var(--font-sans)" }}>{name}</span>
          </div>
          <span style={{ fontSize:"11px", color:"#a78bfa", fontFamily:"var(--font-sans)", fontWeight:600 }}>{price}</span>
        </div>
      ))}
      {/* Divider */}
      <div style={{ height:"1px", background:"rgba(124,58,237,0.15)" }} />
      {/* New order ping */}
      <div className="svc-order" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"7px", padding:"8px 12px", borderRadius:"8px", background:"rgba(124,58,237,0.12)", border:"1px solid rgba(124,58,237,0.28)" }}>
        <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#a78bfa" }} />
        <span style={{ fontSize:"11px", color:"#9b7bff", fontFamily:"var(--font-sans)", fontWeight:600, letterSpacing:"0.5px" }}>+ 1 PEDIDO NUEVO</span>
      </div>
    </div>
  );
}

function PhoneAnim() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", gap:"18px" }}>
      {/* Phone */}
      <div style={{ width:"96px", height:"172px", border:"1.5px solid rgba(255,255,255,0.14)", borderRadius:"22px", position:"relative", overflow:"hidden", background:"rgba(0,0,0,0.3)", flexShrink:0 }}>
        <div style={{ position:"absolute", top:"10px", left:"50%", transform:"translateX(-50%)", width:"26px", height:"5px", background:"rgba(255,255,255,0.13)", borderRadius:"3px" }} />
        <div className="svc-scr" style={{ position:"absolute", top:"26px", left:"7px", right:"7px", bottom:"32px", borderRadius:"8px", background:"rgba(124,58,237,0.08)", display:"flex", flexDirection:"column", gap:"6px", padding:"9px" }}>
          <div style={{ height:"6px", borderRadius:"2px", background:"rgba(124,58,237,0.4)", width:"70%" }} />
          <div style={{ height:"4px", borderRadius:"2px", background:"rgba(255,255,255,0.1)", width:"50%" }} />
          <div style={{ height:"4px", borderRadius:"2px", background:"rgba(255,255,255,0.1)", width:"65%" }} />
          <div style={{ marginTop:"6px", height:"32px", borderRadius:"6px", background:"rgba(124,58,237,0.14)" }} />
          <div style={{ height:"4px", borderRadius:"2px", background:"rgba(255,255,255,0.07)", width:"80%" }} />
          <div style={{ height:"4px", borderRadius:"2px", background:"rgba(255,255,255,0.07)", width:"55%" }} />
        </div>
        <div className="svc-pn" style={{ position:"absolute", left:"6px", right:"6px", bottom:"8px", height:"30px", borderRadius:"8px", background:"#7C3AED", display:"flex", alignItems:"center", gap:"6px", padding:"0 9px" }}>
          <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:"rgba(255,255,255,0.9)", flexShrink:0 }} />
          <div style={{ height:"4px", flex:1, borderRadius:"2px", background:"rgba(255,255,255,0.35)" }} />
        </div>
      </div>
      {/* Side stats */}
      <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
        {[["Push","↑ 84%"],["Opens","↑ 61%"],["CTR","↑ 29%"]].map(([label,val]) => (
          <div key={label} style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
            <span style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)", fontFamily:"var(--font-sans)", letterSpacing:"2px", textTransform:"uppercase" }}>{label}</span>
            <span style={{ fontSize:"14px", fontWeight:700, color:"#a78bfa", fontFamily:"var(--font-sans)" }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NeuralAnim() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%" }}>
      <svg width="256" height="200" viewBox="0 0 200 140" fill="none">
        {/* L→C */}
        <line className="svc-nl1" x1="18" y1="22"  x2="100" y2="70" stroke="#7C3AED" strokeWidth="1.3" />
        <line className="svc-nl2" x1="18" y1="70"  x2="100" y2="70" stroke="#7C3AED" strokeWidth="1.3" />
        <line className="svc-nl6" x1="18" y1="118" x2="100" y2="70" stroke="#7C3AED" strokeWidth="1.3" />
        {/* C→R */}
        <line className="svc-nl3" x1="100" y1="70" x2="182" y2="22"  stroke="#7C3AED" strokeWidth="1.3" />
        <line className="svc-nl4" x1="100" y1="70" x2="182" y2="70"  stroke="#7C3AED" strokeWidth="1.3" />
        <line className="svc-nl5" x1="100" y1="70" x2="182" y2="118" stroke="#7C3AED" strokeWidth="1.3" />
        {/* Left nodes */}
        <circle className="svc-no" cx="18" cy="22"  r="7" fill="rgba(124,58,237,0.22)" stroke="rgba(124,58,237,0.6)" strokeWidth="1.4" />
        <circle className="svc-no" cx="18" cy="70"  r="7" fill="rgba(124,58,237,0.22)" stroke="rgba(124,58,237,0.6)" strokeWidth="1.4" />
        <circle className="svc-no" cx="18" cy="118" r="7" fill="rgba(124,58,237,0.22)" stroke="rgba(124,58,237,0.6)" strokeWidth="1.4" />
        {/* Center node glow ring */}
        <circle cx="100" cy="70" r="18" fill="rgba(124,58,237,0.1)" />
        <circle className="svc-nc" cx="100" cy="70" r="12" fill="#7C3AED" />
        {/* Right nodes */}
        <circle className="svc-no" cx="182" cy="22"  r="7" fill="rgba(124,58,237,0.22)" stroke="rgba(124,58,237,0.6)" strokeWidth="1.4" />
        <circle className="svc-no" cx="182" cy="70"  r="7" fill="rgba(124,58,237,0.22)" stroke="rgba(124,58,237,0.6)" strokeWidth="1.4" />
        <circle className="svc-no" cx="182" cy="118" r="7" fill="rgba(124,58,237,0.22)" stroke="rgba(124,58,237,0.6)" strokeWidth="1.4" />
      </svg>
    </div>
  );
}

function ServerAnim() {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"12px", height:"100%" }}>
      <div style={{ display:"flex", gap:"18px", alignItems:"flex-end" }}>
        {[1,2,3].map(n => (
          <div key={n} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"5px" }}>
            <div style={{ width:"34px", height:"90px", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"5px", overflow:"hidden", display:"flex", alignItems:"flex-end" }}>
              <div className={`svc-sb${n}`} style={{ width:"100%", background:"#7C3AED", borderRadius:"2px 2px 0 0" }} />
            </div>
            <div style={{ width:"18px", height:"2px", borderRadius:"2px", background:"rgba(255,255,255,0.06)" }} />
          </div>
        ))}
      </div>
      <svg width="140" height="24" viewBox="0 0 120 20" fill="none">
        <path className="svc-ecg" d="M0 10 L20 10 L26 3 L30 17 L34 3 L38 17 L42 10 L60 10 L66 3 L70 17 L74 3 L78 17 L82 10 L120 10" stroke="#7C3AED" strokeWidth="1.4" strokeLinecap="round" fill="none" strokeOpacity="0.8" />
      </svg>
    </div>
  );
}

function InvoiceAnim() {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:"12px", height:"100%", padding:"0 4px" }}>
      <div style={{ display:"flex", gap:"10px", alignItems:"flex-end", height:"70px" }}>
        {[1,2,3,4].map(n => (
          <div key={n} style={{ flex:1, background:"rgba(212,160,23,0.1)", borderRadius:"4px 4px 0 0", overflow:"hidden", display:"flex", alignItems:"flex-end" }}>
            <div className={`svc-bar${n}`} style={{ width:"100%", background:"#D4A017", borderRadius:"4px 4px 0 0" }} />
          </div>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
        {[1,2,3].map(n => (
          <div key={n} className={`svc-ir${n}`} style={{ display:"flex", gap:"8px", alignItems:"center" }}>
            <div style={{ flex:1, height:"6px", borderRadius:"3px", background:"rgba(212,160,23,0.12)" }}>
              <div style={{ height:"100%", width: n===1?"72%":n===2?"58%":"68%", borderRadius:"3px", background:"rgba(212,160,23,0.5)" }} />
            </div>
            <div style={{ width:"32px", height:"6px", borderRadius:"3px", background:"rgba(212,160,23,0.22)" }} />
          </div>
        ))}
      </div>
      <div style={{ borderTop:"1px solid rgba(212,160,23,0.18)", paddingTop:"7px", display:"flex", justifyContent:"flex-end" }}>
        <span className="svc-itot" style={{ fontSize:"14px", fontWeight:700, color:"#D4A017", fontFamily:"var(--font-sans)" }}>
          S/ 84,200 / mes
        </span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Data
   ════════════════════════════════════════════════════════════ */
type QPart = { t: string; h?: boolean };
type AnimKey = "chat"|"flow"|"calendar"|"browser"|"cart"|"phone"|"neural"|"server"|"invoice";

type ServiceDef = {
  q: QPart[];
  name: string;
  description: string;
  tags: string[];
  anim: AnimKey;
};

const ANIM: Record<AnimKey, ()=>JSX.Element> = {
  chat:ChatAnim, flow:FlowAnim, calendar:CalendarAnim, browser:BrowserAnim,
  cart:CartAnim, phone:PhoneAnim, neural:NeuralAnim, server:ServerAnim, invoice:InvoiceAnim,
};

const SERVICES: ServiceDef[] = [
  {
    q:[{t:"¿Pierdes "},{t:"clientes",h:true},{t:" cuando no estás disponible?"}],
    name:"CHATBOT IA",
    description:"Tu negocio atiende solo por WhatsApp, Instagram y Web. Sin intervención humana, las 24 horas del día.",
    tags:["Respuesta inmediata","Califica leads","WhatsApp · Instagram","24/7"],
    anim:"chat",
  },
  {
    q:[{t:"¿Todo lo haces "},{t:"tú",h:true},{t:", todo el tiempo?"}],
    name:"AUTOMATIZACIONES",
    description:"Presupuestos, recordatorios, CRM y facturación en piloto automático. Tú enfócate en crecer.",
    tags:["n8n · Zapier","API","CRM","Sin código"],
    anim:"flow",
  },
  {
    q:[{t:"¿Aún agendas reuniones "},{t:"por WhatsApp",h:true},{t:"?"}],
    name:"AGENDAMIENTO AUTOMÁTICO",
    description:"Tus clientes reservan solos. Confirmaciones y recordatorios sin que muevas un dedo.",
    tags:["Calendly","Cal.com","Google Calendar"],
    anim:"calendar",
  },
  {
    q:[{t:"¿Tu negocio existe pero "},{t:"nadie",h:true},{t:" te encuentra online?"}],
    name:"PÁGINAS WEB",
    description:"Presencia digital profesional para tu negocio. Carga ultrarrápida, convierte visitas en clientes y aparece en Google.",
    tags:["SEO optimizado","Mobile first","Lighthouse 99","Para negocios"],
    anim:"browser",
  },
  {
    q:[{t:"¿Quieres vender sin depender de "},{t:"Instagram",h:true},{t:"?"}],
    name:"E-COMMERCE",
    description:"Tienda completa con carrito, pasarela de pago y gestión de inventario lista para escalar a cualquier volumen.",
    tags:["Pagos integrados","Inventario","Panel admin","Multi-producto"],
    anim:"cart",
  },
  {
    q:[{t:"¿Tu negocio necesita estar en el "},{t:"celular",h:true},{t:" de tus clientes?"}],
    name:"APPS MÓVILES",
    description:"Apps nativas iOS y Android. Rápidas, bonitas y fieles a tu marca. Notificaciones push incluidas.",
    tags:["Flutter","iOS · Android","Notificaciones","Diseño premium"],
    anim:"phone",
  },
  {
    q:[{t:"¿Tu "},{t:"competencia",h:true},{t:" ya usa Inteligencia Artificial?"}],
    name:"INTELIGENCIA ARTIFICIAL",
    description:"GPT personalizado para tu negocio, análisis de datos y modelos que potencian cada decisión que tomas.",
    tags:["OpenAI · LangChain","GPT","Embeddings","Automatización IA"],
    anim:"neural",
  },
  {
    q:[{t:"¿Tu sistema se "},{t:"cae",h:true},{t:" justo cuando más lo necesitas?"}],
    name:"CLOUD & BACKEND",
    description:"Infraestructura AWS escalable, APIs robustas y bases de datos con 99.9% de uptime garantizado.",
    tags:["AWS · Docker","Node.js","PostgreSQL","Alta disponibilidad"],
    anim:"server",
  },
  {
    q:[{t:"¿"},{t:"No sabes",h:true},{t:" cuánto gana tu negocio cada mes?"}],
    name:"FACTURACIÓN & REPORTES",
    description:"Control financiero total para tu negocio. Ingresos, costos, reportes en tiempo real. Toma decisiones con datos.",
    tags:["Para negocios","Reportes PDF","Multi-usuario","Dashboard"],
    anim:"invoice",
  },
];

/* ════════════════════════════════════════════════════════════
   Question renderer
   ════════════════════════════════════════════════════════════ */
function Q({ parts }: { parts: QPart[] }) {
  return (
    <>
      {parts.map((p, i) =>
        p.h ? (
          <span key={i} style={{ color:"#a78bfa", background:"rgba(124,58,237,0.14)", padding:"1px 6px", borderRadius:"5px" }}>
            {p.t}
          </span>
        ) : (
          <span key={i}>{p.t}</span>
        )
      )}
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   Row
   ════════════════════════════════════════════════════════════ */
function ServiceRow({ svc, index }: { svc:ServiceDef; index:number }) {
  const flip = index % 2 !== 0;
  const isGold = svc.anim === "invoice";
  const AnimEl = ANIM[svc.anim];
  const lineColor  = isGold ? "rgba(212,160,23,0.1)"  : "rgba(124,58,237,0.1)";
  const frameColor = isGold ? "rgba(212,160,23,0.14)" : "rgba(124,58,237,0.14)";
  const frameBg    = isGold ? "rgba(212,160,23,0.025)": "rgba(124,58,237,0.03)";
  const accentCol  = isGold ? "#D4A017" : "#a78bfa";
  const chipBorder = isGold ? "rgba(212,160,23,0.32)" : "rgba(124,58,237,0.32)";

  return (
    <div
      className="svc-row"
      style={{ position:"relative", display:"flex", alignItems:"center",
        flexDirection: flip?"row-reverse":"row", gap:"56px", padding:"56px 80px" }}
    >
      {/* ── Animation panel + number chip ── */}
      <div className="svc-frame-wrap" style={{ position:"relative", flexShrink:0, paddingTop:"16px", paddingLeft:"16px" }}>

        {/* Number chip — overlaps top-left corner of the frame */}
        <div
          className="svc-chip"
          style={{ position:"absolute", top:0, left:0, zIndex:3,
            width:"44px", height:"44px",
            background:"#07071a",
            border:`1px solid ${chipBorder}`,
            borderRadius:"10px",
            display:"flex", alignItems:"center", justifyContent:"center" }}
        >
          <motion.span
            initial={{ color:"transparent" }}
            whileInView={{ color: accentCol }}
            transition={{ duration:0.8, ease:"easeOut" }}
            viewport={{ once:true }}
            style={{ fontFamily:"var(--font-sans)", fontWeight:800, fontSize:"17px",
              letterSpacing:"-0.02em", userSelect:"none",
              WebkitTextStroke: isGold?"1px rgba(212,160,23,0.65)":"1px rgba(167,139,250,0.65)" }}
          >
            {String(index+1).padStart(2,"0")}
          </motion.span>
        </div>

        {/* Frame */}
        <div
          className="svc-frame"
          style={{ width:"290px", height:"290px",
            background: frameBg,
            border:`1px solid ${frameColor}`,
            borderRadius:"18px",
            overflow:"hidden",
            position:"relative" }}
        >
          {/* Dashed decorative lines */}
          <div style={{ position:"absolute", top:"30%", left:0, right:0, height:"1px",
            background:`repeating-linear-gradient(to right,${lineColor} 0px,${lineColor} 4px,transparent 4px,transparent 10px)`,
            zIndex:0, pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:"70%", left:0, right:0, height:"1px",
            background:`repeating-linear-gradient(to right,${lineColor} 0px,${lineColor} 4px,transparent 4px,transparent 10px)`,
            zIndex:0, pointerEvents:"none" }} />

          {/* Content */}
          <div style={{ position:"relative", zIndex:1, height:"100%", padding:"14px" }}>
            <AnimEl />
          </div>
        </div>
      </div>

      {/* Text */}
      <div style={{ flex:1, zIndex:1, maxWidth:"600px" }}>
        <p style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"11px", color: isGold?"#D4A017":"#7C3AED", textTransform:"uppercase", letterSpacing:"4px", margin:"0 0 16px" }}>
          {svc.name}
        </p>
        <h3 style={{ fontFamily:"var(--font-sans)", fontWeight:800, fontSize:"clamp(22px,2.4vw,34px)", color:"#ffffff", textTransform:"uppercase", letterSpacing:"-0.02em", lineHeight:1.18, margin:"0 0 18px" }}>
          <Q parts={svc.q} />
        </h3>
        <p style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"15px", color:"rgba(255,255,255,0.45)", lineHeight:1.75, margin:"0 0 20px" }}>
          {svc.description}
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"22px" }}>
          {svc.tags.map(tag => (
            <span key={tag} style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"11px", color:"rgba(255,255,255,0.38)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"100px", padding:"5px 13px", letterSpacing:"0.3px" }}>
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={() => smoothScrollTo("contact", 100)}
          style={{ fontFamily:"var(--font-sans)", fontWeight:600, fontSize:"13px", color: isGold?"#D4A017":"#7C3AED", background:"none", border:"none", cursor:"pointer", padding:0, display:"inline-flex", alignItems:"center", gap:"6px", textTransform:"uppercase", letterSpacing:"1px" }}
        >
          Ver solución <span className="svc-arr">→</span>
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Section
   ════════════════════════════════════════════════════════════ */
export function ServicesSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = SERVICES.length;

  // Desplaza el carrusel hasta centrar el panel i
  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(total - 1, i));
    const child = el.children[clamped] as HTMLElement | undefined;
    if (!child) return;
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  // El menú overlay puede pedir saltar a un servicio concreto.
  useEffect(() => {
    const handler = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      if (typeof i !== "number") return;
      // Reintenta brevemente hasta que el carrusel esté en viewport y medible.
      let tries = 0;
      const tick = () => {
        const el = scrollerRef.current;
        if (el && el.clientWidth > 0) { goTo(i); return; }
        if (tries++ < 20) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    window.addEventListener("mc:goService", handler as EventListener);
    return () => window.removeEventListener("mc:goService", handler as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Índice = panel cuyo centro queda más cerca del centro visible
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0, bestD = Infinity;
    for (let i = 0; i < el.children.length; i++) {
      const c = el.children[i] as HTMLElement;
      const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - center);
      if (d < bestD) { bestD = d; best = i; }
    }
    setIndex(best);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="services" style={{ background:"transparent", paddingBottom:"96px" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Header + controles */}
      <div className="svc-header-pad" style={{ padding:"88px 52px 36px" }}>
        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.5 }}
          style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:"24px", flexWrap:"wrap" }}
        >
          <div>
            <p style={{ fontFamily:"var(--font-sans)", fontWeight:700, fontSize:"11px", color:"#7C3AED", textTransform:"uppercase", letterSpacing:"4px", margin:"0 0 16px" }}>
              Nuestros Servicios
            </p>
            <h2 style={{ fontFamily:"var(--font-sans)", fontWeight:800, fontSize:"clamp(28px,3.5vw,48px)", color:"#ffffff", textTransform:"uppercase", letterSpacing:"-0.03em", lineHeight:1.1, margin:"0 0 14px" }}>
              Dinos cuál es{" "}
              <span style={{ color:"#a78bfa", background:"rgba(124,58,237,0.12)", padding:"2px 10px", borderRadius:"8px" }}>
                tu situación.
              </span>
            </h2>
            <p style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"15px", color:"rgba(255,255,255,0.4)", lineHeight:1.65, maxWidth:"520px", margin:0 }}>
              Cada negocio tiene su problema. Nosotros tenemos la solución exacta.
            </p>
          </div>

          {/* Contador + flechas */}
          <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
            <span style={{ fontFamily:"var(--font-sans)", fontWeight:600, fontSize:"13px", color:"rgba(255,255,255,0.45)", letterSpacing:"2px" }}>
              <span style={{ color:"#a78bfa" }}>{pad(index + 1)}</span> / {pad(total)}
            </span>
            <button className="svc-arrow" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Servicio anterior">
              <ArrowLeft size={20} />
            </button>
            <button className="svc-arrow" onClick={() => goTo(index + 1)} disabled={index === total - 1} aria-label="Siguiente servicio">
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Carrusel — flechas en desktop, swipe en móvil */}
      <div ref={scrollerRef} className="svc-scroller" onScroll={onScroll}>
        {SERVICES.map((svc, i) => (
          <div key={svc.name} className="svc-panel">
            <ServiceRow svc={svc} index={i} />
          </div>
        ))}
      </div>

      {/* Progreso */}
      <div className="svc-progress-wrap">
        <div className="svc-progress" style={{ transform:`scaleX(${(index + 1) / total})` }} />
      </div>
    </section>
  );
}
