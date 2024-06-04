import { useEffect, useState } from "react";
import Instrumento from "../entidades/Instrumento";
import {
  deleteInstrumentoXId,
  getInstrumentoJSONFetch,
} from "../servicios/FuncionesApi";
import MenuOpciones from "./MenuOpciones";
import Usuario from "../entidades/Usuario";
import { Roles } from "../entidades/Roles";
import ModalFormulario from "../componentes/Formulario";

function GrillaInstrumento() {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [jsonUsuario] = useState<any>(localStorage.getItem("usuario"));
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;
  const [showModal, setShowModal] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] =
    useState<Instrumento | null>(null);

  const getInstrumentos = async () => {
    const datos: Instrumento[] = await getInstrumentoJSONFetch();
    setInstrumentos(datos);
  };

  useEffect(() => {
    getInstrumentos();
  }, []);

  const deleteInstrumento = async (id: number) => {
    await deleteInstrumentoXId(id).then(() => window.location.reload());
  };

  const handleOpenModal = (instrumento?: Instrumento) => {
    setSelectedInstrumento(instrumento || null);
    setShowModal(true);
  };

  const handleCloseModal = async () => {
    setSelectedInstrumento(null);
    setShowModal(false);
    await getInstrumentos(); // Recarga los instrumentos cuando se cierra el modal
  };

  return (
    <>
      <div className="container-fluid text-center">
        <MenuOpciones></MenuOpciones>
        <div className="container-fluid text-center">
          <br />
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-primary"
              onClick={() => handleOpenModal()}
            >
              Nuevo
            </button>
          </div>
          <div className="row border">
            <div className="col-1 border-end">
              <b>ID</b>
            </div>
            <div className="col-5 border-end">
              <b>Instrumento</b>
            </div>
            <div className="col-2 border-end">
              <b>Categoria</b>
            </div>
            <div className="col-1 border-end">
              <b>Cantidad Vendida</b>
            </div>
            <div className="col-1 border-end">
              <b>Precio</b>
            </div>
            <div className="col-1 border-end">
              <b>Modificar</b>
            </div>
            {usuarioLogueado.rol == Roles.ADMIN ? (
              <div className="col-1 border-end">
                <b>Eliminar</b>
              </div>
            ) : (
              <div className="col-1 border-end"></div>
            )}
          </div>
          {instrumentos.map((instrumento: Instrumento) => (
            <div className="row border" key={instrumento.id}>
              <div className="col-1 border-end">{instrumento.id}</div>
              <div className="col-5 border-end text-start">
                {instrumento.instrumento}
              </div>
              <div className="col-2 border-end">
                {instrumento.categoria?.denominacion}
              </div>
              <div className="col-1 border-end">
                {instrumento.cantidadVendida}
              </div>
              <div className="col-1 border-end">{instrumento.precio}</div>
              <div className="col-1 border-end">
                <button
                  className="btn btn-info"
                  style={{ marginBottom: 10 }}
                  onClick={() => handleOpenModal(instrumento)}
                >
                  Modificar
                </button>
              </div>
              {usuarioLogueado.rol == Roles.ADMIN ? (
                <div className="col-1 border-end">
                  <a
                    className="btn btn-danger"
                    style={{ marginBottom: 10 }}
                    onClick={() => deleteInstrumento(instrumento.id)}
                  >
                    Eliminar
                  </a>
                </div>
              ) : (
                <div className="col-1 border-end"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <ModalFormulario
          initialInstrumento={selectedInstrumento}
          onClose={handleCloseModal}
        />
      )}{" "}
      {/* Asegúrate de pasar el instrumento seleccionado y la función de cierre como props al componente de modal */}
    </>
  );
}
export default GrillaInstrumento;
