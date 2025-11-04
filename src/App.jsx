// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Si más adelante querés agregar otras páginas: 
          <Route path="/proyecto/:id" element={<ProjectPage />} /> */}
    </Routes>
  );
}