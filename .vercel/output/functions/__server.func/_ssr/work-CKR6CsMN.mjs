import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as publicPieces, o as useAtelier } from "./router-LMAEgqxm.mjs";
import { r as Page } from "./frame-evv_LEZx.mjs";
import { n as PieceList } from "./lists-ttqx8NcN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/work-CKR6CsMN.js
var import_jsx_runtime = require_jsx_runtime();
function WorkIndex() {
	const { pieces } = useAtelier();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Work & collaborations",
		title: "What can be shown.",
		lede: "Interfaces, simulations, and production work. Each entry is labeled by status. Client names, metrics, and awards are omitted unless you add them.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieceList, { pieces: publicPieces(pieces, "work") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl",
				children: "What I can build"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-px bg-line md:grid-cols-2",
				children: [
					["UX and digital products", "Dashboards, workflows, interface prototypes, design-system exploration."],
					["Websites", "Personal, portfolio, and small business sites, including interactive pages."],
					["Interactive experiences", "Unity prototypes, educational simulations, experimental real-time scenes."],
					["Film and visual production", "Documentary editing, cinematography, motion, and visual storytelling."]
				].map(([title, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-bg p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: text
					})]
				}, title))
			})]
		})]
	});
}
//#endregion
export { WorkIndex as component };
