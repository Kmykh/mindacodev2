"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorldCupBanner() {
  const handleOfferClaim = () => {
    const text = encodeURIComponent(
      "¡Hola Minda! ⚽ Vengo por la Promo Mundial, quiero llevar mi negocio a primera división 🏆"
    );
    window.open(`https://wa.me/51926948155?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="promo-mundial" className="relative overflow-hidden py-10 sm:py-14 bg-[#050305]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Glow de césped y oro */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="w-[450px] h-[300px] bg-green-500/10 blur-[150px] rounded-full absolute -left-20"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-[300px] h-[300px] bg-yellow-500/10 blur-[150px] rounded-full absolute -right-10"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-[2rem] border border-green-400/20 bg-gradient-to-br from-[#051508]/90 to-[#0a0a05]/90 p-8 sm:p-10 md:p-12 shadow-[0_0_60px_-20px_rgba(34,197,94,0.15)] backdrop-blur-xl overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* Patrón de cancha de fútbol en el fondo */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{
                 backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, #22c55e 20px, #22c55e 40px)"
               }} 
          />

          {/* Icono de Trofeo Animado */}
          <motion.div 
            className="relative flex items-center justify-center flex-shrink-0"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-yellow-400/20 blur-[50px] rounded-full" />
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-yellow-500/30 bg-gradient-to-tr from-yellow-600/20 to-green-600/20 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <Trophy className="h-14 w-14 text-yellow-400" />
            </div>
            
            {/* Pequeños balones decorativos flotando */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute -top-4 -right-4 text-3xl"
             >
               ⚽
             </motion.div>
          </motion.div>

          {/* Texto de la promoción */}
          <motion.div 
             className="flex-1 text-center md:text-left z-10"
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-500/30 bg-green-500/10 text-xs uppercase tracking-wider text-green-300 mb-4">
              <span className="animate-pulse">⚽</span>
              Especial Mundialista
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
              Golea a tu competencia en la <span className="text-white">cancha digital</span>
            </h2>
            
            <p className="text-zinc-200 mb-8 max-w-xl text-sm sm:text-base leading-relaxed drop-shadow-sm">
              Juega en primera división con una web de alto rendimiento. Diseño estratégico, carga rápida y optimizada para convertir cada visita en un gol.
            </p>

            <Button
              onClick={handleOfferClaim}
              className="group h-14 px-8 rounded-xl bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-[length:200%_auto] text-white font-bold text-sm sm:text-base transition-all hover:bg-[100%_auto] shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            >
              <span className="flex items-center gap-2">
                🏆 Quiero jugar en primera
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
