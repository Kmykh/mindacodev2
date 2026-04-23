"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function Hero3DScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !enabled) return;

    let disposed = false;
    let rafId = 0;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let running = true;
    let scrollProgress = 0;

    const boot = async () => {
      const stage = stageRef.current;
      const canvas = canvasRef.current;
      if (!stage || !canvas) return;

      const THREE = await import("three");
      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 180);
      camera.position.set(0, 0, 18);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

      const ambient = new THREE.AmbientLight(0xaab4ff, 0.8);
      const key = new THREE.PointLight(0x8f6bff, 1.1, 120);
      key.position.set(5, 4, 12);
      const rim = new THREE.PointLight(0x5cd0ff, 0.7, 120);
      rim.position.set(-7, -2, 8);
      scene.add(ambient, key, rim);

      const makeStars = (count: number, spreadX: number, spreadY: number, zMin: number, zMax: number, size: number, opacity: number, color: number) => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i += 1) {
          const i3 = i * 3;
          positions[i3] = (Math.random() - 0.5) * spreadX;
          positions[i3 + 1] = (Math.random() - 0.5) * spreadY;
          positions[i3 + 2] = zMin - Math.random() * (zMax - zMin);
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
          color,
          size,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const points = new THREE.Points(geometry, material);
        return { points, geometry, material, positions };
      };

      const farStars = makeStars(700, 80, 44, -110, -18, 0.06, 0.64, 0xcfd9ff);
      const nearStars = makeStars(1200, 84, 46, -90, -6, 0.09, 0.92, 0xffffff);
      const dustField = makeStars(900, 72, 42, -70, -12, 0.04, 0.22, 0x88cfff);
      scene.add(farStars.points, nearStars.points, dustField.points);

      const makeMeteor = (index: number) => {
        const trailSegments = 72;
        const trail = new Float32Array(trailSegments * 3);
        for (let i = 0; i < trailSegments; i += 1) {
          const t = i / (trailSegments - 1);
          const i3 = i * 3;
          trail[i3] = -t * (4.8 + Math.random() * 1.2);
          trail[i3 + 1] = (Math.random() - 0.5) * (0.42 + t * 0.28);
          trail[i3 + 2] = (Math.random() - 0.5) * 0.35;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(trail, 3));
        const material = new THREE.PointsMaterial({
          color: index % 2 === 0 ? 0x8fd8ff : 0xffcf8a,
          size: 0.07,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const points = new THREE.Points(geometry, material);
        const direction = new THREE.Vector3(
          -1.1 - Math.random() * 1.8,
          0.45 - Math.random() * 1.2,
          -0.18 - Math.random() * 0.18
        ).normalize();
        const speed = 0.18 + Math.random() * 0.18;
        const start = new THREE.Vector3(
          10 + Math.random() * 12,
          4 + Math.random() * 10,
          -22 - Math.random() * 10
        );
        points.position.copy(start);
        points.rotation.z = Math.atan2(direction.y, direction.x) + Math.PI;
        return { points, geometry, material, direction, speed, start };
      };

      const meteors = [makeMeteor(0), makeMeteor(1), makeMeteor(2), makeMeteor(3), makeMeteor(4)];
      meteors.forEach((meteor) => scene.add(meteor.points));

      const islandBasePoints: number[] = [];
      const islandAccentPoints: number[] = [];
      for (let i = 0; i < 1400; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * (2.0 + Math.random() * 0.8);
        const x = Math.cos(angle) * radius;
        const y = -Math.abs(Math.sin(angle) * radius * 0.38) - 0.3 + (Math.random() - 0.5) * 0.18;
        const z = (Math.random() - 0.5) * 1.0;
        islandBasePoints.push(x, y, z);
      }
      for (let i = 0; i < 520; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.8 + Math.random() * 1.5;
        const x = Math.cos(angle) * radius;
        const y = 0.22 + Math.sin(angle) * radius * 0.14 + (Math.random() - 0.5) * 0.12;
        const z = (Math.random() - 0.5) * 0.7;
        islandAccentPoints.push(x, y, z);
      }
      const islandBaseGeometry = new THREE.BufferGeometry();
      islandBaseGeometry.setAttribute("position", new THREE.Float32BufferAttribute(islandBasePoints, 3));
      const islandAccentGeometry = new THREE.BufferGeometry();
      islandAccentGeometry.setAttribute("position", new THREE.Float32BufferAttribute(islandAccentPoints, 3));
      const islandBaseMaterial = new THREE.PointsMaterial({
        color: 0x89bfff,
        size: 0.075,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const islandAccentMaterial = new THREE.PointsMaterial({
        color: 0xffd18a,
        size: 0.09,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const islandGroup = new THREE.Group();
      const islandBase = new THREE.Points(islandBaseGeometry, islandBaseMaterial);
      const islandAccent = new THREE.Points(islandAccentGeometry, islandAccentMaterial);
      islandGroup.add(islandBase, islandAccent);
      islandGroup.position.set(5.5, -3.45, -18);
      islandGroup.scale.setScalar(0.72);
      scene.add(islandGroup);

      const onScroll = () => {
        const doc = document.documentElement;
        const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
        scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      };

      const onResize = () => {
        const width = stage.clientWidth;
        const height = stage.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const onVisibilityChange = () => {
        running = !document.hidden;
        if (running) rafId = requestAnimationFrame(loop);
      };

      const wrapField = (
        positions: Float32Array,
        speed: number,
        xSpread: number,
        ySpread: number,
        zBack: number,
        zFront: number,
      ) => {
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 2] += speed;
          positions[i + 0] += Math.sin((positions[i + 1] + i) * 0.05) * 0.0025;
          positions[i + 1] += Math.cos((positions[i + 0] + i) * 0.04) * 0.0018;
          if (positions[i + 2] > zFront) {
            positions[i + 2] = zBack;
            positions[i + 0] = (Math.random() - 0.5) * xSpread;
            positions[i + 1] = (Math.random() - 0.5) * ySpread;
          }
        }
      };

      const loop = (time: number) => {
        if (!running || disposed) return;
        const t = time * 0.001;
        const travel = 1 + scrollProgress * 3.6;

        camera.position.z = 18 - scrollProgress * 4.2;
        camera.position.x = Math.sin(t * 0.12) * 0.08 + scrollProgress * 0.18;
        camera.position.y = Math.sin(t * 0.18) * 0.12 + scrollProgress * 0.14;
        camera.lookAt(0, 0, -12);

        scene.rotation.y = -0.03 - scrollProgress * 0.05;

        wrapField(farStars.positions, 0.085 * travel, 82, 46, -118, 16);
        wrapField(nearStars.positions, 0.17 * travel, 86, 48, -108, 18);
        wrapField(dustField.positions, 0.055 * travel, 76, 44, -92, 14);

        farStars.geometry.attributes.position.needsUpdate = true;
        nearStars.geometry.attributes.position.needsUpdate = true;
        dustField.geometry.attributes.position.needsUpdate = true;

        meteors.forEach((meteor, index) => {
          meteor.points.position.addScaledVector(meteor.direction, meteor.speed * travel);
          meteor.points.rotation.z = Math.atan2(meteor.direction.y, meteor.direction.x) + Math.PI;
          meteor.material.opacity = 0.45 + Math.sin(t * 6 + index) * 0.14;
          if (
            meteor.points.position.x < -18 ||
            meteor.points.position.y < -12 ||
            meteor.points.position.y > 14 ||
            meteor.points.position.z > 8
          ) {
            meteor.points.position.copy(meteor.start);
            meteor.points.position.x = 12 + Math.random() * 12;
            meteor.points.position.y = 4 + Math.random() * 12;
            meteor.points.position.z = -24 - Math.random() * 12;
            meteor.direction.set(
              -1.1 - Math.random() * 1.8,
              0.45 - Math.random() * 1.2,
              -0.18 - Math.random() * 0.18
            ).normalize();
          }
        });

        const reveal = scrollProgress <= 0.06 ? 0 : Math.min((scrollProgress - 0.06) * 2.8, 1);
        islandBaseMaterial.opacity += (0.34 * reveal - islandBaseMaterial.opacity) * 0.08;
        islandAccentMaterial.opacity += (0.62 * reveal - islandAccentMaterial.opacity) * 0.08;
        islandGroup.position.y = -3.45 + reveal * 0.55 + Math.sin(t * 0.7) * 0.06;
        islandGroup.position.x = 5.5 + reveal * 0.12;
        islandGroup.rotation.y = reveal * 0.3 + Math.sin(t * 0.3) * 0.03;
        islandGroup.rotation.z = Math.sin(t * 0.25) * 0.02;
        islandGroup.scale.setScalar(0.72 + reveal * 0.18);

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(loop);
      };

      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(stage);
      onResize();

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const inView = entries[0]?.isIntersecting ?? true;
          running = inView && !document.hidden;
          if (running) rafId = requestAnimationFrame(loop);
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(stage);

      document.addEventListener("visibilitychange", onVisibilityChange);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      rafId = requestAnimationFrame(loop);

      const cleanup = () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        window.removeEventListener("scroll", onScroll);
        intersectionObserver?.disconnect();
        resizeObserver?.disconnect();
        farStars.geometry.dispose();
        nearStars.geometry.dispose();
        dustField.geometry.dispose();
        farStars.material.dispose();
        nearStars.material.dispose();
        dustField.material.dispose();
        meteors.forEach((meteor) => {
          meteor.geometry.dispose();
          meteor.material.dispose();
        });
        islandBaseGeometry.dispose();
        islandAccentGeometry.dispose();
        islandBaseMaterial.dispose();
        islandAccentMaterial.dispose();
        renderer.dispose();
      };

      if (disposed) {
        cleanup();
        return;
      }

      const previousDispose = disposeRef.current;
      disposeRef.current = () => {
        previousDispose?.();
        cleanup();
      };
    };

    const disposeRef = { current: undefined as undefined | (() => void) };
    void boot();

    return () => {
      disposed = true;
      disposeRef.current?.();
    };
  }, [prefersReducedMotion, enabled]);

  if (prefersReducedMotion || !enabled) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,8,24,0.96)_0%,rgba(2,2,10,0.98)_58%,rgba(0,0,0,1)_100%)]" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
      </div>
    );
  }

  return (
    <div ref={stageRef} aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,6,22,0.15)_0%,rgba(2,2,12,0.7)_56%,rgba(0,0,0,0.94)_100%)]" />
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[150px]" />
      <div className="absolute -right-24 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-accent-soft/10 blur-[120px]" />
    </div>
  );
}
