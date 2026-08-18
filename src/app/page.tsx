import { Contact } from "@/components/contact/contact";
import { Experience } from "@/components/experience/experience";
import { Hero } from "@/components/hero/hero";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { Research } from "@/components/research/research";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectExplorer />
      <Experience />
      <Research />
      <Contact />
      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 font-mono text-[11px] tracking-[0.16em] uppercase text-dim sm:px-8">
          <span>{profile.handle}</span>
          <span>© {new Date().getFullYear()} {profile.fullName}</span>
        </div>
      </footer>
    </>
  );
}
