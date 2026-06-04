"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Gift, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const FATHERS_DAY_EXPIRY = new Date("2026-06-21T23:59:59").getTime();

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
    expired: false,
  });

  useEffect(() => {
    const tick = () => {
      const diff = FATHERS_DAY_EXPIRY - Date.now();

      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0, expired: true });
        return;
      }

      setTimeLeft({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
        expired: false,
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-lg sm:text-xl font-semibold text-white tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
      </span>
    </div>
  );
}

function ParticlesEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, originX: number, originY: number, size: number, color: string, vx: number, vy: number, angle: number, speedRotate: number }[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const colors = ['rgba(59, 130, 246, 0.4)', 'rgba(99, 102, 241, 0.3)', 'rgba(147, 197, 253, 0.2)'];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 8000); 
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x, y, originX: x, originY: y,
          vx: 0, vy: 0,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2,
          speedRotate: (Math.random() - 0.5) * 0.02
        });
      }
    };

    const drawParticle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        
        if (distance < maxDist) {
           const force = (maxDist - distance) / maxDist;
           p.vx += dx * force * 0.01;
           p.vy += dy * force * 0.01;
        } 
        
        // Return to origin spring
        p.vx += (p.originX - p.x) * 0.015;
        p.vy += (p.originY - p.y) * 0.015;
        
        // Dampening
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        drawParticle(ctx, p.x, p.y, p.size, p.color);
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    const parent = canvas.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
       const rect = parent.getBoundingClientRect();
       mouse.x = e.clientX - rect.left;
       mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
       mouse.x = -1000;
       mouse.y = -1000;
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 mix-blend-screen" />;
}

export function FathersDayBanner() {
  const { d, h, m, s, expired } = useCountdown();

  const handleOfferClaim = () => {
    const text = encodeURIComponent(
      "Hola Minda, vengo de la promoción del Día del Padre y quiero mi web"
    );
    window.open(
      `https://wa.me/51926948155?text=${text}`,
      "_blank"
    );
  };

  return (
    <section id="promocion" className="relative overflow-hidden py-12 sm:py-16 bg-[#050305]">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[400px] h-[250px] bg-blue-500/8 blur-[140px] rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-[2rem] border border-blue-300/15 bg-gradient-to-br from-[#0a1020]/80 to-[#050b18]/80 p-8 sm:p-10 md:p-12 shadow-[0_0_60px_-20px_rgba(59,130,246,0.1)] backdrop-blur-xl overflow-hidden">
          {/* Partículas interactivas flotando en el fondo */}
          <ParticlesEffect />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* TEXTO */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs uppercase tracking-wider text-white/60">
              <Gift className="w-3.5 h-3.5 text-blue-300" />
              Edición limitada
            </div>

            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight drop-shadow-md">
                <span className="text-white">Regálale a papá </span>
                <span className="text-blue-400 drop-shadow-sm">su página web</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-blue-50/90 max-w-sm leading-relaxed drop-shadow-sm">
                Lleva su negocio al siguiente nivel con una presencia digital moderna, rápida y diseñada para vender.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleOfferClaim}
                className="group h-12 sm:h-14 px-8 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 bg-[length:200%_auto] text-white font-bold text-sm sm:text-base transition-all hover:bg-[100%_auto] shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  ¡Reclamar Promoción!
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>

            {/* CRONOMETRO EN TEXTO - MINIMALISTA */}
            {!expired && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-blue-400/60" />
                  <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
                    Disponible por
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <TimeUnit value={d} label="días" />
                  <span className="text-white/30 text-lg font-light">:</span>
                  <TimeUnit value={h} label="hrs" />
                  <span className="text-white/30 text-lg font-light">:</span>
                  <TimeUnit value={m} label="min" />
                  <span className="text-white/30 text-lg font-light">:</span>
                  <TimeUnit value={s} label="seg" />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* IMAGEN */}
          <motion.div 
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center p-6"
            >
              <Image
                src="/fathers-day.png"
                alt="Feliz Día del Padre"
                fill
                className="object-contain relative z-10 drop-shadow-md scale-90"
              />
            </motion.div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}