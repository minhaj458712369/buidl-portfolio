"use client";

import Link from "next/link";
import { Frame } from "@/components/frame";
import { PATHS } from "@/data/content";
import { publicPieces, useAtelier } from "@/lib/atelier";

export default function Home() {
  const { pieces, profile } = useAtelier();
  const work = publicPieces(pieces, "work").slice(0, 3);
  const notes = publicPieces(pieces, "journal").slice(0, 2);

  return (
    <Frame>
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-[1.15fr_0.85fr] md:py-16">
          <div>
            <p className="text-xs tracking-[0.2em] text-accent uppercase font-medium">
              Portfolio · Research · Visual work
            </p>
            <h1 className="font-display mt-4 text-5xl leading-[0.95] md:text-7xl">
              Designing <span className="text-accent">experiences.</span>
              <span className="mt-2 block font-sans text-2xl font-normal tracking-normal text-muted normal-case italic md:text-3xl">
                Exploring systems.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-muted leading-relaxed">{profile.line}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="bg-fg px-4 py-2.5 text-xs tracking-wider text-bg uppercase font-medium hover:bg-hot transition-colors"
              >
                Explore Work
              </Link>
              <Link
                href="/contact"
                className="border border-line bg-surface/50 px-4 py-2.5 text-xs tracking-wider text-fg uppercase font-medium hover:bg-fg hover:text-bg transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="https://i.ibb.co/Z1kxz4DD/image.png"
              alt="Minhazul Arefin signature"
              className="h-36 w-full object-contain object-center md:h-52 filter contrast-125 mix-blend-multiply"
            />
          </div>
        </section>

        <section className="border-y border-line">
          <div className="mx-auto grid max-w-6xl md:grid-cols-2">
            {PATHS.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group border-line px-5 py-10 no-underline transition-colors hover:bg-black/5 md:odd:border-r"
              >
                <p className="text-xs font-mono text-faint">{path.index}</p>
                <h2 className="font-display mt-3 text-4xl group-hover:text-accent transition-colors">
                  {path.title}
                </h2>
                <p className="mt-3 max-w-sm text-sm text-muted">{path.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.16em] text-faint uppercase font-medium">Selected</p>
              <h2 className="font-display mt-1 text-3xl">Work & Projects</h2>
            </div>
            <Link
              href="/work"
              className="text-sm font-medium text-muted no-underline hover:text-fg hover:underline"
            >
              All work ({publicPieces(pieces, "work").length}) →
            </Link>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {work.map((piece) => (
              <li key={piece.slug}>
                <Link
                  href={`/work/${piece.slug}`}
                  className="grid gap-2 py-6 no-underline transition-colors hover:bg-black/5 md:grid-cols-[1fr_auto] md:items-baseline"
                >
                  <span>
                    <span className="font-display text-2xl group-hover:text-accent">
                      {piece.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{piece.summary}</span>
                  </span>
                  <span className="text-xs font-mono text-faint uppercase">{piece.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-line bg-bg-2">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
            <Link
              href="/visual"
              className="group block no-underline transition-opacity hover:opacity-90"
            >
              <p className="text-xs tracking-[0.16em] text-faint uppercase font-medium">Photography & 3D</p>
              <h2 className="font-display mt-2 text-3xl group-hover:text-accent transition-colors">
                Visual archive
              </h2>
              <p className="mt-2 text-sm text-muted">
                Observational stills, illustrations, and 3D forms. Authentic captures only.
              </p>
              <span className="mt-4 inline-block text-xs uppercase tracking-wider font-semibold text-accent">
                Browse Archive →
              </span>
            </Link>
            <div>
              <p className="text-xs tracking-[0.16em] text-faint uppercase font-medium">Articles & Notes</p>
              <ul className="mt-3 space-y-3">
                {notes.map((note) => (
                  <li key={note.slug}>
                    <Link
                      href={`/journal/${note.slug}`}
                      className="font-display text-xl no-underline hover:text-accent transition-colors block"
                    >
                      {note.title}
                    </Link>
                    <p className="text-xs text-muted mt-0.5 line-clamp-1">{note.summary}</p>
                  </li>
                ))}
              </ul>
              <Link
                href="/journal"
                className="mt-4 inline-block text-xs uppercase tracking-wider font-semibold text-accent"
              >
                Read all articles →
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1.4fr_0.8fr]">
          <div>
            <h2 className="font-display text-4xl">About the practice</h2>
            <div className="mt-6 space-y-4 text-muted leading-relaxed max-w-xl">
              <p>
                Based in {profile.location}. Multimedia and Creative Technology at Daffodil International
                University, 2022–2026.
              </p>
              <p>
                The work sits between interface architecture, interactive simulations, and visual storytelling.
                Every piece is grounded in how real stakeholders navigate digital and physical systems.
              </p>
            </div>
            <div className="mt-6 flex gap-4 text-sm">
              <Link href="/about" className="font-medium text-fg underline">
                Read full bio
              </Link>
              <Link href="/contact" className="font-medium text-accent underline">
                Get in touch
              </Link>
            </div>
          </div>
          <div className="border border-line bg-surface p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-faint font-mono">Direct Communication</p>
              <h3 className="font-display text-2xl mt-2">Start a conversation</h3>
              <p className="text-sm text-muted mt-2">
                Available for UX systems, interactive simulations, and visual direction.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className="block text-center bg-accent text-accent-ink py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-hot transition-colors"
              >
                Contact Now
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Frame>
  );
}
