import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/frame-evv_LEZx.js
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		href: "/research",
		label: "Research"
	},
	{
		href: "/work",
		label: "Work"
	},
	{
		href: "/visual",
		label: "Visual"
	},
	{
		href: "/cinema",
		label: "Cinema"
	},
	{
		href: "/journal",
		label: "Journal"
	},
	{
		href: "/about",
		label: "About"
	}
];
function Frame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-display text-xl tracking-tight no-underline",
							children: "Minhazul Arefin"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-5 text-sm text-muted md:flex",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.href,
								className: "no-underline hover:text-fg",
								activeProps: { className: "text-fg" },
								children: item.label
							}, item.href))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "border border-line px-3 py-2 text-xs tracking-wide text-fg no-underline hover:border-accent hover:text-accent",
							children: "Contact"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex gap-4 overflow-x-auto border-t border-line px-5 py-2 text-xs text-muted md:hidden",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.href,
						className: "shrink-0 no-underline hover:text-fg",
						children: item.label
					}, item.href))
				})]
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-faint sm:flex-row sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Dhaka — independent practice. Assets appear only when a real file or URL is added." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						className: "text-muted no-underline hover:text-fg",
						children: "Studio"
					})]
				})
			})
		]
	});
}
function Page({ kicker, title, lede, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-12 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.18em] text-accent uppercase",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-3 max-w-3xl text-4xl leading-tight md:text-6xl",
				children: title
			}),
			lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-2xl text-muted",
				children: lede
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12",
				children
			})
		]
	}) });
}
function AssetWait({ note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-48 flex-col justify-between border border-dashed border-line bg-bg-2 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.16em] text-faint uppercase",
				children: "Awaiting asset"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl text-muted",
				children: note || "No file or URL yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-faint",
				children: "Photographs, film, and 3D are not substituted with generated graphics."
			})
		]
	});
}
//#endregion
export { Frame as n, Page as r, AssetWait as t };
