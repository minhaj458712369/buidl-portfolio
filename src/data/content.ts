export type Kind = "work" | "journal" | "research" | "visual" | "cinema";

export type Status = "published" | "draft" | "ongoing" | "experimental";

export type Piece = {
  slug: string;
  kind: Kind;
  title: string;
  kicker: string;
  summary: string;
  status: Status;
  year: string;
  role: string;
  tools: string[];
  body: string[];
  /** Real external URL only. Empty until supplied. */
  mediaUrl: string;
  mediaNote: string;
};

export type Profile = {
  name: string;
  location: string;
  line: string;
  email: string;
  socials: { label: string; href: string }[];
  cvUrl: string;
};

export const SEED_PROFILE: Profile = {
  name: "Minhazul Arefin",
  location: "Dhaka, Bangladesh",
  line: "Creative technologist working across digital products, interactive systems, research, and visual storytelling.",
  email: "",
  socials: [],
  cvUrl: "",
};

export const SEED_PIECES: Piece[] = [
  {
    slug: "legal-tech-ux",
    kind: "work",
    title: "Legal-Tech UX System",
    kicker: "Interface architecture",
    summary:
      "An interface study of two environments on one legal-technology platform: a user-side dashboard and a client-side dashboard. The work maps how different stakeholders move through the same system.",
    status: "experimental",
    year: "2025–2026",
    role: "UX and interface design",
    tools: ["Figma", "Information architecture", "Prototyping"],
    body: [
      "The project treats a legal platform as two workplaces, not one generic dashboard. People who file or follow a matter do not need the same navigation, density, or language as the people who operate the service.",
      "Documented so far: stakeholder types, workflow sketches, navigation structure, and interface decisions. Screenshots and prototype links are not attached yet.",
      "No client name, outcome metric, or testimonial is claimed. This page stays a case study of the design problem, not a commercial result.",
    ],
    mediaUrl: "",
    mediaNote: "Screenshots and prototype URL — waiting",
  },
  {
    slug: "shuttersense",
    kind: "work",
    title: "ShutterSense",
    kicker: "Interactive simulation",
    summary:
      "An experimental DSLR photography simulation built in Unity 6. It explores whether practical interaction with aperture, shutter, ISO, and light can make camera controls easier to understand.",
    status: "experimental",
    year: "2024–2026",
    role: "Design, interaction, Unity development",
    tools: ["Unity 6", "Simulation design", "Camera systems"],
    body: [
      "Motivation: camera settings are usually taught as numbers before they are felt as consequences. ShutterSense asks whether a controllable scene can reverse that order.",
      "The interaction model covers aperture, shutter speed, ISO, exposure, composition, and light. It is academic and experimental work, not a finished training product.",
      "Educational effectiveness is not claimed. Demonstrations, research notes, and known limits will be added when recordings and write-ups exist.",
    ],
    mediaUrl: "",
    mediaNote: "Gameplay recording — waiting",
  },
  {
    slug: "what-simulation-can-teach",
    kind: "journal",
    title: "What a simulation is allowed to teach",
    kicker: "Notes",
    summary:
      "A working note on the difference between a controllable model and a claim that someone learned from it.",
    status: "published",
    year: "2026",
    role: "Writing",
    tools: [],
    body: [
      "A simulation can show a relationship: change the aperture and the depth of field changes. That is already useful. It is not the same as proving that a learner will transfer the idea to a real camera.",
      "For this site, experimental work stays labeled experimental. A prototype does not become a product because the interface looks finished.",
      "The useful next step is usually smaller than a paper: record the interaction, name the question, and write what the build cannot yet answer.",
    ],
    mediaUrl: "",
    mediaNote: "",
  },
  {
    slug: "two-audiences",
    kind: "journal",
    title: "Two doors, one practice",
    kicker: "Structure",
    summary:
      "Why this site separates a research path from a collaboration path without splitting the person into two brands.",
    status: "published",
    year: "2026",
    role: "Writing",
    tools: [],
    body: [
      "A researcher looking for method and a studio looking for an interface do not need the same first sentence. They can still arrive at the same photographs, films, and notes.",
      "The homepage is organized as chapters with two explicit doors: Research & Academia, and Work & Collaborations. Visual work stays reachable from both.",
    ],
    mediaUrl: "",
    mediaNote: "",
  },
  {
    slug: "camera-simulation-questions",
    kind: "research",
    title: "Camera controls as an interactive learning problem",
    kicker: "Ongoing inquiry",
    summary:
      "Independent notes toward a research question: how an interactive camera model might support understanding of exposure, without claiming a study has been run.",
    status: "ongoing",
    year: "2026",
    role: "Independent research",
    tools: ["Unity 6", "Literature notes"],
    body: [
      "Question under development: which camera relationships (aperture, shutter, ISO, light) become clearer when a person can change them against a visible scene, and which stay abstract?",
      "Status: ongoing inquiry attached to the ShutterSense prototype. This is not a publication. There is no validated result, sample, or citation list yet.",
      "Method, so far, is build-and-observe: implement the control, notice where the interface lies or clarifies, and keep those observations separate from claims about learning outcomes.",
    ],
    mediaUrl: "",
    mediaNote: "Figures and PDF — waiting",
  },
  {
    slug: "documentary-still",
    kind: "visual",
    title: "Documentary still",
    kicker: "photo",
    summary: "A single observational photograph. Open it once a real still is linked.",
    status: "published",
    year: "2026",
    role: "",
    tools: [],
    body: ["Waiting for the original file. No stand-in image."],
    mediaUrl: "",
    mediaNote: "Photograph URL",
  },
  {
    slug: "lighting-study",
    kind: "visual",
    title: "Lighting study",
    kicker: "photo",
    summary: "Light as the subject. A single frame, not a generated study.",
    status: "published",
    year: "2026",
    role: "",
    tools: [],
    body: ["Waiting for the original file."],
    mediaUrl: "",
    mediaNote: "Photograph URL",
  },
  {
    slug: "stroke-field",
    kind: "visual",
    title: "Stroke field",
    kicker: "illustration",
    summary: "A constructed graphic or type demonstration.",
    status: "published",
    year: "2026",
    role: "",
    tools: [],
    body: ["Waiting for the original file."],
    mediaUrl: "",
    mediaNote: "Illustration URL",
  },
  {
    slug: "constructed-form",
    kind: "visual",
    title: "Constructed form",
    kicker: "3d",
    summary: "3D and graphics. Not locked to one tool.",
    status: "published",
    year: "2026",
    role: "",
    tools: [],
    body: ["Waiting for a real render or loop."],
    mediaUrl: "",
    mediaNote: "3D or graphic URL",
  },
];

export const PATHS = [
  { href: "/research", index: "01", title: "Research & Academia", text: "Questions, prototypes, and notes. Nothing here is presented as a published paper unless a real link says so." },
  { href: "/work", index: "02", title: "Work & Collaborations", text: "Interfaces, simulations, and visual production I can actually show. Evidence over claims." },
] as const;
