import { useMemo } from "react";
import "../componentes/css/ItemInstrumento.css";
import Categoria from "../entidades/Categoria";
import Instrumento from "../entidades/Instrumento";
import { useCarrito } from "../hooks/useCarrito";
import addCart from "../assets/img/addCart.png";
import deleteCart from "../assets/img/deleteCart.png";

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

  const isPlatoInCarrito = useMemo(() => {
    for (let detalle of cart) {
      if (detalle.instrumento?.id === arg.instrumentoObject.id) {
        return true;
      }
    }
    return false;
  }, [cart, arg.instrumentoObject.id]);

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
        <div className="row g-0 mi-clase-personalizada">
          <div className="col-md-4 card-body mi-imagen">
            <img
              src={`./images/${arg.imagen}`}
              className="card-img"
              alt={arg.imagen}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body ">
              <h5 className="card-title">{arg.instrumento}</h5>
              <p className="card-text">Precio: ${arg.precio}</p>
              <p className="card-text">{renderCostoEnvio()}</p>
              <p className="card-text">vendidos: {arg.cantidadVendida}</p>
              <a href={`detalle/${arg.id}`}>
                <button type="button" className="btn btn-warning">
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
    </>
  );
}
export default ItemInstrumento;
