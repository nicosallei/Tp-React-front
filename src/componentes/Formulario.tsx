import { useEffect, useState } from "react";
import Instrumento from "../entidades/Instrumento";
import { useNavigate } from "react-router-dom";
import {
  getCategoriaDataBaseJson,
  getInstrumentoXIdFetch,
  saveInstrumento,
} from "../servicios/FuncionesApi";
import Categoria from "../entidades/Categoria";

import { Modal } from "antd";

interface ModalFormularioProps {
  initialInstrumento: Instrumento | null;
  onClose: () => void;
}

function ModalFormulario({
  initialInstrumento,
  onClose,
}: ModalFormularioProps) {
  const navigate = useNavigate();
  const [codigoCategoria, setCodigoCategoria] = useState<number>(0);

  const [instrumento, setInstrumento] = useState<Instrumento>(
    initialInstrumento || new Instrumento()
  );
  const [txtValidacion, setTxtValidacion] = useState<string>("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const idInstrumento = initialInstrumento?.id;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    onClose();
  };

  const getInstrumento = async () => {
    if (Number(idInstrumento) !== 0) {
      let instrumentoSelect: Instrumento = await getInstrumentoXIdFetch(
        Number(idInstrumento)
      );
      setInstrumento(instrumentoSelect);
      setCodigoCategoria(instrumentoSelect.categoria?.codigo || 0);
    }
  };

  const getCategorias = async () => {
    const categoriasFromDb = await getCategoriaDataBaseJson();
    setCategorias(categoriasFromDb);
  };

  useEffect(() => {
    getInstrumento();
    getCategorias();
  }, []);

  const validateForm = () => {
    if (!instrumento.instrumento) {
      setTxtValidacion("El campo nombre es obligatorio");
      return false;
    }

    if (!instrumento.marca) {
      setTxtValidacion("El campo marca es obligatorio");
      return false;
    }
    if (!instrumento.modelo) {
      setTxtValidacion("El campo modelo es obligatorio");
      return false;
    }
    if (!instrumento.imagen) {
      setTxtValidacion("El campo imagen es obligatorio");
      return false;
    }
    if (!instrumento.precio) {
      setTxtValidacion("El campo precio es obligatorio");
      return false;
    }
    if (!instrumento.costoEnvio) {
      setTxtValidacion("El campo costo de envio es obligatorio");
      return false;
    }
    if (!instrumento.cantidadVendida) {
      setTxtValidacion("El campo cantidad vendida es obligatorio");
      return false;
    }
    if (!instrumento.descripcion) {
      setTxtValidacion("El campo descripcion es obligatorio");
      return false;
    }
    if (!instrumento.categoria) {
      setTxtValidacion("El campo categoria es obligatorio");
      return false;
    }
    if (instrumento.precio === 0) {
      setTxtValidacion("El precio no puede ser 0");
      return false;
    }

    // Repite este patrón para todos los campos que necesitas validar

    return true;
  };

  const save = async () => {
    setFormSubmitted(true);

    if (!validateForm()) {
      return;
    }

    console.log(instrumento.instrumento);
    instrumento.id = idInstrumento || 0;
    await saveInstrumento(instrumento);
    navigate("/grilla");
    handleOk(); // Cierra el modal después de guardar
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const codigoCategoria = Number(e.target.value);
    setCodigoCategoria(codigoCategoria);

    const categoriaSeleccionada = categorias.find(
      (categoria) => categoria.codigo === codigoCategoria
    );

    if (categoriaSeleccionada) {
      setInstrumento({ ...instrumento, categoria: categoriaSeleccionada });
    }
  };

  useEffect(() => {
    getInstrumento();
    getCategorias();
    showModal();
  }, []);
  return (
    <>
      <Modal
        title="Formulario"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1200} // Ajusta el ancho del modal aquí
      >
        <div className="container-fluid">
          <div className="container">
            <h1 className="text-left">Formulario</h1>
            <div className="row">
              <div className="col-lg-6">
                {/* Aquí van los campos de la primera columna */}
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={instrumento.instrumento}
                    onChange={(e) =>
                      setInstrumento({
                        ...instrumento,
                        instrumento: e.target.value,
                      })
                    }
                    required
                  />
                  {formSubmitted && !instrumento.instrumento && (
                    <div style={{ color: "red" }}>
                      El campo nombre es obligatorio
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Marca</label>
                  <input
                    type="text"
                    className="form-control"
                    value={instrumento.marca}
                    onChange={(e) =>
                      setInstrumento({ ...instrumento, marca: e.target.value })
                    }
                    required
                  />
                  {formSubmitted && !instrumento.marca && (
                    <div style={{ color: "red" }}>
                      El campo marca es obligatorio
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Modelo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={instrumento.modelo}
                    onChange={(e) =>
                      setInstrumento({ ...instrumento, modelo: e.target.value })
                    }
                    required
                  />
                  {formSubmitted && !instrumento.modelo && (
                    <div style={{ color: "red" }}>
                      El campo modelo es obligatorio
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Imagen</label>
                  <input
                    type="text"
                    className="form-control"
                    value={instrumento.imagen}
                    onChange={(e) =>
                      setInstrumento({ ...instrumento, imagen: e.target.value })
                    }
                    required
                  />
                  {formSubmitted && !instrumento.imagen && (
                    <div style={{ color: "red" }}>
                      El campo imagen es obligatorio
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    value={instrumento.precio || ""}
                    min="0"
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= 0) {
                        setInstrumento({
                          ...instrumento,
                          precio: value,
                        });
                      }
                    }}
                    required
                  />
                  {formSubmitted &&
                    (instrumento.precio === undefined ||
                      instrumento.precio === 0) && (
                      <div style={{ color: "red" }}>
                        El campo precio es obligatorio
                      </div>
                    )}
                </div>
              </div>
              <div className="col-lg-6">
                {/* Aquí van los campos de la segunda columna */}
                <div className="mb-3">
                  <label className="form-label">Costo de envio</label>
                  <input
                    type="text"
                    className="form-control"
                    value={instrumento.costoEnvio}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "" ||
                        value.toUpperCase() === "G" ||
                        Number(value) >= 0
                      ) {
                        setInstrumento({
                          ...instrumento,
                          costoEnvio:
                            value === "0"
                              ? "G"
                              : value.toUpperCase() === "G"
                              ? "G"
                              : value,
                        });
                      }
                    }}
                    required
                  />
                  {formSubmitted && !instrumento.costoEnvio && (
                    <div style={{ color: "red" }}>
                      El campo Costo de envio es obligatorio
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Cantidad vendida</label>
                  <input
                    type="number"
                    className="form-control"
                    value={instrumento.cantidadVendida || ""}
                    min="0"
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value >= 0 || e.target.value === "") {
                        setInstrumento({
                          ...instrumento,
                          cantidadVendida: value,
                        });
                      }
                    }}
                    required
                  />
                  {formSubmitted &&
                    (instrumento.cantidadVendida === undefined ||
                      instrumento.cantidadVendida === null ||
                      instrumento.cantidadVendida < 0) && (
                      <div style={{ color: "red" }}>
                        El campo cantidad vendida es obligatorio
                      </div>
                    )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripcion</label>
                  <input
                    type="text"
                    className="form-control"
                    value={instrumento.descripcion}
                    onChange={(e) =>
                      setInstrumento({
                        ...instrumento,
                        descripcion: e.target.value,
                      })
                    }
                    required
                  />
                  {formSubmitted && !instrumento.descripcion && (
                    <div style={{ color: "red" }}>
                      El campo descripcion es obligatorio
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoria</label>
                  <select
                    className="form-select"
                    value={codigoCategoria}
                    onChange={handleCategoriaChange}
                  >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.codigo} value={categoria.codigo}>
                        {categoria.denominacion}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={save}>
                    Guardar
                  </button>
                </div>
                <div className="mb-3">
                  <label className="form-label">{txtValidacion}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ModalFormulario;
