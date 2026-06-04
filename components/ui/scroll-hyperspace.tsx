"use client";

import { useEffect, useRef } from "react";

export function ScrollHyperspace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Partículas para el fondo del mundial (confeti, círculos verdes/oropel)
    const particles: { 
      x: number; y: number; size: number; speedY: number; speedX: number; 
      color: string; rot: number; rotSpeed: number; type: string 
    }[] = [];
    const numParticles = 60;
    const colors = ["#22c55e", "#16a34a", "#eab308", "#facc15", "#ffffff"];
    const types = ["circle", "rect", "ball"];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 8 + 4,
        speedY: Math.random() * 1 + 0.5,
        speedX: Math.random() * 1 - 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI * 2,
        rotSpeed: Math.random() * 0.05 - 0.025,
        type: Math.random() > 0.85 ? "ball" : types[Math.floor(Math.random() * 2)]
      });
    }

    let scrollSpeed = 0; 
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY;
      scrollSpeed = delta * 0.5; 
      lastScrollY = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Suave inercia del scroll
      scrollSpeed *= 0.9;

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        
        // Movimiento natural + efecto del scroll de la página
        p.y -= scrollSpeed + p.speedY; // El scroll hacia abajo hace que suban, y viceversa
        p.x += p.speedX;
        p.rot += p.rotSpeed;

        // Reposicionar si sale de la pantalla
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = 0.6; // Suave opacidad para el fondo

        if (p.type === "ball") {
           // Dibujar un baloncito simple
           ctx.beginPath();
           ctx.arc(0, 0, p.size * 1.5, 0, Math.PI * 2);
           ctx.fillStyle = "#ffffff";
           ctx.fill();
           ctx.beginPath();
           ctx.arc(0, 0, p.size * 1.5, 0, Math.PI * 2);
           ctx.strokeStyle = "#000000";
           ctx.lineWidth = 1;
           ctx.stroke();
           
           ctx.fillStyle = "#000000";
           ctx.beginPath();
           ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
           ctx.fill();
        } else if (p.type === "circle") {
           ctx.beginPath();
           ctx.arc(0, 0, p.size, 0, Math.PI * 2);
           ctx.fillStyle = p.color;
           ctx.fill();
        } else {
           ctx.fillStyle = p.color;
           ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 1.5);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = (canvas.width = window.innerWidth);
      h = (canvas.height = window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}
