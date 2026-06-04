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

    const NUM = 180;

    type Star = {
      x: number; y: number;
      px: number; py: number;
      z: number;
      angle: number;
    };

    const stars: Star[] = [];

    const spawn = (s: Star) => {
      s.angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 30;
      s.x = Math.cos(s.angle) * r;
      s.y = Math.sin(s.angle) * r;
      s.px = s.x;
      s.py = s.y;
      s.z = Math.random() * 0.85 + 0.15;
    };

    for (let i = 0; i < NUM; i++) {
      const s = { x: 0, y: 0, px: 0, py: 0, z: 0, angle: 0 };
      spawn(s);
      // Pre-scatter so stars don't all start at center on load
      const scatter = Math.random() * (Math.max(w, h) * 0.5);
      s.x = Math.cos(s.angle) * scatter;
      s.y = Math.sin(s.angle) * scatter;
      s.px = s.x;
      s.py = s.y;
      stars.push(s);
    }

    let vel = 0;
    let lastY = window.scrollY;

    const onScroll = () => {
      const cur = window.scrollY;
      vel += Math.abs(cur - lastY) * 0.2;
      lastY = cur;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    let raf: number;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      vel *= 0.88;

      // Clear completely every frame — never darken the page behind
      ctx.clearRect(0, 0, w, h);

      // Nothing to draw when not scrolling — canvas stays fully transparent
      if (vel < 0.05) return;

      ctx.save();
      ctx.translate(w / 2, h / 2);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        s.px = s.x;
        s.py = s.y;

        const speed = s.z * vel * 2.5;
        s.x += Math.cos(s.angle) * speed;
        s.y += Math.sin(s.angle) * speed;

        if (Math.hypot(s.x, s.y) > Math.hypot(w, h) * 0.55) {
          spawn(s);
          continue;
        }

        const alpha = Math.min((vel / 5) * s.z + 0.12, 0.92);
        const bright = Math.floor(160 + s.z * 95);

        ctx.beginPath();
        ctx.moveTo(s.px, s.py);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = `rgba(${bright},${bright},255,${alpha})`;
        ctx.lineWidth = s.z * 1.5 + 0.2;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      ctx.restore();
    };

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
