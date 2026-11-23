import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { AssetWait, Page } from "@/components/frame";
import { publicPieces, useAtelier } from "@/lib/atelier";

export const Route = createFileRoute("/visual")({ component: VisualPage });

const GROUPS = [
  { id: "photo", label: "Photographs" },
  { id: "illustration", label: "Illustration" },
  { id: "3d", label: "3D / graphics" },
] as const;

function VisualPage() {
  const { pieces } = useAtelier();
  const items = publicPieces(pieces, "visual");
  const hash = useRouterState({ select: (s) => s.location.hash });
  const open = hash.replace(/^#/, "");
  const active = items.find((item) => item.slug === open);

  return (
    <Page
      kicker="Visual"
      title="Photographs, illustration, and 3D."
      lede="Each piece is clickable. A single image opens with its description. Catalogs stay grouped: photo, illustration, and 3D / graphics."
    >
      {active ? (
        <article id={active.slug} className="mb-12 border border-line p-5">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">{active.kicker}</p>
          <h2 className="font-display mt-2 text-3xl">{active.title}</h2>
          {active.mediaUrl ? (
            <img src={active.mediaUrl} alt="" className="mt-4 max-h-[28rem] w-full object-cover" />
          ) : (
            <div className="mt-4">
              <AssetWait note={active.mediaNote || "Image URL not added"} />
            </div>
          )}
          <p className="mt-4 max-w-2xl text-muted">{active.summary}</p>
          {active.body.filter(Boolean).map((p) => (
            <p key={p} className="mt-3 max-w-2xl">
              {p}
            </p>
          ))}
        </article>
      ) : null}

      <div className="space-y-12">
        {GROUPS.map((group) => {
          const groupItems = items.filter((item) => item.kicker === group.id);
          return (
            <section key={group.id} id={group.id}>
              <h2 className="font-display text-2xl">{group.label}</h2>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {groupItems.length === 0 ? (
                  <li>
                    <AssetWait note={`${group.label} — add a piece in Studio`} />
                  </li>
                ) : (
                  groupItems.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to="/visual"
                        hash={item.slug}
                        className="block border border-line p-4 no-underline hover:border-accent"
                      >
                        <p className="text-[11px] tracking-[0.14em] text-faint uppercase">{group.label}</p>
                        <h3 className="font-display mt-2 text-2xl">{item.title}</h3>
                        <p className="mt-2 text-sm text-muted">{item.summary}</p>
                      </Link>
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
