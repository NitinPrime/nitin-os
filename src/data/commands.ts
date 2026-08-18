export type CommandAction =
  | { type: "section"; id: string }
  | { type: "route"; href: string }
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
    id: "projects",
    label: "Projects",
    hint: "Work",
    keywords: ["work", "projects", "case studies", "drone", "chiefpulse", "nyaya"],
    action: { type: "section", id: "work" },
  },
  {
    id: "drone",
    label: "Autonomous Indoor Drone",
    hint: "Flagship",
    keywords: ["drone", "ros", "gazebo", "faiss", "robotics"],
    action: { type: "route", href: "/work/autonomous-indoor-drone" },
  },
  {
    id: "chiefpulse",
    label: "ChiefPulse",
    hint: "Product",
    keywords: ["chiefpulse", "founding", "saas", "winston"],
    action: { type: "route", href: "/work/chiefpulse" },
  },
  {
    id: "nyaya",
    label: "NyayaLens",
    hint: "AI SaaS",
    keywords: ["nyaya", "legal", "law", "retrieval", "saas", "ai"],
    action: { type: "route", href: "/work/nyaya-lens" },
  },
  {
    id: "analyzer",
    label: "AI Resume Analyzer",
    hint: "AI SaaS",
    keywords: ["resume", "claude", "saas", "ai"],
    action: { type: "route", href: "/work/ai-resume-analyzer" },
  },
  {
    id: "shortener",
    label: "URL Shortener",
    hint: "Backend",
    keywords: ["url", "express", "mongodb", "backend"],
    action: { type: "route", href: "/work/url-shortener" },
  },
  {
    id: "systems",
    label: "Engineering system",
    hint: "Stack",
    keywords: ["skills", "systems", "engine", "stack"],
    action: { type: "section", id: "systems" },
  },
  {
    id: "experience",
    label: "Experience",
    hint: "Timeline",
    keywords: ["experience", "nus", "psg", "samsung", "chiefpulse"],
    action: { type: "section", id: "experience" },
  },
  {
    id: "lab",
    label: "Engineering lab",
    hint: "Play",
    keywords: ["lab", "cli", "visualizer"],
    action: { type: "section", id: "lab" },
  },
  {
    id: "about",
    label: "About",
    hint: "Nitin",
    keywords: ["about", "who", "bio"],
    action: { type: "section", id: "about" },
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
    hint: "Open",
    keywords: ["resume", "cv"],
    action: { type: "route", href: "/resume" },
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
  { href: "/#systems", label: "Systems", id: "systems" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#contact", label: "Contact", id: "contact" },
] as const;
