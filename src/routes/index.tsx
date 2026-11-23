import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame } from "@/components/frame";
import { PATHS } from "@/data/content";
import { publicPieces, useAtelier } from "@/lib/atelier";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { pieces, profile } = useAtelier();
  const work = publicPieces(pieces, "work").slice(0, 3);
  const notes = publicPieces(pieces, "journal").slice(0, 2);

  return (
    <Frame>
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-[1.15fr_0.85fr] md:py-16">
          <div>
            <p className="text-xs tracking-[0.2em] text-accent uppercase">Portfolio · Research · Visual work</p>
            <h1 className="font-display mt-4 text-5xl leading-[0.95] md:text-7xl">
              Designing <span className="text-accent">experiences.</span>
              <span className="mt-2 block font-sans text-2xl font-normal tracking-normal text-muted normal-case italic md:text-3xl">
                Exploring systems.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-muted">{profile.line}</p>
          </div>
          <img
            src="https://i.ibb.co/Z1kxz4DD/image.png"
            alt="Minhazul Arefin signature"
            className="h-36 w-full object-contain object-center md:h-52"
          />
        </section>

        <section className="border-y border-line">
          <div className="mx-auto grid max-w-6xl md:grid-cols-2">
            {PATHS.map((path) => (
              <Link
                key={path.href}
                to={path.href}
                className="group border-line px-5 py-10 no-underline md:odd:border-r"
              >
                <p className="text-xs text-faint">{path.index}</p>
                <h2 className="font-display mt-3 text-4xl group-hover:text-accent">{path.title}</h2>
                <p className="mt-3 max-w-sm text-sm text-muted">{path.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-3xl">Selected work</h2>
            <Link to="/work" className="text-sm text-muted no-underline hover:text-fg">
              All work
            </Link>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {work.map((piece) => (
              <li key={piece.slug}>
                <Link
                  to="/work/$slug"
                  params={{ slug: piece.slug }}
                  className="grid gap-2 py-6 no-underline md:grid-cols-[1fr_auto] md:items-baseline"
                >
                  <span>
                    <span className="font-display text-2xl">{piece.title}</span>
                    <span className="mt-1 block text-sm text-muted">{piece.summary}</span>
                  </span>
                  <span className="text-xs text-faint uppercase">{piece.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-line bg-bg-2">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
            <Link to="/visual" className="no-underline">
              <p className="text-xs tracking-[0.16em] text-faint uppercase">Photography</p>
              <h2 className="font-display mt-2 text-3xl">Visual archive</h2>
              <p className="mt-2 text-sm text-muted">Empty until stills are linked. No stock stand-ins.</p>
            </Link>
            <div>
              <p className="text-xs tracking-[0.16em] text-faint uppercase">Articles</p>
              <ul className="mt-3 space-y-3">
                {notes.map((note) => (
                  <li key={note.slug}>
                    <Link to="/journal/$slug" params={{ slug: note.slug }} className="font-display text-xl no-underline hover:text-accent">
                      {note.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1.4fr_0.8fr]">
          <div>
            <h2 className="font-display text-4xl">About the practice</h2>
            <p className="mt-4 max-w-xl text-muted">
              Interdisciplinary work in UX, interactive simulation, photography, and film. Positioned as an emerging practice — not a senior studio, and not a list of unearned specialties.
            </p>
            <Link to="/about" className="mt-6 inline-block text-sm text-accent no-underline">
              Read the short biography
            </Link>
          </div>
          <div className="border border-line p-6">
            <p className="text-xs tracking-[0.16em] text-faint uppercase">Contact</p>
            <p className="font-display mt-3 text-3xl">Start a conversation.</p>
            <Link to="/contact" className="mt-6 inline-block bg-accent px-4 py-3 text-sm text-accent-ink no-underline">
              Collaboration
            </Link>
          </div>
        </section>
      </main>
    </Frame>
  );
}
