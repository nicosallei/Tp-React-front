import { useState, useEffect } from "react";
import Instrumento from "../entidades/Instrumento";
import "../componentes/css/ItemInstrumento.css";
import { Modal } from "antd";

type DetalleInstrumentoProps = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  instrumento: Instrumento;
  modalStyle?: React.CSSProperties;
};

function DetalleInstrumento({
  isOpen,
  closeModal,
  instrumento,
}: DetalleInstrumentoProps) {
  const [instrumentoData, setInstrumento] = useState<Instrumento>(instrumento);

  useEffect(() => {
    setInstrumento(instrumento);
  }, [instrumento]);

  function renderCostoEnvio() {
    if (instrumentoData?.costoEnvio === "G") {
      return (
        <span style={{ color: "green" }} className="responsive-text">
          <i className="fas fa-car" style={{ opacity: 0.5 }}></i>{" "}
          <img
            src={"/images/camion.png"}
            alt="Descripción de la imagen"
            style={{ width: "20px", height: "20px" }}
          />{" "}
          Envio gratis
        </span>
      );
    } else {
      return (
        <span style={{ color: "orange" }} className="responsive-text">
          Costo de envio interior de Argentina: ${instrumentoData?.costoEnvio}
        </span>
      );
    }
  }

  return (
    <>
      <Modal
        visible={isOpen}
        onCancel={closeModal}
        width="85%"
        centered
        bodyStyle={{
          height: "85%",
          margin: "auto",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        }}
        footer={null}
      >
        <div className="container-fluid text-start fs-5 fs-md-2 responsive-text">
          <div className="row g-0">
            <div className="col-md-6 card-body">
              <img
                src={"/images/" + instrumentoData?.imagen}
                className="card-img-top img-fluid"
                alt={instrumentoData?.imagen}
              />
            </div>
            <div
              className="col-md-6 text-start"
              style={{ borderLeft: "1px solid rgba(0,0,0,0.1)" }}
            >
              <div className="card-body">
                <h6 className="card-title instrumento-title responsive-text">
                  <strong>{instrumentoData?.instrumento}</strong>
                </h6>
                <p className="card-text precio-text responsive-text">
                  <strong>${instrumentoData?.precio}</strong>
                </p>

                <div className="marca-modelo mb-0">
                  <p className="card-text responsive-text">
                    <strong>Marca: {instrumentoData?.marca}</strong>
                  </p>
                  <p className="card-text responsive-text">
                    <strong>Modelo: {instrumentoData?.modelo}</strong>
                  </p>
                </div>

                <h6 className="costo-envio mt-1 responsive-text">
                  <strong>Costo Envio:</strong>
                </h6>
                <p className="card-text responsive-text">
                  {renderCostoEnvio()}
                </p>

                <a
                  href="#"
                  className="btn btn-primary btn-mercado-libre responsive-text"
                  style={{
                    fontSize: "0.8rem",
                    width: "30%",
                    padding: "0.5em 0",
                  }} // Ajustar el tamaño de la fuente y el ancho
                >
                  Agregar al carrito
                </a>
              </div>
              <div className="card-footer text-body-secondary">
                {/* <a href="/menu">
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{
                      fontSize: "0.8rem",
                      width: "30%",
                      padding: "0.5em 0",
                    }} // Ajustar el tamaño de la fuente y el ancho
                  >
                    Volver
                  </button>
                </a> */}
              </div>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-12 card-body text-start fs-6 fs-md-2">
              <h6 className="responsive-text">Descripción</h6>
              <p className="card-text responsive-text">
                {instrumentoData?.descripcion}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DetalleInstrumento;
