import { useState } from "react";

const initial = [
  { id: 1, nombre: "Libro de escritura", precio: 35, stock: 4 },
  { id: 2, nombre: "Camara de video", precio: 60, stock: 2 },
];

export default function CrudHerramientas() {
  const [productos, setProductos] = useState(initial);
  const [form, setForm] = useState({ id: null, nombre: "", precio: "", stock: "" });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.stock) return;

    if (form.id) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id === form.id
            ? { ...p, ...form, precio: Number(form.precio), stock: Number(form.stock) }
            : p
        )
      );
    } else {
      const nextId = Math.max(0, ...productos.map((p) => p.id)) + 1;
      setProductos((prev) => [
        ...prev,
        { ...form, id: nextId, precio: Number(form.precio), stock: Number(form.stock) },
      ]);
    }
    setForm({ id: null, nombre: "", precio: "", stock: "" });
  };

  const editRow = (prod) => setForm({ ...prod });
  const deleteRow = (id) => setProductos((prev) => prev.filter((p) => p.id !== id));

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-cyan-100" style={{ fontFamily: '"Special Elite", monospace' }}>
          CRUD de herramientas
        </h2>
        <p className="text-slate-300">Crea, edita y elimina equipo del inventario.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-800 bg-[#0f162b] p-5 shadow-lg shadow-cyan-500/10 space-y-3"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm text-slate-200 sm:col-span-2">
              Nombre
              <input
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </label>
            <label className="text-sm text-slate-200">
              Precio
              <input
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20"
                value={form.precio}
                onChange={(e) => setForm({ ...form, precio: e.target.value })}
                type="number"
                min="0"
              />
            </label>
            <label className="text-sm text-slate-200">
              Stock
              <input
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                type="number"
                min="0"
              />
            </label>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:bg-cyan-400"
            >
              {form.id ? "Actualizar" : "Crear"}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={() => setForm({ id: null, nombre: "", precio: "", stock: "" })}
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-100"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-[#0f162b] p-5 shadow-lg shadow-cyan-500/10">
          <h3 className="text-lg font-semibold text-cyan-100">Listado</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Nombre</th>
                  <th className="px-3 py-2">Precio</th>
                  <th className="px-3 py-2">Stock</th>
                  <th className="px-3 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id} className="border-b border-slate-800/60 hover:bg-slate-900/40">
                    <td className="px-3 py-2 text-slate-300">{prod.id}</td>
                    <td className="px-3 py-2 text-slate-100">{prod.nombre}</td>
                    <td className="px-3 py-2">${prod.precio}</td>
                    <td className="px-3 py-2">{prod.stock}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => editRow(prod)}
                          className="rounded-lg border border-slate-700 px-2 py-1 text-xs font-semibold text-slate-100 transition hover:border-cyan-400"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setConfirmDelete(prod)}
                          className="rounded-lg border border-red-400/60 px-2 py-1 text-xs font-semibold text-red-200 transition hover:bg-red-500/10"
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
          <div className="w-full max-w-md rounded-2xl border border-red-500/40 bg-[#0b1020] p-6 shadow-2xl shadow-red-500/30">
            <h3 className="text-xl font-semibold text-red-200">Confirmar eliminación</h3>
            <p className="mt-2 text-sm text-slate-200">
              ¿Eliminar la herramienta <span className="font-semibold text-red-100">{confirmDelete.nombre}</span>?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-100"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteRow(confirmDelete.id);
                  setConfirmDelete(null);
                }}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-red-500/30 transition hover:-translate-y-0.5 hover:bg-red-400"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
