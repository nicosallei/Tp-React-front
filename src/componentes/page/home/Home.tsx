import "./Home.css";
import MenuOpciones from "../../navbar/MenuOpciones";

function Home() {
  return (
    <>
      <div>
        <MenuOpciones></MenuOpciones>

        <h1
          style={{
            textAlign: "center",
            fontFamily: "Arial",
            fontSize: "48px",
            color: "lightblue",
            textTransform: "uppercase",
          }}
        >
          Musical Hendrix
        </h1>
        <div
          id="carouselExample"
          className="mi-clase-home carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active ">
              <img src={"/images/piano.jpg"} className=" imagen" alt="..." />
            </div>
            <div className="carousel-item ">
              <img src={"/images/guitarra.jpg"} className=" imagen" alt="..." />
            </div>
            <div className="carousel-item ">
              <img
                src={"/images/instrumentos3.jpg"}
                className=" imagen"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev mi-boton-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next mi-boton-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div style={{ padding: "20px" }}>
          <h4>
            Musical Hendrix es una tienda de instrumentos musicales con ya más
            de 15 años de experiencia. Tenemos el conocimiento y la capacidad
            como para informarte acerca de las mejores elecciones para tu compra
            musical.
          </h4>
        </div>
      </div>
    </>
  );
}
export default Home;
