import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as useAtelier } from "./router-LMAEgqxm.mjs";
import { r as Page } from "./frame-evv_LEZx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CPuqsXXR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const { profile } = useAtelier();
	const [sent, setSent] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)({
		name: "",
		about: "",
		message: ""
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Contact",
		title: "Collaboration.",
		lede: "A note stays on this device for now. It is not emailed until an address is connected. Use the email below if one is listed.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-4",
				onSubmit: (e) => {
					e.preventDefault();
					const prev = JSON.parse(localStorage.getItem("minhazul-inquiries") || "[]");
					prev.push({
						...note,
						at: (/* @__PURE__ */ new Date()).toISOString()
					});
					localStorage.setItem("minhazul-inquiries", JSON.stringify(prev));
					setSent(true);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: note.name,
							onChange: (e) => setNote({
								...note,
								name: e.target.value
							}),
							className: "mt-1 w-full border border-line bg-bg-2 px-3 py-3 text-fg outline-none focus:border-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["About", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: note.about,
							onChange: (e) => setNote({
								...note,
								about: e.target.value
							}),
							className: "mt-1 w-full border border-line bg-bg-2 px-3 py-3 text-fg outline-none focus:border-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							required: true,
							rows: 5,
							value: note.message,
							onChange: (e) => setNote({
								...note,
								message: e.target.value
							}),
							className: "mt-1 w-full border border-line bg-bg-2 px-3 py-3 text-fg outline-none focus:border-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "bg-accent px-4 py-3 text-sm text-accent-ink",
						children: "Save inquiry locally"
					}),
					sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Saved in this browser. It has not been sent."
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[11px] tracking-[0.16em] text-faint uppercase",
						children: "Email"
					}), profile.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-fg underline",
						href: `mailto:${profile.email}`,
						children: profile.email
					}) : "Add an email in Studio."] }),
					profile.socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-fg underline",
						href: s.href,
						children: s.label
					}) }, s.href)),
					profile.cvUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-accent underline",
						href: profile.cvUrl,
						children: "CV"
					}) }) : null
				]
			})]
		})
	});
}
//#endregion
export { ContactPage as component };
