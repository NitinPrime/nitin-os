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
    setTilt({ x: py * -10, y: px * 14 });
  }

  function onLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div className="relative mt-10 h-64 sm:h-80 lg:mt-0 lg:h-[28rem]" style={{ perspective: "1100px" }}>
      <div
        ref={frame}
        className="absolute inset-0 will-change-transform"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: reduced
            ? undefined
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(12px)`,
          transition: "transform 180ms ease-out",
          animation: reduced ? undefined : "portrait-float 6.5s ease-in-out infinite",
        }}
      >
        <img
          src={profile.photo}
          alt={`${profile.fullName}, software engineer`}
          width={640}
          height={800}
          className="absolute inset-0 h-full w-full object-cover object-[center_6%] [transform:translateZ(28px)]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(420px circle at ${50 + tilt.y * 2.4}% ${42 + tilt.x * -2}%, rgba(255,255,255,0.16), transparent 58%)`,
            mixBlendMode: "soft-light",
            transform: "translateZ(36px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #090a0c 0%, transparent 28%), linear-gradient(to top, #090a0c 0%, transparent 34%), linear-gradient(to bottom, #090a0c 0%, transparent 18%)",
            transform: "translateZ(40px)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
