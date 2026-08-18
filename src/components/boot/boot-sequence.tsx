"use client";

import { markBooted, prefersReducedMotion } from "@/lib/utils";
import { useEffect, useState } from "react";

const LINES = [
  { label: "SYSTEM", state: "ONLINE" },
  { label: "ENGINEERING", state: "ONLINE" },
  { label: "PROJECTS", state: "LOADED" },
  { label: "EXPERIENCE", state: "LOADED" },
];

export function BootSequence({
  active,
  onDone,
}: {
  active: boolean;
  onDone: () => void;
}) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      markBooted();
      onDone();
      return;
    }

    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setVisible(i + 1), 220 + i * 280));
    });
    timers.push(
      window.setTimeout(() => {
        markBooted();
        onDone();
      }, 220 + LINES.length * 280 + 420),
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [active, onDone]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base px-6"
      role="status"
      aria-live="polite"
      aria-label="Initializing NITIN.OS"
    >
      <p className="font-mono text-[11px] tracking-[0.32em] text-mute">INITIALIZING NITIN.OS</p>
      <ul className="mt-10 w-full max-w-xs space-y-3">
        {LINES.map((line, i) => (
          <li
            key={line.label}
            className="flex items-center justify-between font-mono text-[12px] tracking-[0.18em] text-mute transition-opacity duration-300"
            style={{ opacity: visible > i ? 1 : 0.18 }}
          >
            <span>{line.label}</span>
            <span className="text-dim">........</span>
            <span className={visible > i ? "text-ink" : "text-dim"}>{line.state}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-14 font-mono text-[11px] tracking-[0.22em] text-mute uppercase hover:text-ink"
        onClick={() => {
          markBooted();
          onDone();
        }}
      >
        Skip → Explore
      </button>
    </div>
  );
}
