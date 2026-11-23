import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/frame";
import { PieceList } from "@/components/lists";
import { publicPieces, useAtelier } from "@/lib/atelier";

export const Route = createFileRoute("/research/")({ component: ResearchIndex });

function ResearchIndex() {
  const { pieces } = useAtelier();
  return (
    <Page
      kicker="Research & academia"
      title="Questions in progress."
      lede="Independent inquiry beside academic study at the Department of Multimedia and Creative Technology, Daffodil International University, 2022–2026. Published work is listed only when a real document exists."
    >
      <PieceList pieces={publicPieces(pieces, "research")} />
    </Page>
  );
}
