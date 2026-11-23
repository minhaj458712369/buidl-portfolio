import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/frame";
import { PieceBody } from "@/components/lists";
import { useAtelier } from "@/lib/atelier";

export const Route = createFileRoute("/journal/$slug")({ component: JournalPiece });

function JournalPiece() {
  const { slug } = Route.useParams();
  const { pieces } = useAtelier();
  const piece = pieces.find((p) => p.kind === "journal" && p.slug === slug);
  if (!piece) {
    return (
      <Page kicker="Journal" title="Not found">
        <Link to="/journal">Back</Link>
      </Page>
    );
  }
  return (
    <Page kicker={piece.kicker} title={piece.title} lede={piece.summary}>
      <PieceBody piece={piece} />
    </Page>
  );
}
