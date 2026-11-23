"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminIndexRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/cms");
  }, [router]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 text-center text-xs font-mono uppercase tracking-widest text-muted">
      Accessing Admin Portal...
    </div>
  );
}
