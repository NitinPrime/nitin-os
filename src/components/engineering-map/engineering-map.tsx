"use client";

import { Needed, SectionLabel } from "@/components/ui/meta";
import { Reveal } from "@/components/ui/reveal";
import { engineDomains, type EngineDomain } from "@/data/engine";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const LAYOUT: Record<EngineDomain["id"], { x: number; y: number }> = {
  frontend: { x: 50, y: 12 },
  backend: { x: 88, y: 38 },
  ai: { x: 78, y: 82 },
  data: { x: 22, y: 82 },
  systems: { x: 12, y: 38 },
};

export function EngineeringMap() {
  const [active, setActive] = useState<EngineDomain["id"] | null>("ai");
  const current = useMemo(
    () => engineDomains.find((d) => d.id === active) ?? engineDomains[0],
    [active],
  );

  return (
    <section id="systems" className="relative scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="02">The engine</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] tracking-[-0.03em] sm:text-6xl">
            An engineering system, not a list of tools.
          </h2>
          <p className="mt-5 max-w-xl text-mute">
            Select a node. The stack is shown in context of where it was actually used — not as a
            percentage.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="relative hidden aspect-square max-h-[560px] w-full lg:block">
            <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden>
              {engineDomains.map((domain) => {
                const p = LAYOUT[domain.id];
                const on = active === domain.id;
                return (
                  <g key={domain.id}>
                    <line
                      x1="50"
                      y1="50"
                      x2={p.x}
                      y2={p.y}
                      stroke={on ? "rgba(77,124,255,0.7)" : "rgba(255,255,255,0.1)"}
                      strokeWidth={on ? 0.6 : 0.25}
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={on ? 5.6 : 4.2}
                      fill="#08090c"
                      stroke={on ? "#4d7cff" : "rgba(255,255,255,0.28)"}
                      strokeWidth={on ? 0.7 : 0.35}
                      className="cursor-pointer"
                      onMouseEnter={() => setActive(domain.id)}
                      onClick={() => setActive(domain.id)}
                    />
                    <text
                      x={p.x}
                      y={p.y - 7.5}
                      textAnchor="middle"
                      fill={on ? "#f3f4f6" : "#8b919c"}
                      fontSize="3.2"
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                      className="cursor-pointer"
                      onClick={() => setActive(domain.id)}
                    >
                      {domain.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}
              <circle cx="50" cy="50" r="11" fill="#0e1015" stroke="rgba(255,255,255,0.18)" strokeWidth="0.4" />
              <text
                x="50"
                y="51.4"
                textAnchor="middle"
                fill="#f3f4f6"
                fontSize="3.4"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                NITIN
              </text>
            </svg>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {engineDomains.map((domain) => (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setActive(domain.id)}
                  onMouseEnter={() => setActive(domain.id)}
                  className={cn(
                    "rounded-sm border px-3 py-2 font-mono text-[11px] tracking-[0.14em] uppercase",
                    active === domain.id
                      ? "border-accent text-ink"
                      : "border-line text-mute hover:text-ink",
                  )}
                  aria-pressed={active === domain.id}
                >
                  {domain.label}
                </button>
              ))}
            </div>

            <div className="mt-6 border border-line bg-surface p-6 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">{current.label}</p>
              <p className="mt-4 text-lg leading-relaxed text-ink">{current.summary}</p>
              <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-dim uppercase">Used in</p>
              <p className="mt-2 text-sm text-mute">{current.usedIn.join(" · ")}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {current.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="border border-line px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] text-mute"
                  >
                    {isPlaceholder(tech) ? <Needed value={tech} /> : tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function isPlaceholder(value: string) {
  return value === "[CONTENT NEEDED]";
}
