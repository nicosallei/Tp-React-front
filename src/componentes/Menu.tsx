import { useState, useEffect } from "react";
import Instrumento from "../entidades/Instrumento";
import { getInstrumentoJSONFetch } from "../servicios/FuncionesApi";
import ItemInstrumento from "./ItemInstrumento";
import MenuOpciones from "./MenuOpciones";
import "../DondeEstamos.css";

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
      <CarritoContextProvider>
        <div>
          <MenuOpciones></MenuOpciones>
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
              />
            ))}
          </div>
        </div>
        <div className="col">
          <b>Carrito Compras</b>
          <Carrito></Carrito>
        </div>
      </CarritoContextProvider>
    </>
  );
}
export default Menu;
