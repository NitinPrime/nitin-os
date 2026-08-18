"use client";

import { cn } from "@/lib/utils";
import type { MouseEvent } from "react";
import { useRef } from "react";

export function MagneticLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-[12px] font-medium tracking-[0.16em] uppercase transition-[transform,background,color,border-color] duration-200 will-change-transform",
        variant === "primary" && "bg-ink text-base hover:bg-white",
        variant === "ghost" && "border border-line text-ink hover:border-line-strong hover:bg-white/5",
        className,
      )}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
