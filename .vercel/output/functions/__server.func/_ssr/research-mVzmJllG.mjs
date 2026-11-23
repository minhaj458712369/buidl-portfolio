import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as publicPieces, o as useAtelier } from "./router-LMAEgqxm.mjs";
import { r as Page } from "./frame-evv_LEZx.mjs";
import { n as PieceList } from "./lists-ttqx8NcN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/research-mVzmJllG.js
var import_jsx_runtime = require_jsx_runtime();
function ResearchIndex() {
	const { pieces } = useAtelier();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Research & academia",
		title: "Questions in progress.",
		lede: "Independent inquiry beside academic study at the Department of Multimedia and Creative Technology, Daffodil International University, 2022–2026. Published work is listed only when a real document exists.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieceList, { pieces: publicPieces(pieces, "research") })
	});
}
//#endregion
export { ResearchIndex as component };
