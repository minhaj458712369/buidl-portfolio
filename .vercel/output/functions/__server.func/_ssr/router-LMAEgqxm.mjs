import { i as __toESM } from "../_runtime.mjs";
import { _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, q as require_react, v as createRootRoute, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-LMAEgqxm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var SEED_PROFILE = {
	name: "Minhazul Arefin",
	location: "Dhaka, Bangladesh",
	line: "Creative technologist working across digital products, interactive systems, research, and visual storytelling.",
	email: "",
	socials: [],
	cvUrl: ""
};
var SEED_PIECES = [
	{
		slug: "legal-tech-ux",
		kind: "work",
		title: "Legal-Tech UX System",
		kicker: "Interface architecture",
		summary: "An interface study of two environments on one legal-technology platform: a user-side dashboard and a client-side dashboard. The work maps how different stakeholders move through the same system.",
		status: "experimental",
		year: "2025–2026",
		role: "UX and interface design",
		tools: [
			"Figma",
			"Information architecture",
			"Prototyping"
		],
		body: [
			"The project treats a legal platform as two workplaces, not one generic dashboard. People who file or follow a matter do not need the same navigation, density, or language as the people who operate the service.",
			"Documented so far: stakeholder types, workflow sketches, navigation structure, and interface decisions. Screenshots and prototype links are not attached yet.",
			"No client name, outcome metric, or testimonial is claimed. This page stays a case study of the design problem, not a commercial result."
		],
		mediaUrl: "",
		mediaNote: "Screenshots and prototype URL — waiting"
	},
	{
		slug: "shuttersense",
		kind: "work",
		title: "ShutterSense",
		kicker: "Interactive simulation",
		summary: "An experimental DSLR photography simulation built in Unity 6. It explores whether practical interaction with aperture, shutter, ISO, and light can make camera controls easier to understand.",
		status: "experimental",
		year: "2024–2026",
		role: "Design, interaction, Unity development",
		tools: [
			"Unity 6",
			"Simulation design",
			"Camera systems"
		],
		body: [
			"Motivation: camera settings are usually taught as numbers before they are felt as consequences. ShutterSense asks whether a controllable scene can reverse that order.",
			"The interaction model covers aperture, shutter speed, ISO, exposure, composition, and light. It is academic and experimental work, not a finished training product.",
			"Educational effectiveness is not claimed. Demonstrations, research notes, and known limits will be added when recordings and write-ups exist."
		],
		mediaUrl: "",
		mediaNote: "Gameplay recording — waiting"
	},
	{
		slug: "what-simulation-can-teach",
		kind: "journal",
		title: "What a simulation is allowed to teach",
		kicker: "Notes",
		summary: "A working note on the difference between a controllable model and a claim that someone learned from it.",
		status: "published",
		year: "2026",
		role: "Writing",
		tools: [],
		body: [
			"A simulation can show a relationship: change the aperture and the depth of field changes. That is already useful. It is not the same as proving that a learner will transfer the idea to a real camera.",
			"For this site, experimental work stays labeled experimental. A prototype does not become a product because the interface looks finished.",
			"The useful next step is usually smaller than a paper: record the interaction, name the question, and write what the build cannot yet answer."
		],
		mediaUrl: "",
		mediaNote: ""
	},
	{
		slug: "two-audiences",
		kind: "journal",
		title: "Two doors, one practice",
		kicker: "Structure",
		summary: "Why this site separates a research path from a collaboration path without splitting the person into two brands.",
		status: "published",
		year: "2026",
		role: "Writing",
		tools: [],
		body: ["A researcher looking for method and a studio looking for an interface do not need the same first sentence. They can still arrive at the same photographs, films, and notes.", "The homepage is organized as chapters with two explicit doors: Research & Academia, and Work & Collaborations. Visual work stays reachable from both."],
		mediaUrl: "",
		mediaNote: ""
	},
	{
		slug: "camera-simulation-questions",
		kind: "research",
		title: "Camera controls as an interactive learning problem",
		kicker: "Ongoing inquiry",
		summary: "Independent notes toward a research question: how an interactive camera model might support understanding of exposure, without claiming a study has been run.",
		status: "ongoing",
		year: "2026",
		role: "Independent research",
		tools: ["Unity 6", "Literature notes"],
		body: [
			"Question under development: which camera relationships (aperture, shutter, ISO, light) become clearer when a person can change them against a visible scene, and which stay abstract?",
			"Status: ongoing inquiry attached to the ShutterSense prototype. This is not a publication. There is no validated result, sample, or citation list yet.",
			"Method, so far, is build-and-observe: implement the control, notice where the interface lies or clarifies, and keep those observations separate from claims about learning outcomes."
		],
		mediaUrl: "",
		mediaNote: "Figures and PDF — waiting"
	}
];
var PATHS = [{
	href: "/research",
	index: "01",
	title: "Research & Academia",
	text: "Questions, prototypes, and notes. Nothing here is presented as a published paper unless a real link says so."
}, {
	href: "/work",
	index: "02",
	title: "Work & Collaborations",
	text: "Interfaces, simulations, and visual production I can actually show. Evidence over claims."
}];
var KEY = "minhazul-atelier-v1";
var Ctx = (0, import_react.createContext)(null);
function AtelierProvider({ children }) {
	const [saved, setSaved] = (0, import_react.useState)({});
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setSaved(JSON.parse(raw));
		} catch {}
		setReady(true);
	}, []);
	const persist = (next) => {
		setSaved(next);
		localStorage.setItem(KEY, JSON.stringify(next));
	};
	const value = {
		pieces: (0, import_react.useMemo)(() => {
			const map = new Map(SEED_PIECES.map((p) => [p.slug, p]));
			for (const p of saved.pieces ?? []) map.set(p.slug, p);
			return [...map.values()];
		}, [saved.pieces]),
		profile: saved.profile ?? SEED_PROFILE,
		ready,
		savePiece: (piece) => {
			const others = (saved.pieces ?? []).filter((p) => p.slug !== piece.slug);
			persist({
				...saved,
				pieces: [...others, piece]
			});
		},
		saveProfile: (next) => persist({
			...saved,
			profile: next
		}),
		reset: () => {
			localStorage.removeItem(KEY);
			setSaved({});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useAtelier() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("AtelierProvider missing");
	return ctx;
}
function publicPieces(pieces, kind) {
	return pieces.filter((p) => (kind ? p.kind === kind : true) && (p.status === "published" || p.status === "ongoing" || p.status === "experimental"));
}
var styles_default = "/assets/styles-CNbl_jfm.css";
var Route$13 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Minhazul Arefin" },
			{
				name: "description",
				content: "Independent practice across digital products, interactive systems, research, and visual storytelling."
			},
			{
				name: "theme-color",
				content: "#080808"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtelierProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$12 = () => import("./routes-CvqU_I3U.mjs");
var Route$12 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./about-CAShtY_7.mjs");
var Route$11 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./academia-DShavL-u.mjs");
var Route$10 = createFileRoute("/academia")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./cinema-B5Dx-qwP.mjs");
var Route$9 = createFileRoute("/cinema")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./contact-CPuqsXXR.mjs");
var Route$8 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./studio-L2WOBhfG.mjs");
var Route$7 = createFileRoute("/studio")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./visual-CSEAmmMp.mjs");
var Route$6 = createFileRoute("/visual")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./journal-c7EGQnh1.mjs");
var Route$5 = createFileRoute("/journal/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("../_slug-CnnBOO0r.mjs");
var Route$4 = createFileRoute("/journal/$slug")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./research-mVzmJllG.mjs");
var Route$3 = createFileRoute("/research/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_slug-ClSQBuRa.mjs");
var Route$2 = createFileRoute("/research/$slug")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./work-CKR6CsMN.mjs");
var Route$1 = createFileRoute("/work/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_slug-DPTlOvQh.mjs");
var Route = createFileRoute("/work/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AboutRoute = Route$11.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$13
});
var AcademiaRoute = Route$10.update({
	id: "/academia",
	path: "/academia",
	getParentRoute: () => Route$13
});
var CinemaRoute = Route$9.update({
	id: "/cinema",
	path: "/cinema",
	getParentRoute: () => Route$13
});
var ContactRoute = Route$8.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$13
});
var StudioRoute = Route$7.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$13
});
var VisualRoute = Route$6.update({
	id: "/visual",
	path: "/visual",
	getParentRoute: () => Route$13
});
var JournalIndexRoute = Route$5.update({
	id: "/journal/",
	path: "/journal/",
	getParentRoute: () => Route$13
});
var JournalSlugRoute = Route$4.update({
	id: "/journal/$slug",
	path: "/journal/$slug",
	getParentRoute: () => Route$13
});
var ResearchIndexRoute = Route$3.update({
	id: "/research/",
	path: "/research/",
	getParentRoute: () => Route$13
});
var ResearchSlugRoute = Route$2.update({
	id: "/research/$slug",
	path: "/research/$slug",
	getParentRoute: () => Route$13
});
var WorkIndexRoute = Route$1.update({
	id: "/work/",
	path: "/work/",
	getParentRoute: () => Route$13
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AcademiaRoute,
	CinemaRoute,
	ContactRoute,
	StudioRoute,
	VisualRoute,
	JournalSlugRoute,
	ResearchSlugRoute,
	WorkSlugRoute: Route.update({
		id: "/work/$slug",
		path: "/work/$slug",
		getParentRoute: () => Route$13
	}),
	JournalIndexRoute,
	ResearchIndexRoute,
	WorkIndexRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { publicPieces as a, Route$4 as i, Route as n, useAtelier as o, Route$2 as r, PATHS as s, router_exports as t };
