// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import CatalogPage from "./pages/CatalogPage";
import AboutPage from "./pages/AboutPage";
import GodDetailPage from "./pages/GodDetailPage";
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<CatalogPage />} />
        <Route path="/:category/:id" element={<GodDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
