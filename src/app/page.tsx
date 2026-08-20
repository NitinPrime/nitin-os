import { Contact } from "@/components/contact/contact";
import { Experience } from "@/components/experience/experience";
import { Hero } from "@/components/hero/hero";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectExplorer />
      <Experience />
      <Contact />
      <footer className="border-t border-line py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 font-mono text-[10px] tracking-[0.14em] uppercase text-dim sm:px-8">
          <span>{profile.handle}</span>
          <span>© {new Date().getFullYear()} {profile.fullName}</span>
        </div>
      </footer>
    </>
  );
}
