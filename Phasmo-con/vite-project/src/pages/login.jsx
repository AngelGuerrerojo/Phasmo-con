import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const contentType = resp.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await resp.json() : await resp.text();
      if (!resp.ok) {
        throw new Error(typeof data === "string" ? data : data?.message || "Error al iniciar sesión");
      }
      alert(`Sesión iniciada correctamente. Bienvenido, ${data.user.username}`);
      if (onSuccess) onSuccess(data.user);
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 flex items-center justify-center px-4">
      <section className="w-full max-w-xl space-y-4 rounded-2xl border border-slate-800 bg-[#0f162b] p-6 shadow-2xl shadow-cyan-500/15">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-cyan-100" style={{ fontFamily: '"Special Elite", monospace' }}>
            Inicia sesión
          </h1>
          <p className="text-slate-300">Accede al panel de Phas-con.</p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200" htmlFor="username">
              Usuario
            </label>
            <input
              id="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20"
              placeholder="tu_usuario"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:bg-cyan-400 disabled:opacity-60"
          >
            {loading ? "Procesando..." : "Entrar"}
          </button>
        </form>
      </section>
    </div>
  );
}
