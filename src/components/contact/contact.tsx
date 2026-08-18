import { MagneticLink } from "@/components/ui/magnetic-link";
import { SectionLabel } from "@/components/ui/meta";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-10">
          <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
          <SectionLabel index="04">Contact</SectionLabel>
          <h2 className="mt-4 font-display text-3xl tracking-[-0.03em] sm:text-5xl">
            Let&apos;s talk.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mute">
            Open to software engineering roles. Have a problem worth building for? Email me.
          </p>

          <a
            className="mt-8 block font-display text-2xl transition-colors hover:text-white sm:text-3xl"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
          <a className="mt-3 block text-mute transition-colors hover:text-ink" href={`tel:${profile.phoneHref}`}>
            {profile.phone}
          </a>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticLink href={profile.resume} external>
              Resume
            </MagneticLink>
            <MagneticLink href={profile.linkedin} variant="ghost" external>
              LinkedIn
            </MagneticLink>
            <MagneticLink href={profile.github} variant="ghost" external>
              GitHub
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}
