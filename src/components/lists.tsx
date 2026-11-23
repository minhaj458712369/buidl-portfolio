import Link from "next/link";
import type { Piece } from "@/data/content";
import Image from "next/image";
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
      <div className="border border-line bg-bg-2 px-5 py-10 text-muted">
        Nothing published in this section yet.
      </div>
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

          <li key={piece.slug} className="group">
            <Link
              href={to}
              className="grid gap-4 rounded-xl p-5 no-underline transition-all duration-300 hover:bg-black/[0.04] md:grid-cols-[180px_1fr_auto] md:items-center"
            >
              <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border border-line bg-black/[0.02] md:w-[180px]">
                {piece.mediaUrl ? (
                  <Image
                    src={piece.mediaUrl}
                    alt={piece.title}
                    width={600}
                    height={450}
                    unoptimized
                    className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-xs text-faint">No image available</span>
                )}
              </div>

              <div className="flex flex-col justify-center gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
                  {piece.kicker}
                </span>

                <span className="font-display text-2xl transition-colors group-hover:text-foreground">
                  {piece.title}
                </span>

                <span className="max-w-xl text-sm leading-relaxed text-muted">
                  {piece.summary}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-faint md:justify-end">
                <span>{piece.year}</span>
                <span>·</span>
                <span className="uppercase">{piece.status}</span>
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
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
          <span className="uppercase">{piece.status}</span>
        </p>
        <p>
          <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Year</span>
          {piece.year}
        </p>
        <p>
          <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Role</span>
          {piece.role || "—"}
        </p>
        {piece.tools && piece.tools.length > 0 ? (
          <p>
            <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Tools</span>
            {piece.tools.join(" · ")}
          </p>
        ) : null}
      </aside>
      <div>
        {piece.mediaUrl ? (
          piece.mediaUrl.match(/\.(mp4|webm)(\?|$)/i) ||
            piece.mediaUrl.includes("youtube") ||
            piece.mediaUrl.includes("vimeo") ? (
            <p className="mb-8">
              <a
                className="text-accent underline"
                href={piece.mediaUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open linked media
              </a>
            </p>
          ) : (
            <img
              src={piece.mediaUrl}
              alt={piece.title}
              className="mb-8 max-h-[70vh] w-full border border-line object-contain"
            />
          )
        ) : (
          <p className="mb-8 border border-dashed border-line px-4 py-8 text-sm text-faint">
            {piece.mediaNote || "No media URL yet."}
          </p>
        )}
        <div className="max-w-2xl space-y-5 text-base leading-relaxed">
          {piece.body.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
