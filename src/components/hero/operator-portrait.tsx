"use client";

import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { type MouseEvent, useState } from "react";

export function OperatorPortrait({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [spot, setSpot] = useState({ x: 42, y: 32 });
  const [locked, setLocked] = useState(false);

  function onMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      className={cn("group relative select-none", className)}
      onMouseMove={onMove}
      onMouseEnter={() => setLocked(true)}
      onMouseLeave={() => setLocked(false)}
    >
      <div className="pointer-events-none absolute -inset-3 hidden sm:block" aria-hidden>
        <span className="absolute top-0 left-0 h-8 w-8 border-t border-l border-line-strong transition-colors group-hover:border-accent" />
        <span className="absolute top-0 right-0 h-8 w-8 border-t border-r border-line-strong transition-colors group-hover:border-accent" />
        <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-line-strong transition-colors group-hover:border-accent" />
        <span className="absolute right-0 bottom-0 h-8 w-8 border-r border-b border-line-strong transition-colors group-hover:border-accent" />
      </div>

      <div
        className={cn(
          "relative overflow-hidden",
          "[mask-image:radial-gradient(ellipse_72%_80%_at_50%_34%,black_42%,transparent_78%)]",
          "[-webkit-mask-image:radial-gradient(ellipse_72%_80%_at_50%_34%,black_42%,transparent_78%)]",
        )}
      >
        {/* Native img: next/image optimizer was hanging the Windows dev server. */}
        <img
          src={profile.photo}
          alt={`${profile.fullName}, software engineer`}
          width={720}
          height={900}
          className={cn(
            "w-full object-cover object-[center_16%]",
            compact ? "h-56" : "h-[min(72vh,760px)]",
          )}
        />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300"
          style={{
            opacity: locked ? 0.55 : 0.22,
            background: `radial-gradient(280px circle at ${spot.x}% ${spot.y}%, rgba(77,124,255,0.28), transparent 55%)`,
          }}
          aria-hidden
        />
        <div className="scanline pointer-events-none absolute inset-0" aria-hidden />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-dim">
        <span className={cn("transition-colors", locked ? "text-accent" : "text-dim")}>
          {locked ? "ID lock · acquired" : "Operator · hover to lock"}
        </span>
        <span>NITIN S</span>
      </div>
    </div>
  );
}

export function OperatorNode({
  className,
  rounded = "full",
}: {
  className?: string;
  rounded?: "full" | "sm";
}) {
  return (
    <img
      src={profile.photo}
      alt={profile.fullName}
      width={240}
      height={240}
      className={cn(
        "size-full object-cover object-[center_12%]",
        rounded === "full" ? "rounded-full ring-1 ring-white/20" : "rounded-sm",
        className,
      )}
    />
  );
}
