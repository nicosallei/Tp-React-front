import { useState, useEffect } from "react";
import instrumentos from "../entidades/Instrumento";
import { useParams } from "react-router-dom";
import Instrumento from "../entidades/Instrumento";
import { getInstrumentoXIdFetch } from "../servicios/FuncionesApi";
import "../componentes/css/ItemInstrumento.css";
import MenuOpciones from "./MenuOpciones";

function DetalleInstrumento() {
  const { idInstrumento } = useParams();
  const [instrumento, setInstrumento] = useState<instrumentos>();
  const getInstrumento = async () => {
    const intrumentoSelect: Instrumento = await getInstrumentoXIdFetch(
      Number(idInstrumento)
    );
    setInstrumento(intrumentoSelect);
  };

  useEffect(() => {
    getInstrumento();
  }, []);

  function renderCostoEnvio() {
    if (instrumento?.costoEnvio === "G") {
      return (
        <span style={{ color: "green" }}>
          <i className="fas fa-car" style={{ opacity: 0.5 }}></i>{" "}
          {/* Add the vehicle icon here */}
          <img
            src={"/images/camion.png"}
            alt="Descripción de la imagen"
            style={{ width: "20px", height: "20px" }}
          />{" "}
          {/* Add the image here */}
          Envio gratis
        </span>
      );
    } else {
      return (
        <span style={{ color: "orange" }}>
          Costo de envio interior de Argentina: ${instrumento?.costoEnvio}
        </span>
      );
    }
  }

  return (
    <>
      <div className="container-fluid text-center">
        <MenuOpciones></MenuOpciones>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-6 card-body">
              <img
                src={"/images/" + instrumento?.imagen}
                className="card-img-top img-altura"
                alt={instrumento?.imagen}
              />
              <h6>Descripción</h6>
              <p className="card-text">{instrumento?.descripcion}</p>
            </div>
            <div
              className="col-md-6"
              style={{ borderLeft: "1px solid rgba(0,0,0,0.1)" }}
            >
              <div className="card-body">
                <p className="card-text">
                  {instrumento?.cantidadVendida} vendidos
                </p>
                <h6 className="card-title instrumento-title">
                  <strong>{instrumento?.instrumento}</strong>
                </h6>
                <p className="card-text precio-text">
                  <strong>${instrumento?.precio}</strong>
                </p>
                <div className="marca-modelo">
                  <p className="card-text">
                    <strong>Marca: {instrumento?.marca}</strong>
                  </p>
                  <p className="card-text">
                    <strong>Modelo: {instrumento?.modelo}</strong>
                  </p>
                </div>

                <h6 className="costo-envio">
                  <strong>Costo Envio:</strong>
                </h6>
                <p className="card-text">{renderCostoEnvio()}</p>

                <a href="#" className="btn btn-primary btn-mercado-libre">
                  Agregar al carrito
                </a>
              </div>
              <div className="card-footer text-body-secondary">
                <a href="/menu">
                  <button type="button" className="btn btn-success">
                    Volver
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DetalleInstrumento;
