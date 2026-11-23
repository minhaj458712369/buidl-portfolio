import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as publicPieces, o as useAtelier } from "./router-LMAEgqxm.mjs";
import { r as Page, t as AssetWait } from "./frame-evv_LEZx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cinema-B5Dx-qwP.js
var import_jsx_runtime = require_jsx_runtime();
function CinemaPage() {
	const { pieces } = useAtelier();
	const items = publicPieces(pieces, "cinema");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Cinema",
		title: "Films stay off this page until there is a link.",
		lede: "Documentary, cinematography, and edit. YouTube or Vimeo URLs only — no invented festivals, awards, or screenings.",
		children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetWait, { note: "First film — title, still, and video URL" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-8",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border border-line p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-faint uppercase",
						children: [
							item.year,
							" · ",
							item.status
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-2 text-3xl",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-muted",
						children: item.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-faint",
						children: ["Role: ", item.role || "—"]
					}),
					item.mediaUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "mt-4 inline-block text-accent underline",
						href: item.mediaUrl,
						target: "_blank",
						rel: "noreferrer",
						children: "Watch"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-faint",
						children: "Video URL not added."
					})
				]
			}, item.slug))
		})
	});
}
//#endregion
export { CinemaPage as component };
