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
  img: string;
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

export type Inquiry = {
  id: string;
  name: string;
  about: string;
  message: string;
  at: string;
  read?: boolean;
};

export type SiteContent = {
  profile: Profile;
  pieces: Piece[];
  inquiries: Inquiry[];
};

export const PATHS = [
  {
    href: "/research",
    index: "01",
    title: "Research & Academia",
    text: "Questions, prototypes, and notes. Nothing here is presented as a published paper unless a real link says so.",
  },
  {
    href: "/work",
    index: "02",
    title: "Work & Collaborations",
    text: "Interfaces, simulations, and visual production I can actually show. Evidence over claims.",
  },
] as const;
