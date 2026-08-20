"use client";

import { profile } from "@/data/profile";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function PortraitScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 420;
    const height = mount.clientHeight || 480;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.05, 3.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xf2f0ea, 0.55);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(2.2, 2.4, 3.2);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x6ec8b8, 0.85);
    rim.position.set(-2.8, 0.6, -1.2);
    scene.add(rim);

    const fill = new THREE.PointLight(0xd4a574, 0.55, 12);
    fill.position.set(-1.4, -1.2, 2.2);
    scene.add(fill);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    function onPointer(event: PointerEvent) {
      const el = mountRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    }

    mount.addEventListener("pointermove", onPointer);
    mount.addEventListener("pointerleave", () => {
      pointer.x = 0;
      pointer.y = 0;
    });

    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i += 1) {
      const r = 1.1 + Math.random() * 1.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.55;
      speeds[i] = 0.2 + Math.random() * 0.55;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x6ec8b8,
      size: 0.028,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    root.add(particles);

    const ringGeo = new THREE.TorusGeometry(1.28, 0.008, 16, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x6ec8b8,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    root.add(ring);

    const ring2 = ring.clone();
    ring2.scale.set(1.12, 1.12, 1.12);
    ring2.material = new THREE.MeshBasicMaterial({
      color: 0xd4a574,
      transparent: true,
      opacity: 0.22,
    });
    ring2.rotation.x = Math.PI / 2.1;
    root.add(ring2);

    let portrait: THREE.Mesh | null = null;
    let frameMesh: THREE.Mesh | null = null;
    let disposed = false;
    let frameId = 0;

    const loader = new THREE.TextureLoader();
    loader.load(
      profile.photo,
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }

        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;

        const img = texture.image as HTMLImageElement;
        const aspect = img.width / img.height;
        const planeH = 2.35;
        const planeW = planeH * aspect;

        const geo = new THREE.PlaneGeometry(planeW, planeH, 32, 32);
        const mat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.42,
          metalness: 0.08,
        });
        portrait = new THREE.Mesh(geo, mat);
        portrait.position.z = 0.05;
        root.add(portrait);

        const frameGeo = new THREE.PlaneGeometry(planeW + 0.08, planeH + 0.08);
        const frameMat = new THREE.MeshBasicMaterial({
          color: 0x1a1f28,
          transparent: true,
          opacity: 0.9,
        });
        frameMesh = new THREE.Mesh(frameGeo, frameMat);
        frameMesh.position.z = 0.01;
        root.add(frameMesh);
      },
      undefined,
      () => {
        // texture load failed — leave particles only
      },
    );

    const clock = new THREE.Clock();

    function animate() {
      frameId = window.requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      target.x += (pointer.x - target.x) * 0.06;
      target.y += (pointer.y - target.y) * 0.06;

      root.rotation.y = target.x * 0.45;
      root.rotation.x = target.y * -0.28;
      root.position.y = Math.sin(t * 0.9) * 0.06;

      ring.rotation.z = t * 0.18;
      ring2.rotation.z = -t * 0.12;

      const pos = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i += 1) {
        const ix = i * 3 + 1;
        pos.array[ix] += Math.sin(t * speeds[i] + i) * 0.0015;
      }
      pos.needsUpdate = true;
      particles.rotation.y = t * 0.05;

      if (portrait) {
        portrait.position.z = 0.05 + Math.sin(t * 1.1) * 0.02;
      }

      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    const ro = new ResizeObserver(onResize);
    ro.observe(mount);
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointermove", onPointer);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      if (portrait) {
        portrait.geometry.dispose();
        const mat = portrait.material as THREE.MeshStandardMaterial;
        mat.map?.dispose();
        mat.dispose();
      }
      if (frameMesh) {
        frameMesh.geometry.dispose();
        (frameMesh.material as THREE.Material).dispose();
      }
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className="relative mt-10 h-72 overflow-hidden rounded-2xl border border-line sm:h-96 lg:mt-0 lg:h-[30rem]">
        <img
          src={profile.photo}
          alt={`${profile.fullName}, software engineer`}
          width={720}
          height={900}
          className="h-full w-full object-cover object-[center_12%]"
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="relative mt-10 h-72 w-full sm:h-96 lg:mt-0 lg:h-[30rem]"
      aria-label={`${profile.fullName} portrait`}
      role="img"
    />
  );
}
