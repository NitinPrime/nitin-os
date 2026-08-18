import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionLabel } from "@/components/ui/meta";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const proofs = [
  { label: "GitHub", meta: profile.githubHandle, href: profile.github },
  { label: "LinkedIn", meta: "nitin-s-", href: profile.linkedin },
  { label: "Resume", meta: "Open", href: "/resume" },
  { label: "Email", meta: profile.email, href: `mailto:${profile.email}` },
];

export function Proof() {
  return (
    <section id="proof" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="08">Proof</SectionLabel>
          <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] sm:text-6xl">
            Sources, not statistics.
          </h2>
        </Reveal>

        <ul className="mt-12 divide-y divide-line border-y border-line">
          {proofs.map((item) => (
            <li key={item.label} className="flex items-center justify-between gap-4 py-5">
              <span className="font-display text-2xl sm:text-3xl">{item.label}</span>
              <ArrowLink href={item.href} external={item.href.startsWith("http")}>
                {item.meta}
              </ArrowLink>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-dim">Public repositories</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {projects
              .flatMap((p) => p.links.filter((l) => l.label === "GitHub"))
              .concat([
                {
                  label: "GitHub",
                  href: "https://github.com/NitinPrime/docker-flask-redis-counter",
                },
              ])
              .map((link) => (
                <li key={link.href}>
                  <ArrowLink href={link.href} external>
                    {link.href.replace("https://github.com/", "")}
                  </ArrowLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
