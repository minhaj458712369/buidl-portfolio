"use client";

import Link from "next/link";
import { Page } from "@/components/frame";
import { useAtelier } from "@/lib/atelier";

export default function AboutPage() {
  const { profile } = useAtelier();

  return (
    <Page kicker="About" title={profile.name} lede={profile.line}>
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,18rem)_1fr]">
        <img
          src="https://cdn.phototourl.com/anon/2026-11-22-bbbf1fb0-6a16-43d5-9443-6aee322e38a6.png"
          alt="Portrait of Minhazul Arefin"
          className="w-full max-w-xs object-cover object-top   md:max-w-none"
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_14rem]">
          <div className="max-w-2xl space-y-5 text-muted leading-relaxed">
            <p>
              Based in {profile.location}. Studying Multimedia and Creative Technology at Daffodil
              International University, 2022–2026.
            </p>
            <p>
              The work sits between interface design, interactive simulation, photography, and film. Projects
              start from the people using a system and the experience that system has to make legible.
            </p>
            <p>
              Tools in active use include design and prototyping software, Unity, Blender, and editorial video
              tools. Depth varies by project. The site does not flatten that into a senior-engineer or
              award-filmmaker biography.
            </p>
            <p className="pt-2">
              <Link href="/work" className="text-fg font-medium underline hover:text-accent">
                Work
              </Link>
              {" · "}
              <Link href="/research" className="text-fg font-medium underline hover:text-accent">
                Research
              </Link>
              {" · "}
              <Link href="/contact" className="text-fg font-medium underline hover:text-accent">
                Contact
              </Link>
            </p>
          </div>
          <aside className="space-y-4 border border-line bg-surface p-5 text-sm">
            <div>
              <span className="block text-[11px] tracking-[0.16em] text-faint uppercase font-mono">
                Location
              </span>
              <p className="mt-1 font-medium">{profile.location}</p>
            </div>
            <div>
              <span className="block text-[11px] tracking-[0.16em] text-faint uppercase font-mono">
                CV
              </span>
              {profile.cvUrl ? (
                <a
                  className="mt-1 inline-block text-accent underline hover:text-hot"
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open CV
                </a>
              ) : (
                <span className="mt-1 block text-muted">Link not added</span>
              )}
            </div>
            <div>
              <span className="block text-[11px] tracking-[0.16em] text-faint uppercase font-mono">
                Email
              </span>
              {profile.email ? (
                <a
                  className="mt-1 block text-fg underline break-all hover:text-accent"
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </a>
              ) : (
                <span className="mt-1 block text-muted">Not added</span>
              )}
            </div>
            {profile.socials && profile.socials.length > 0 && (
              <div>
                <span className="block text-[11px] tracking-[0.16em] text-faint uppercase font-mono">
                  Socials
                </span>
                <div className="mt-1 flex flex-col gap-1">
                  {profile.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted hover:text-fg underline text-xs"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </Page>
  );
}
