"use client";

import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionLabel } from "@/components/ui/meta";
import { Reveal } from "@/components/ui/reveal";
import { moreWork, projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type MouseEvent, useState } from "react";

export function ProjectExplorer() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="03">Work</SectionLabel>
          <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] sm:text-6xl">
            Selected systems.
          </h2>
          <p className="mt-5 max-w-xl text-mute">
            Case studies, not cards. Open one to see the problem, the architecture, and the decisions.
          </p>
        </Reveal>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-16">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">Also built</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {moreWork.map((item) => (
              <li key={item.title} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                <span className="text-sm text-ink">{item.title}</span>
                {item.href ? (
                  <ArrowLink href={item.href} external>
                    {item.meta}
                  </ArrowLink>
                ) : (
                  <span className="font-mono text-[11px] text-dim">{item.meta}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  function onMove(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseMove={onMove}
      className={cn(
        "group relative block px-0 py-8 transition-colors sm:py-10",
      )}
      style={{
        background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(77,124,255,0.07), transparent 42%)`,
      }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
            {project.code} · {project.kicker}
          </p>
          <h3
            className="mt-2 font-display text-3xl tracking-[-0.03em] sm:text-5xl"
            style={{ viewTransitionName: `project-title-${project.slug}` }}
          >
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl text-mute">{project.summary}</p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <p className="font-mono text-[11px] tracking-[0.12em] text-dim">
            {project.stack.slice(0, 4).join("  /  ")}
          </p>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute transition-colors group-hover:text-ink">
            Open case study →
          </span>
        </div>
      </div>
    </Link>
  );
}
