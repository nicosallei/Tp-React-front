
import '../componentes/css/ItemInstrumento.css'
import InstrumentoParams from "../entidades/Instrumento";




function ItemInstrumento(arg: InstrumentoParams) {

   
    //const text = arg.costoEnvio === "G" ? "Envio gratis a todo el pais": `Costo de Envio interior de Argentina $${arg.costoEnvio}`;
    
    const renderCostoEnvio=()=> {
      if (arg.costoEnvio === "G") {
          return (
              <span style={{ color: "green" }}>
                  <i className="fas fa-car" style={{ opacity: 0.5 }}></i> {/* Add the vehicle icon here */}
                  <img src={"/images/camion.png"} alt="Descripción de la imagen" style={{ width: '20px', height: '20px' }} /> {/* Add the image here */}
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
  }


    return (
      <>
      <div className="card mb-3 ">
        <div className="row g-0 mi-clase-personalizada" >
          <div className="col-md-4 card-body mi-imagen">
            <img
              src={`./images/${arg.imagen}`}
              className="card-img"
              alt={arg.imagen}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body mi-contenido">
              <h5 className="card-title">{arg.instrumento}</h5>
              <p className="card-text">Precio: ${arg.precio}</p>
              <p className="card-text">
                  {renderCostoEnvio()}
              </p>
              <p className="card-text">vendidos: {arg.cantidadVendida}</p>
              <a href={`detalle/${arg.id}`}>
                <button type="button" className="btn btn-warning">Detalle</button>
               </a>
              
              
            </div>
          </div>
        </div>
      </div>
      </>
    );
}
export default ItemInstrumento;
