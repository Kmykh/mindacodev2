"use client";

import { memo, useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CosmicSpace
 * -----------
 * Pure deep-space backdrop:
 *  - Solid black base with a very faint blue/purple vignette.
 *  - Two parallax starfields (near + far) that drift and twinkle.
 *  - Occasional shooting stars.
 *
 * Fixed, pointer-events: none, sits behind all content.
 * Memoized: this component has no props and no state, so it should
 * never re-render after mount. React.memo guarantees this even if the
 * parent tree changes.
 */
function CosmicSpaceInner() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const particleCount = prefersReducedMotion ? 300 : isMobile ? 550 : 900;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const depth = 220;
    const spread = 260;

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = -Math.random() * depth;
      sizes[i] = 0.9 + Math.random() * 1.8;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color("#7b5bff") },
        uColorB: { value: new THREE.Color("#8fd8ff") },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        varying float vMix;

        void main() {
          vec3 p = position;
          p.y += sin(uTime * 0.08 + p.x * 0.03) * 0.7;
          p.x += cos(uTime * 0.06 + p.y * 0.02) * 0.5;

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = size * (220.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          vMix = clamp((p.z + 220.0) / 220.0, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vMix;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          float alpha = smoothstep(0.48, 0.0, d);
          vec3 color = mix(uColorA, uColorB, vMix);
          gl_FragColor = vec4(color, alpha * 0.8);
        }
      `,
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    let rafId = 0;
    let lastTime = 0;
    let running = true;

    const setSize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const animate = (time: number) => {
      if (!running) return;
      const dt = Math.min((time - lastTime) / 1000, 0.033);
      lastTime = time;

      material.uniforms.uTime.value = time * 0.001;
      stars.rotation.y += dt * 0.02;
      stars.rotation.x = Math.sin(time * 0.00007) * 0.08;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(rafId);
      }
    };

    const resizeObserver = new ResizeObserver(() => setSize());
    resizeObserver.observe(mount);
    setSize();
    lastTime = performance.now();
    rafId = requestAnimationFrame(animate);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();
      scene.remove(stars);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        isolation: "isolate",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 120% at 50% 50%, rgba(8,5,24,0.92) 0%, rgba(3,2,12,0.98) 54%, rgba(0,0,0,1) 100%)",
        }}
      />
      <div ref={mountRef} className="absolute inset-0" />
    </div>
  );
}

export const CosmicSpace = memo(CosmicSpaceInner);
