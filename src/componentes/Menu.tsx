import { useState, useEffect } from "react";
import Instrumento from "../entidades/Instrumento";
import { getInstrumentoJSONFetch } from "../servicios/FuncionesApi";
import ItemInstrumento from "./ItemInstrumento";
import MenuOpciones from "./MenuOpciones";
import "../DondeEstamos.css";

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

    <div >
    <MenuOpciones></MenuOpciones>
      {instrumentos.map((instrumento: Instrumento) => (
        <ItemInstrumento
          key={instrumento.id}
          id={instrumento.id}
          instrumento={instrumento.instrumento}
          marca={instrumento.marca}
          modelo={instrumento.modelo}
          imagen={instrumento.imagen}
          precio={instrumento.precio.toString()}
          descripcion={instrumento.descripcion}
          cantidadVendida={instrumento.cantidadVendida}
          costoEnvio={instrumento.costoEnvio}
        />
      ))}
    </div>
</>
  );
}
export default Menu;
