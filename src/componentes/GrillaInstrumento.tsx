import { useEffect, useState } from "react";
import Instrumento from "../entidades/Instrumento";
import {
  deleteInstrumentoXId,
  getInstrumentoJSONFetch,
} from "../servicios/FuncionesApi";
import MenuOpciones from "./MenuOpciones";

function GrillaInstrumento() {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  const getInstrumentos = async () => {
    const datos: Instrumento[] = await getInstrumentoJSONFetch();
    setInstrumentos(datos);
  };

  useEffect(() => {
    getInstrumentos();
  }, []);

  const deleteInstrumento = async (id: number) => {
    await deleteInstrumentoXId(id);
    window.location.reload();
  };

  return (
    <>
      <MenuOpciones></MenuOpciones>
      <div className="container text-center">
        <br />
        <a className="btn btn-primary" href={`/formulario/0`}>
          Nuevo
        </a>
        <div className="row">
          <div className="col">
            <b>ID</b>
          </div>
          <div className="col">
            <b>Plato</b>
          </div>
          <div className="col">
            <b>Rubro</b>
          </div>
          <div className="col">
            <b>Precio</b>
          </div>
          <div className="col">
            <b>Modificar</b>
          </div>
          <div className="col">
            <b>Eliminar</b>
          </div>
        </div>
        {instrumentos.map((instrumento: Instrumento) => (
          <div className="row" key={instrumento.id}>
            <div className="col">{instrumento.id}</div>
            <div className="col">{instrumento.instrumento}</div>
            <div className="col">{instrumento.cantidadVendida}</div>
            <div className="col">{instrumento.precio}</div>
            <div className="col">
              <a
                className="btn btn-info"
                style={{ marginBottom: 10 }}
                href={`/formulario/` + instrumento.id}
              >
                Modificar
              </a>
            </div>
            <div className="col">
              <a
                className="btn btn-danger"
                style={{ marginBottom: 10 }}
                onClick={(e) => deleteInstrumento(instrumento.id)}
              >
                Eliminar
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default GrillaInstrumento;
