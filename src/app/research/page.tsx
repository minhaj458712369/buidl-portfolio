"use client";

import { Page } from "@/components/frame";
import { PieceList } from "@/components/lists";
import { publicPieces, useAtelier } from "@/lib/atelier";

export default function ResearchIndexPage() {
  const { pieces } = useAtelier();
  const researchPieces = publicPieces(pieces, "research");

  return (
    <Page
      kicker="Research & academia"
      title="Questions in progress."
      lede="Independent inquiry beside academic study at the Department of Multimedia and Creative Technology, Daffodil International University, 2022–2026. Published work is listed only when a real document exists."
      tone="research"
    >
      <PieceList pieces={researchPieces} />
    </Page>
  );
}
