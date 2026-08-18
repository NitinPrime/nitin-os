import { Needed } from "@/components/ui/meta";
import { experience } from "@/data/engine";
import { isNeeded, NEEDED, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume — ${profile.fullName}, Software Engineer.`,
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">
        NITIN.OS / resume
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-[-0.04em]">{profile.fullName}</h1>
      <p className="mt-3 text-mute">
        {profile.title} · {profile.location}
      </p>
      <p className="mt-6 max-w-xl text-ink">{profile.line}</p>

      <dl className="mt-8 grid gap-2 font-mono text-[12px] text-mute">
        <div>
          <a className="hover:text-ink" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
        <div>
          <a className="hover:text-ink" href={`tel:${profile.phoneHref}`}>
            {profile.phone}
          </a>
        </div>
        <div>
          <a className="hover:text-ink" href={profile.github}>
            {profile.github}
          </a>
        </div>
        <div>
          <a className="hover:text-ink" href={profile.linkedin}>
            {profile.linkedin}
          </a>
        </div>
      </dl>

      <section className="mt-14">
        <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">Experience</h2>
        <ul className="mt-6 space-y-8">
          {experience
            .filter((item) => item.id !== "next")
            .map((item) => (
              <li key={item.id}>
                <div className="flex flex-wrap justify-between gap-2">
                  <p className="font-medium">
                    {isNeeded(item.role) ? <Needed value={item.role} /> : item.role} · {item.org}
                  </p>
                  <p className="font-mono text-[12px] text-dim">
                    {isNeeded(item.dates) ? <Needed value={item.dates} /> : item.dates}
                  </p>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-mute">
                  {item.points.map((point, i) => (
                    <li key={i}>{isNeeded(point) ? <Needed value={point} /> : point}</li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">Selected work</h2>
        <ul className="mt-6 space-y-5">
          {projects.map((project) => (
            <li key={project.slug}>
              <p className="font-medium">{project.title}</p>
              <p className="mt-1 text-sm text-mute">{project.summary}</p>
              <p className="mt-2 font-mono text-[11px] text-dim">{project.stack.join(" / ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-16 text-sm text-dim">
        PDF file: {NEEDED}. This page is the current source of truth until a designed PDF is added
        at <code className="font-mono">/public/resume.pdf</code>.
      </p>

      <Link href="/" className="mt-10 inline-block font-mono text-[11px] tracking-[0.18em] uppercase text-mute hover:text-ink">
        ← Return to NITIN.OS
      </Link>
    </div>
  );
}
