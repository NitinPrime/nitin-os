import { Needed, SectionLabel } from "@/components/ui/meta";
import { experience } from "@/data/engine";
import { isNeeded } from "@/data/profile";

const shown = [...experience]
  .filter((item) => item.id !== "next" && item.id !== "samsung" && item.id !== "drone")
  .reverse();

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionLabel index="02">Experience</SectionLabel>
        <h2 className="mt-4 font-display text-3xl tracking-[-0.03em] sm:text-4xl">Experience</h2>

        <ol className="relative mt-12 border-l border-line pl-6 sm:pl-8">
          {shown.map((item) => {
            const parts = [
              !isNeeded(item.role) ? item.role : null,
              item.location && !isNeeded(item.location) ? item.location : null,
            ].filter(Boolean);

            return (
              <li key={item.id} className="relative pb-10 last:pb-0">
                <span
                  className="absolute top-1.5 -left-[1.9rem] size-2.5 rounded-full border border-accent bg-base sm:-left-[2.4rem]"
                  aria-hidden
                />
                <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline">
                  <div>
                    <h3 className="font-display text-xl tracking-[-0.02em] sm:text-2xl">{item.org}</h3>
                    {parts.length > 0 ? (
                      <p className="mt-1 text-sm text-mute">{parts.join(" · ")}</p>
                    ) : (
                      <p className="mt-1 text-sm text-mute">
                        <Needed value={item.role} />
                      </p>
                    )}
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.08em] text-dim">
                    {isNeeded(item.dates) ? <Needed value={item.dates} /> : item.dates}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
