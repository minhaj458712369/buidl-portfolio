import { x as require_jsx_runtime, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as Route$4, o as useAtelier } from "./_ssr/router-LMAEgqxm.mjs";
import { r as Page } from "./_ssr/frame-evv_LEZx.mjs";
import { t as PieceBody } from "./_ssr/lists-ttqx8NcN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CnnBOO0r.js
var import_jsx_runtime = require_jsx_runtime();
function JournalPiece() {
	const { slug } = Route$4.useParams();
	const { pieces } = useAtelier();
	const piece = pieces.find((p) => p.kind === "journal" && p.slug === slug);
	if (!piece) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Journal",
		title: "Not found",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/journal",
			children: "Back"
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
export { JournalPiece as component };
