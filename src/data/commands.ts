export type CommandAction =
  | { type: "section"; id: string }
  | { type: "external"; href: string }

export type Command = {
  id: string
  label: string
  hint: string
  keywords: string[]
  action: CommandAction
}

export const commands: Command[] = [
  {
    id: "work",
    label: "Work",
    hint: "Projects",
    keywords: ["work", "projects", "drone", "chiefpulse", "nyaya", "agentlens"],
    action: { type: "section", id: "work" },
  },
  {
    id: "experience",
    label: "Experience",
    hint: "Timeline",
    keywords: ["experience", "nus", "psg", "chiefpulse"],
    action: { type: "section", id: "experience" },
  },
  {
    id: "research",
    label: "Research",
    hint: "Paper",
    keywords: ["research", "paper", "publication", "qode", "optic"],
    action: { type: "section", id: "research" },
  },
  {
    id: "contact",
    label: "Contact",
    hint: "Talk",
    keywords: ["contact", "email", "hire"],
    action: { type: "section", id: "contact" },
  },
  {
    id: "resume",
    label: "Resume",
    hint: "PDF",
    keywords: ["resume", "cv", "pdf"],
    action: {
      type: "external",
      href: "https://drive.google.com/file/d/1fO0h8AuZO7f8cYEKIW1i-DHBVBwcEs7J/view?usp=sharing",
    },
  },
  {
    id: "github",
    label: "GitHub",
    hint: "NitinPrime",
    keywords: ["github", "code"],
    action: { type: "external", href: "https://github.com/NitinPrime" },
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    hint: "Profile",
    keywords: ["linkedin"],
    action: { type: "external", href: "https://www.linkedin.com/in/nitin-s-/" },
  },
];

export const navItems = [
  { href: "/#work", label: "Work", id: "work" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#research", label: "Research", id: "research" },
  { href: "/#contact", label: "Contact", id: "contact" },
] as const;
