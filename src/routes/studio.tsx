import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/frame";
import type { Piece, Status } from "@/data/content";
import { useAtelier } from "@/lib/atelier";

export const Route = createFileRoute("/studio")({ component: StudioPage });

const STATUSES: Status[] = ["draft", "experimental", "ongoing", "published"];

function StudioPage() {
  const { pieces, profile, savePiece, saveProfile, reset } = useAtelier();
  const [slug, setSlug] = useState(pieces[0]?.slug ?? "");
  const current = pieces.find((p) => p.slug === slug) ?? pieces[0];
  const [draft, setDraft] = useState<Piece | null>(null);
  const editing = draft && draft.slug === current?.slug ? draft : current;

  return (
    <Page
      kicker="Studio"
      title="Local drafts."
      lede="Edits live in this browser only. They are not a private server login, and they do not upload files. Paste a real image, video, or document URL when you have one."
    >
      <div className="mb-8 grid gap-3 border border-line p-4 md:grid-cols-2">
        <label className="text-sm">
          Email
          <input
            value={profile.email}
            onChange={(e) => saveProfile({ ...profile, email: e.target.value })}
            className="mt-1 w-full border border-line bg-bg px-3 py-2"
            placeholder="you@domain"
          />
        </label>
        <label className="text-sm">
          CV URL
          <input
            value={profile.cvUrl}
            onChange={(e) => saveProfile({ ...profile, cvUrl: e.target.value })}
            className="mt-1 w-full border border-line bg-bg px-3 py-2"
            placeholder="https://"
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
        <ul className="space-y-1 text-sm">
          {pieces.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => {
                  setSlug(p.slug);
                  setDraft(null);
                }}
                className={`w-full px-2 py-2 text-left ${p.slug === editing?.slug ? "bg-surface text-fg" : "text-muted"}`}
              >
                {p.title}
                <span className="block text-[11px] text-faint">{p.kind} · {p.status}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="mt-3 w-full border border-line px-2 py-2 text-left text-accent"
              onClick={() => {
                const fresh: Piece = {
                  slug: `note-${Date.now()}`,
                  kind: "journal",
                  title: "Untitled",
                  kicker: "Note",
                  summary: "",
                  status: "draft",
                  year: "2026",
                  role: "",
                  tools: [],
                  body: [""],
                  mediaUrl: "",
                  mediaNote: "",
                };
                savePiece(fresh);
                setSlug(fresh.slug);
                setDraft(fresh);
              }}
            >
              New journal draft
            </button>
          </li>
        </ul>

        {editing ? (
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              savePiece(editing);
              setDraft(null);
            }}
          >
            <Field label="Title" value={editing.title} onChange={(title) => setDraft({ ...editing, title })} />
            <Field label="Slug" value={editing.slug} onChange={(next) => setDraft({ ...editing, slug: next })} />
            <Field label="Summary" value={editing.summary} onChange={(summary) => setDraft({ ...editing, summary })} />
            <label className="block text-sm">
              Status
              <select
                value={editing.status}
                onChange={(e) => setDraft({ ...editing, status: e.target.value as Status })}
                className="mt-1 w-full border border-line bg-bg px-3 py-2"
              >
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Kind
              <select
                value={editing.kind}
                onChange={(e) => setDraft({ ...editing, kind: e.target.value as Piece["kind"] })}
                className="mt-1 w-full border border-line bg-bg px-3 py-2"
              >
                {(["work", "journal", "research", "visual", "cinema"] as const).map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </label>
            <Field
              label="Media URL"
              value={editing.mediaUrl}
              onChange={(mediaUrl) => setDraft({ ...editing, mediaUrl })}
            />
            <label className="block text-sm">
              Body
              <textarea
                rows={8}
                value={editing.body.join("\n\n")}
                onChange={(e) =>
                  setDraft({
                    ...editing,
                    body: e.target.value.split(/\n\n+/),
                  })
                }
                className="mt-1 w-full border border-line bg-bg px-3 py-2"
              />
            </label>
            <div className="flex gap-3">
              <button type="submit" className="bg-accent px-4 py-3 text-sm text-accent-ink">
                Save in this browser
              </button>
              <button type="button" onClick={reset} className="border border-line px-4 py-3 text-sm">
                Reset all local edits
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </Page>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-line bg-bg px-3 py-2"
      />
    </label>
  );
}
