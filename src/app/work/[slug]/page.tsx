"use client";

import { use } from "react";
import Link from "next/link";
import { Page } from "@/components/frame";
import { PieceBody } from "@/components/lists";
import { useAtelier } from "@/lib/atelier";

export default function WorkPiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { pieces } = useAtelier();
  const piece = pieces.find((p) => p.kind === "work" && p.slug === slug);

  if (!piece) {
    return (
      <Page kicker="Work" title="Piece Not Found">
        <div className="space-y-4">
          <p className="text-muted">The requested work piece could not be found.</p>
          <Link href="/work" className="inline-block text-accent underline font-medium">
            ← Back to all work
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page kicker={piece.kicker} title={piece.title} lede={piece.summary} tone="work">
      <div className="mb-6">
        <Link href="/work" className="text-xs uppercase tracking-wider text-muted hover:text-fg font-mono">
          ← Back to Work
        </Link>
      </div>
      <PieceBody piece={piece} />
    </Page>
  );
}
