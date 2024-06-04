import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Usuario from "../entidades/Usuario";
import { Roles } from "../entidades/Roles";

function MenuOpciones() {
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    localStorage.setItem("usuario", "");
    localStorage.removeItem("usuario");
    navigate("/login", {
      replace: true,
      state: {
        logged: false,
      },
    });
  };

  const [jsonUsuario] = useState<any>(localStorage.getItem("usuario"));
  console.log("JSON " + jsonUsuario);
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

  return (
    <>
      <div className="navbar">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a className="nav-link" aria-current="true" href="/home">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/DondeEstamos">
              Donde Estamos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/menu">
              Productos
            </a>
          </li>
          <li className="nav-item">
            {usuarioLogueado?.rol === Roles.ADMIN && (
              <a className="nav-link" href="/grilla">
                Grilla
              </a>
            )}
          </li>
          <li className="nav-item">
            {usuarioLogueado?.rol === Roles.ADMIN && (
              <a className="nav-link" href="/graficos">
                Gráficos
              </a>
            )}
          </li>

          <li>
            <a className="nav-link">
              Usuario: {usuarioLogueado?.usuario} -{" "}
              {usuarioLogueado?.rol == Roles.ADMIN ? "Admin" : "Común"}
            </a>
          </li>

          <li className="nav-item">
            <button
              onClick={cerrarSesion}
              className="btn btn-success"
              type="button"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
export default MenuOpciones;
