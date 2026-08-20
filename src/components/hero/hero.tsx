import { PortraitScene } from "@/components/hero/portrait-scene";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(125,211,192,0.09),transparent_50%)]" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.85fr] lg:gap-8 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute">
            {profile.availability}
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-mono text-[12px] tracking-[0.16em] uppercase text-dim">
            {profile.title}
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mute">{profile.line}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticLink href="#work">View work</MagneticLink>
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
