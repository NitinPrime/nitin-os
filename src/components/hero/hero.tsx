import { FloatingPortrait } from "@/components/hero/floating-portrait";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_18%,rgba(77,124,255,0.22),transparent_46%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_80%,rgba(124,116,255,0.12),transparent_40%)]" />
      <div className="site-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid min-h-[32rem] max-w-5xl items-center px-5 py-20 sm:min-h-[36rem] sm:px-8 lg:grid-cols-[1fr_0.78fr] lg:py-24">
        <div className="relative z-10 max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase text-ink backdrop-blur-sm">
            <span className="pulse-dot size-1.5 rounded-full bg-accent" />
            {profile.availability}
          </p>
          <h1 className="mt-6 font-display text-6xl leading-[0.86] tracking-[-0.045em] sm:text-8xl">
            {profile.name}
          </h1>
          <p className="mt-5 font-mono text-[12px] tracking-[0.18em] uppercase text-mute">
            {profile.title}
          </p>
          <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-mute">{profile.line}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-dim uppercase"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <MagneticLink href="#work">Work</MagneticLink>
            <MagneticLink href={profile.resume} variant="ghost" external>
              Resume
            </MagneticLink>
            <MagneticLink href="#contact" variant="ghost">
              Contact
            </MagneticLink>
          </div>
        </div>

        <FloatingPortrait />
      </div>
    </section>
  );
}
