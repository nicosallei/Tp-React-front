import { useMemo, useState } from "react";
import "./ItemInstrumento.css";
import Categoria from "../../../entidades/Categoria";
import Instrumento from "../../../entidades/Instrumento";
import { useCarrito } from "../../../hooks/useCarrito";
import addCart from "../../../assets/img/addCart.png";
import deleteCart from "../../../assets/img/deleteCart.png";
import pdfIcon from "../../../assets/img/pdf.png";
import { descargarPdf } from "../../../servicios/FuncionesApi";
import DetalleInstrumento from "./DetalleInstrumento";

type InstrumentoParams = {
  id: number;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  descripcion: string;
  categoria?: Categoria;
  initialHayStock: boolean;
  isProductInCart?: boolean;
  instrumentoObject: Instrumento;
};

function ItemInstrumento(arg: InstrumentoParams) {
  const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const isPlatoInCarrito = useMemo(() => {
    for (let detalle of cart) {
      if (detalle.instrumento?.id === arg.instrumentoObject.id) {
        return true;
      }
    }
    return false;
  }, [cart, arg.instrumentoObject.id]);

  const handlePdfDownload = async (id: number, nombreInstrumento: string) => {
    try {
      await descargarPdf(id, nombreInstrumento);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };
  // Función para abrir el modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const renderCostoEnvio = () => {
    if (arg.costoEnvio === "G") {
      return (
        <span style={{ color: "green" }}>
          <i className="fas fa-car" style={{ opacity: 0.5 }}></i>{" "}
          <img
            src={"/images/camion.png"}
            alt="Descripción de la imagen"
            style={{ width: "20px", height: "20px" }}
          />{" "}
          Envio gratis a todo el pais
        </span>
      );
    } else {
      return (
        <span style={{ color: "orange" }}>
          Costo de envio interior de Argentina: ${arg.costoEnvio}
        </span>
      );
    }
  };

  return (
    <>
      <div className="card mb-3 ">
        <img
          src={pdfIcon}
          alt="Descargar PDF"
          onClick={() => handlePdfDownload(arg.id, arg.instrumento)}
          style={{
            cursor: "pointer", // Esto hace que el cursor se convierta en una mano al pasar sobre el icono
            width: "42px", // Esto hace que la imagen sea más pequeña
            position: "absolute", // Esto posiciona la imagen en relación con la tarjeta
            right: "30px", // Esto mueve la imagen al extremo derecho de la tarjeta
            top: "30px", // Esto posiciona la imagen en la parte superior de la tarjeta
          }}
        />
        <div className="row g-0 ">
          <div className="col-md-3 ">
            <img
              src={`http://localhost:8080/images/${arg.imagen}`}
              className="card-img"
              alt={arg.imagen}
            />
          </div>
          <div className="col-md-9">
            <div className="card-body ">
              <h5 className="card-title">{arg.instrumento}</h5>
              <p className="card-text">Precio: ${arg.precio}</p>
              <p className="card-text">{renderCostoEnvio()}</p>

              <p className="card-text">vendidos: {arg.cantidadVendida}</p>
              <a href={`detalle/${arg.id}`}>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={(event) => {
                    event.preventDefault(); // Previene la navegación
                    openModal();
                  }}
                >
                  Detalle
                </button>
              </a>
              <hr></hr>
              <p>
                <a
                  className="iconoMasMenos"
                  onClick={() => removeItemCarrito(arg.instrumentoObject)}
                >
                  -
                </a>
                <button
                  className="colorFondoBlanco"
                  onClick={() => {
                    isPlatoInCarrito
                      ? removeCarrito(arg.instrumentoObject)
                      : addCarrito(arg.instrumentoObject);
                  }}
                >
                  {isPlatoInCarrito ? (
                    <img src={deleteCart} title="Quitar" />
                  ) : (
                    <img src={addCart} title="Comprar" />
                  )}
                </button>
                <a
                  className="iconoMasMenos"
                  onClick={() => addCarrito(arg.instrumentoObject)}
                >
                  +
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <DetalleInstrumento
        isOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal} // Pasamos la función closeModal como prop
        instrumento={arg.instrumentoObject}
      />
    </>
  );
}
export default ItemInstrumento;
