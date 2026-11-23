"use client";

import { useState } from "react";
import { AssetWait, Page } from "@/components/frame";
import { publicPieces, useAtelier } from "@/lib/atelier";

const GROUPS = [
  { id: "photo", label: "Photographs" },
  { id: "illustration", label: "Illustration" },
  { id: "3d", label: "3D / graphics" },
] as const;

export default function VisualPage() {
  const { pieces } = useAtelier();
  const items = publicPieces(pieces, "visual");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const active = items.find((item) => item.slug === activeSlug);

  return (
    <Page
      kicker="Visual"
      title="Photographs, illustration, and 3D."
      lede="Each piece is clickable. A single image opens with its description. Catalogs stay grouped: photo, illustration, and 3D / graphics."
    >
      {active ? (
        <article id={active.slug} className="mb-12 border border-line bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-[0.16em] text-accent uppercase font-mono">{active.kicker}</p>
            <button
              onClick={() => setActiveSlug(null)}
              className="text-xs text-muted hover:text-fg uppercase tracking-wider underline cursor-pointer"
            >
              Close View ✕
            </button>
          </div>
          <h2 className="font-display mt-2 text-3xl">{active.title}</h2>
          {active.mediaUrl ? (
            <img
              src={active.mediaUrl}
              alt={active.title}
              className="mt-4 max-h-[32rem] w-full object-contain border border-line"
            />
          ) : (
            <div className="mt-4">
              <AssetWait note={active.mediaNote || "Image URL not added"} />
            </div>
          )}
          <p className="mt-4 max-w-2xl text-muted text-base">{active.summary}</p>
          {active.body &&
            active.body.filter(Boolean).map((p, idx) => (
              <p key={idx} className="mt-3 max-w-2xl text-sm leading-relaxed">
                {p}
              </p>
            ))}
        </article>
      ) : null}

      <div className="space-y-12">
        {GROUPS.map((group) => {
          const groupItems = items.filter(
            (item) => item.kicker?.toLowerCase() === group.id || item.tools?.includes(group.id)
          );
          return (
            <section key={group.id} id={group.id}>
              <div className="flex items-baseline justify-between border-b border-line pb-2 mb-4">
                <h2 className="font-display text-2xl">{group.label}</h2>
                <span className="text-xs font-mono text-faint">
                  {groupItems.length} {groupItems.length === 1 ? "piece" : "pieces"}
                </span>
              </div>
              <ul className="grid gap-4 md:grid-cols-2">
                {groupItems.length === 0 ? (
                  <li className="col-span-full">
                    <AssetWait note={`${group.label} — add a piece in CMS Studio`} />
                  </li>
                ) : (
                  groupItems.map((item) => (
                    <li key={item.slug}>
                      <button
                        type="button"
                        onClick={() => setActiveSlug(item.slug)}
                        className={`w-full text-left border p-5 transition-all cursor-pointer ${
                          activeSlug === item.slug
                            ? "border-accent bg-accent/5 ring-1 ring-accent"
                            : "border-line bg-surface hover:border-accent hover:bg-bg-2"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] tracking-[0.14em] text-faint uppercase font-mono">
                          <span>{group.label}</span>
                          <span>{item.year}</span>
                        </div>
                        <h3 className="font-display mt-2 text-2xl group-hover:text-accent">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted line-clamp-2">{item.summary}</p>
                        {item.mediaUrl && (
                          <div className="mt-3 text-xs font-medium text-accent">
                            Includes visual media ✓
                          </div>
                        )}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </Page>
  );
}
