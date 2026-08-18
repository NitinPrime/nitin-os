import { MagneticLink } from "@/components/ui/magnetic-link";
import { SectionLabel } from "@/components/ui/meta";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="10">Contact</SectionLabel>
          <h2 className="mt-5 font-display text-5xl tracking-[-0.04em] sm:text-7xl">
            Let&apos;s build something.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-mute">
            Have an interesting engineering problem? Let&apos;s talk.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink">
            <span className="size-2 rounded-full bg-accent" />
            Open to opportunities
          </p>
        </Reveal>

        <ul className="mt-14 space-y-4">
          <li>
            <a className="font-display text-2xl hover:text-white sm:text-4xl" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
          <li>
            <a className="text-lg text-mute hover:text-ink" href={`tel:${profile.phoneHref}`}>
              {profile.phone}
            </a>
          </li>
          <li className="flex flex-wrap gap-6 pt-4">
            <MagneticLink href={profile.linkedin} variant="ghost" external>
              LinkedIn
            </MagneticLink>
            <MagneticLink href={profile.github} variant="ghost" external>
              GitHub
            </MagneticLink>
            <MagneticLink href="/resume" variant="ghost">
              Resume
            </MagneticLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
