import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SEED_PIECES,
  SEED_PROFILE,
  type Piece,
  type Profile,
} from "@/data/content";

const KEY = "minhazul-atelier-v1";

type Store = {
  pieces: Piece[];
  profile: Profile;
  ready: boolean;
  savePiece: (piece: Piece) => void;
  saveProfile: (profile: Profile) => void;
  reset: () => void;
};

const Ctx = createContext<Store | null>(null);

type Saved = { pieces?: Piece[]; profile?: Profile };

export function AtelierProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Saved>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSaved(JSON.parse(raw) as Saved);
    } catch {
      /* ignore broken local data */
    }
    setReady(true);
  }, []);

  const persist = (next: Saved) => {
    setSaved(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const pieces = useMemo(() => {
    const map = new Map(SEED_PIECES.map((p) => [p.slug, p]));
    for (const p of saved.pieces ?? []) map.set(p.slug, p);
    return [...map.values()];
  }, [saved.pieces]);

  const profile = saved.profile ?? SEED_PROFILE;

  const value: Store = {
    pieces,
    profile,
    ready,
    savePiece: (piece) => {
      const others = (saved.pieces ?? []).filter((p) => p.slug !== piece.slug);
      persist({ ...saved, pieces: [...others, piece] });
    },
    saveProfile: (next) => persist({ ...saved, profile: next }),
    reset: () => {
      localStorage.removeItem(KEY);
      setSaved({});
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAtelier() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("AtelierProvider missing");
  return ctx;
}

export function publicPieces(pieces: Piece[], kind?: Piece["kind"]) {
  return pieces.filter(
    (p) =>
      (kind ? p.kind === kind : true) &&
      (p.status === "published" || p.status === "ongoing" || p.status === "experimental"),
  );
}
