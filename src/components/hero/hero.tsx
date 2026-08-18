import { MagneticLink } from "@/components/ui/magnetic-link";
import { OperatorPortrait } from "@/components/hero/operator-portrait";
import { SystemGraph } from "@/components/hero/system-graph";
import { SectionLabel } from "@/components/ui/meta";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-14">
      <SystemGraph className="pointer-events-none absolute inset-0 h-full w-full opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08090c_72%)]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <SectionLabel index="01">Identity</SectionLabel>

          <div className="mt-8 max-w-[240px] lg:hidden">
            <OperatorPortrait compact />
          </div>

          <p className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-ink">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-40" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </p>

          <h1 className="mt-8 font-display text-[18vw] leading-[0.86] tracking-[-0.04em] text-ink sm:text-[12vw] lg:text-[8.5rem]">
            {profile.name}
          </h1>

          <p className="mt-4 max-w-xl font-mono text-[13px] tracking-[0.18em] uppercase text-mute">
            {profile.title}
          </p>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute sm:text-xl">
            {profile.line}
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.2em] uppercase text-dim">
            {profile.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <MagneticLink href="#work">Explore my work</MagneticLink>
            <MagneticLink href="/resume" variant="ghost">
              View resume
            </MagneticLink>
          </div>
          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] uppercase text-dim">
            Press <kbd className="text-mute">Ctrl</kbd> / <kbd className="text-mute">⌘</kbd>{" "}
            <kbd className="text-mute">K</kbd> to inspect
          </p>
        </div>

        <OperatorPortrait className="mx-auto hidden w-full max-w-[480px] lg:block lg:justify-self-end" />
      </div>
    </section>
  );
}
