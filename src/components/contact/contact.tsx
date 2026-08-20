import { MagneticLink } from "@/components/ui/magnetic-link";
import { SectionLabel } from "@/components/ui/meta";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionLabel index="04">Contact</SectionLabel>
        <h2 className="mt-4 font-display text-3xl tracking-[-0.03em] sm:text-5xl">
          Say hello when you&apos;re ready.
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mute">
          Open to software engineering roles. Have a problem worth building for? Email me.
        </p>

        <a
          className="mt-10 block font-display text-2xl italic transition-colors hover:text-accent sm:text-4xl"
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </a>
        <a className="mt-3 block text-mute transition-colors hover:text-ink" href={`tel:${profile.phoneHref}`}>
          {profile.phone}
        </a>

        <div className="mt-10 flex flex-wrap gap-3">
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
    </section>
  );
}
