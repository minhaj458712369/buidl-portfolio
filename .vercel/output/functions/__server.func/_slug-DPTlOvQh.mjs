import { x as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route, o as useAtelier } from "./_ssr/router-LMAEgqxm.mjs";
import { r as Page } from "./_ssr/frame-evv_LEZx.mjs";
import { t as PieceBody } from "./_ssr/lists-ttqx8NcN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DPTlOvQh.js
var import_jsx_runtime = require_jsx_runtime();
function WorkPiece() {
	const { slug } = Route.useParams();
	const { pieces } = useAtelier();
	const piece = pieces.find((p) => p.kind === "work" && p.slug === slug);
	if (!piece) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Work",
		title: "Not found",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/work",
			className: "text-accent",
			children: "Back to work"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: piece.kicker,
		title: piece.title,
		lede: piece.summary,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieceBody, { piece })
	});
}
//#endregion
export { WorkPiece as component };
