import { Needed, SectionLabel } from "@/components/ui/meta";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/data/engine";
import { isNeeded } from "@/data/profile";

const ERA_ORDER = ["LEARNING", "ENGINEERING", "BUILDING", "PRODUCT", "NEXT"] as const;

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="06">Experience</SectionLabel>
          <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] sm:text-6xl">
            Learning → engineering → building → product.
          </h2>
          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] uppercase text-dim">
            {ERA_ORDER.join("  →  ")}
          </p>
        </Reveal>

        <ol className="mt-16 space-y-0">
          {experience.map((item) => (
            <li key={item.id} className="grid gap-6 border-t border-line py-10 md:grid-cols-[160px_1fr]">
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{item.era}</p>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-3xl tracking-[-0.03em]">{item.org}</h3>
                  <p className="font-mono text-[12px] text-dim">
                    {isNeeded(item.dates) ? <Needed value={item.dates} /> : item.dates}
                  </p>
                </div>
                <p className="mt-2 text-mute">
                  {isNeeded(item.role) ? <Needed value={item.role} /> : item.role}
                  {item.location ? (
                    <>
                      {" · "}
                      {isNeeded(item.location) ? <Needed value={item.location} /> : item.location}
                    </>
                  ) : null}
                </p>
                <p className="mt-5 max-w-2xl text-ink">
                  {isNeeded(item.summary) ? <Needed value={item.summary} /> : item.summary}
                </p>
                <ul className="mt-5 max-w-2xl space-y-2 text-sm text-mute">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-line-strong" />
                      <span>{isNeeded(point) ? <Needed value={point} /> : point}</span>
                    </li>
                  ))}
                </ul>
                {item.stack ? (
                  <p className="mt-5 font-mono text-[11px] tracking-[0.12em] text-dim">
                    {item.stack.join("  /  ")}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
