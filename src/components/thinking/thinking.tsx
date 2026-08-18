"use client";

import { SectionLabel } from "@/components/ui/meta";
import { Reveal } from "@/components/ui/reveal";
import { thinkStages } from "@/data/engine";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Thinking() {
  const [id, setId] = useState(thinkStages[0].id);
  const stage = thinkStages.find((s) => s.id === id) ?? thinkStages[0];

  return (
    <section id="thinking" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="05">How I think</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-4xl tracking-[-0.03em] sm:text-6xl">
            Technologies are tools. This is the method.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <ol className="flex flex-col">
            {thinkStages.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setId(item.id)}
                  className={cn(
                    "flex w-full items-baseline justify-between border-t border-line py-4 text-left",
                    id === item.id ? "text-ink" : "text-mute hover:text-ink",
                  )}
                >
                  <span className="font-display text-2xl sm:text-3xl">{item.label}</span>
                  <span className="font-mono text-[11px] text-dim">{String(i + 1).padStart(2, "0")}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="border border-line bg-surface p-6 sm:p-10">
            <p className="text-lg leading-relaxed text-ink">{stage.intent}</p>
            <p className="mt-8 font-mono text-[11px] tracking-[0.18em] uppercase text-dim">
              From {stage.example.project}
            </p>
            <p className="mt-3 text-mute">{stage.example.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
