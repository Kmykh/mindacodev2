"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { AnimatedLogo } from "@/components/ui/animated-logo";
import { smoothScrollTo } from "@/lib/utils";

/* ── Social icons ── */
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIALS = [
  { name: "Instagram", icon: Instagram,   href: "https://instagram.com/mindacode" },
  { name: "TikTok",    icon: TikTokIcon,  href: "https://tiktok.com/@mindacode" },
  { name: "LinkedIn",  icon: LinkedInIcon, href: "https://linkedin.com/company/mindacode" },
];

const NAV = [
  { label: "Servicios",  id: "services"  },
  { label: "Portafolio", id: "portfolio" },
  { label: "Proceso",    id: "process"   },
  { label: "FAQ",        id: "faq"       },
  { label: "Nosotros",   id: "about"     },
  { label: "Contacto",   id: "contact"   },
];

export function Footer() {

  return (
    <footer style={{ background:"#07071a", borderTop:"1px solid rgba(255,255,255,0.05)", position:"relative", overflow:"hidden" }}>
      {/* Ambient glow */}
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"40%", height:"160px", background:"rgba(124,58,237,0.06)", filter:"blur(80px)", pointerEvents:"none" }} />

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"72px 56px 40px", position:"relative", zIndex:1 }}>

        {/* ── Brand block ── */}
        <motion.div
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
          style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"16px", marginBottom:"56px" }}
        >
          <AnimatedLogo textClassName="text-4xl sm:text-5xl" />
          <p style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"14px", color:"rgba(255,255,255,0.35)", textAlign:"center", maxWidth:"360px", lineHeight:1.75, margin:0 }}>
            No trabajamos para cumplir.<br />Creamos para dejar huella.
          </p>

          {/* Social icons */}
          <div style={{ display:"flex", gap:"10px", marginTop:"4px" }}>
            {SOCIALS.map(s => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"40px", height:"40px", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.03)", color:"rgba(255,255,255,0.4)", transition:"all 0.25s", textDecoration:"none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.15)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(124,58,237,0.5)"; (e.currentTarget as HTMLAnchorElement).style.color = "#a78bfa"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"; }}
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Separator ── */}
        <div style={{ height:"1px", background:"rgba(255,255,255,0.05)", marginBottom:"40px" }} />

        {/* ── Nav links ── */}
        <motion.nav
          initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:0.1 }}
          style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"8px 32px", marginBottom:"48px" }}
        >
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => smoothScrollTo(item.id)}
              style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-sans)", fontWeight:400, fontSize:"13px", color:"rgba(255,255,255,0.38)", padding:"4px 0", transition:"color 0.2s", letterSpacing:"0.02em" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.38)"; }}
            >
              {item.label}
            </button>
          ))}
        </motion.nav>

        {/* ── Copyright ── */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"16px 0 24px", textAlign:"center" }}>
          <p style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"13px", color:"rgba(255,255,255,0.4)", margin:0 }}>
            © 2026 Minda Code · Hecho en Lima, Perú
          </p>
        </div>

      </div>
    </footer>
  );
}
