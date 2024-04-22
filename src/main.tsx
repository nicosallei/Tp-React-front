import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Producto from "./componentes/Menu.tsx";
import DetalleInstrumento from "./componentes/DetalleInstrumento.tsx";
import Home from "./Home.tsx";
import DondeEstamos from "./DondeEstamos.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Producto />} />
        <Route path="/menu" element={<Producto />} />
        <Route path="/home" element={<Home />} />
        <Route path="/DondeEstamos" element={<DondeEstamos />} />
        <Route path="/detalle">
          <Route path=":idInstrumento" element={<DetalleInstrumento />} />
        </Route>

        <Route path="*" element={<Producto />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
