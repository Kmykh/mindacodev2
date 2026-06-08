"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function Hero3DScene({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let disposeHandle: (() => void) | undefined;

    const boot = async () => {
      const THREE = await import("three");
      if (disposed) return;

      const canvas = document.createElement("canvas");
      canvas.style.cssText = "width:100%;height:100%;display:block;";
      mount.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 5.5;

      const setSize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      const group = new THREE.Group();
      scene.add(group);

      // ── Textura de estrella: círculo con halo suave (evita cuadrados)
      const starSize = 64;
      const starCanvas = document.createElement("canvas");
      starCanvas.width = starSize; starCanvas.height = starSize;
      const ctx = starCanvas.getContext("2d")!;
      const cx = starSize / 2;
      // Halo exterior difuso
      const halo = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
      halo.addColorStop(0,    "rgba(255,255,255,1)");
      halo.addColorStop(0.12, "rgba(255,255,255,0.95)");
      halo.addColorStop(0.35, "rgba(255,255,255,0.45)");
      halo.addColorStop(0.7,  "rgba(255,255,255,0.08)");
      halo.addColorStop(1,    "rgba(255,255,255,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, starSize, starSize);
      // Destello cruzado sutil
      const streak = (angle: number) => {
        ctx.save();
        ctx.translate(cx, cx); ctx.rotate(angle);
        const g = ctx.createLinearGradient(-cx, 0, cx, 0);
        g.addColorStop(0,   "rgba(255,255,255,0)");
        g.addColorStop(0.45,"rgba(255,255,255,0.18)");
        g.addColorStop(0.5, "rgba(255,255,255,0.55)");
        g.addColorStop(0.55,"rgba(255,255,255,0.18)");
        g.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(-cx, -1.5, starSize, 3);
        ctx.restore();
      };
      streak(0); streak(Math.PI / 2);
      const starTex = new THREE.CanvasTexture(starCanvas);

      // ── TorusKnot — segmentos reducidos para mejor perf
      const torusKnotGeo = new THREE.TorusKnotGeometry(1.3, 0.38, 160, 12, 2, 3);
      const torusKnotMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.38,
      });
      const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
      group.add(torusKnot);

      // Posiciones originales y fases precalculadas (evita multiplicaciones en el loop)
      const posArr   = torusKnotGeo.attributes.position.array as Float32Array;
      const nv       = posArr.length / 3;
      const origPos  = new Float32Array(posArr);          // copia inmutable
      const phases   = new Float32Array(nv * 3);          // cache de fases

      for (let i = 0; i < nv; i++) {
        const fi        = i / nv;
        phases[i * 3]   = fi * Math.PI * 14;   // onda principal
        phases[i * 3 + 1] = fi * Math.PI * 22; // ripple rápido
        phases[i * 3 + 2] = fi * Math.PI * 7;  // ondulación lenta
      }

      // ── Partículas
      const PCOUNT   = 180;
      const pPos     = new Float32Array(PCOUNT * 3);
      const pOrig    = new Float32Array(PCOUNT * 3); // para movimiento oscilante (no acumulativo)
      const pSpeeds  = new Float32Array(PCOUNT * 3);
      const pCol     = new Float32Array(PCOUNT * 3);
      const cA = new THREE.Color(0x9b7bff);
      const cB = new THREE.Color(0x60a5fa);
      const cC = new THREE.Color(0xe879f9);

      for (let i = 0; i < PCOUNT; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = 2.2 + Math.random() * 2.1;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        pPos[i*3]=x; pPos[i*3+1]=y; pPos[i*3+2]=z;
        pOrig[i*3]=x; pOrig[i*3+1]=y; pOrig[i*3+2]=z;
        pSpeeds[i*3]   = 0.18 + Math.random() * 0.25;
        pSpeeds[i*3+1] = 0.14 + Math.random() * 0.22;
        pSpeeds[i*3+2] = 0.16 + Math.random() * 0.28;
        const t = Math.random();
        const c = t < 0.5 ? cA.clone().lerp(cB, t/0.5) : cB.clone().lerp(cC, (t-0.5)/0.5);
        pCol[i*3]=c.r; pCol[i*3+1]=c.g; pCol[i*3+2]=c.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color",    new THREE.BufferAttribute(pCol, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.11,
        map: starTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.82,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        alphaTest: 0.004,
      });
      const particlesMesh = new THREE.Points(pGeo, pMat);
      group.add(particlesMesh);

      // Mouse parallax
      let targetRotY = 0, targetRotX = 0;
      const onMouseMove = (e: MouseEvent) => {
        const rect = mount.getBoundingClientRect();
        targetRotY = ((e.clientX - rect.left) / mount.clientWidth  - 0.5) * 0.5;
        targetRotX = -((e.clientY - rect.top)  / mount.clientHeight - 0.5) * 0.35;
      };
      document.addEventListener("mousemove", onMouseMove);

      const ro = new ResizeObserver(setSize);
      ro.observe(mount);
      // window resize catches breakpoint crossings (hidden lg:flex) that ResizeObserver may miss
      window.addEventListener("resize", setSize, { passive: true });
      // matchMedia fires the exact moment the lg breakpoint is crossed
      const mq = window.matchMedia("(min-width: 1024px)");
      const onMQ = () => { if (mq.matches) setSize(); };
      mq.addEventListener("change", onMQ);
      setSize();

      const clock = new THREE.Clock();
      let rafId = 0;

      const loop = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(loop);
        if (document.hidden) return; // no renderizar si la pestaña no es visible
        const el = clock.getElapsedTime();

        // ── Worm displacement — fases precalculadas, amplitudes optimizadas
        for (let i = 0; i < nv; i++) {
          const ox = origPos[i*3], oy = origPos[i*3+1], oz = origPos[i*3+2];
          const p1 = phases[i*3], p2 = phases[i*3+1], p3 = phases[i*3+2];

          posArr[i*3]   = ox + Math.sin(el*1.3+p1)*0.16 + Math.cos(el*0.6+p2)*0.08;
          posArr[i*3+1] = oy + Math.cos(el*1.0+p1*0.9)*0.15 + Math.sin(el*1.7+p3)*0.06;
          posArr[i*3+2] = oz + Math.sin(el*0.8+p2*0.7)*0.13 + Math.cos(el*1.4+p1*0.5)*0.07;
        }
        torusKnotGeo.attributes.position.needsUpdate = true;

        // Respiración de opacidad
        torusKnotMat.opacity = 0.32 + Math.sin(el * 0.5) * 0.09;

        // Rotación global suave
        torusKnot.rotation.x = el * 0.055;
        torusKnot.rotation.y = el * 0.085;
        torusKnot.rotation.z = el * 0.035;

        // Partículas — oscilación acotada (sin acumulación de drift)
        const pa = pGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < PCOUNT; i++) {
          pa[i*3]   = pOrig[i*3]   + Math.sin(el*pSpeeds[i*3]   + i*0.71) * 0.18;
          pa[i*3+1] = pOrig[i*3+1] + Math.cos(el*pSpeeds[i*3+1] + i*1.13) * 0.14;
          pa[i*3+2] = pOrig[i*3+2] + Math.sin(el*pSpeeds[i*3+2] + i*0.93) * 0.16;
        }
        pGeo.attributes.position.needsUpdate = true;

        // Parallax suave
        group.rotation.y += (targetRotY - group.rotation.y) * 0.04;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.04;

        renderer.render(scene, camera);
      };

      loop();

      disposeHandle = () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", setSize);
        mq.removeEventListener("change", onMQ);
        ro.disconnect();
        torusKnotGeo.dispose(); torusKnotMat.dispose();
        pGeo.dispose(); pMat.dispose(); starTex.dispose();
        renderer.dispose();
        if (mount.contains(canvas)) mount.removeChild(canvas);
      };

      if (disposed) { disposeHandle(); disposeHandle = undefined; }
    };

    void boot();
    return () => { disposed = true; disposeHandle?.(); };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={mountRef}
      aria-hidden
      className={className}
      style={{
        // Vignette — desvanece los bordes del canvas suavemente
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 78% at 52% 50%, black 30%, rgba(0,0,0,0.6) 58%, transparent 82%)",
        maskImage:
          "radial-gradient(ellipse 80% 78% at 52% 50%, black 30%, rgba(0,0,0,0.6) 58%, transparent 82%)",
      }}
    />
  );
}
