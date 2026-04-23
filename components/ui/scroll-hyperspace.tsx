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

    const stars: { x: number; y: number; z: number; prevZ: number }[] = [];
    const numStars = 800;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * 2000 - 1000,
        y: Math.random() * 2000 - 1000,
        z: Math.random() * 2000,
        prevZ: 0,
      });
    }

    let scrollSpeed = 200; // Start at warp speed on load
    let targetSpeed = 1; 
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - lastScrollY);
      // Boost speed based on scroll delta
      targetSpeed = Math.min(delta * 1.5 + 1, 100); 
      lastScrollY = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId: number;

    const draw = () => {
      // Smoothly transition speed
      scrollSpeed += (targetSpeed - scrollSpeed) * 0.1;
      // Decay target speed back to resting speed
      targetSpeed += (1 - targetSpeed) * 0.05;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.prevZ = star.z;
        star.z -= scrollSpeed;

        if (star.z <= 0) {
          star.x = Math.random() * 2000 - 1000;
          star.y = Math.random() * 2000 - 1000;
          star.z = 2000;
          star.prevZ = 2000;
        }

        const x = cx + (star.x / star.z) * w;
        const y = cy + (star.y / star.z) * h;

        const px = cx + (star.x / star.prevZ) * w;
        const py = cy + (star.y / star.prevZ) * h;

        // Calculate opacity and thickness based on z (closer = brighter/thicker)
        const depthRatio = 1 - star.z / 2000;
        
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.lineWidth = depthRatio * 2;
        // Rose-tinted white for hyperspace light
        ctx.strokeStyle = `rgba(255, 230, 240, ${depthRatio})`;
        ctx.stroke();
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
      className="fixed inset-0 pointer-events-none z-[1] opacity-70"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
