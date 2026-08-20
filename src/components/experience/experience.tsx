import { Needed, SectionLabel } from "@/components/ui/meta";
import { experience } from "@/data/engine";
import { isNeeded } from "@/data/profile";

const shown = [...experience]
  .filter((item) => item.id !== "next" && item.id !== "samsung" && item.id !== "drone")
  .reverse();

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionLabel index="02">Experience</SectionLabel>
        <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] sm:text-4xl">Experience</h2>

        <ol className="mt-10 divide-y divide-line border-y border-line">
          {shown.map((item) => {
            const parts = [
              !isNeeded(item.role) ? item.role : null,
              item.location && !isNeeded(item.location) ? item.location : null,
            ].filter(Boolean);

            return (
              <li key={item.id} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                <div>
                  <h3 className="font-display text-lg tracking-[-0.02em] sm:text-xl">{item.org}</h3>
                  {parts.length > 0 ? (
                    <p className="mt-1 text-[13px] text-mute">{parts.join(" · ")}</p>
                  ) : (
                    <p className="mt-1 text-[13px] text-mute">
                      <Needed value={item.role} />
                    </p>
                  )}
                </div>
                <p className="font-mono text-[11px] tracking-[0.06em] text-dim">
                  {isNeeded(item.dates) ? <Needed value={item.dates} /> : item.dates}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
