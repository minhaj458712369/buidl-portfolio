"use client";

import { Page } from "@/components/frame";
import { PieceList } from "@/components/lists";
import { publicPieces, useAtelier } from "@/lib/atelier";

export default function WorkIndexPage() {
  const { pieces } = useAtelier();
  const workPieces = publicPieces(pieces, "work");

  return (
    <Page
      kicker="Work & collaborations"
      title="What can be shown."
      lede="Interfaces, simulations, and production work. Each entry is labeled by status. Client names, metrics, and awards are omitted unless you add them."
    >
      <PieceList pieces={workPieces} />
      <section className="mt-16">
        <h2 className="font-display text-3xl">What I can build</h2>
        <div className="mt-6 grid gap-px bg-line md:grid-cols-2 border border-line">
          {[
            [
              "UX and digital products",
              "Dashboards, workflows, interface prototypes, design-system exploration.",
            ],
            [
              "Websites",
              "Personal, portfolio, and small business sites, including interactive pages.",
            ],
            [
              "Interactive experiences",
              "Unity prototypes, educational simulations, experimental real-time scenes.",
            ],
            [
              "Film and visual production",
              "Documentary editing, cinematography, motion, and visual storytelling.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="bg-bg p-6">
              <h3 className="font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
