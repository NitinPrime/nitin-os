import { MagneticLink } from "@/components/ui/magnetic-link";
import { SectionLabel } from "@/components/ui/meta";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 border-t border-line py-10 sm:py-12">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionLabel index="04">Ping</SectionLabel>
        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl tracking-[-0.03em] sm:text-3xl">let&apos;s cook</h2>
            <a
              className="mt-2 block font-display text-xl italic transition-colors hover:text-accent sm:text-2xl"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
            <a className="mt-1 block text-[13px] text-mute hover:text-ink" href={`tel:${profile.phoneHref}`}>
              {profile.phone}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
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
