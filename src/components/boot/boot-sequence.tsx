"use client";

import { hasBooted, markBooted, prefersReducedMotion } from "@/lib/utils";
import { useEffect, useState } from "react";

const LINES = [
  { label: "SYSTEM", state: "ONLINE" },
  { label: "ENGINEERING", state: "ONLINE" },
  { label: "PROJECTS", state: "LOADED" },
  { label: "EXPERIENCE", state: "LOADED" },
];

export function BootSequence() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (hasBooted() || prefersReducedMotion()) {
      markBooted();
      return;
    }

    let cancelled = false;
    const start = window.setTimeout(() => {
      if (!cancelled) setActive(true);
    }, 0);

    const lineTimers = LINES.map((_, i) =>
      window.setTimeout(() => {
        if (!cancelled) setVisible(i + 1);
      }, 180 + i * 220),
    );

    const done = window.setTimeout(() => {
      if (cancelled) return;
      markBooted();
      setActive(false);
    }, 180 + LINES.length * 220 + 360);

    return () => {
      cancelled = true;
      window.clearTimeout(start);
      window.clearTimeout(done);
      lineTimers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  function skip() {
    markBooted();
    setActive(false);
  }

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
        onClick={skip}
      >
        Skip → Explore
      </button>
    </div>
  );
}
