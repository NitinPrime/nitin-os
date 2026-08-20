import { FloatingPortrait } from "@/components/hero/floating-portrait";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(110,200,184,0.12),transparent_45%)]" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_0.7fr] lg:gap-10 lg:py-12">
        <div className="relative z-10 max-w-lg">
          <p className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-mute">
            <span className="size-1.5 rounded-full bg-accent" />
            {profile.availability}
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[0.88] tracking-[-0.04em] sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-[15px] leading-snug text-mute">
            {profile.title} · {profile.line}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <MagneticLink href="#work">Work</MagneticLink>
            <MagneticLink href={profile.resume} variant="ghost" external>
              Resume
            </MagneticLink>
            <MagneticLink href="#contact" variant="ghost">
              Hit me up
            </MagneticLink>
          </div>
        </div>

        <FloatingPortrait />
      </div>
    </section>
  );
}
