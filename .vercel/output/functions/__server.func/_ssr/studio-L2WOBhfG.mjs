import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as useAtelier } from "./router-LMAEgqxm.mjs";
import { r as Page } from "./frame-evv_LEZx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-L2WOBhfG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"draft",
	"experimental",
	"ongoing",
	"published"
];
function StudioPage() {
	const { pieces, profile, savePiece, saveProfile, reset } = useAtelier();
	const [slug, setSlug] = (0, import_react.useState)(pieces[0]?.slug ?? "");
	const current = pieces.find((p) => p.slug === slug) ?? pieces[0];
	const [draft, setDraft] = (0, import_react.useState)(null);
	const editing = draft && draft.slug === current?.slug ? draft : current;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Studio",
		title: "Local drafts.",
		lede: "Edits live in this browser only. They are not a private server login, and they do not upload files. Paste a real image, video, or document URL when you have one.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 grid gap-3 border border-line p-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: profile.email,
					onChange: (e) => saveProfile({
						...profile,
						email: e.target.value
					}),
					className: "mt-1 w-full border border-line bg-bg px-3 py-2",
					placeholder: "you@domain"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["CV URL", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: profile.cvUrl,
					onChange: (e) => saveProfile({
						...profile,
						cvUrl: e.target.value
					}),
					className: "mt-1 w-full border border-line bg-bg px-3 py-2",
					placeholder: "https://"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 md:grid-cols-[16rem_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-1 text-sm",
				children: [pieces.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setSlug(p.slug);
						setDraft(null);
					},
					className: `w-full px-2 py-2 text-left ${p.slug === editing?.slug ? "bg-surface text-fg" : "text-muted"}`,
					children: [p.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-[11px] text-faint",
						children: [
							p.kind,
							" · ",
							p.status
						]
					})]
				}) }, p.slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-3 w-full border border-line px-2 py-2 text-left text-accent",
					onClick: () => {
						const fresh = {
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
							mediaNote: ""
						};
						savePiece(fresh);
						setSlug(fresh.slug);
						setDraft(fresh);
					},
					children: "New journal draft"
				}) })]
			}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					savePiece(editing);
					setDraft(null);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title",
						value: editing.title,
						onChange: (title) => setDraft({
							...editing,
							title
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Slug",
						value: editing.slug,
						onChange: (next) => setDraft({
							...editing,
							slug: next
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Summary",
						value: editing.summary,
						onChange: (summary) => setDraft({
							...editing,
							summary
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: editing.status,
							onChange: (e) => setDraft({
								...editing,
								status: e.target.value
							}),
							className: "mt-1 w-full border border-line bg-bg px-3 py-2",
							children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Kind", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: editing.kind,
							onChange: (e) => setDraft({
								...editing,
								kind: e.target.value
							}),
							className: "mt-1 w-full border border-line bg-bg px-3 py-2",
							children: [
								"work",
								"journal",
								"research",
								"visual",
								"cinema"
							].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: k }, k))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Media URL",
						value: editing.mediaUrl,
						onChange: (mediaUrl) => setDraft({
							...editing,
							mediaUrl
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Body", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 8,
							value: editing.body.join("\n\n"),
							onChange: (e) => setDraft({
								...editing,
								body: e.target.value.split(/\n\n+/)
							}),
							className: "mt-1 w-full border border-line bg-bg px-3 py-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "bg-accent px-4 py-3 text-sm text-accent-ink",
							children: "Save in this browser"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: reset,
							className: "border border-line px-4 py-3 text-sm",
							children: "Reset all local edits"
						})]
					})
				]
			}) : null]
		})]
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 w-full border border-line bg-bg px-3 py-2"
		})]
	});
}
//#endregion
export { StudioPage as component };
