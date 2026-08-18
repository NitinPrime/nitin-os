import { InspectCli } from "@/components/lab/inspect-cli";
import { RequestLab } from "@/components/lab/request-lab";
import { SectionLabel } from "@/components/ui/meta";
import { Reveal } from "@/components/ui/reveal";

export function Lab() {
  return (
    <section id="lab" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="07">Engineering lab</SectionLabel>
          <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] sm:text-6xl">
            Play with the system.
          </h2>
          <p className="mt-5 max-w-xl text-mute">
            Two small instruments. They are not toys on top of the site — they are how the site
            explains itself.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <RequestLab />
          <InspectCli />
        </div>
      </div>
    </section>
  );
}
