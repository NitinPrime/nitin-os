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
      <div className="flex aspect-[16/10] items-end bg-elevated p-4">
        <span className="font-mono text-[11px] tracking-[0.16em] text-dim uppercase">{code}</span>
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
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover/card:scale-[1.02]"
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
          className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
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
    <section id="work" className="scroll-mt-20 border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionLabel index="01">Work</SectionLabel>
        <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] sm:text-4xl">Selected work</h2>
        <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-mute">
          Open a project for architecture, decisions, and outcomes.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {featured.map((project, i) => (
            <motion.article
              key={project.slug}
              role="button"
              tabIndex={0}
              aria-label={`Open ${project.title}`}
              className="group/card flex cursor-pointer flex-col overflow-hidden rounded-lg border border-line bg-surface outline-none transition-[border-color,transform] duration-250 hover:-translate-y-0.5 hover:border-line-strong focus-visible:border-accent"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(project);
                }
              }}
            >
              <ProjectCardCover code={project.code} frames={project.frames} />

              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-dim">
                  {project.code} · {project.kicker}
                </p>
                <h3 className="mt-2 font-display text-xl tracking-[-0.02em]">{project.title}</h3>
                <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-mute">{project.summary}</p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
                  <p className="font-mono text-[10px] tracking-[0.06em] text-dim">
                    {project.stack.slice(0, 3).join(" / ")}
                  </p>
                  {project.links.length > 0 ? (
                    <div className="flex gap-3" onClick={(event) => event.stopPropagation()}>
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
