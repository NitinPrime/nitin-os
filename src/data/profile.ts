export const NEEDED = "[CONTENT NEEDED]" as const;

export function isNeeded(value: string | undefined): boolean {
  return !value || value === NEEDED;
}

export const profile = {
  name: "Nitin",
  fullName: "Nitin S",
  handle: "NITIN.OS",
  title: "Software Engineer",
  line: "Building intelligent systems, polished products, and software that solves real problems.",
  availability: "Open to software engineering opportunities",
  location: "Coimbatore, India",
  email: "nitinprime2323@gmail.com",
  phone: "+91 9994563792",
  phoneHref: "+919994563792",
  github: "https://github.com/NitinPrime",
  githubHandle: "NitinPrime",
  linkedin: "https://www.linkedin.com/in/nitin-s-/",
  tags: ["Full Stack", "AI / ML", "Systems", "Product Engineering"],
} as const;

export const about = {
  who: "I'm Nitin, an engineer from PSG College of Technology. I work at the intersection of full-stack product, machine learning, and systems — the kind of problems where the interface, the model, and the infrastructure all have to agree.",
  build: "Intelligent products with a real user on the other side: founder tools at ChiefPulse, computer-vision pipelines, retrieval-backed robotics, and small, well-made web systems.",
  problems:
    "I'm most interested in systems that have to reason under constraints — indoor autonomy, live video, retrieval, and product surfaces that have to stay calm when the backend is doing something hard.",
  work: "I start by making the problem smaller than it looks. Then I design the interfaces between pieces before I fall in love with any one of them. I like shipping something real, measuring it, and only then making it clever.",
  looking:
    "Software engineering roles where I can own product surfaces and the systems behind them — full-stack, AI-adjacent, or platform work with real users.",
} as const;
