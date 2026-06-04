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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

      // Outer wireframe icosahedron — purple
      const outerGeo = new THREE.IcosahedronGeometry(1.5, 2);
      const outerMat = new THREE.MeshBasicMaterial({
        color: 0x7b5bff,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      });
      const outerIco = new THREE.Mesh(outerGeo, outerMat);
      group.add(outerIco);

      // Inner wireframe icosahedron — lighter purple, counter-rotating
      const innerGeo = new THREE.IcosahedronGeometry(0.88, 1);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x9b7bff,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const innerIco = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerIco);

      // Orbital ring 1 — cyan, tilted ~60 deg
      const ring1Geo = new THREE.TorusGeometry(2.1, 0.007, 4, 100);
      const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0x5cd0ff,
        transparent: true,
        opacity: 0.42,
      });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      // Orbital ring 2 — purple, tilted differently
      const ring2Geo = new THREE.TorusGeometry(2.45, 0.005, 4, 100);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x7b5bff,
        transparent: true,
        opacity: 0.22,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.x = -Math.PI / 5;
      ring2.rotation.y = Math.PI / 4;
      group.add(ring2);

      // Particles — scattered in a sphere around the core
      const PCOUNT = 150;
      const pPos = new Float32Array(PCOUNT * 3);
      const pCol = new Float32Array(PCOUNT * 3);
      const cA = new THREE.Color(0x9b7bff);
      const cB = new THREE.Color(0x5cd0ff);
      const cC = new THREE.Color(0xffffff);

      for (let i = 0; i < PCOUNT; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.5 + Math.random() * 1.7;
        pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);

        const t = Math.random();
        const c = t < 0.6
          ? cA.clone().lerp(cB, t / 0.6)
          : cB.clone().lerp(cC, (t - 0.6) / 0.4);
        pCol[i * 3] = c.r; pCol[i * 3 + 1] = c.g; pCol[i * 3 + 2] = c.b;
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.042,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const particlesMesh = new THREE.Points(pGeo, pMat);
      group.add(particlesMesh);

      // Mouse parallax state
      let targetRotY = 0;
      let targetRotX = 0;
      const onMouseMove = (e: MouseEvent) => {
        const rect = mount.getBoundingClientRect();
        targetRotY = ((e.clientX - rect.left) / mount.clientWidth - 0.5) * 0.55;
        targetRotX = -((e.clientY - rect.top) / mount.clientHeight - 0.5) * 0.38;
      };
      document.addEventListener("mousemove", onMouseMove);

      const ro = new ResizeObserver(setSize);
      ro.observe(mount);
      setSize();

      const clock = new THREE.Clock();
      let rafId = 0;

      const loop = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(loop);
        const el = clock.getElapsedTime();

        outerIco.rotation.x = el * 0.11;
        outerIco.rotation.y = el * 0.17;
        innerIco.rotation.x = -el * 0.21;
        innerIco.rotation.z = el * 0.14;
        ring1.rotation.z = el * 0.09;
        ring2.rotation.z = -el * 0.06;
        particlesMesh.rotation.y = el * 0.05;
        particlesMesh.rotation.x = el * 0.024;

        group.rotation.y += (targetRotY - group.rotation.y) * 0.04;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.04;

        renderer.render(scene, camera);
      };

      loop();

      disposeHandle = () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener("mousemove", onMouseMove);
        ro.disconnect();
        outerGeo.dispose(); outerMat.dispose();
        innerGeo.dispose(); innerMat.dispose();
        ring1Geo.dispose(); ring1Mat.dispose();
        ring2Geo.dispose(); ring2Mat.dispose();
        pGeo.dispose(); pMat.dispose();
        renderer.dispose();
        if (mount.contains(canvas)) mount.removeChild(canvas);
      };

      if (disposed) {
        disposeHandle();
        disposeHandle = undefined;
      }
    };

    void boot();

    return () => {
      disposed = true;
      disposeHandle?.();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={mountRef}
      aria-hidden
      className={className}
    />
  );
}
