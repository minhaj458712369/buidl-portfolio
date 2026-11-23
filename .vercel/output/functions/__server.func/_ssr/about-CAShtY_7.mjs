import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as useAtelier } from "./router-LMAEgqxm.mjs";
import { r as Page } from "./frame-evv_LEZx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-CAShtY_7.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	const { profile } = useAtelier();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "About",
		title: profile.name,
		lede: profile.line,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 md:grid-cols-[1fr_16rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl space-y-5 text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Based in Dhaka. Studying Multimedia and Creative Technology at Daffodil International University, 2022–2026." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The work sits between interface design, interactive simulation, photography, and film. Projects start from the people using a system and the experience that system has to make legible." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tools in active use include design and prototyping software, Unity, Blender, and editorial video tools. Depth varies by project. The site does not flatten that into a senior-engineer or award-filmmaker biography." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/work",
							className: "text-fg underline",
							children: "Work"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/research",
							className: "text-fg underline",
							children: "Research"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "text-fg underline",
							children: "Contact"
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4 border border-line p-5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[11px] tracking-[0.16em] text-faint uppercase",
						children: "Location"
					}), profile.location] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[11px] tracking-[0.16em] text-faint uppercase",
						children: "CV"
					}), profile.cvUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-accent underline",
						href: profile.cvUrl,
						children: "Open CV"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Link not added"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[11px] tracking-[0.16em] text-faint uppercase",
						children: "Email"
					}), profile.email || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Not added"
					})] })
				]
			})]
		})
	});
}
//#endregion
export { AboutPage as component };
