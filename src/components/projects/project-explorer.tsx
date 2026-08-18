"use client";

import { ArrowLink } from "@/components/ui/arrow-link";
import { ClickableImage } from "@/components/ui/clickable-image";
import { SectionLabel } from "@/components/ui/meta";
import { projects } from "@/data/projects";
import { motion, useReducedMotion } from "motion/react";

function ProjectCardCover({
  code,
  frames,
}: {
  code: string;
  frames?: { src: string; alt: string; caption: string }[];
}) {
  if (!frames || frames.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-end bg-[linear-gradient(135deg,#1a2030_0%,#0e1015_52%,rgba(77,124,255,0.28)_100%)] p-5">
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
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover/card:scale-[1.05]"
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
          className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 ease-out group-hover/card:scale-[1.06]"
        />
      ))}
    </div>
  );
}

export function ProjectExplorer() {
  const featured = projects.filter((project) => project.featured);
  const reduced = useReducedMotion();

  return (
    <section id="work" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionLabel index="01">Work</SectionLabel>
        <h2 className="mt-4 font-display text-3xl tracking-[-0.03em] sm:text-4xl">Selected work</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((project, i) => (
            <motion.article
              key={project.slug}
              className="group/card card-glow flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={
                reduced
                  ? undefined
                  : { y: -8, borderColor: "rgba(77, 124, 255, 0.45)", transition: { duration: 0.22 } }
              }
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

                {project.links.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-3 border-t border-line pt-4">
                    {project.links.map((link) => (
                      <ArrowLink key={link.href} href={link.href} external={link.href.startsWith("http")}>
                        {link.label}
                      </ArrowLink>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
