"use client";

import { SectionLabel } from "@/components/ui/meta";
import { Reveal } from "@/components/ui/reveal";
import { getProject } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function ArchitectureDemo() {
  const project = getProject("autonomous-indoor-drone");
  const nodes = project?.architecture ?? [];
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? passed / total : 0;
      setActive(Math.min(nodes.length - 1, Math.floor(p * nodes.length)));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [nodes.length]);

  if (!project) return null;

  return (
    <section id="architecture" className="border-t border-line">
      <div ref={ref} className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="sticky top-14 flex min-h-[calc(100svh-3.5rem)] flex-col justify-center py-16">
          <Reveal>
            <SectionLabel index="04">Flagship · request path</SectionLabel>
            <h2 className="mt-5 max-w-3xl font-display text-4xl tracking-[-0.03em] sm:text-5xl">
              Watch a request move through the drone stack.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <ol className="space-y-0">
              {nodes.map((node, i) => {
                const on = i <= active;
                const current = i === active;
                return (
                  <li key={node.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          "size-2.5 rounded-full border transition-colors",
                          on ? "border-accent bg-accent" : "border-line bg-transparent",
                          current && "shadow-[0_0_16px_rgba(77,124,255,0.7)]",
                        )}
                      />
                      {i < nodes.length - 1 ? (
                        <span className={cn("h-10 w-px", on && i < active ? "bg-accent/70" : "bg-line")} />
                      ) : null}
                    </div>
                    <div className="-mt-1 pb-6">
                      <p className={cn("font-mono text-[12px] tracking-[0.16em] uppercase", current ? "text-ink" : "text-dim")}>
                        {node.label}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="border border-line bg-surface p-6 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                Stage {String(active + 1).padStart(2, "0")} / {String(nodes.length).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-3xl">{nodes[active]?.label}</h3>
              <p className="mt-4 max-w-md text-mute">{nodes[active]?.detail}</p>
              <p className="mt-8 font-mono text-[11px] leading-relaxed tracking-[0.08em] text-dim">
                USER → LLM → FAISS → CONTEXT → ROS → DRONE
              </p>
            </div>
          </div>
        </div>
          <div className="h-[70vh] md:h-[140vh]" aria-hidden />
      </div>
    </section>
  );
}
