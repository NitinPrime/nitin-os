"use client";

import { engineDomains } from "@/data/engine";
import { prefersReducedMotion } from "@/lib/utils";
import { useEffect, useRef } from "react";

const NODES = [
  { label: "Frontend", x: 0.22, y: 0.28 },
  { label: "Backend", x: 0.78, y: 0.26 },
  { label: "AI", x: 0.18, y: 0.72 },
  { label: "Data", x: 0.82, y: 0.7 },
  { label: "Systems", x: 0.52, y: 0.18 },
];

export function SystemGraph({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const surface = canvas;
    const graphics = ctx;

    let frame = 0;
    let raf = 0;
    let running = true;
    let visible = true;
    const reduced = prefersReducedMotion();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = surface.getBoundingClientRect();
      surface.width = rect.width * dpr;
      surface.height = rect.height * dpr;
      graphics.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t: number) {
      const { width, height } = surface.getBoundingClientRect();
      graphics.clearRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.52;
      const pulse = reduced ? 0 : Math.sin(t / 1400) * 6;

      graphics.strokeStyle = "rgba(77, 124, 255, 0.16)";
      graphics.lineWidth = 1;

      const positions = NODES.map((node, i) => {
        const drift = reduced ? 0 : Math.sin(t / 1800 + i) * 8;
        return {
          ...node,
          px: node.x * width + drift,
          py: node.y * height + Math.cos(t / 1600 + i) * (reduced ? 0 : 6),
        };
      });

      for (const p of positions) {
        graphics.beginPath();
        graphics.moveTo(cx, cy);
        graphics.lineTo(p.px, p.py);
        graphics.stroke();
      }

      graphics.beginPath();
      graphics.arc(cx, cy, 38 + pulse, 0, Math.PI * 2);
      graphics.strokeStyle = "rgba(243, 244, 246, 0.22)";
      graphics.stroke();

      graphics.fillStyle = "rgba(243, 244, 246, 0.78)";
      graphics.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      graphics.textAlign = "center";
      graphics.fillText("NITIN", cx, cy + 4);

      for (const p of positions) {
        graphics.beginPath();
        graphics.arc(p.px, p.py, 3.5, 0, Math.PI * 2);
        graphics.fillStyle = "rgba(77, 124, 255, 0.85)";
        graphics.fill();
        graphics.fillStyle = "rgba(139, 145, 156, 0.85)";
        graphics.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        graphics.fillText(p.label.toUpperCase(), p.px, p.py - 12);
      }
    }

    resize();
    draw(0);

    function loop(t: number) {
      if (!running || !visible) return;
      frame += 1;
      if (frame % 2 === 0) draw(t);
      raf = requestAnimationFrame(loop);
    }

    if (!reduced) raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !reduced && running) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(surface);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      data-domains={engineDomains.map((d) => d.label).join(",")}
    />
  );
}
