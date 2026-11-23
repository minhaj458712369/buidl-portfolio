import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/frame";
import { useAtelier } from "@/lib/atelier";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const { profile } = useAtelier();
  const [sent, setSent] = useState(false);
  const [note, setNote] = useState({ name: "", about: "", message: "" });

  return (
    <Page
      kicker="Contact"
      title="Collaboration."
      lede="A note stays on this device for now. It is not emailed until an address is connected. Use the email below if one is listed."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const prev = JSON.parse(localStorage.getItem("minhazul-inquiries") || "[]");
            prev.push({ ...note, at: new Date().toISOString() });
            localStorage.setItem("minhazul-inquiries", JSON.stringify(prev));
            setSent(true);
          }}
        >
          <label className="block text-sm">
            Name
            <input
              required
              value={note.name}
              onChange={(e) => setNote({ ...note, name: e.target.value })}
              className="mt-1 w-full border border-line bg-bg-2 px-3 py-3 text-fg outline-none focus:border-accent"
            />
          </label>
          <label className="block text-sm">
            About
            <input
              required
              value={note.about}
              onChange={(e) => setNote({ ...note, about: e.target.value })}
              className="mt-1 w-full border border-line bg-bg-2 px-3 py-3 text-fg outline-none focus:border-accent"
            />
          </label>
          <label className="block text-sm">
            Message
            <textarea
              required
              rows={5}
              value={note.message}
              onChange={(e) => setNote({ ...note, message: e.target.value })}
              className="mt-1 w-full border border-line bg-bg-2 px-3 py-3 text-fg outline-none focus:border-accent"
            />
          </label>
          <button type="submit" className="bg-accent px-4 py-3 text-sm text-accent-ink">
            Save inquiry locally
          </button>
          {sent ? <p className="text-sm text-muted">Saved in this browser. It has not been sent.</p> : null}
        </form>
        <aside className="space-y-4 text-sm text-muted">
          <p>
            <span className="block text-[11px] tracking-[0.16em] text-faint uppercase">Email</span>
            {profile.email ? (
              <a className="text-fg underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            ) : (
              "Add an email in Studio."
            )}
          </p>
          {profile.socials.map((s) => (
            <p key={s.href}>
              <a className="text-fg underline" href={s.href}>
                {s.label}
              </a>
            </p>
          ))}
          {profile.cvUrl ? (
            <p>
              <a className="text-accent underline" href={profile.cvUrl}>
                CV
              </a>
            </p>
          ) : null}
        </aside>
      </div>
    </Page>
  );
}
