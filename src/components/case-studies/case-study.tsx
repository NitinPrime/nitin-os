import { ArrowLink } from "@/components/ui/arrow-link";
import { ProductFrames } from "@/components/case-studies/product-frames";
import { Needed } from "@/components/ui/meta";
import { isNeeded } from "@/data/profile";
import { type Project } from "@/data/projects";
import Link from "next/link";

const SECTIONS: { key: "problem" | "approach" | "result"; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "result", label: "Result" },
];

export function CaseStudy({ project }: { project: Project }) {
  return (
    <article className="pt-20">
      <header className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <Link href="/#work" className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute hover:text-ink">
          ← Work
        </Link>
        <p className="mt-10 font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
          {project.code} · {project.kicker}
        </p>
        <h1
          className="mt-4 max-w-4xl font-display text-5xl tracking-[-0.04em] sm:text-7xl"
          style={{ viewTransitionName: `project-title-${project.slug}` }}
        >
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-mute">{project.summary}</p>
        <p className="mt-8 font-mono text-[12px] tracking-[0.08em] text-dim">{project.stack.join("  /  ")}</p>
        {project.links.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-5">
            {project.links.map((link) => (
              <ArrowLink key={link.href} href={link.href} external={link.href.startsWith("http")}>
                {link.label}
              </ArrowLink>
            ))}
          </div>
        ) : null}
      </header>

      {project.frames && project.frames.length > 0 ? <ProductFrames frames={project.frames} /> : null}

      <div className="border-t border-line">
        {SECTIONS.map((section) => (
          <section key={section.key} className="border-b border-line">
            <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 md:grid-cols-[200px_1fr]">
              <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">{section.label}</h2>
              <p className="max-w-2xl text-lg leading-relaxed text-ink">
                {isNeeded(project[section.key]) ? <Needed value={project[section.key]} /> : project[section.key]}
              </p>
            </div>
          </section>
        ))}

        <section className="border-b border-line">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 md:grid-cols-[200px_1fr]">
            <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">Architecture</h2>
            <ol className="max-w-2xl space-y-6">
              {project.architecture.map((node, i) => (
                <li key={node.id}>
                  <p className="font-mono text-[12px] tracking-[0.16em] uppercase text-accent">
                    {String(i + 1).padStart(2, "0")} · {node.label}
                  </p>
                  <p className="mt-2 text-mute">{node.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 md:grid-cols-[200px_1fr]">
            <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">Engineering challenges</h2>
            <ul className="max-w-2xl space-y-3 text-mute">
              {project.challenges.map((item, i) => (
                <li key={i}>{isNeeded(item) ? <Needed value={item} /> : item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 md:grid-cols-[200px_1fr]">
            <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">Technical decisions</h2>
            <ul className="max-w-2xl space-y-3 text-mute">
              {project.decisions.map((item, i) => (
                <li key={i}>{isNeeded(item) ? <Needed value={item} /> : item}</li>
              ))}
            </ul>
          </div>
        </section>

        {project.contribution ? (
          <section className="border-b border-line">
            <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 md:grid-cols-[200px_1fr]">
              <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">What I contributed</h2>
              <ul className="max-w-2xl space-y-3 text-mute">
                {project.contribution.map((item, i) => (
                  <li key={i}>{isNeeded(item) ? <Needed value={item} /> : item}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section>
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 md:grid-cols-[200px_1fr]">
            <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">Learnings</h2>
            <ul className="max-w-2xl space-y-3 text-mute">
              {project.learnings.map((item, i) => (
                <li key={i}>{isNeeded(item) ? <Needed value={item} /> : item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}
