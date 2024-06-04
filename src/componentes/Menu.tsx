import { useState, useEffect } from "react";
import Instrumento from "../entidades/Instrumento";
import { getInstrumentoJSONFetch } from "../servicios/FuncionesApi";
import ItemInstrumento from "./ItemInstrumento";
import MenuOpciones from "./MenuOpciones";

import { Carrito } from "./Carrito";
import { CarritoContextProvider } from "../context/CarritoContext";

function Menu() {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  const getInstrumentos = async () => {
    const datos: Instrumento[] = await getInstrumentoJSONFetch();
    setInstrumentos(datos);
  };
  useEffect(() => {
    getInstrumentos();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <MenuOpciones></MenuOpciones>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CarritoContextProvider>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="container-fluid ">
                {instrumentos.map((instrumento: Instrumento, index) => (
                  <ItemInstrumento
                    instrumentoObject={instrumento}
                    key={index}
                    id={instrumento.id}
                    instrumento={instrumento.instrumento}
                    marca={instrumento.marca}
                    modelo={instrumento.modelo}
                    imagen={instrumento.imagen}
                    precio={instrumento.precio}
                    descripcion={instrumento.descripcion}
                    cantidadVendida={instrumento.cantidadVendida}
                    costoEnvio={instrumento.costoEnvio}
                    initialHayStock={true}
                  ></ItemInstrumento>
                ))}
              </div>
              <div
                className="col"
                style={{
                  backgroundColor: "white", // Fondo blanco
                  borderRadius: "10px", // Bordes redondeados
                  padding: "10px", // Espacio interno
                  marginLeft: "auto", // Alineado a la derecha
                  boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)", // Sombra detrás del carrito
                }}
              >
                <b>Carrito Compras</b>
                <Carrito></Carrito>
              </div>
            </div>
          </CarritoContextProvider>
        </div>
      </div>
    </>
  );
}
export default Menu;
