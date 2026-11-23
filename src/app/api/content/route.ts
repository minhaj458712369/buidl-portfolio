import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSiteContent, saveSiteContent } from "@/lib/server-storage";
import { verifyToken, COOKIE_NAME } from "@/lib/auth-server";
import initialData from "@/data/initial-content.json";
import type { Piece, Profile, SiteContent } from "@/data/content";

export async function GET() {
  try {
    const data = await getSiteContent();
    return NextResponse.json(data);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Verify admin authentication for all content mutations (Cookie or Bearer token)
    const authHeader = request.headers.get("authorization");
    const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get(COOKIE_NAME)?.value;
    const token = headerToken || cookieToken;

    const isAuthed = await verifyToken(token);

    if (!isAuthed) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to the admin CMS." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const current = await getSiteContent();

    switch (body.action) {
      case "create_piece": {
        const piece = body.piece as Piece;
        if (!piece || !piece.slug) {
          return NextResponse.json({ error: "Invalid piece payload" }, { status: 400 });
        }
        const exists = current.pieces.some((p) => p.slug === piece.slug);
        const slug = exists ? `${piece.slug}-${Date.now().toString(36)}` : piece.slug;
        const newPiece = { ...piece, slug };
        current.pieces = [newPiece, ...current.pieces];
        await saveSiteContent(current);
        return NextResponse.json({ success: true, piece: newPiece, data: current });
      }

      case "update_piece": {
        const piece = body.piece as Piece;
        const targetSlug = body.targetSlug || piece.slug;
        if (!piece) {
          return NextResponse.json({ error: "Invalid piece payload" }, { status: 400 });
        }
        const index = current.pieces.findIndex((p) => p.slug === targetSlug);
        if (index === -1) {
          current.pieces.unshift(piece);
        } else {
          current.pieces[index] = piece;
        }
        await saveSiteContent(current);
        return NextResponse.json({ success: true, piece, data: current });
      }

      case "delete_piece": {
        const slug = body.slug as string;
        if (!slug) {
          return NextResponse.json({ error: "Missing slug" }, { status: 400 });
        }
        current.pieces = current.pieces.filter((p) => p.slug !== slug);
        await saveSiteContent(current);
        return NextResponse.json({ success: true, data: current });
      }

      case "update_profile": {
        const profile = body.profile as Profile;
        if (!profile) {
          return NextResponse.json({ error: "Invalid profile payload" }, { status: 400 });
        }
        current.profile = profile;
        await saveSiteContent(current);
        return NextResponse.json({ success: true, data: current });
      }

      case "delete_inquiry": {
        const id = body.id as string;
        current.inquiries = (current.inquiries || []).filter((inq) => inq.id !== id);
        await saveSiteContent(current);
        return NextResponse.json({ success: true, data: current });
      }

      case "mark_inquiry_read": {
        const id = body.id as string;
        current.inquiries = (current.inquiries || []).map((inq) =>
          inq.id === id ? { ...inq, read: true } : inq
        );
        await saveSiteContent(current);
        return NextResponse.json({ success: true, data: current });
      }

      case "reset": {
        const resetData = JSON.parse(JSON.stringify(initialData)) as SiteContent;
        await saveSiteContent(resetData);
        return NextResponse.json({ success: true, data: resetData });
      }

      case "import": {
        const imported = body.content as SiteContent;
        if (!imported || !imported.pieces || !imported.profile) {
          return NextResponse.json({ error: "Invalid content structure" }, { status: 400 });
        }
        await saveSiteContent(imported);
        return NextResponse.json({ success: true, data: imported });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
