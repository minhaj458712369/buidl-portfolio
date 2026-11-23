import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as publicPieces, o as useAtelier } from "./router-LMAEgqxm.mjs";
import { r as Page } from "./frame-evv_LEZx.mjs";
import { n as PieceList } from "./lists-ttqx8NcN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-c7EGQnh1.js
var import_jsx_runtime = require_jsx_runtime();
function JournalIndex() {
	const { pieces } = useAtelier();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Journal",
		title: "Notes, not a feed.",
		lede: "Observations on design, simulation, photography, and process. Long pieces stay readable. New writing is added in Studio.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieceList, { pieces: publicPieces(pieces, "journal") })
	});
}
//#endregion
export { JournalIndex as component };
