import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as publicPieces, o as useAtelier, s as PATHS } from "./router-LMAEgqxm.mjs";
import { n as Frame, t as AssetWait } from "./frame-evv_LEZx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CvqU_I3U.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { pieces, profile } = useAtelier();
	const work = publicPieces(pieces, "work").slice(0, 3);
	const notes = publicPieces(pieces, "journal").slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tracking-[0.2em] text-accent uppercase",
					children: ["Dhaka · ", profile.location.includes("Dhaka") ? "emerging practice" : profile.location]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display mt-4 text-5xl leading-[0.95] md:text-7xl",
					children: ["Designing experiences.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-muted italic",
						children: "Exploring systems."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-md text-muted",
					children: profile.line
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetWait, { note: "Pointillism portrait — waiting for the original file" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetWait, { note: "Blender object — waiting for a render or video" })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl md:grid-cols-2",
				children: PATHS.map((path) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: path.href,
					className: "group border-line px-5 py-10 no-underline md:odd:border-r",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-faint",
							children: path.index
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-3 text-4xl group-hover:text-accent",
							children: path.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-sm text-sm text-muted",
							children: path.text
						})
					]
				}, path.href))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Selected work"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/work",
					className: "text-sm text-muted no-underline hover:text-fg",
					children: "All work"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line border-y border-line",
				children: work.map((piece) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/work/$slug",
					params: { slug: piece.slug },
					className: "grid gap-2 py-6 no-underline md:grid-cols-[1fr_auto] md:items-baseline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl",
						children: piece.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm text-muted",
						children: piece.summary
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-faint uppercase",
						children: piece.status
					})]
				}) }, piece.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-line bg-bg-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/visual",
						className: "no-underline",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.16em] text-faint uppercase",
								children: "Photography"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display mt-2 text-3xl",
								children: "Visual archive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Empty until stills are linked. No stock stand-ins."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cinema",
						className: "no-underline",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.16em] text-faint uppercase",
								children: "Film"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display mt-2 text-3xl",
								children: "Cinema"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Documentary and camera work, when a video URL exists."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.16em] text-faint uppercase",
						children: "Recent notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-3",
						children: notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/journal/$slug",
							params: { slug: note.slug },
							className: "font-display text-xl no-underline hover:text-accent",
							children: note.title
						}) }, note.slug))
					})] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1.4fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: "About the practice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-muted",
					children: "Interdisciplinary work in UX, interactive simulation, photography, and film. Positioned as an emerging practice — not a senior studio, and not a list of unearned specialties."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/about",
					className: "mt-6 inline-block text-sm text-accent no-underline",
					children: "Read the short biography"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-line p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.16em] text-faint uppercase",
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display mt-3 text-3xl",
						children: "Start a conversation."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "mt-6 inline-block bg-accent px-4 py-3 text-sm text-accent-ink no-underline",
						children: "Collaboration"
					})
				]
			})]
		})
	] }) });
}
//#endregion
export { Home as component };
