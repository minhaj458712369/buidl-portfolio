import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/frame";
import { PieceList } from "@/components/lists";
import { publicPieces, useAtelier } from "@/lib/atelier";

export const Route = createFileRoute("/journal/")({ component: JournalIndex });

function JournalIndex() {
  const { pieces } = useAtelier();
  return (
    <Page
      kicker="Journal"
      title="Notes, not a feed."
      lede="Observations on design, simulation, photography, and process. Long pieces stay readable. New writing is added in Studio."
    >
      <PieceList pieces={publicPieces(pieces, "journal")} />
    </Page>
  );
}
