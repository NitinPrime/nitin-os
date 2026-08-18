import { SectionLabel } from "@/components/ui/meta";
import { Reveal } from "@/components/ui/reveal";
import { about } from "@/data/profile";

const blocks = [
  { q: "Who am I?", a: about.who },
  { q: "What do I build?", a: about.build },
  { q: "What problems interest me?", a: about.problems },
  { q: "How do I work?", a: about.work },
  { q: "What am I looking for?", a: about.looking },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="09">About</SectionLabel>
          <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] sm:text-6xl">
            Direct answers.
          </h2>
        </Reveal>
        <dl className="mt-14 space-y-10">
          {blocks.map((block) => (
            <div key={block.q} className="grid gap-3 border-t border-line pt-8 md:grid-cols-[240px_1fr]">
              <dt className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim">{block.q}</dt>
              <dd className="max-w-2xl text-lg leading-relaxed text-ink">{block.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
