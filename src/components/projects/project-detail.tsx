"use client";

import { ArrowLink } from "@/components/ui/arrow-link";
import { ClickableImage } from "@/components/ui/clickable-image";
import type { Project } from "@/data/projects";
import { isNeeded } from "@/data/profile";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

function realItems(items: string[]) {
  return items.filter((item) => !isNeeded(item));
}

export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!project) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (typeof document === "undefined") return null;

  const challenges = project ? realItems(project.challenges) : [];
  const decisions = project ? realItems(project.decisions) : [];
  const learnings = project ? realItems(project.learnings) : [];
  const contributions = project?.contribution ? realItems(project.contribution) : [];

  return createPortal(
    <AnimatePresence>
      {project ? (
        <div key={project.slug} className="fixed inset-0 z-[160] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="Close project"
            className="absolute inset-0 bg-[#07080a]/70 backdrop-blur-[6px]"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-${project.slug}-title`}
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border border-line bg-surface sm:rounded-xl"
            initial={reduced ? false : { opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7 sm:py-5">
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim">
                  {project.code} · {project.kicker}
                </p>
                <h2
                  id={`project-${project.slug}-title`}
                  className="mt-1.5 font-display text-2xl tracking-[-0.03em] sm:text-3xl"
                >
                  {project.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-line p-2 text-mute transition-colors hover:border-line-strong hover:text-ink"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <p className="max-w-2xl text-[15px] leading-relaxed text-mute">{project.summary}</p>

              {project.frames && project.frames.length > 0 ? (
                <div
                  className={
                    project.frames.length === 1
                      ? "mt-6 overflow-hidden rounded-xl border border-line"
                      : "mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3"
                  }
                >
                  {project.frames.map((frame) => (
                    <div key={frame.src} className="overflow-hidden rounded-xl border border-line">
                      <ClickableImage
                        src={frame.src}
                        alt={frame.alt}
                        caption={frame.caption}
                        className={
                          project.frames?.length === 1
                            ? "aspect-[16/10] w-full object-cover object-top"
                            : "aspect-[4/3] w-full object-cover object-top"
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 space-y-7">
                {!isNeeded(project.problem) ? (
                  <section>
                    <h3 className="font-mono text-[11px] tracking-[0.16em] uppercase text-accent">Problem</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-mute">{project.problem}</p>
                  </section>
                ) : null}

                {!isNeeded(project.approach) ? (
                  <section>
                    <h3 className="font-mono text-[11px] tracking-[0.16em] uppercase text-accent">Approach</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-mute">{project.approach}</p>
                  </section>
                ) : null}

                {project.architecture.length > 0 ? (
                  <section>
                    <h3 className="font-mono text-[11px] tracking-[0.16em] uppercase text-accent">Architecture</h3>
                    <ol className="mt-3 space-y-3">
                      {project.architecture.map((node, i) => (
                        <li key={node.id} className="grid gap-1 border-l border-line pl-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
                          <span className="font-mono text-[11px] tracking-[0.08em] text-dim">
                            {String(i + 1).padStart(2, "0")} · {node.label}
                          </span>
                          <span className="text-[14px] leading-relaxed text-mute">{node.detail}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                ) : null}

                {challenges.length > 0 ? (
                  <section>
                    <h3 className="font-mono text-[11px] tracking-[0.16em] uppercase text-accent">Challenges</h3>
                    <ul className="mt-3 space-y-2">
                      {challenges.map((item) => (
                        <li key={item} className="text-[14px] leading-relaxed text-mute">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {decisions.length > 0 ? (
                  <section>
                    <h3 className="font-mono text-[11px] tracking-[0.16em] uppercase text-accent">Decisions</h3>
                    <ul className="mt-3 space-y-2">
                      {decisions.map((item) => (
                        <li key={item} className="text-[14px] leading-relaxed text-mute">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {!isNeeded(project.result) ? (
                  <section>
                    <h3 className="font-mono text-[11px] tracking-[0.16em] uppercase text-accent">Result</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-mute">{project.result}</p>
                  </section>
                ) : null}

                {learnings.length > 0 ? (
                  <section>
                    <h3 className="font-mono text-[11px] tracking-[0.16em] uppercase text-accent">Learnings</h3>
                    <ul className="mt-3 space-y-2">
                      {learnings.map((item) => (
                        <li key={item} className="text-[14px] leading-relaxed text-mute">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {contributions.length > 0 ? (
                  <section>
                    <h3 className="font-mono text-[11px] tracking-[0.16em] uppercase text-accent">Contribution</h3>
                    <ul className="mt-3 space-y-2">
                      {contributions.map((item) => (
                        <li key={item} className="text-[14px] leading-relaxed text-mute">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </div>

              <p className="mt-8 font-mono text-[11px] tracking-[0.1em] text-dim">
                {project.stack.join("  ·  ")}
              </p>

              {project.links.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-4 border-t border-line pt-5">
                  {project.links.map((link) => (
                    <ArrowLink key={link.href} href={link.href} external={link.href.startsWith("http")}>
                      {link.label}
                    </ArrowLink>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
