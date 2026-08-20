import { PortraitScene } from "@/components/hero/portrait-scene";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_12%,rgba(110,200,184,0.16),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_8%_90%,rgba(212,165,116,0.1),transparent_42%)]" />

      <div className="relative mx-auto grid min-h-[32rem] max-w-5xl items-center px-5 py-16 sm:min-h-[36rem] sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:py-24">
        <div className="relative z-10 max-w-xl">
          <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] uppercase text-mute">
            <span className="size-1.5 rounded-full bg-accent" />
            {profile.availability}
          </p>
          <h1 className="mt-6 font-display text-6xl leading-[0.84] tracking-[-0.045em] sm:text-8xl">
            {profile.name}
          </h1>
          <p className="mt-5 font-mono text-[12px] tracking-[0.18em] uppercase text-dim">
            {profile.title}
          </p>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-mute">{profile.line}</p>
          <p className="mt-5 font-mono text-[11px] tracking-[0.1em] text-dim">
            {profile.tags.join("  ·  ")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticLink href="#work">Work</MagneticLink>
            <MagneticLink href={profile.resume} variant="ghost" external>
              Resume
            </MagneticLink>
            <MagneticLink href="#contact" variant="ghost">
              Contact
            </MagneticLink>
          </div>
        </div>

        <PortraitScene />
      </div>
    </section>
  );
}
