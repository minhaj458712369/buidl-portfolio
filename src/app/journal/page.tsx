"use client";

import { Page } from "@/components/frame";
import { PieceList } from "@/components/lists";
import { publicPieces, useAtelier } from "@/lib/atelier";

export default function JournalIndexPage() {
  const { pieces } = useAtelier();
  const journalPieces = publicPieces(pieces, "journal");

  return (
    <Page
      kicker="Journal"
      title="Notes, not a feed."
      lede="Observations on design, simulation, photography, and process. Long pieces stay readable. New writing can be authored in CMS Studio."
    >
      <PieceList pieces={journalPieces} />
    </Page>
  );
}
