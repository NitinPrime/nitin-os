import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionLabel } from "@/components/ui/meta";
import { publications } from "@/data/publications";

export function Research() {
  return (
    <section id="research" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionLabel index="03">Research</SectionLabel>
        <h2 className="mt-4 font-display text-3xl tracking-[-0.03em] sm:text-4xl">Research</h2>

        <ul className="mt-12 space-y-5">
          {publications.map((paper) => (
            <li
              key={paper.title}
              className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-accent/70" aria-hidden />
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim">Publication</p>
              <h3 className="mt-3 max-w-3xl font-display text-xl tracking-[-0.02em] sm:text-2xl">{paper.title}</h3>
              <ul className="mt-4 max-w-3xl space-y-2 text-[14px] leading-relaxed text-mute">
                {paper.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-[10px] tracking-[0.08em] text-dim">
                {paper.stack.join("  /  ")}
              </p>
              <div className="mt-5 border-t border-line pt-4">
                <ArrowLink href={paper.href} external>
                  Paper
                </ArrowLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
