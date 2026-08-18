import { OperatorNode } from "@/components/hero/operator-portrait";
import { SectionLabel } from "@/components/ui/meta";
import { Reveal } from "@/components/ui/reveal";
import { about, profile } from "@/data/profile";

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

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[220px_1fr]">
          <aside className="border border-line bg-surface p-4">
            <div className="mx-auto aspect-square w-full max-w-[180px] overflow-hidden rounded-sm">
              <OperatorNode rounded="sm" className="size-full" />
            </div>
            <p className="mt-4 font-mono text-[10px] tracking-[0.18em] uppercase text-accent">Personnel</p>
            <p className="mt-1 font-display text-2xl">{profile.fullName}</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.12em] uppercase text-dim">
              {profile.title}
            </p>
            <p className="mt-4 font-mono text-[10px] leading-5 tracking-[0.08em] text-mute">
              Not a render.
              <br />
              The operator, in a suit.
            </p>
          </aside>

          <dl className="space-y-10">
            {blocks.map((block) => (
              <div key={block.q} className="grid gap-3 border-t border-line pt-8 md:grid-cols-[200px_1fr]">
                <dt className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim">{block.q}</dt>
                <dd className="max-w-2xl text-lg leading-relaxed text-ink">{block.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
