import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as publicPieces, o as useAtelier } from "./router-LMAEgqxm.mjs";
import { r as Page, t as AssetWait } from "./frame-evv_LEZx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/visual-CSEAmmMp.js
var import_jsx_runtime = require_jsx_runtime();
function VisualPage() {
	const { pieces } = useAtelier();
	const items = publicPieces(pieces, "visual");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Visual",
		title: "Photographs and drawings, when they arrive.",
		lede: "Composition, light, and documentary stills. This archive stays empty rather than filling itself with generated images.",
		children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetWait, { note: "Documentary still" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetWait, { note: "Lighting study" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetWait, { note: "Illustration or drawing" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetWait, { note: "Blender still — a real render, not a stand-in" })
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-4 md:grid-cols-2",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border border-line",
				children: [item.mediaUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.mediaUrl,
					alt: item.title,
					className: "aspect-[4/3] w-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetWait, { note: item.mediaNote || item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: item.summary
					})]
				})]
			}, item.slug))
		})
	});
}
//#endregion
export { VisualPage as component };
