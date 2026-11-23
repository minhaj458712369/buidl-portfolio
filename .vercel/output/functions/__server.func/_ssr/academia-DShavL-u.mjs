import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Page } from "./frame-evv_LEZx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/academia-DShavL-u.js
var import_jsx_runtime = require_jsx_runtime();
function AcademiaPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Academia",
		title: "Study, not a publication list.",
		lede: "Department of Multimedia and Creative Technology, Daffodil International University, 2022–2026. Coursework and independent experiments are kept separate from claimed papers.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "max-w-2xl space-y-4 text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Program: Multimedia and Creative Technology." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Interests: human-computer interaction, simulation-based learning, photography as an interactive system." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					"Ongoing inquiry lives under",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/research",
						className: "text-fg underline",
						children: "Research"
					}),
					"."
				] })
			]
		})
	});
}
//#endregion
export { AcademiaPage as component };
