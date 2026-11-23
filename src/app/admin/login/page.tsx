"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Successfully authenticated
      if (data.token) {
        localStorage.setItem("minhazul_admin_token", data.token);
      }
      router.push("/admin/cms");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col justify-between p-6">
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full pt-4">
        <Link
          href="/"
          className="font-display text-sm tracking-wide text-fg hover:text-accent transition-colors"
        >
          ← Back to Site
        </Link>
        <span className="text-[11px] font-mono tracking-widest text-faint uppercase">
          Private Access
        </span>
      </div>

      <div className="w-full max-w-md mx-auto my-12 border border-line bg-surface p-8 shadow-xl">
        <div className="border-b border-line pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="bg-accent px-2 py-0.5 text-[10px] font-bold tracking-widest text-accent-ink uppercase">
              Restricted
            </span>
            <span className="text-xs font-mono text-faint uppercase">CMS Portal</span>
          </div>
          <h1 className="font-display text-3xl mt-2">Studio Login</h1>
          <p className="text-xs text-muted mt-1 leading-relaxed">
            Authentication required to manage site pieces, visual assets, profile details, and inquiries.
          </p>
        </div>

        {error && (
          <div className="mb-5 border border-red-800/30 bg-red-500/10 p-3 text-xs text-red-900 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block text-sm">
            <span className="font-semibold text-fg">Username or Email</span>
            <input
              required
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full border border-line bg-bg px-3.5 py-2.5 text-sm text-fg outline-none focus:border-accent"
              placeholder="admin"
            />
          </label>

          <label className="block text-sm">
            <span className="font-semibold text-fg">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-line bg-bg px-3.5 py-2.5 text-sm text-fg outline-none focus:border-accent"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-accent px-4 py-3 text-xs font-bold tracking-widest uppercase text-accent-ink hover:bg-hot transition-colors disabled:opacity-50 cursor-pointer shadow"
          >
            {loading ? "Verifying..." : "Sign In to Studio"}
          </button>
        </form>

        {/* Credentials Note */}
        <div className="mt-8 border-t border-line/60 pt-4 text-xs text-muted">
          <p className="text-[11px] text-faint text-center">
            Enter your configured admin credentials to manage content and visual assets.
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-faint pb-4">
        Minhazul Arefin — Private Content Management System
      </div>
    </div>
  );
}
