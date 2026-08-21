import { NEEDED } from "./profile";

export type EngineDomain = {
  id: "frontend" | "backend" | "ai" | "data" | "systems";
  label: string;
  summary: string;
  usedIn: string[];
  technologies: string[];
};

export const engineDomains: EngineDomain[] = [
  {
    id: "frontend",
    label: "Frontend",
    summary: "Interfaces that feel like products, not dashboards taped to an API.",
    usedIn: ["ChiefPulse", "NyayaLens", "NITIN.OS"],
    technologies: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    summary: "APIs, persistence, and the boring reliability work that makes products real.",
    usedIn: ["NyayaLens API", "URL Shortener", "ChiefPulse"],
    technologies: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase", "REST APIs"],
  },
  {
    id: "ai",
    label: "AI",
    summary: "Models in a pipeline — not a demo notebook that never left the laptop.",
    usedIn: ["Indoor drone", "NyayaLens", "NUS accident detection"],
    technologies: ["Python", "TensorFlow", "OpenCV", "FAISS", "LLMs", "Computer Vision"],
  },
  {
    id: "data",
    label: "Data",
    summary: "Retrieval, features, and the context a model actually needs to be useful.",
    usedIn: ["NyayaLens retrieval", "Indoor drone retrieval layer", "NUS SageMaker workflows"],
    technologies: ["FAISS", "AWS SageMaker", "OpenCV", "PostgreSQL", "Retrieval"],
  },
  {
    id: "systems",
    label: "Systems",
    summary: "Control loops, simulation, and software that has to live next to hardware.",
    usedIn: ["Autonomous indoor drone", "Docker / Flask services"],
    technologies: ["C++", "ROS", "Gazebo", "Computer Vision", "Docker"],
  },
];

export type ExperienceItem = {
  id: string
  era: "LEARNING" | "ENGINEERING" | "BUILDING" | "PRODUCT" | "NEXT"
  org: string
  role: string
  dates: string
  location?: string
  summary: string
  points: string[]
  stack?: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: "psg",
    era: "LEARNING",
    org: "PSG College of Technology",
    role: "B.Tech, Information Technology",
    dates: "2022 — 2026",
    location: "Coimbatore",
    summary:
      "The base layer. Coursework plus shipped side systems — from inventory software to small production web apps.",
    points: [
      "Bachelor of Technology in Information Technology.",
      "Built production-shaped student systems including an inventory management app and festival / alumni web work.",
    ],
    stack: ["JavaScript", "Python", "SQL"],
  },
  {
    id: "nus",
    era: "ENGINEERING",
    org: "National University of Singapore",
    role: "Academic Intern · GAIP Winter 2024",
    dates: "Winter 2024",
    location: "Singapore",
    summary:
      "Deep learning with Amazon SageMaker. A week-shaped sprint that had to become a working vision pipeline, not a slide.",
    points: [
      "Completed the GAIP Winter 2024 program on Deep Learning with Amazon SageMaker.",
      "Designed and deployed a CNN-based real-time accident detection system on live video streams (~85% accuracy in that evaluation).",
      "TensorFlow, OpenCV, and Python, with SageMaker used to deploy and monitor the workflow.",
      "Delivered the end-to-end ML pipeline in a 7-day agile sprint.",
    ],
    stack: ["Python", "TensorFlow", "OpenCV", "AWS SageMaker"],
  },
  {
    id: "samsung",
    era: "ENGINEERING",
    org: "Samsung R&D India",
    role: NEEDED,
    dates: NEEDED,
    location: NEEDED,
    summary: NEEDED,
    points: [NEEDED],
  },
  {
    id: "drone",
    era: "BUILDING",
    org: "Independent system",
    role: "Autonomous Indoor Drone · Computer Vision × GenAI × Robotics",
    dates: NEEDED,
    summary:
      "A language-conditioned indoor autonomy stack: retrieve context, reason, then act through ROS in simulation.",
    points: [
      "Natural-language intent into a retrieval-backed reasoning loop, then into ROS control.",
      "Simulation and perception in Gazebo with computer vision in the loop.",
      "Vector retrieval with FAISS so the model is grounded in environment context rather than improvising.",
    ],
    stack: ["Python", "C++", "ROS", "Gazebo", "FAISS", "LLMs", "Computer Vision"],
  },
  {
    id: "chiefpulse",
    era: "PRODUCT",
    org: "ChiefPulse",
    role: "Founding Engineer",
    dates: "May 2026 — Aug 2026",
    location: "Coimbatore",
    summary:
      "Building the product, not a prototype: an AI company that tries to give founders clarity before the day fragments.",
    points: [
      "Founding engineer on ChiefPulse — an AI product positioned around founder clarity: “Clarity, delivered before you begin.”",
      NEEDED,
    ],
    stack: ["TypeScript", "React", "Supabase"],
  },
  {
    id: "next",
    era: "NEXT",
    org: "Next chapter",
    role: "Software Engineer",
    dates: "Open",
    summary:
      "Looking for a team with a real engineering problem — product, systems, or AI infrastructure — and the taste to ship it well.",
    points: [
      "Open to software engineering roles across full-stack, AI-adjacent, and systems work.",
    ],
  },
];

export type ThinkStage = {
  id: string
  label: string
  intent: string
  example: {
    project: string
    text: string
  }
}

export const thinkStages: ThinkStage[] = [
  {
    id: "understand",
    label: "Understand",
    intent:
      "Name the actual constraint. Not the requested feature — the thing that will make the system fail if you ignore it.",
    example: {
      project: "Indoor drone",
      text: "Indoor flight is not “make it autonomous.” It is: no GPS, noisy vision, a model that will hallucinate a hallway if you let it, and a control stack that cannot wait for a paragraph.",
    },
  },
  {
    id: "decompose",
    label: "Decompose",
    intent:
      "Split the problem at the interfaces. Each piece should have a job you can test without standing up the whole machine.",
    example: {
      project: "NUS accident detection",
      text: "Live video, a CNN, and SageMaker were three problems. Treating them as one blob would have burned the 7-day sprint on glue.",
    },
  },
  {
    id: "design",
    label: "Design",
    intent:
      "Decide what talks to what before writing the interesting part. Retrieval before generation. Schema before UI flourish.",
    example: {
      project: "ChiefPulse",
      text: "A founder product fails if the interface is clever and the data model is vague. The product has to sit between inputs and attention — so the architecture has to protect that boundary.",
    },
  },
  {
    id: "build",
    label: "Build",
    intent:
      "Ship the thinnest path that is still honest. Prefer a working control loop over a perfect slide.",
    example: {
      project: "URL Shortener",
      text: "Shorten and redirect. Node, Express, MongoDB. No extra surface area until the core contract is real.",
    },
  },
  {
    id: "measure",
    label: "Measure",
    intent:
      "Instrument the claim. If you cannot see it fail, you do not know if it works.",
    example: {
      project: "NUS accident detection",
      text: "The pipeline was evaluated on live streams, not just a held-out folder of stills — which is why the ~85% figure is attached to that setup, not to a marketing round number.",
    },
  },
  {
    id: "iterate",
    label: "Iterate",
    intent:
      "Change the weakest link, not the most visible one. Keep the interfaces stable while the insides get less wrong.",
    example: {
      project: "NyayaLens",
      text: "The first version of a legal model that cites freely is a liability. Iteration here is the refusal: if the provision is not in the knowledge base, the interface has to say so.",
    },
  },
];
