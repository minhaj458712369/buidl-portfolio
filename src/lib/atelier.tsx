"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import initialData from "@/data/initial-content.json";
import type { Inquiry, Piece, Profile, SiteContent } from "@/data/content";

const LOCAL_KEY = "minhazul-atelier-next-v1";

type Store = {
  pieces: Piece[];
  profile: Profile;
  inquiries: Inquiry[];
  ready: boolean;
  loading: boolean;
  savePiece: (piece: Piece, targetSlug?: string) => Promise<boolean>;
  createPiece: (piece: Piece) => Promise<boolean>;
  deletePiece: (slug: string) => Promise<boolean>;
  saveProfile: (profile: Profile) => Promise<boolean>;
  deleteInquiry: (id: string) => Promise<boolean>;
  markInquiryRead: (id: string) => Promise<boolean>;
  reset: () => Promise<boolean>;
  importData: (data: SiteContent) => Promise<boolean>;
  refresh: () => Promise<void>;
};

const Ctx = createContext<Store | null>(null);

export function AtelierProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteContent>({
    profile: initialData.profile,
    pieces: initialData.pieces as Piece[],
    inquiries: (initialData.inquiries || []) as Inquiry[],
  });
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync to localStorage as backup cache
  const updateLocal = (next: SiteContent) => {
    setData(next);
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (res.ok) {
        const json = (await res.json()) as SiteContent;
        if (json && json.pieces && json.profile) {
          updateLocal(json);
          setReady(true);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not fetch remote content, using cached or seed data", e);
    }

    // fallback to localStorage
    try {
      const cached = localStorage.getItem(LOCAL_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.pieces && parsed.profile) {
          setData(parsed);
          setReady(true);
          return;
        }
      }
    } catch {
      // ignore
    }

    setReady(true);
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    try {
      const token = localStorage.getItem("minhazul_admin_token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    } catch {
      // ignore
    }
    return headers;
  };

  const savePiece = async (piece: Piece, targetSlug?: string): Promise<boolean> => {
    setLoading(true);
    // Optimistic update
    const prevPieces = [...data.pieces];
    const key = targetSlug || piece.slug;
    const exists = prevPieces.some((p) => p.slug === key);
    let updatedPieces: Piece[];
    if (exists) {
      updatedPieces = prevPieces.map((p) => (p.slug === key ? piece : p));
    } else {
      updatedPieces = [piece, ...prevPieces];
    }
    const nextData = { ...data, pieces: updatedPieces };
    updateLocal(nextData);

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "update_piece", piece, targetSlug }),
      });
      if (res.ok) {
        const resJson = await res.json();
        if (resJson.data) updateLocal(resJson.data);
      }
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Save piece error:", err);
      setLoading(false);
      return false;
    }
  };

  const createPiece = async (piece: Piece): Promise<boolean> => {
    setLoading(true);
    const nextData = { ...data, pieces: [piece, ...data.pieces] };
    updateLocal(nextData);

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "create_piece", piece }),
      });
      if (res.ok) {
        const resJson = await res.json();
        if (resJson.data) updateLocal(resJson.data);
      }
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Create piece error:", err);
      setLoading(false);
      return false;
    }
  };

  const deletePiece = async (slug: string): Promise<boolean> => {
    setLoading(true);
    const nextPieces = data.pieces.filter((p) => p.slug !== slug);
    const nextData = { ...data, pieces: nextPieces };
    updateLocal(nextData);

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "delete_piece", slug }),
      });
      if (res.ok) {
        const resJson = await res.json();
        if (resJson.data) updateLocal(resJson.data);
      }
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Delete piece error:", err);
      setLoading(false);
      return false;
    }
  };

  const saveProfile = async (nextProfile: Profile): Promise<boolean> => {
    setLoading(true);
    const nextData = { ...data, profile: nextProfile };
    updateLocal(nextData);

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "update_profile", profile: nextProfile }),
      });
      if (res.ok) {
        const resJson = await res.json();
        if (resJson.data) updateLocal(resJson.data);
      }
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Save profile error:", err);
      setLoading(false);
      return false;
    }
  };

  const deleteInquiry = async (id: string): Promise<boolean> => {
    setLoading(true);
    const nextInquiries = (data.inquiries || []).filter((inq) => inq.id !== id);
    const nextData = { ...data, inquiries: nextInquiries };
    updateLocal(nextData);

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "delete_inquiry", id }),
      });
      if (res.ok) {
        const resJson = await res.json();
        if (resJson.data) updateLocal(resJson.data);
      }
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Delete inquiry error:", err);
      setLoading(false);
      return false;
    }
  };

  const markInquiryRead = async (id: string): Promise<boolean> => {
    const nextInquiries = (data.inquiries || []).map((inq) =>
      inq.id === id ? { ...inq, read: true } : inq
    );
    const nextData = { ...data, inquiries: nextInquiries };
    updateLocal(nextData);

    try {
      await fetch("/api/content", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "mark_inquiry_read", id }),
      });
      return true;
    } catch {
      return false;
    }
  };

  const reset = async (): Promise<boolean> => {
    setLoading(true);
    const resetData = JSON.parse(JSON.stringify(initialData)) as SiteContent;
    updateLocal(resetData);

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "reset" }),
      });
      if (res.ok) {
        const resJson = await res.json();
        if (resJson.data) updateLocal(resJson.data);
      }
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Reset error:", err);
      setLoading(false);
      return false;
    }
  };

  const importData = async (incoming: SiteContent): Promise<boolean> => {
    setLoading(true);
    updateLocal(incoming);

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ action: "import", content: incoming }),
      });
      if (res.ok) {
        const resJson = await res.json();
        if (resJson.data) updateLocal(resJson.data);
      }
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Import error:", err);
      setLoading(false);
      return false;
    }
  };

  const value: Store = {
    pieces: data.pieces,
    profile: data.profile,
    inquiries: data.inquiries || [],
    ready,
    loading,
    savePiece,
    createPiece,
    deletePiece,
    saveProfile,
    deleteInquiry,
    markInquiryRead,
    reset,
    importData,
    refresh: fetchContent,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAtelier() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAtelier must be used within AtelierProvider");
  return ctx;
}

export function publicPieces(pieces: Piece[], kind?: Piece["kind"]) {
  if (!Array.isArray(pieces)) return [];
  return pieces.filter(
    (p) =>
      (kind ? p.kind === kind : true) &&
      (p.status === "published" || p.status === "ongoing" || p.status === "experimental")
  );
}
