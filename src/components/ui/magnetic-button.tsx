"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, type MouseEvent, useRef } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "line";
};

export function MagneticButton({
  className,
  variant = "primary",
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  function handleMove(event: MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    onMouseMove?.(event);
  }

  function handleLeave(event: MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
    onMouseLeave?.(event);
  }

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-[12px] font-medium tracking-[0.16em] uppercase transition-[transform,background,color,border-color] duration-200 will-change-transform",
        variant === "primary" && "bg-ink text-base hover:bg-white",
        variant === "ghost" && "border border-line text-ink hover:border-line-strong hover:bg-white/5",
        variant === "line" && "border-b border-line px-0 py-2 tracking-[0.14em] hover:border-ink",
        className,
      )}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </button>
  );
}
