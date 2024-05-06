import "../App.css";

function MenuOpciones() {
  return (
    <>
      <div className="navbar">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a className="nav-link" aria-current="true" href="/home">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/DondeEstamos">
              Donde Estamos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/menu">
              Productos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/grilla">
              Grilla
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
export default MenuOpciones;
