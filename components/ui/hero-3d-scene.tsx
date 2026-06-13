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
      // HD en desktop (hasta 2x), contenido en móvil para no castigar la GPU
      const isSmall = window.innerWidth < 1024;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 5.5;

      // En desktop la galaxia vive a la derecha del texto del hero (posición fija).
      // En móvil queda centrada.
      const setSize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        group.position.x = window.innerWidth >= 1024 ? 1.4 : 0;
      };

      const group = new THREE.Group();
      scene.add(group);

      // ── Textura de estrella: círculo con halo suave (evita cuadrados)
      const starSize = 128;
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
        ctx.fillRect(-cx, -2.5, starSize, 5);
        ctx.restore();
      };
      streak(0); streak(Math.PI / 2);
      const starTex = new THREE.CanvasTexture(starCanvas);

      // ── Galaxia espiral — partículas estáticas en GPU, solo rota (muy barato)
      const GCOUNT  = isSmall ? 4500 : 12000;
      const RADIUS  = 2.8;
      const BRANCHES = 4;
      const SPIN     = 1.4;
      const RAND     = 0.3;   // brazos más definidos
      const RAND_POW = 3.1;

      const gPos = new Float32Array(GCOUNT * 3);
      const gCol = new Float32Array(GCOUNT * 3);
      const cInner = new THREE.Color(0xd8ccff); // núcleo violeta claro
      const cMidG  = new THREE.Color(0x8b5cf6); // violeta marca
      const cOuter = new THREE.Color(0x3b82f6); // azul borde

      for (let i = 0; i < GCOUNT; i++) {
        // más densidad hacia el centro
        const r = Math.pow(Math.random(), 1.5) * RADIUS;
        const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
        const spinAngle = r * SPIN;

        const rnd = () =>
          Math.pow(Math.random(), RAND_POW) * (Math.random() < 0.5 ? 1 : -1) * RAND * (0.4 + r);

        gPos[i*3]   = Math.cos(branchAngle + spinAngle) * r + rnd();
        gPos[i*3+1] = rnd() * 0.45; // disco aplanado
        gPos[i*3+2] = Math.sin(branchAngle + spinAngle) * r + rnd();

        const t = r / RADIUS;
        const c = t < 0.45
          ? cInner.clone().lerp(cMidG, t / 0.45)
          : cMidG.clone().lerp(cOuter, (t - 0.45) / 0.55);
        gCol[i*3] = c.r; gCol[i*3+1] = c.g; gCol[i*3+2] = c.b;
      }

      const gGeo = new THREE.BufferGeometry();
      gGeo.setAttribute("position", new THREE.BufferAttribute(gPos, 3));
      gGeo.setAttribute("color",    new THREE.BufferAttribute(gCol, 3));
      const gMat = new THREE.PointsMaterial({
        size: isSmall ? 0.055 : 0.042, // más partículas y más finas = look HD
        map: starTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        alphaTest: 0.004,
      });
      const galaxy = new THREE.Points(gGeo, gMat);

      // Núcleo brillante (sprite con gradiente radial violeta)
      const coreSize = 256;
      const coreCanvas = document.createElement("canvas");
      coreCanvas.width = coreSize; coreCanvas.height = coreSize;
      const cctx = coreCanvas.getContext("2d")!;
      const ccx = coreSize / 2;
      const coreGrad = cctx.createRadialGradient(ccx, ccx, 0, ccx, ccx, ccx);
      coreGrad.addColorStop(0,    "rgba(245,240,255,0.95)");
      coreGrad.addColorStop(0.18, "rgba(200,180,255,0.55)");
      coreGrad.addColorStop(0.45, "rgba(139,92,246,0.22)");
      coreGrad.addColorStop(1,    "rgba(139,92,246,0)");
      cctx.fillStyle = coreGrad;
      cctx.fillRect(0, 0, coreSize, coreSize);
      const coreTex = new THREE.CanvasTexture(coreCanvas);
      const coreMat = new THREE.SpriteMaterial({
        map: coreTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const core = new THREE.Sprite(coreMat);
      core.scale.set(2.1, 2.1, 1);

      // Inclinación tipo vista 3/4 para que se aprecie la espiral
      const galaxyTilt = new THREE.Group();
      galaxyTilt.rotation.x = -0.62;
      galaxyTilt.rotation.z = 0.22;
      galaxyTilt.add(galaxy);
      galaxyTilt.add(core);
      group.add(galaxyTilt);

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

      // Progreso de scroll dentro del hero (0 → 1 en la primera pantalla):
      // acerca e inclina la galaxia levemente mientras el hero sale de pantalla
      let heroT = 0;
      const onScroll = () => {
        const h = window.innerHeight || 1;
        heroT = Math.min(Math.max(window.scrollY / (h * 0.9), 0), 1);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

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
      let prevEl = 0;

      const loop = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(loop);
        if (document.hidden) return; // no renderizar si la pestaña no es visible
        const el = clock.getElapsedTime();
        const dt = Math.min(el - prevEl, 0.1); // clamp por si la pestaña estuvo oculta
        prevEl = el;

        // ── Zoom suave mientras el hero sale de pantalla
        const camTarget = 5.5 - heroT * 1.4;
        camera.position.z += (camTarget - camera.position.z) * 0.06;

        // ── Rotación acumulativa + balanceo lento del plano
        galaxy.rotation.y += dt * (0.07 + heroT * 0.06);
        galaxyTilt.rotation.z = 0.22 + Math.sin(el * 0.18) * 0.05;
        galaxyTilt.rotation.x = -0.62 + Math.cos(el * 0.14) * 0.04 + heroT * 0.18;

        // Pulso sutil del núcleo
        const pulse = (1 + Math.sin(el * 0.7) * 0.06) * (1 + heroT * 0.15);
        core.scale.set(2.1 * pulse, 2.1 * pulse, 1);
        gMat.opacity = 0.9 + Math.sin(el * 0.5) * 0.08;

        // Partículas — oscilación acotada (sin acumulación de drift)
        const pa = pGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < PCOUNT; i++) {
          pa[i*3]   = pOrig[i*3]   + Math.sin(el*pSpeeds[i*3]   + i*0.71) * 0.18;
          pa[i*3+1] = pOrig[i*3+1] + Math.cos(el*pSpeeds[i*3+1] + i*1.13) * 0.14;
          pa[i*3+2] = pOrig[i*3+2] + Math.sin(el*pSpeeds[i*3+2] + i*0.93) * 0.16;
        }
        pGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      };

      loop();

      disposeHandle = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", setSize);
        mq.removeEventListener("change", onMQ);
        ro.disconnect();
        gGeo.dispose(); gMat.dispose();
        coreTex.dispose(); coreMat.dispose();
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
          "radial-gradient(ellipse 90% 85% at 50% 50%, black 38%, rgba(0,0,0,0.6) 64%, transparent 88%)",
        maskImage:
          "radial-gradient(ellipse 90% 85% at 50% 50%, black 38%, rgba(0,0,0,0.6) 64%, transparent 88%)",
      }}
    />
  );
}
