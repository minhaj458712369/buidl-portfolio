"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAtelier } from "@/lib/atelier";
import type { Kind, Piece, Profile, Status, SiteContent } from "@/data/content";

const KINDS: { id: Kind; label: string; color: string }[] = [
  { id: "work", label: "Work", color: "bg-blue-900/10 text-blue-900 border-blue-900/30" },
  { id: "journal", label: "Journal", color: "bg-amber-900/10 text-amber-900 border-amber-900/30" },
  { id: "research", label: "Research", color: "bg-purple-900/10 text-purple-900 border-purple-900/30" },
  { id: "visual", label: "Visual", color: "bg-emerald-900/10 text-emerald-900 border-emerald-900/30" },
  { id: "cinema", label: "Cinema", color: "bg-orange-900/10 text-orange-900 border-orange-900/30" },
];

const STATUSES: { id: Status; label: string; badge: string }[] = [
  { id: "published", label: "Published", badge: "bg-emerald-600 text-white" },
  { id: "draft", label: "Draft", badge: "bg-neutral-500 text-white" },
  { id: "ongoing", label: "Ongoing", badge: "bg-sky-700 text-white" },
  { id: "experimental", label: "Experimental", badge: "bg-indigo-700 text-white" },
];

type Tab = "pieces" | "profile" | "inquiries" | "backup";

export default function ProtectedCMSPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);

  const {
    pieces,
    profile,
    inquiries,
    savePiece,
    createPiece,
    deletePiece,
    saveProfile,
    deleteInquiry,
    markInquiryRead,
    reset,
    importData,
    loading,
  } = useAtelier();

  const [activeTab, setActiveTab] = useState<Tab>("pieces");
  const [kindFilter, setKindFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check auth session on load
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth");
        const json = await res.json();
        if (!json.authenticated) {
          router.replace("/admin/login");
          return;
        }
      } catch {
        router.replace("/admin/login");
        return;
      }
      setAuthChecking(false);
    }
    checkAuth();
  }, [router]);

  // Edit / Create Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTargetSlug, setEditingTargetSlug] = useState<string | null>(null);
  const [pieceForm, setPieceForm] = useState<Piece>({
    slug: "",
    kind: "work",
    title: "",
    kicker: "",
    summary: "",
    status: "published",
    year: new Date().getFullYear().toString(),
    role: "",
    tools: [],
    body: [""],
    mediaUrl: "",
    mediaNote: "",
  });
  const [toolsInput, setToolsInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  // Delete Confirmation state
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState<string | null>(null);

  // Profile Form state
  const [profileForm, setProfileForm] = useState<Profile>(profile);
  const [socialsInput, setSocialsInput] = useState(profile.socials || []);

  // Password Change state
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState("");

  // Backup / JSON state
  const [importJsonText, setImportJsonText] = useState("");
  const [importError, setImportError] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } catch {
      // ignore
    }
    try {
      localStorage.removeItem("minhazul_admin_token");
    } catch {
      // ignore
    }
    router.push("/admin/login");
  };

  // Filtered pieces
  const filteredPieces = useMemo(() => {
    return pieces.filter((item) => {
      if (kindFilter !== "all" && item.kind !== kindFilter) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(q);
        const matchKicker = item.kicker?.toLowerCase().includes(q);
        const matchSummary = item.summary?.toLowerCase().includes(q);
        const matchSlug = item.slug?.toLowerCase().includes(q);
        const matchTools = item.tools?.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchKicker && !matchSummary && !matchSlug && !matchTools) {
          return false;
        }
      }
      return true;
    });
  }, [pieces, kindFilter, statusFilter, searchQuery]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingTargetSlug(null);
    const fresh: Piece = {
      slug: `item-${Date.now().toString(36)}`,
      kind: "work",
      title: "",
      kicker: "Interface architecture",
      summary: "",
      status: "published",
      year: new Date().getFullYear().toString(),
      role: "",
      tools: [],
      body: [""],
      mediaUrl: "",
      mediaNote: "",
    };
    setPieceForm(fresh);
    setToolsInput("");
    setBodyInput("");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (piece: Piece) => {
    setIsCreating(false);
    setEditingTargetSlug(piece.slug);
    setPieceForm({ ...piece });
    setToolsInput((piece.tools || []).join(", "));
    setBodyInput((piece.body || []).join("\n\n"));
    setIsModalOpen(true);
  };

  // Auto-slug generator
  const handleGenerateSlug = () => {
    if (!pieceForm.title.trim()) return;
    const generated = pieceForm.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setPieceForm((prev) => ({ ...prev, slug: generated || `item-${Date.now().toString(36)}` }));
  };

  // Save Piece
  const handleSavePiece = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pieceForm.title.trim()) {
      showToast("Error: Title is required");
      return;
    }
    if (!pieceForm.slug.trim()) {
      showToast("Error: Slug is required");
      return;
    }

    const parsedTools = toolsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const parsedBody = bodyInput
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    const payload: Piece = {
      ...pieceForm,
      tools: parsedTools,
      body: parsedBody.length > 0 ? parsedBody : [""],
    };

    if (isCreating) {
      await createPiece(payload);
      showToast(`Created "${payload.title}" successfully`);
    } else {
      await savePiece(payload, editingTargetSlug || undefined);
      showToast(`Updated "${payload.title}" successfully`);
    }

    setIsModalOpen(false);
  };

  // Duplicate Piece
  const handleDuplicate = async (piece: Piece) => {
    const copy: Piece = {
      ...piece,
      slug: `${piece.slug}-copy-${Date.now().toString(36)}`,
      title: `${piece.title} (Copy)`,
      status: "draft",
    };
    await createPiece(copy);
    showToast(`Duplicated as "${copy.title}"`);
  };

  // Confirm Delete
  const handleExecuteDelete = async () => {
    if (!deleteConfirmSlug) return;
    const target = pieces.find((p) => p.slug === deleteConfirmSlug);
    await deletePiece(deleteConfirmSlug);
    setDeleteConfirmSlug(null);
    showToast(`Deleted "${target?.title || deleteConfirmSlug}"`);
  };

  // Save Profile
  const handleSaveProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProfile({
      ...profileForm,
      socials: socialsInput.filter((s) => s.label.trim() && s.href.trim()),
    });
    showToast("Profile settings saved successfully");
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeSuccess("");
    setPasswordChangeError("");

    if (newPasswordInput.length < 6) {
      setPasswordChangeError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "change_password", newPassword: newPasswordInput }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update password");
      setPasswordChangeSuccess("Password changed successfully!");
      setNewPasswordInput("");
    } catch (err: any) {
      setPasswordChangeError(err.message || "Failed to update password");
    }
  };

  // Reset to Defaults
  const handleResetConfirm = async () => {
    if (
      confirm(
        "Are you sure you want to reset all content to the default seed data? Custom edits will be overwritten."
      )
    ) {
      await reset();
      showToast("All content has been reset to defaults");
    }
  };

  // Import JSON
  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setImportError("");
    try {
      const parsed = JSON.parse(importJsonText) as SiteContent;
      if (!parsed.pieces || !parsed.profile) {
        throw new Error("JSON must contain 'pieces' and 'profile' arrays/objects.");
      }
      await importData(parsed);
      showToast("Content imported successfully");
      setImportJsonText("");
    } catch (err: any) {
      setImportError(err.message || "Invalid JSON format");
    }
  };

  // Download JSON
  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify({ profile, pieces, inquiries }, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded content backup JSON");
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono uppercase tracking-widest text-muted">
            Checking Studio Authorization...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-accent selection:text-accent-ink pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded border border-line bg-fg px-5 py-3 text-sm font-medium text-bg shadow-2xl">
          {toastMessage}
        </div>
      )}

      {/* Top Private Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="bg-accent px-2 py-0.5 text-[10px] font-bold tracking-widest text-accent-ink uppercase">
              Admin
            </span>
            <Link
              href="/"
              target="_blank"
              className="font-display text-sm leading-none no-underline text-fg hover:text-accent md:text-base"
            >
              Minhazul Arefin <span className="text-xs font-mono text-faint normal-case">/ CMS</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-block border border-line bg-surface px-3 py-1.5 text-xs font-semibold tracking-wider text-muted hover:text-fg uppercase transition-colors"
            >
              Live Site ↗
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="border border-line bg-bg-2 px-3 py-1.5 text-xs font-bold tracking-wider text-fg hover:bg-fg hover:text-bg uppercase transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Top Studio Dashboard Bar */}
      <section className="border-b border-line bg-surface px-5 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-mono text-faint uppercase tracking-wider">
                Private Control Panel
              </p>
              <h1 className="font-display mt-2 text-3xl md:text-5xl">Content Studio</h1>
              <p className="mt-1 text-sm text-muted">
                Create, edit, duplicate, and delete site pieces, bio info, and manage incoming messages.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleOpenCreate}
                className="bg-accent px-4 py-2.5 text-xs font-bold tracking-widest text-accent-ink uppercase shadow hover:bg-hot transition-colors cursor-pointer"
              >
                + New Piece
              </button>
              <button
                type="button"
                onClick={handleResetConfirm}
                className="border border-line/50 px-3 py-2.5 text-xs text-muted hover:text-red-600 uppercase transition-colors cursor-pointer"
                title="Reset to default seed data"
              >
                Reset Seeds
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
            <div className="border border-line bg-bg p-4">
              <span className="text-[11px] font-mono uppercase text-faint">Total Pieces</span>
              <p className="font-display mt-1 text-3xl">{pieces.length}</p>
            </div>
            <div className="border border-line bg-bg p-4">
              <span className="text-[11px] font-mono uppercase text-faint">Published</span>
              <p className="font-display mt-1 text-3xl text-emerald-700">
                {pieces.filter((p) => p.status === "published").length}
              </p>
            </div>
            <div className="border border-line bg-bg p-4">
              <span className="text-[11px] font-mono uppercase text-faint">Drafts / Ongoing</span>
              <p className="font-display mt-1 text-3xl text-amber-700">
                {pieces.filter((p) => p.status === "draft" || p.status === "ongoing").length}
              </p>
            </div>
            <div className="border border-line bg-bg p-4">
              <span className="text-[11px] font-mono uppercase text-faint">Inquiries</span>
              <p className="font-display mt-1 text-3xl text-indigo-700">{inquiries.length}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex flex-wrap border-b border-line gap-1">
            {[
              { id: "pieces", label: `Pieces (${pieces.length})` },
              { id: "profile", label: "Profile & Security" },
              { id: "inquiries", label: `Inquiries (${inquiries.length})` },
              { id: "backup", label: "Backup & JSON" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`px-5 py-3 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-accent text-accent bg-bg"
                    : "border-transparent text-muted hover:text-fg hover:border-line"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab 1: Pieces Manager */}
      {activeTab === "pieces" && (
        <section className="mx-auto max-w-6xl px-5 pt-8">
          {/* Filter and Search Bar */}
          <div className="mb-6 flex flex-col gap-4 border border-line bg-surface p-4 md:flex-row md:items-center md:justify-between">
            {/* Kind Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setKindFilter("all")}
                className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer border ${
                  kindFilter === "all"
                    ? "bg-fg text-bg border-fg"
                    : "bg-bg text-muted border-line hover:text-fg"
                }`}
              >
                All ({pieces.length})
              </button>
              {KINDS.map((k) => {
                const count = pieces.filter((p) => p.kind === k.id).length;
                return (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => setKindFilter(k.id)}
                    className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer border ${
                      kindFilter === k.id
                        ? "bg-fg text-bg border-fg"
                        : "bg-bg text-muted border-line hover:text-fg"
                    }`}
                  >
                    {k.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Status filter & Search */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-line bg-bg px-3 py-1.5 text-xs font-medium uppercase text-fg outline-none"
              >
                <option value="all">All Statuses</option>
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Search title, kicker, slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 border border-line bg-bg px-3 py-1.5 text-xs text-fg outline-none focus:border-accent"
              />

              {(kindFilter !== "all" || statusFilter !== "all" || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setKindFilter("all");
                    setStatusFilter("all");
                    setSearchQuery("");
                  }}
                  className="text-xs text-muted hover:text-fg underline px-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Pieces Grid */}
          {filteredPieces.length === 0 ? (
            <div className="border border-line border-dashed bg-surface p-12 text-center">
              <p className="font-display text-2xl text-muted">No pieces match your filters</p>
              <p className="mt-2 text-sm text-faint">
                Try adjusting search or click &quot;+ New Piece&quot; to author one.
              </p>
              <button
                type="button"
                onClick={handleOpenCreate}
                className="mt-4 bg-accent px-4 py-2 text-xs font-bold uppercase text-accent-ink hover:bg-hot transition-colors cursor-pointer"
              >
                Create New Piece
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredPieces.map((piece) => {
                const kindInfo = KINDS.find((k) => k.id === piece.kind);
                const statusInfo = STATUSES.find((s) => s.id === piece.status);
                const publicHref =
                  piece.kind === "visual" || piece.kind === "cinema"
                    ? `/${piece.kind}`
                    : `/${piece.kind}/${piece.slug}`;

                return (
                  <div
                    key={piece.slug}
                    className="group border border-line bg-surface p-5 transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-1.5 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`border px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase ${
                              kindInfo?.color || "bg-bg text-fg"
                            }`}
                          >
                            {piece.kind}
                          </span>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                              statusInfo?.badge || "bg-neutral-500 text-white"
                            }`}
                          >
                            {piece.status}
                          </span>
                          <span className="text-xs font-mono text-faint">{piece.year}</span>
                          <span className="text-xs font-mono text-faint">·</span>
                          <span className="text-xs font-mono text-muted uppercase tracking-wider">
                            {piece.kicker}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl text-fg">{piece.title}</h3>
                        <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                          {piece.summary}
                        </p>

                        {/* Tools & Details */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                          <span className="text-faint font-mono text-[11px]">
                            Slug: <code className="text-fg bg-bg px-1 py-0.5">{piece.slug}</code>
                          </span>
                          {piece.role && (
                            <span className="text-faint font-mono text-[11px]">
                              Role: <span className="text-fg">{piece.role}</span>
                            </span>
                          )}
                          {piece.mediaUrl && (
                            <span className="text-accent font-medium text-[11px]">
                              [Media Attached]
                            </span>
                          )}
                        </div>

                        {piece.tools && piece.tools.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {piece.tools.map((tool) => (
                              <span
                                key={tool}
                                className="border border-line/40 bg-bg px-2 py-0.5 text-[10px] text-muted font-mono"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-2 pt-2 md:pt-0">
                        <Link
                          href={publicHref}
                          target="_blank"
                          className="border border-line bg-bg px-3 py-1.5 text-xs font-semibold tracking-wider text-muted hover:text-fg uppercase transition-colors"
                          title="View on site"
                        >
                          View ↗
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDuplicate(piece)}
                          className="border border-line bg-bg px-3 py-1.5 text-xs font-semibold tracking-wider text-muted hover:text-fg uppercase transition-colors cursor-pointer"
                          title="Duplicate piece"
                        >
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(piece)}
                          className="bg-fg px-3.5 py-1.5 text-xs font-semibold tracking-wider text-bg uppercase hover:bg-accent transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmSlug(piece.slug)}
                          className="border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold tracking-wider text-red-700 uppercase hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Tab 2: Profile & Security */}
      {activeTab === "profile" && (
        <section className="mx-auto max-w-4xl px-5 pt-8 space-y-8">
          {/* Profile Form */}
          <div className="border border-line bg-surface p-6 shadow-sm">
            <h2 className="font-display text-2xl">Profile & Author Details</h2>
            <p className="mt-1 text-xs text-muted">
              These settings update your author name, tagline, email, and social links across the site.
            </p>

            <form onSubmit={handleSaveProfileSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-semibold text-fg">Full Name</span>
                  <input
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="mt-1 w-full border border-line bg-bg px-3 py-2 text-fg outline-none focus:border-accent"
                  />
                </label>

                <label className="block text-sm">
                  <span className="font-semibold text-fg">Location</span>
                  <input
                    required
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="mt-1 w-full border border-line bg-bg px-3 py-2 text-fg outline-none focus:border-accent"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="font-semibold text-fg">Headline / Practice Line</span>
                <input
                  required
                  value={profileForm.line}
                  onChange={(e) => setProfileForm({ ...profileForm, line: e.target.value })}
                  className="mt-1 w-full border border-line bg-bg px-3 py-2 text-fg outline-none focus:border-accent"
                />
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-semibold text-fg">Public Email</span>
                  <input
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="mt-1 w-full border border-line bg-bg px-3 py-2 text-fg outline-none focus:border-accent"
                    placeholder="you@domain.com"
                  />
                </label>

                <label className="block text-sm">
                  <span className="font-semibold text-fg">CV / Resume Document URL</span>
                  <input
                    value={profileForm.cvUrl}
                    onChange={(e) => setProfileForm({ ...profileForm, cvUrl: e.target.value })}
                    className="mt-1 w-full border border-line bg-bg px-3 py-2 text-fg outline-none focus:border-accent"
                    placeholder="https://..."
                  />
                </label>
              </div>

              {/* Social Links Manager */}
              <div className="border-t border-line pt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-fg">Social Links</span>
                  <button
                    type="button"
                    onClick={() => setSocialsInput([...socialsInput, { label: "", href: "" }])}
                    className="text-xs font-semibold uppercase text-accent hover:underline cursor-pointer"
                  >
                    + Add Link
                  </button>
                </div>

                <div className="space-y-3">
                  {socialsInput.map((soc, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        placeholder="Label (e.g. GitHub)"
                        value={soc.label}
                        onChange={(e) => {
                          const updated = [...socialsInput];
                          updated[idx].label = e.target.value;
                          setSocialsInput(updated);
                        }}
                        className="w-1/3 border border-line bg-bg px-3 py-1.5 text-xs text-fg"
                      />
                      <input
                        placeholder="https://..."
                        value={soc.href}
                        onChange={(e) => {
                          const updated = [...socialsInput];
                          updated[idx].href = e.target.value;
                          setSocialsInput(updated);
                        }}
                        className="flex-1 border border-line bg-bg px-3 py-1.5 text-xs text-fg"
                      />
                      <button
                        type="button"
                        onClick={() => setSocialsInput(socialsInput.filter((_, i) => i !== idx))}
                        className="text-xs text-red-600 hover:text-red-800 px-2 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent px-6 py-3 text-xs font-bold tracking-widest text-accent-ink uppercase hover:bg-hot transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Card */}
          <div className="border border-line bg-surface p-6 shadow-sm">
            <h2 className="font-display text-2xl">Admin Password</h2>
            <p className="mt-1 text-xs text-muted">
              Update the password used to access the private CMS Studio.
            </p>

            {passwordChangeSuccess && (
              <div className="mt-4 border border-green-800/30 bg-green-500/10 p-3 text-xs text-green-900 font-medium">
                {passwordChangeSuccess}
              </div>
            )}
            {passwordChangeError && (
              <div className="mt-4 border border-red-800/30 bg-red-500/10 p-3 text-xs text-red-900 font-medium">
                {passwordChangeError}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="mt-5 space-y-4 max-w-md">
              <label className="block text-sm">
                <span className="font-semibold text-fg">New Password</span>
                <input
                  required
                  type="password"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="mt-1 w-full border border-line bg-bg px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                  placeholder="At least 6 characters..."
                />
              </label>

              <button
                type="submit"
                className="bg-fg px-5 py-2.5 text-xs font-bold tracking-widest text-bg uppercase hover:bg-accent transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Tab 3: Inquiries Manager */}
      {activeTab === "inquiries" && (
        <section className="mx-auto max-w-4xl px-5 pt-8">
          <div className="border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <div>
                <h2 className="font-display text-2xl">Contact Submissions</h2>
                <p className="text-xs text-muted mt-1">
                  Direct messages submitted through the public contact page form.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-accent uppercase">
                {inquiries.length} {inquiries.length === 1 ? "Inquiry" : "Inquiries"}
              </span>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-12 text-center text-muted">
                <p className="font-display text-xl">No inquiries received yet.</p>
                <p className="text-xs text-faint mt-1">
                  Messages submitted on the contact page will show up here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`border p-4 transition-colors ${
                      inq.read ? "border-line bg-bg/50" : "border-accent bg-accent/5 ring-1 ring-accent"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-fg">{inq.name}</h3>
                          {!inq.read && (
                            <span className="bg-accent px-1.5 py-0.5 text-[9px] font-bold text-accent-ink uppercase rounded">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-faint mt-0.5">
                          {new Date(inq.at).toLocaleString()}
                        </p>
                        <p className="text-xs font-semibold text-accent uppercase tracking-wider mt-2">
                          Regarding: {inq.about}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!inq.read && (
                          <button
                            type="button"
                            onClick={() => markInquiryRead(inq.id)}
                            className="text-xs text-muted hover:text-fg underline cursor-pointer"
                          >
                            Mark read
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={async () => {
                            await deleteInquiry(inq.id);
                            showToast("Inquiry deleted");
                          }}
                          className="text-xs text-red-600 hover:text-red-800 underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-fg whitespace-pre-line bg-surface p-3 border border-line/30 rounded">
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Tab 4: Backup & JSON */}
      {activeTab === "backup" && (
        <section className="mx-auto max-w-4xl px-5 pt-8">
          <div className="border border-line bg-surface p-6 shadow-sm space-y-8">
            <div>
              <h2 className="font-display text-2xl">Backup & Restore</h2>
              <p className="text-xs text-muted mt-1">
                Export complete site data to JSON or restore from a previously exported backup file.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 border-b border-line pb-6">
              <button
                type="button"
                onClick={handleDownloadJson}
                className="bg-fg px-4 py-2.5 text-xs font-bold tracking-widest text-bg uppercase hover:bg-accent transition-colors cursor-pointer"
              >
                Download JSON Backup
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify({ profile, pieces, inquiries }, null, 2));
                  showToast("Copied full JSON to clipboard");
                }}
                className="border border-line bg-bg px-4 py-2.5 text-xs font-semibold tracking-wider text-fg uppercase hover:bg-surface cursor-pointer"
              >
                Copy to Clipboard
              </button>
            </div>

            {/* Import Area */}
            <div>
              <h3 className="font-display text-xl">Import Site Content</h3>
              <p className="text-xs text-muted mt-1">
                Paste valid site content JSON below to restore pieces, profile, and settings.
              </p>

              <form onSubmit={handleImportSubmit} className="mt-4 space-y-3">
                <textarea
                  rows={8}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder='{"profile": {...}, "pieces": [...]}'
                  className="w-full border border-line bg-bg p-3 font-mono text-xs text-fg outline-none focus:border-accent"
                />
                {importError && (
                  <p className="text-xs text-red-600 font-semibold">{importError}</p>
                )}
                <button
                  type="submit"
                  disabled={!importJsonText.trim()}
                  className="bg-accent px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent-ink hover:bg-hot transition-colors disabled:opacity-40 cursor-pointer"
                >
                  Import Content
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto border border-line bg-bg p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-bold">
                  {isCreating ? "Create New" : "Edit Item"}
                </span>
                <h2 className="font-display text-3xl mt-1">
                  {isCreating ? "New Content Piece" : pieceForm.title || "Edit Piece"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-lg font-bold text-muted hover:text-fg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePiece} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-semibold text-fg">Kind / Section *</span>
                  <select
                    value={pieceForm.kind}
                    onChange={(e) =>
                      setPieceForm({ ...pieceForm, kind: e.target.value as Kind })
                    }
                    className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-fg"
                  >
                    {KINDS.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm">
                  <span className="font-semibold text-fg">Publication Status *</span>
                  <select
                    value={pieceForm.status}
                    onChange={(e) =>
                      setPieceForm({ ...pieceForm, status: e.target.value as Status })
                    }
                    className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-fg"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block text-sm">
                <span className="font-semibold text-fg">Title *</span>
                <input
                  required
                  value={pieceForm.title}
                  onChange={(e) => setPieceForm({ ...pieceForm, title: e.target.value })}
                  className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                  placeholder="e.g. Legal-Tech UX System"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <label className="block text-sm">
                  <span className="font-semibold text-fg">Slug (URL identifier) *</span>
                  <input
                    required
                    value={pieceForm.slug}
                    onChange={(e) => setPieceForm({ ...pieceForm, slug: e.target.value })}
                    className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm font-mono text-fg outline-none focus:border-accent"
                    placeholder="e.g. legal-tech-ux"
                  />
                </label>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleGenerateSlug}
                    className="border border-line bg-surface px-3 py-2 text-xs font-semibold uppercase hover:bg-fg hover:text-bg transition-colors cursor-pointer"
                  >
                    Auto Slug
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-semibold text-fg">Kicker (Sub-tag / Category)</span>
                  <input
                    value={pieceForm.kicker}
                    onChange={(e) => setPieceForm({ ...pieceForm, kicker: e.target.value })}
                    className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                    placeholder="e.g. Interface architecture / photo / 3d"
                  />
                </label>

                <label className="block text-sm">
                  <span className="font-semibold text-fg">Year</span>
                  <input
                    value={pieceForm.year}
                    onChange={(e) => setPieceForm({ ...pieceForm, year: e.target.value })}
                    className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                    placeholder="e.g. 2026 or 2025–2026"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-semibold text-fg">Role</span>
                  <input
                    value={pieceForm.role}
                    onChange={(e) => setPieceForm({ ...pieceForm, role: e.target.value })}
                    className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                    placeholder="e.g. UX and interface design"
                  />
                </label>

                <label className="block text-sm">
                  <span className="font-semibold text-fg">Tools / Tech (comma-separated)</span>
                  <input
                    value={toolsInput}
                    onChange={(e) => setToolsInput(e.target.value)}
                    className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                    placeholder="e.g. Figma, Unity 6, Blender"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="font-semibold text-fg">Summary / Lede</span>
                <textarea
                  rows={2}
                  value={pieceForm.summary}
                  onChange={(e) => setPieceForm({ ...pieceForm, summary: e.target.value })}
                  className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                  placeholder="Brief description of the work or inquiry..."
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-semibold text-fg">Media URL (Image, Video, or YouTube)</span>
                  <input
                    value={pieceForm.mediaUrl}
                    onChange={(e) => setPieceForm({ ...pieceForm, mediaUrl: e.target.value })}
                    className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                    placeholder="https://..."
                  />
                </label>

                <label className="block text-sm">
                  <span className="font-semibold text-fg">Media Placeholder Note</span>
                  <input
                    value={pieceForm.mediaNote}
                    onChange={(e) => setPieceForm({ ...pieceForm, mediaNote: e.target.value })}
                    className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                    placeholder="e.g. Gameplay recording — waiting"
                  />
                </label>
              </div>

              {/* Media Live Preview */}
              {pieceForm.mediaUrl && (
                <div className="border border-line bg-surface p-3">
                  <span className="block text-[11px] font-mono uppercase text-faint mb-2">
                    Media Preview
                  </span>
                  {pieceForm.mediaUrl.includes("youtube.com") || pieceForm.mediaUrl.includes("youtu.be") ? (
                    <div className="aspect-video w-full max-h-48 bg-black">
                      <iframe
                        src={pieceForm.mediaUrl.replace("watch?v=", "embed/")}
                        className="h-full w-full"
                        title="Preview"
                      />
                    </div>
                  ) : (
                    <img
                      src={pieceForm.mediaUrl}
                      alt="Media Preview"
                      className="max-h-48 object-contain border border-line/40 mx-auto"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                </div>
              )}

              <label className="block text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-fg">Article / Case Study Body Paragraphs</span>
                  <span className="text-xs text-muted">Separate paragraphs with a blank line</span>
                </div>
                <textarea
                  rows={6}
                  value={bodyInput}
                  onChange={(e) => setBodyInput(e.target.value)}
                  className="mt-1 w-full border border-line bg-surface px-3 py-2 text-sm text-fg outline-none focus:border-accent"
                  placeholder="Write detailed notes, context, or methodology..."
                />
              </label>

              <div className="flex justify-end gap-3 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-line bg-surface px-4 py-2 text-xs font-semibold uppercase text-muted hover:text-fg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent px-6 py-2 text-xs font-bold tracking-widest uppercase text-accent-ink hover:bg-hot transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isCreating ? "Create Piece" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md border border-line bg-bg p-6 shadow-2xl">
            <h3 className="font-display text-2xl text-red-700">Confirm Delete</h3>
            <p className="mt-2 text-sm text-muted">
              Are you sure you want to permanently delete this piece?
            </p>
            <div className="mt-2 border border-line bg-surface p-3 font-mono text-xs">
              {deleteConfirmSlug}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmSlug(null)}
                className="border border-line bg-surface px-4 py-2 text-xs font-semibold uppercase text-muted hover:text-fg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="bg-red-700 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-800 transition-colors cursor-pointer"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
