"use client";

import { use } from "react";
import Link from "next/link";
import { Page } from "@/components/frame";
import { PieceBody } from "@/components/lists";
import { useAtelier } from "@/lib/atelier";

export default function ResearchPiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { pieces } = useAtelier();
  const piece = pieces.find((p) => p.kind === "research" && p.slug === slug);

  if (!piece) {
    return (
      <Page kicker="Research" title="Inquiry Not Found">
        <div className="space-y-4">
          <p className="text-muted">The requested research piece could not be found.</p>
          <Link href="/research" className="inline-block text-accent underline font-medium">
            ← Back to research
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page kicker={piece.kicker} title={piece.title} lede={piece.summary} tone="research">
      <div className="mb-6">
        <Link href="/research" className="text-xs uppercase tracking-wider text-muted hover:text-fg font-mono">
          ← Back to Research
        </Link>
      </div>
      <PieceBody piece={piece} />
    </Page>
  );
}
