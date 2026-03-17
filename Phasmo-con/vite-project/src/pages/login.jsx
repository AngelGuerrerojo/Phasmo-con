import { useState } from "react";

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({ correo: "", password: "", remember: false });

  const onSubmit = (e) => {
    e.preventDefault();
    console.table(form);
    alert("Sesión iniciada correctamente.");
    if (onSuccess) onSuccess();
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

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200" htmlFor="correo">
              Correo
            </label>
            <input
              id="correo"
              type="email"
              value={form.correo}
              onChange={(e) => setForm({ ...form, correo: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20"
              placeholder="tuemail@ejemplo.com"
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

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              className="h-4 w-4 rounded border-slate-700 bg-slate-900/60 text-cyan-500 focus:ring-cyan-500/40"
            />
            Recordarme
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:bg-cyan-400"
          >
            Entrar
          </button>
        </form>
      </section>
    </div>
  );
}
