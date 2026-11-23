import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  authenticate,
  verifyToken,
  invalidateSession,
  updatePassword,
  COOKIE_NAME,
} from "@/lib/auth-server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(COOKIE_NAME)?.value;
  const token = headerToken || cookieToken;

  const valid = await verifyToken(token);
  return NextResponse.json({ authenticated: valid });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action || "login";

    if (action === "login") {
      const { username, password } = body;
      if (!username || !password) {
        return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
      }

      const token = await authenticate(username, password);
      if (!token) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
      }

      const isHttps = request.url.startsWith("https://");
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: isHttps,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        message: "Logged in successfully",
        token,
      });
    }

    if (action === "logout") {
      const authHeader = request.headers.get("authorization");
      const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
      const cookieStore = await cookies();
      const cookieToken = cookieStore.get(COOKIE_NAME)?.value;
      const token = headerToken || cookieToken;

      if (token) {
        await invalidateSession(token);
      }
      cookieStore.delete(COOKIE_NAME);
      return NextResponse.json({ success: true, message: "Logged out successfully" });
    }

    if (action === "change_password") {
      const authHeader = request.headers.get("authorization");
      const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
      const cookieStore = await cookies();
      const cookieToken = cookieStore.get(COOKIE_NAME)?.value;
      const token = headerToken || cookieToken;

      const valid = await verifyToken(token);
      if (!valid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { newPassword } = body;
      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters long" },
          { status: 400 }
        );
      }

      await updatePassword(newPassword);
      return NextResponse.json({ success: true, message: "Password updated successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
