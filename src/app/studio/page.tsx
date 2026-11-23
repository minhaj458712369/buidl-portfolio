"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyStudioRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 text-center text-xs font-mono uppercase tracking-widest text-muted">
      Redirecting to Admin Portal...
    </div>
  );
}
