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
      <div className="flex aspect-[16/10] items-end bg-[linear-gradient(145deg,#161b24_0%,#0c0e12_60%,rgba(110,200,184,0.18)_100%)] p-5">
        <span className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">{code}</span>
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
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
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
          className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 ease-out group-hover/card:scale-[1.04]"
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
    <section id="work" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionLabel index="01">Work</SectionLabel>
        <h2 className="mt-4 max-w-xl font-display text-3xl tracking-[-0.03em] sm:text-5xl">
          Things I built when the problem got interesting.
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mute">
          Click a project for the full story — problem, architecture, decisions.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((project, i) => (
            <motion.article
              key={project.slug}
              role="button"
              tabIndex={0}
              aria-label={`Open ${project.title}`}
              className="group/card flex cursor-pointer flex-col overflow-hidden rounded-[1.25rem] border border-line bg-surface outline-none transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)] focus-visible:border-accent"
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(project);
                }
              }}
            >
              <ProjectCardCover code={project.code} frames={project.frames} />

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim">
                  {project.code} · {project.kicker}
                </p>
                <h3 className="mt-2 font-display text-xl tracking-[-0.03em] sm:text-2xl">{project.title}</h3>
                <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-mute">{project.summary}</p>

                <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-dim">
                  {project.stack.slice(0, 4).join("  /  ")}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                  {project.links.length > 0 ? (
                    <div className="flex flex-wrap gap-3" onClick={(event) => event.stopPropagation()}>
                      {project.links.map((link) => (
                        <ArrowLink key={link.href} href={link.href} external={link.href.startsWith("http")}>
                          {link.label}
                        </ArrowLink>
                      ))}
                    </div>
                  ) : (
                    <span />
                  )}
                  <span className="font-mono text-[10px] tracking-[0.14em] text-accent uppercase opacity-0 transition-opacity duration-200 group-hover/card:opacity-100">
                    Open →
                  </span>
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
