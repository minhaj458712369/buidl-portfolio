"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const NAV = [
  { href: "/research", label: "Research" },
  { href: "/work", label: "Work" },
  { href: "/visual", label: "Visual" },
  { href: "/cinema", label: "Cinema" },
  { href: "/journal", label: "Articles" },
  { href: "/about", label: "About" },
] as const;

export function Frame({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-accent selection:text-accent-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link
            href="/"
            className="font-display text-sm leading-none no-underline transition-colors hover:text-accent md:text-base"
          >
            Minhazul Arefin
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            {NAV.map((item) => {
              const isActive =
                pathname === item.href || (pathname?.startsWith(item.href) ?? false);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`no-underline transition-colors ${
                    isActive ? "font-semibold text-fg" : "hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="bg-fg px-3 py-2 text-xs tracking-widest text-bg uppercase no-underline transition-colors hover:bg-hot hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
        <nav className="flex gap-4 overflow-x-auto border-t border-line px-5 py-2 text-xs text-muted md:hidden">
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 no-underline transition-colors ${
                  isActive ? "text-fg font-medium" : "hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      {children}
      <footer className="border-t border-line bg-bg">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>Minhazul Arefin — Independent practice across systems, simulation & visual storytelling.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-muted no-underline hover:text-fg">
              About
            </Link>
            <span>·</span>
            <Link href="/contact" className="text-muted no-underline hover:text-fg">
              Inquiries
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Page({
  kicker,
  title,
  lede,
  tone = "default",
  children,
}: {
  kicker: string;
  title: string;
  lede?: string;
  tone?: "default" | "research" | "work";
  children: ReactNode;
}) {
  const toneClass =
    tone === "work"
      ? "bg-fg text-bg"
      : tone === "research"
        ? "bg-[repeating-linear-gradient(-18deg,transparent,transparent_14px,color-mix(in_srgb,var(--color-line)_8%,transparent)_14px,color-mix(in_srgb,var(--color-line)_8%,transparent)_15px)]"
        : "";

  return (
    <Frame>
      <main>
        <header className={`border-b border-line px-5 py-14 md:py-20 ${toneClass}`}>
          <div className="mx-auto max-w-6xl">
            <p
              className={`text-xs tracking-[0.18em] uppercase ${
                tone === "work" ? "text-faint" : "text-muted"
              }`}
            >
              {kicker}
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl leading-[0.95] md:text-6xl">
              {title}
            </h1>
            {lede ? (
              <p className={`mt-5 max-w-2xl text-base ${tone === "work" ? "text-bg-2" : "text-muted"}`}>
                {lede}
              </p>
            ) : null}
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-5 py-12">{children}</div>
      </main>
    </Frame>
  );
}

export function AssetWait({ note }: { note: string }) {
  return (
    <div className="flex min-h-48 flex-col justify-between border border-dashed border-line bg-bg-2 p-5">
      <p className="text-[11px] tracking-[0.16em] text-faint uppercase">Awaiting asset</p>
      <p className="font-display text-2xl text-muted">{note || "No file or URL yet"}</p>
      <p className="text-xs text-faint">
        Photographs, film, and 3D are not substituted with generated graphics.
      </p>
    </div>
  );
}
