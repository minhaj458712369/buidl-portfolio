"use client";

import { use } from "react";
import Link from "next/link";
import { Page } from "@/components/frame";
import { PieceBody } from "@/components/lists";
import { useAtelier } from "@/lib/atelier";

export default function JournalPiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { pieces } = useAtelier();
  const piece = pieces.find((p) => p.kind === "journal" && p.slug === slug);

  if (!piece) {
    return (
      <Page kicker="Journal" title="Article Not Found">
        <div className="space-y-4">
          <p className="text-muted">The requested article could not be found.</p>
          <Link href="/journal" className="inline-block text-accent underline font-medium">
            ← Back to journal
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page kicker={piece.kicker} title={piece.title} lede={piece.summary}>
      <div className="mb-6">
        <Link href="/journal" className="text-xs uppercase tracking-wider text-muted hover:text-fg font-mono">
          ← Back to Articles
        </Link>
      </div>
      <PieceBody piece={piece} />
    </Page>
  );
}
