import { useState } from "react";
import { Route, Routes } from "react-router";
import Layout from "../components/Layout";
import Index from "../pages/index";
import Projects from "../pages/projects";
import CrudFantasmas from "../pages/crud-fantasmas";
import CrudHerramientas from "../pages/crud-herramientas";
import Login from "../pages/login";

export default function AppRouter() {
  const [isAuthed, setIsAuthed] = useState(false);

  if (!isAuthed) {
    return <Login onSuccess={() => setIsAuthed(true)} />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/crud-fantasmas" element={<CrudFantasmas />} />
        <Route path="/crud-herramientas" element={<CrudHerramientas />} />
      </Route>
    </Routes>
  );
}
