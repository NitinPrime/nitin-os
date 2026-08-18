import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Experience } from "@/components/experience/experience";
import { EngineeringMap } from "@/components/engineering-map/engineering-map";
import { Hero } from "@/components/hero/hero";
import { Lab } from "@/components/lab/lab";
import { ArchitectureDemo } from "@/components/projects/architecture-demo";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { Proof } from "@/components/proof/proof";
import { Thinking } from "@/components/thinking/thinking";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EngineeringMap />
      <ProjectExplorer />
      <ArchitectureDemo />
      <Thinking />
      <Experience />
      <Lab />
      <Proof />
      <About />
      <Contact />
      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 font-mono text-[11px] tracking-[0.16em] uppercase text-dim sm:px-8">
          <span>{profile.handle}</span>
          <span>© {new Date().getFullYear()} {profile.fullName}</span>
        </div>
      </footer>
    </>
  );
}
