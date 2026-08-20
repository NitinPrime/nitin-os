import { ArrowLink } from "@/components/ui/arrow-link";
import { Needed, SectionLabel } from "@/components/ui/meta";
import { experience } from "@/data/engine";
import { publications } from "@/data/publications";
import { isNeeded } from "@/data/profile";

const shown = [...experience]
  .filter((item) => item.id !== "next" && item.id !== "samsung" && item.id !== "drone")
  .reverse();

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-t border-line py-10 sm:py-12">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <SectionLabel index="02">XP</SectionLabel>
          <h2 className="mt-2 font-display text-2xl tracking-[-0.03em] sm:text-3xl">experience</h2>
          <ol className="mt-5 divide-y divide-line border-y border-line">
            {shown.map((item) => {
              const parts = [
                !isNeeded(item.role) ? item.role : null,
                item.location && !isNeeded(item.location) ? item.location : null,
              ].filter(Boolean);

              return (
                <li key={item.id} className="flex items-baseline justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-[17px] tracking-[-0.02em]">{item.org}</h3>
                    {parts.length > 0 ? (
                      <p className="mt-0.5 truncate text-[12px] text-mute">{parts.join(" · ")}</p>
                    ) : (
                      <p className="mt-0.5 text-[12px] text-mute">
                        <Needed value={item.role} />
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 font-mono text-[10px] tracking-[0.06em] text-dim">
                    {isNeeded(item.dates) ? <Needed value={item.dates} /> : item.dates}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <div id="research">
          <SectionLabel index="03">Paper</SectionLabel>
          <h2 className="mt-2 font-display text-2xl tracking-[-0.03em] sm:text-3xl">research</h2>
          <ul className="mt-5 space-y-4 border-y border-line py-3">
            {publications.map((paper) => (
              <li key={paper.title}>
                <h3 className="font-display text-[16px] leading-snug tracking-[-0.02em]">{paper.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-[12px] leading-snug text-mute">{paper.points[0]}</p>
                <div className="mt-2">
                  <ArrowLink href={paper.href} external>
                    Paper
                  </ArrowLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
