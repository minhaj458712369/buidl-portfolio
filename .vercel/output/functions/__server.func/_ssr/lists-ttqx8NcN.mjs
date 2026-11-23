import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lists-ttqx8NcN.js
var import_jsx_runtime = require_jsx_runtime();
var HREF = {
	work: "/work",
	journal: "/journal",
	research: "/research",
	visual: "/visual",
	cinema: "/cinema"
};
function PieceList({ pieces }) {
	if (pieces.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "border border-line bg-bg-2 px-5 py-10 text-muted",
		children: "Nothing published in this section yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-line border-y border-line",
		children: pieces.map((piece) => {
			const to = piece.kind === "visual" || piece.kind === "cinema" ? HREF[piece.kind] : `${HREF[piece.kind]}/${piece.slug}`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				className: "grid gap-2 py-6 no-underline md:grid-cols-[8rem_1fr_auto] md:items-baseline",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tracking-wide text-faint uppercase",
						children: piece.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display block text-2xl",
						children: piece.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block max-w-xl text-sm text-muted",
						children: piece.summary
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-faint",
						children: [
							piece.year,
							" · ",
							piece.status
						]
					})
				]
			}) }, piece.slug);
		})
	});
}
function PieceBody({ piece }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "grid gap-10 md:grid-cols-[16rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "space-y-4 text-sm text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[11px] tracking-[0.16em] text-faint uppercase",
					children: "Status"
				}), piece.status] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[11px] tracking-[0.16em] text-faint uppercase",
					children: "Year"
				}), piece.year] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[11px] tracking-[0.16em] text-faint uppercase",
					children: "Role"
				}), piece.role || "—"] }),
				piece.tools.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[11px] tracking-[0.16em] text-faint uppercase",
					children: "Tools"
				}), piece.tools.join(" · ")] }) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [piece.mediaUrl ? piece.mediaUrl.match(/\.(mp4|webm)(\?|$)/i) || piece.mediaUrl.includes("youtube") || piece.mediaUrl.includes("vimeo") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "text-accent underline",
				href: piece.mediaUrl,
				target: "_blank",
				rel: "noreferrer",
				children: "Open linked media"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: piece.mediaUrl,
			alt: "",
			className: "mb-8 max-h-[70vh] w-full border border-line object-contain"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-8 border border-dashed border-line px-4 py-8 text-sm text-faint",
			children: piece.mediaNote || "No media URL yet."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-2xl space-y-5 text-base leading-relaxed",
			children: piece.body.map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: para }, para))
		})] })]
	});
}
//#endregion
export { PieceList as n, PieceBody as t };
