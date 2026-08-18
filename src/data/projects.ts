import { NEEDED } from "./profile";

export type ArchitectureNode = {
  id: string
  label: string
  detail: string
}

export type ProjectFrame = {
  src: string
  alt: string
  caption: string
}

export type Project = {
  slug: string
  code: string
  title: string
  kicker: string
  summary: string
  problem: string
  approach: string
  architecture: ArchitectureNode[]
  challenges: string[]
  decisions: string[]
  result: string
  learnings: string[]
  stack: string[]
  domains: string[]
  links: { label: string; href: string }[]
  contribution?: string[]
  frames?: ProjectFrame[]
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: "autonomous-indoor-drone",
    code: "01",
    title: "Autonomous Indoor Drone",
    kicker: "Computer Vision × GenAI × Robotics",
    summary:
      "Language in, retrieval, then ROS control — an indoor autonomy stack in simulation.",
    problem:
      "Indoor robots do not get a GPS fix, and a language model does not get a map. Asking an LLM to “fly to the red cabinet” without grounding is how you get confident nonsense near a wall. The problem was to take a human request and turn it into a controlled action inside a simulated indoor world — with perception, memory, and control as separate, inspectable layers.",
    approach:
      "Treat the drone as a system with a request path, not a single model. A user intent hits a reasoning layer. That layer is only allowed to act after a retrieval step has pulled environment and task context (FAISS). Computer vision supplies what the robot can currently see. ROS carries the action into Gazebo. The loop is: perceive → retrieve → reason → command.",
    architecture: [
      {
        id: "user",
        label: "User",
        detail: "A natural-language request. The only interface a person should need.",
      },
      {
        id: "llm",
        label: "LLM / reasoning",
        detail: "Interprets intent into a structured action — after it has context, not before.",
      },
      {
        id: "retrieval",
        label: "Retrieval layer",
        detail: "FAISS-backed memory of the environment and prior observations.",
      },
      {
        id: "context",
        label: "Environment / context",
        detail: "What the robot knows: map fragments, detections, constraints.",
      },
      {
        id: "ros",
        label: "ROS",
        detail: "The control bus. Commands become nodes, topics, and motion.",
      },
      {
        id: "drone",
        label: "Robot / drone",
        detail: "Gazebo-simulated platform. Vision in, actuation out.",
      },
    ],
    challenges: [
      "Grounding language in a GPS-denied indoor space without letting the model invent geometry.",
      "Keeping retrieval, perception, and control decoupled so a bad generation cannot skip the stack.",
      "Working in simulation (Gazebo) with a control interface (ROS) that still resembles a real robot loop.",
    ],
    decisions: [
      "Retrieval before generation — FAISS as a hard gate, not an optional plugin.",
      "ROS as the actuation contract so the reasoning layer never talks to motors directly.",
      "Gazebo as the world so perception and control can be iterated without a flight risk.",
      "C++ where the control loop needs it; Python where the model and retrieval live.",
    ],
    result:
      "A working simulated stack where a request can be watched as it moves: language in, retrieval, reasoning, ROS, motion. No flight-time or accuracy numbers are published here because they are not independently recorded for this page.",
    learnings: [
      "Autonomy is an interface problem as much as a model problem. The dangerous part is an LLM with write-access to actuators.",
      "Simulation is only useful if the software contracts (ROS topics, vision inputs) stay honest.",
      "Retrieval is how you keep a generative model from piloting by vibe.",
    ],
    stack: ["Python", "C++", "ROS", "Gazebo", "FAISS", "LLMs", "Computer Vision"],
    domains: ["AI", "Systems", "Data"],
    links: [
      { label: "Live", href: "https://autonomous-indoor-drone-b3ficygjsu6jjtwbe6y5xd.streamlit.app/" },
    ],
    frames: [
      {
        src: "/images/drone/simulation.png",
        alt: "Autonomous indoor drone dashboard with natural language command and indoor simulation",
        caption: "Natural language in — FAISS retrieval, then the drone flies the indoor mission.",
      },
    ],
    featured: true,
  },
  {
    slug: "chiefpulse",
    code: "02",
    title: "ChiefPulse",
    kicker: "Founding Engineer · AI product",
    summary:
      "AI product for founder attention: daily briefing, priority map, and Winston as co-pilot.",
    problem:
      "Founders do not usually fail because they cannot work hard. They fail because open loops go quiet: commitments stall, context scatters, and the day starts already fragmented. ChiefPulse is built around that problem — “Clarity, delivered before you begin.”",
    approach:
      "Build it as a product: TypeScript and React on the surface, Supabase underneath for auth and data, and an AI layer that is allowed to brief, not to drown. The interface has to stay calm. The system has to sit between inputs and attention — a daily briefing, a priority map, and Winston as a co-pilot over Gmail, Calendar, and tasks.",
    architecture: [
      {
        id: "inputs",
        label: "Inputs",
        detail: "Gmail, Calendar, tasks, Slack — the residue of a founder’s tools.",
      },
      {
        id: "data",
        label: "Supabase",
        detail: "Auth, persistence, and the source of truth the UI is not allowed to fake.",
      },
      {
        id: "model",
        label: "Winston",
        detail: "The co-pilot. Synthesizes the stack into a brief, a chat, and a next move.",
      },
      {
        id: "map",
        label: "Priority Map",
        detail: "Attention sorted: do now, schedule, delegate, eliminate.",
      },
      {
        id: "ui",
        label: "Product UI",
        detail: "React + TypeScript. A calm evening surface, not a noisy dashboard.",
      },
    ],
    challenges: [
      "Shipping as a founding engineer means product taste and production engineering are the same job.",
      "An AI briefing layer is easy to make noisy. The product only works if it protects attention.",
      NEEDED,
    ],
    decisions: [
      "TypeScript end-to-end on the product surface so the data contracts stay explicit.",
      "Supabase as the application backbone (auth + data) instead of a collage of services on day one.",
      NEEDED,
    ],
    result:
      "ChiefPulse is a live product effort, not a case-study mock. Traction, user counts, and revenue are not listed here because they are not public numbers I am going to invent.",
    learnings: [
      "Early product engineering is mostly about which problems you refuse to take on yet.",
      "The UI is part of the architecture. If the brief is anxious, the system has already failed.",
    ],
    contribution: [
      "Founding Engineer, May 2026 — Aug 2026 — owning product engineering on a small team.",
      NEEDED,
    ],
    stack: ["TypeScript", "React", "Supabase"],
    domains: ["Product", "Frontend", "Backend"],
    links: [{ label: "Company", href: "https://www.linkedin.com/company/chief-pulse" }],
    frames: [
      {
        src: "/images/chiefpulse/dashboard.png",
        alt: "ChiefPulse evening dashboard with Winston’s briefing and presidential brief",
        caption: "Evening briefing — Winston synthesizes Gmail, Calendar, and tasks into one calm read.",
      },
    ],
    featured: true,
  },
  {
    slug: "nyaya-lens",
    code: "03",
    title: "NyayaLens",
    kicker: "AI SaaS · legal retrieval",
    summary:
      "Plain-language legal case analysis for India. Retrieves sources and shows both sides, with citations.",
    problem:
      "People meet the law in ordinary language. Most legal AI answers in fluent paragraphs that cannot show their work. In Indian law that is dangerous: a hallucinated section looks like advice. The job is narrower — structure the situation, retrieve what can be retrieved, and say so when a citation is not there.",
    approach:
      "A product path, not a chatbot: describe the case, optional details (parties, dates, evidence), then an analysis that keeps facts, inferences, retrieved law, and argument in separate lanes. Demo mode uses synthetic examples across tenancy, cyber, consumer, and employment — the knowledge base is a curated demo corpus, not the entirety of Indian law. The interface is explicit that this is general legal information, not a substitute for an advocate.",
    architecture: [
      {
        id: "intake",
        label: "Case intake",
        detail: "Plain language plus optional structure: who, when, where, amount, evidence.",
      },
      {
        id: "structure",
        label: "Case structure",
        detail: "Parties, facts, issues, and missing information — extracted without inventing details.",
      },
      {
        id: "retrieve",
        label: "Retrieval",
        detail: "Provisions come from the knowledge base. Unsupported citations are flagged.",
      },
      {
        id: "api",
        label: "API",
        detail: "Production analysis is served from a Railway API; the product UI lives on Vercel.",
      },
      {
        id: "out",
        label: "Both-side brief",
        detail: "Arguments, weaknesses, next steps — tied to retrieved sources when they exist.",
      },
    ],
    challenges: [
      "Legal generation without retrieval is confident nonsense. The system has to refuse a citation it cannot ground.",
      "Keeping facts, inferences, and law visually separate so a user can audit the reasoning.",
      "A demo knowledge base has to be honest about its coverage — not pretend to be all of Indian law.",
    ],
    decisions: [
      "Retrieval before argument. If no provision is found, the interface says so.",
      "Next.js on Vercel for the product surface; the analysis API on Railway so the model key is not in the browser.",
      "Both-side analysis as a product rule: look for weaknesses in the user’s position as hard as supporting ones.",
      "Synthetic demo cases so the retrieval path can be shown without using real personal data.",
    ],
    result:
      "A live product: analyze a case or walk a demo. No user or accuracy metrics are listed here because they are not public numbers for this page.",
    learnings: [
      "In a high-stakes domain, the product is the refusal as much as the answer.",
      "Structured output beats a legal-sounding chat transcript nobody can verify.",
      "SaaS architecture starts with where the API lives — Vercel for the interface, Railway for the reasoning service.",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Railway", "LLMs", "Retrieval"],
    domains: ["AI", "Frontend", "Backend"],
    links: [
      { label: "GitHub", href: "https://github.com/NitinPrime/NyayaLens" },
      { label: "Live", href: "https://nyaya-lens-lovat.vercel.app/" },
    ],
    frames: [
      {
        src: "/images/nyaya-lens/landing.png",
        alt: "NyayaLens landing page with case analysis flow",
        caption: "NyayaLens — describe a case, retrieve Indian legal sources, see both sides.",
      },
    ],
    featured: true,
  },
  {
    slug: "ai-resume-analyzer",
    code: "04",
    title: "AI Resume Analyzer",
    kicker: "AI SaaS · document understanding",
    summary:
      "Upload a resume and a job posting. Claude returns keyword gaps and ranked improvements.",
    problem:
      "Most resume tools either keyword-stuff or give generic advice. The useful job is narrower: given this PDF and this posting, what is actually missing, and what should change first?",
    approach:
      "A small SaaS-shaped app: a resume PDF and a job description in, a structured critique out. Claude reads the document directly. The UI stays a single, obvious path — no account maze in the first version.",
    architecture: [
      {
        id: "upload",
        label: "Client",
        detail: "React UI. Resume PDF + job description.",
      },
      {
        id: "model",
        label: "Claude",
        detail: "Document understanding for the PDF, then structured ATS-oriented feedback.",
      },
      {
        id: "out",
        label: "Brief",
        detail: "Score-shaped output, keyword gaps, section notes, ranked improvements.",
      },
    ],
    challenges: [
      "PDF understanding is messy. The model has to see the document, not a broken text dump.",
      "First version called the API from the browser — fine for a personal tool, wrong for a real SaaS key and quota story.",
    ],
    decisions: [
      "Claude document understanding instead of a brittle PDF-parse-then-prompt pipeline.",
      "Ship the thinnest honest product (Vite + React) before inventing a platform.",
      "Be explicit that production would move inference to a server function.",
    ],
    result:
      "A working analyzer with a public demo. No user or conversion metrics — it is a shipped tool, not a growth deck.",
    learnings: [
      "AI product architecture is mostly about where the key lives and what the user is allowed to wait for.",
      "Structured output matters more than a chat transcript nobody will re-read.",
    ],
    stack: ["React", "Vite", "JavaScript", "Claude API"],
    domains: ["AI", "Frontend"],
    links: [
      { label: "GitHub", href: "https://github.com/NitinPrime/resume-analyzer" },
      { label: "Live", href: "https://resume-analyzer-gamma-beige.vercel.app" },
    ],
    featured: true,
  },
  {
    slug: "url-shortener",
    code: "05",
    title: "URL Shortener",
    kicker: "Backend systems · HTTP contracts",
    summary:
      "A small, complete backend: accept a long URL, persist it, return a short one, redirect. Node.js, Express, MongoDB.",
    problem:
      "URL shortening is not interesting because it is novel. It is interesting because the contract is brutally clear — and easy to get vaguely wrong (collision, redirect, persistence).",
    approach:
      "Keep the surface tiny. One write path, one read path. Express for HTTP, MongoDB for the mapping. No dashboard theatre until the redirect works.",
    architecture: [
      {
        id: "http",
        label: "HTTP",
        detail: "Express routes for shorten and resolve.",
      },
      {
        id: "store",
        label: "MongoDB",
        detail: "The mapping. Long URL in, key out.",
      },
      {
        id: "out",
        label: "Redirect",
        detail: "A short URL that must resolve, every time.",
      },
    ],
    challenges: [
      "Designing a key that is short and unique without turning the database into a science project.",
      "Making redirect the product, not an afterthought to a form.",
    ],
    decisions: [
      "Node.js + Express for a straightforward HTTP service.",
      "MongoDB for a document mapping that does not need a relational story yet.",
    ],
    result:
      "A working shortener: long URLs in, short URLs out, redirects back. Published on GitHub.",
    learnings: [
      "Backend taste is mostly about the contracts you keep small.",
      "A system you can explain on a whiteboard is usually a system you can extend.",
    ],
    stack: ["Node.js", "Express", "MongoDB"],
    domains: ["Backend", "Systems"],
    links: [{ label: "GitHub", href: "https://github.com/NitinPrime/URL-shortener" }],
    featured: false,
  },
];

export const moreWork = [
  {
    title: "Accident detection pipeline",
    meta: "NUS · CNN · live video",
    href: undefined as string | undefined,
  },
  {
    title: "Docker Flask Redis counter",
    meta: "Containers · services",
    href: "https://github.com/NitinPrime/docker-flask-redis-counter",
  },
  {
    title: "Flight price predictor",
    meta: "ML notebook",
    href: "https://github.com/NitinPrime/flight-price-predictor",
  },
  {
    title: "Inventory management — PSG",
    meta: "Application software",
    href: "https://github.com/NitinPrime/InventoryManagementSystem_PSG",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
