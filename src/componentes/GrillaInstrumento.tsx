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
import { descargarExcel } from "../servicios/FuncionesApi";
import ModalExcel from "./ModalExcel";

function GrillaInstrumento() {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [showModalExcel, setShowModalExcel] = useState(false);
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
  const handleOpenModalExcel = () => {
    setShowModalExcel(true);
  };

  const handleCloseModalExcel = () => {
    setShowModalExcel(false);
  };
  const handleDescargarExcel = async () => {
    try {
      // Asegúrate de que las fechas de inicio y fin están establecidas
      if (!fechaInicio || !fechaFin) {
        console.error("Las fechas de inicio y fin deben estar establecidas");
        return;
      }

      await descargarExcel(fechaInicio, fechaFin);
      handleCloseModalExcel();
    } catch (error) {
      console.error("Error al descargar Excel: ", error);
    }
  };
  useEffect(() => {}, [showModalExcel]);

  return (
    <>
      <div className="container-fluid text-center">
        <MenuOpciones></MenuOpciones>

        <div className="container-fluid text-center">
          <br />
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-success me-3"
              onClick={() => handleOpenModalExcel()}
            >
              Descargar Excel
            </button>

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
        {showModalExcel && (
          <ModalExcel
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            setFechaInicio={setFechaInicio}
            setFechaFin={setFechaFin}
            onClose={handleCloseModalExcel}
            onDescargar={handleDescargarExcel}
          />
        )}
      </div>
      {showModal && (
        <ModalFormulario
          initialInstrumento={selectedInstrumento}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
export default GrillaInstrumento;
