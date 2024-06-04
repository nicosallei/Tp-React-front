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
import Registro from "./componentes/CrearUsuario.tsx";
//lazy -> técnica de carga diferida, el componente se carga cuando se necesita y NO desde el inicio
//ayudar a reducir el tiempo de carga inicial de la aplicación y a mejorar la velocidad de navegación

const Menu = lazy(() => import("./componentes/Menu"));
const GrillaInstrumento = lazy(() => import("./componentes/GrillaInstrumento"));
const CheckoutMP = lazy(() => import("./componentes/CheckoutMP"));
const Formulario = lazy(() => import("./componentes/Formulario"));
const TestLoad = lazy(() => import("./componentes/TestLoad"));
const Graficos = lazy(() => import("./componentes/ChartsGoogle.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<LoaderPage></LoaderPage>}>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/menu"
            element={
              <RutaPrivada>
                <Producto />
              </RutaPrivada>
            }
          />

          <Route
            path="/home"
            element={
              <RutaPrivada>
                <Home />
              </RutaPrivada>
            }
          />
          <Route
            path="/DondeEstamos"
            element={
              <RutaPrivada>
                <DondeEstamos />
              </RutaPrivada>
            }
          />
          <Route path="/detalle">
            <Route
              path=":idInstrumento"
              element={
                <RutaPrivada>
                  <DetalleInstrumento />
                </RutaPrivada>
              }
            />
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
          <Route
            path="/formulario/:idInstrumento"
            element={
              <RutaPrivada>
                <RolUsuario rol={Roles.ADMIN}>
                  <Formulario />
                </RolUsuario>
              </RutaPrivada>
            }
          />
          <Route
            path="/graficos"
            element={
              <RutaPrivada>
                <RolUsuario rol={Roles.ADMIN}>
                  <Graficos />
                </RolUsuario>
              </RutaPrivada>
            }
          />
          <Route
            path="/loading"
            element={
              <RutaPrivada>
                <TestLoad />
              </RutaPrivada>
            }
          />
          <Route
            path="*"
            element={
              <RutaPrivada>
                <Home />
              </RutaPrivada>
            }
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
