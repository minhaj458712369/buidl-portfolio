import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/server-storage";
import type { Inquiry } from "@/data/content";

export async function POST(request: Request) {
  try {
    const { name, about, message } = await request.json();
    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    const current = await getSiteContent();
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      about: String(about || "").trim(),
      message: String(message).trim(),
      at: new Date().toISOString(),
      read: false,
    };

    if (!Array.isArray(current.inquiries)) {
      current.inquiries = [];
    }
    current.inquiries.unshift(newInquiry);
    await saveSiteContent(current);

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    console.error("Failed to save inquiry:", error);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
