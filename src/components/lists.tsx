import { Link } from "@tanstack/react-router";
import type { Piece } from "@/data/content";

const HREF: Record<Piece["kind"], string> = {
  work: "/work",
  journal: "/journal",
  research: "/research",
  visual: "/visual",
  cinema: "/cinema",
};

export function PieceList({ pieces }: { pieces: Piece[] }) {
  if (pieces.length === 0) {
    return (
      <p className="border border-line bg-bg-2 px-5 py-10 text-muted">
        Nothing published in this section yet.
      </p>
    );
  }
  return (
    <ul className="divide-y divide-line border-y border-line">
      {pieces.map((piece) => {
        const to =
          piece.kind === "visual" || piece.kind === "cinema"
            ? HREF[piece.kind]
            : `${HREF[piece.kind]}/${piece.slug}`;
        return (
          <li key={piece.slug}>
            <Link to={to} className="grid gap-2 py-6 no-underline md:grid-cols-[8rem_1fr_auto] md:items-baseline">
              <span className="text-xs tracking-wide text-faint uppercase">{piece.kicker}</span>
              <span>
                <span className="font-display block text-2xl">{piece.title}</span>
                <span className="mt-1 block max-w-xl text-sm text-muted">{piece.summary}</span>
              </span>
              <span className="text-xs text-faint">
                {piece.year} · {piece.status}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function PieceBody({ piece }: { piece: Piece }) {
  return (
    <article className="grid gap-10 md:grid-cols-[16rem_1fr]">
      <aside className="space-y-4 text-sm text-muted">
        <p>
          <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Status</span>
          {piece.status}
        </p>
        <p>
          <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Year</span>
          {piece.year}
        </p>
        <p>
          <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Role</span>
          {piece.role || "—"}
        </p>
        {piece.tools.length > 0 ? (
          <p>
            <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Tools</span>
            {piece.tools.join(" · ")}
          </p>
        ) : null}
      </aside>
      <div>
        {piece.mediaUrl ? (
          piece.mediaUrl.match(/\.(mp4|webm)(\?|$)/i) || piece.mediaUrl.includes("youtube") || piece.mediaUrl.includes("vimeo") ? (
            <p className="mb-8">
              <a className="text-accent underline" href={piece.mediaUrl} target="_blank" rel="noreferrer">
                Open linked media
              </a>
            </p>
          ) : (
            <img
              src={piece.mediaUrl}
              alt=""
              className="mb-8 max-h-[70vh] w-full border border-line object-contain"
            />
          )
        ) : (
          <p className="mb-8 border border-dashed border-line px-4 py-8 text-sm text-faint">
            {piece.mediaNote || "No media URL yet."}
          </p>
        )}
        <div className="max-w-2xl space-y-5 text-base leading-relaxed">
          {piece.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
