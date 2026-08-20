"use client";

import { ArrowLink } from "@/components/ui/arrow-link";
import { ClickableImage } from "@/components/ui/clickable-image";
import { SectionLabel } from "@/components/ui/meta";
import { ProjectDetail } from "@/components/projects/project-detail";
import { projects, type Project } from "@/data/projects";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

function ProjectCardCover({
  code,
  frames,
}: {
  code: string;
  frames?: { src: string; alt: string; caption: string }[];
}) {
  if (!frames || frames.length === 0) {
    return (
      <div className="flex aspect-[16/9] items-end bg-[linear-gradient(145deg,#161b24_0%,#0c0e12_60%,rgba(110,200,184,0.18)_100%)] px-3 py-2.5">
        <span className="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">{code}</span>
      </div>
    );
  }

  if (frames.length === 1) {
    return (
      <div className="overflow-hidden">
        <ClickableImage
          src={frames[0].src}
          alt={frames[0].alt}
          caption={frames[0].caption}
          className="aspect-[16/9] w-full object-cover object-top transition-transform duration-400 group-hover/card:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-px overflow-hidden bg-line">
      {frames.map((frame) => (
        <ClickableImage
          key={frame.src}
          src={frame.src}
          alt={frame.alt}
          caption={frame.caption}
          className="aspect-[4/3] w-full object-cover object-top transition-transform duration-400 group-hover/card:scale-[1.04]"
        />
      ))}
    </div>
  );
}

export function ProjectExplorer() {
  const featured = projects.filter((project) => project.featured);
  const reduced = useReducedMotion();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="scroll-mt-16 border-t border-line py-10 sm:py-12">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionLabel index="01">Work</SectionLabel>
            <h2 className="mt-2 font-display text-2xl tracking-[-0.03em] sm:text-3xl">builds</h2>
          </div>
          <p className="hidden text-right text-[12px] text-dim sm:block">tap a card → full story</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {featured.map((project, i) => (
            <motion.article
              key={project.slug}
              role="button"
              tabIndex={0}
              aria-label={`Open ${project.title}`}
              className="group/card flex cursor-pointer flex-col overflow-hidden rounded-xl border border-line bg-surface outline-none transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong focus-visible:border-accent"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(project);
                }
              }}
            >
              <ProjectCardCover code={project.code} frames={project.frames} />

              <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg tracking-[-0.02em]">{project.title}</h3>
                  <span className="shrink-0 font-mono text-[10px] tracking-[0.12em] text-accent uppercase opacity-0 transition-opacity group-hover/card:opacity-100">
                    open
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-mute">{project.summary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-2.5">
                  <p className="font-mono text-[9px] tracking-[0.08em] text-dim">
                    {project.stack.slice(0, 3).join(" / ")}
                  </p>
                  {project.links.length > 0 ? (
                    <div className="ml-auto flex gap-2.5" onClick={(event) => event.stopPropagation()}>
                      {project.links.map((link) => (
                        <ArrowLink key={link.href} href={link.href} external={link.href.startsWith("http")}>
                          {link.label}
                        </ArrowLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectDetail project={active} onClose={() => setActive(null)} />
    </section>
  );
}
