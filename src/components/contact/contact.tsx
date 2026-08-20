import { MagneticLink } from "@/components/ui/magnetic-link";
import { SectionLabel } from "@/components/ui/meta";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionLabel index="04">Contact</SectionLabel>
        <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] sm:text-4xl">Get in touch</h2>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-mute">
          Open to software engineering roles. Reach out by email.
        </p>

        <a
          className="mt-8 block font-display text-xl transition-colors hover:text-accent sm:text-2xl"
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </a>
        <a className="mt-2 block text-[14px] text-mute transition-colors hover:text-ink" href={`tel:${profile.phoneHref}`}>
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
    </section>
  );
}
