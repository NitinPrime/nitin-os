"use client";

import { profile } from "@/data/profile";
import { useReducedMotion } from "motion/react";
import { type MouseEvent, useRef, useState } from "react";

export function FloatingPortrait() {
  const reduced = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onMove(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 12 });
  }

  function onLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div className="relative mx-auto h-48 w-full max-w-xs sm:h-56 lg:mx-0 lg:h-64 lg:max-w-none" style={{ perspective: "1100px" }}>
      <div
        ref={frame}
        className="absolute inset-0 will-change-transform"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: reduced
            ? undefined
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`,
          transition: "transform 180ms ease-out",
          animation: reduced ? undefined : "portrait-float 6.5s ease-in-out infinite",
        }}
      >
        <img
          src={profile.photo}
          alt={`${profile.fullName}, software engineer`}
          width={480}
          height={600}
          className="absolute inset-0 h-full w-full rounded-xl object-cover object-[center_8%] [transform:translateZ(20px)]"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(280px circle at ${50 + tilt.y * 2.4}% ${40 + tilt.x * -2}%, rgba(255,255,255,0.14), transparent 55%)`,
            mixBlendMode: "soft-light",
            transform: "translateZ(28px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(to top, #090a0c 0%, transparent 40%), linear-gradient(to right, #090a0c 0%, transparent 22%)",
            transform: "translateZ(32px)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
