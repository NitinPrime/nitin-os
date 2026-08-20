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
    const height = mount.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.55);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(1.6, 2.2, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xa8b4c8, 0.45);
    rim.position.set(-2.2, 0.4, -1);
    scene.add(rim);

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

    let portrait: THREE.Mesh | null = null;
    let shadow: THREE.Mesh | null = null;
    let disposed = false;
    let frameId = 0;

    const loader = new THREE.TextureLoader();
    loader.load(profile.photo, (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }

      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      const img = texture.image as HTMLImageElement;
      const imageAspect = img.width / Math.max(img.height, 1);
      const planeAspect = 3 / 4;
      const planeH = 2.2;
      const planeW = planeH * planeAspect;

      // Cover-crop toward the face
      if (imageAspect > planeAspect) {
        texture.repeat.set(planeAspect / imageAspect, 1);
        texture.offset.set((1 - texture.repeat.x) / 2, 0);
      } else {
        texture.repeat.set(1, imageAspect / planeAspect);
        texture.offset.set(0, (1 - texture.repeat.y) * 0.62);
      }

      const geo = new THREE.PlaneGeometry(planeW, planeH, 1, 1);
      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.55,
        metalness: 0.02,
      });
      portrait = new THREE.Mesh(geo, mat);
      portrait.position.z = 0.04;
      root.add(portrait);

      const shadowGeo = new THREE.PlaneGeometry(planeW * 1.05, planeH * 1.05);
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.28,
      });
      shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.position.set(0.06, -0.08, -0.08);
      root.add(shadow);
    });

    const clock = new THREE.Clock();

    function animate() {
      frameId = window.requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      target.x += (pointer.x - target.x) * 0.05;
      target.y += (pointer.y - target.y) * 0.05;

      root.rotation.y = target.x * 0.28;
      root.rotation.x = target.y * -0.16;
      root.position.y = Math.sin(t * 0.7) * 0.035;

      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      const el = mountRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      ro.disconnect();
      mount.removeEventListener("pointermove", onPointer);
      renderer.dispose();
      if (portrait) {
        portrait.geometry.dispose();
        const mat = portrait.material as THREE.MeshStandardMaterial;
        mat.map?.dispose();
        mat.dispose();
      }
      if (shadow) {
        shadow.geometry.dispose();
        (shadow.material as THREE.Material).dispose();
      }
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className="relative mt-10 aspect-[3/4] max-h-[28rem] overflow-hidden rounded-lg border border-line bg-surface sm:mt-0 lg:h-[28rem] lg:max-h-none">
        <img
          src={profile.photo}
          alt={`${profile.fullName}, software engineer`}
          width={720}
          height={960}
          className="h-full w-full object-cover object-[center_18%]"
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="relative mt-10 h-[22rem] w-full sm:h-[26rem] lg:mt-0 lg:h-[30rem]"
      aria-label={`${profile.fullName} portrait`}
      role="img"
    />
  );
}
