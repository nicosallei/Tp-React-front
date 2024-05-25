import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Producto from "./componentes/Menu.tsx";
import DetalleInstrumento from "./componentes/DetalleInstrumento.tsx";
import Home from "./Home.tsx";
import DondeEstamos from "./DondeEstamos.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RutaPrivada } from "./controlAcceso/RutaPrivada.tsx";
import LoaderPage from "./componentes/LoaderPage.tsx";
import { Roles } from "./entidades/Roles.ts";
import RolUsuario from "./controlAcceso/RolUsuario.tsx";
import Login from "./componentes/Login.tsx";
//lazy -> técnica de carga diferida, el componente se carga cuando se necesita y NO desde el inicio
//ayudar a reducir el tiempo de carga inicial de la aplicación y a mejorar la velocidad de navegación

const Menu = lazy(() => import("./componentes/Menu"));
const GrillaInstrumento = lazy(() => import("./componentes/GrillaInstrumento"));
const CheckoutMP = lazy(() => import("./componentes/CheckoutMP"));
const Formulario = lazy(() => import("./componentes/Formulario"));
const TestLoad = lazy(() => import("./componentes/TestLoad"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<LoaderPage></LoaderPage>}>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route index element={<Producto />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/menu"
            element={
              <RutaPrivada>
                <Producto />
              </RutaPrivada>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/DondeEstamos" element={<DondeEstamos />} />
          <Route path="/detalle">
            <Route path=":idInstrumento" element={<DetalleInstrumento />} />
          </Route>
          <Route
            path="/grilla"
            element={
              <RutaPrivada>
                <RolUsuario rol={Roles.ADMIN}>
                  <GrillaInstrumento />
                </RolUsuario>
              </RutaPrivada>
            }
          />
          <Route element={<RolUsuario rol={Roles.ADMIN} />}>
            <Route path="/formulario/:idInstrumento" element={<Formulario />} />
          </Route>
          <Route path="/loading" element={<TestLoad />} />
          <Route path="*" element={<Producto />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
