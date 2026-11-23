"use client";

import { useState } from "react";
import { Page } from "@/components/frame";
import { useAtelier } from "@/lib/atelier";

export default function ContactPage() {
  const { profile } = useAtelier();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState({ name: "", about: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      if (!res.ok) throw new Error("Failed to send message");

      // Also persist to localStorage as backup
      try {
        const prev = JSON.parse(localStorage.getItem("minhazul-inquiries") || "[]");
        prev.unshift({ ...note, at: new Date().toISOString() });
        localStorage.setItem("minhazul-inquiries", JSON.stringify(prev));
      } catch {
        // ignore
      }

      setSent(true);
      setNote({ name: "", about: "", message: "" });
    } catch (err: any) {
      setError(err?.message || "An error occurred while submitting.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page
      kicker="Contact"
      title="Collaboration."
      lede="Send an inquiry for projects, research discussions, or visual production. Inquiries are stored in the system and viewable in CMS Studio."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm">
            <span className="font-medium text-fg">Your Name</span>
            <input
              required
              value={note.name}
              onChange={(e) => setNote({ ...note, name: e.target.value })}
              className="mt-1 w-full border border-line bg-bg-2 px-3 py-3 text-fg outline-none focus:border-accent"
              placeholder="e.g. Jane Doe"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-fg">Project / Topic</span>
            <input
              required
              value={note.about}
              onChange={(e) => setNote({ ...note, about: e.target.value })}
              className="mt-1 w-full border border-line bg-bg-2 px-3 py-3 text-fg outline-none focus:border-accent"
              placeholder="e.g. Interface design collaboration"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-fg">Message</span>
            <textarea
              required
              rows={5}
              value={note.message}
              onChange={(e) => setNote({ ...note, message: e.target.value })}
              className="mt-1 w-full border border-line bg-bg-2 px-3 py-3 text-fg outline-none focus:border-accent"
              placeholder="Tell me about what you are building..."
            />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="bg-accent px-5 py-3 text-sm font-semibold tracking-wider text-accent-ink uppercase hover:bg-hot transition-colors disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Submit Inquiry"}
          </button>
          {sent ? (
            <div className="border border-green-800/20 bg-green-500/10 p-3 text-sm text-green-900 font-medium">
              Thank you! Your inquiry has been saved and recorded in the CMS.
            </div>
          ) : null}
          {error ? (
            <div className="border border-red-800/20 bg-red-500/10 p-3 text-sm text-red-900 font-medium">
              {error}
            </div>
          ) : null}
        </form>

        <aside className="space-y-6 text-sm text-muted">
          <div>
            <span className="block text-[11px] tracking-[0.16em] text-faint uppercase font-mono">
              Direct Email
            </span>
            {profile.email ? (
              <a
                className="mt-1 block text-fg font-medium underline hover:text-accent"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
            ) : (
              <p className="mt-1 text-muted">No public email configured yet.</p>
            )}
          </div>

          <div>
            <span className="block text-[11px] tracking-[0.16em] text-faint uppercase font-mono">
              Location
            </span>
            <p className="mt-1 font-medium text-fg">{profile.location}</p>
          </div>

          {profile.socials && profile.socials.length > 0 ? (
            <div>
              <span className="block text-[11px] tracking-[0.16em] text-faint uppercase font-mono">
                Profiles
              </span>
              <ul className="mt-1 space-y-1">
                {profile.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      className="text-fg underline hover:text-accent"
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {profile.cvUrl ? (
            <div>
              <span className="block text-[11px] tracking-[0.16em] text-faint uppercase font-mono">
                Curriculum Vitae
              </span>
              <a
                className="mt-1 inline-block text-accent underline hover:text-hot"
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
              >
                Download / View CV
              </a>
            </div>
          ) : null}
        </aside>
      </div>
    </Page>
  );
}
