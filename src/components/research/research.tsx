import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionLabel } from "@/components/ui/meta";
import { publications } from "@/data/publications";

export function Research() {
  return (
    <section id="research" className="scroll-mt-20 border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionLabel index="03">Research</SectionLabel>
        <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] sm:text-4xl">Research</h2>

        <ul className="mt-10 space-y-6">
          {publications.map((paper) => (
            <li key={paper.title} className="max-w-3xl border-b border-line pb-6 last:border-b-0 last:pb-0">
              <h3 className="font-display text-lg tracking-[-0.02em] sm:text-xl">{paper.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-mute">{paper.points[0]}</p>
              <p className="mt-3 font-mono text-[10px] tracking-[0.06em] text-dim">
                {paper.stack.slice(0, 4).join(" / ")}
              </p>
              <div className="mt-3">
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
