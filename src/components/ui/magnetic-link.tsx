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
    el.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-[11px] font-medium tracking-[0.14em] uppercase transition-[transform,background,color,border-color] duration-200 will-change-transform",
        variant === "primary" && "bg-ink text-base hover:bg-white",
        variant === "ghost" && "border border-line text-ink hover:border-line-strong hover:bg-white/[0.03]",
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
