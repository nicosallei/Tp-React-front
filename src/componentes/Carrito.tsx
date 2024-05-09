import Pedido from "../entidades/Pedido";
import PedidoDetalle from "../entidades/PedidoDetalle";
import { useCarrito } from "../hooks/useCarrito";
import { realizarPedido } from "../servicios/FuncionesApi";

function CartItem({ item }: { item: PedidoDetalle }) {
  return (
    <div key={item.id}>
      <span key={item.instrumento?.id}>
        <img
          width={50}
          height={50}
          src={`./images/${item.instrumento?.imagen}`}
          alt={item.instrumento?.instrumento}
        />
        <div>
          <strong>{item.instrumento?.instrumento}</strong> - $
          {item.instrumento?.precio}
        </div>
        <div>
          <b>
            {item.cantidad} {item.cantidad === 1 ? "unidad" : "unidades"}
          </b>
        </div>
        <div>
          <b>Subtotal: ${item.cantidad * (item.instrumento?.precio || 0)}</b>
        </div>
      </span>
      <hr />
    </div>
  );
}

export function Carrito() {
  const { cart, limpiarCarrito } = useCarrito();

  const total = cart.reduce((sum, detalle) => {
    return sum + detalle.cantidad * (detalle.instrumento?.precio || 0);
  }, 0);

  const comprar = async () => {
    try {
      const pedido = new Pedido();
      pedido.pedidoDetalle = cart;
      // Aquí puedes agregar más propiedades al pedido si es necesario

      const data = await realizarPedido(pedido);
      console.log(data);
      // Aquí puedes manejar la respuesta del servidor después de realizar el pedido

      // Limpia el carrito y muestra un mensaje de éxito
      limpiarCarrito();
      alert("La compra se ha realizado con éxito");
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar los errores que puedan ocurrir al realizar el pedido
    }
  };

  return (
    <>
      <div
        style={{
          margin: "10px",
          width: "230px",
          minWidth: "100px",
          maxWidth: "300px",
        }}
      >
        <label className="cart-button">
          <i>Items del Pedido</i>
          <hr></hr>
        </label>

        <aside className="cart">
          <ul>
            {cart.map((detalle: PedidoDetalle, index) => {
              return <CartItem key={index} item={detalle} />;
            })}
          </ul>
          <div>
            <b>Total: ${total}</b>
          </div>
          <button onClick={limpiarCarrito} title="Limpiar Todo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17a2 2 0 1 0 2 2" />
              <path d="M17 17h-11v-11" />
              <path d="M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7" />
              <path d="M3 3l18 18" />
            </svg>
          </button>
          <button onClick={comprar}>COMPRAR</button>
        </aside>
      </div>
    </>
  );
}
