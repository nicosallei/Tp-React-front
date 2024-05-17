import { createContext, ReactNode, useState } from "react";
import Instrumento from "../entidades/Instrumento";
import PedidoDetalle from "../entidades/PedidoDetalle";

interface CartContextType {
  cart: PedidoDetalle[];
  addCarrito: (product: Instrumento) => void;
  removeCarrito: (product: Instrumento) => void;
  removeItemCarrito: (product: Instrumento) => void;
  limpiarCarrito: () => void;
}

export const CarContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
});

export function CarritoContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<PedidoDetalle[]>([]);

  const addCarrito = async (product: Instrumento) => {
    let cartCopy = [...cart];
    let detalleExistente = cartCopy.find(
      (detalle) => detalle.instrumento?.id === product.id
    );

    if (detalleExistente) {
      console.log("YA EXISTE");
      detalleExistente.cantidad += 1;
    } else {
      console.log("NO EXISTE");
      const nuevoDetalle = new PedidoDetalle();
      nuevoDetalle.instrumento = product;
      nuevoDetalle.cantidad = 1;
      cartCopy.push(nuevoDetalle);
    }

    setCart(cartCopy);
  };

  const removeCarrito = async (product: Instrumento) => {
    setCart((prevCart) =>
      prevCart.filter((detalle) => detalle.instrumento?.id !== product.id)
    );
  };

  const removeItemCarrito = async (product: Instrumento) => {
    let cartCopy = [...cart];
    let detalleExistente = cartCopy.find(
      (detalle) => detalle.instrumento?.id === product.id
    );

    if (detalleExistente) {
      console.log("EXISTE");
      if (detalleExistente.cantidad > 1) {
        detalleExistente.cantidad -= 1;
      } else {
        // Eliminar el detalle del carrito si la cantidad es 1
        cartCopy = cartCopy.filter(
          (detalle) => detalle.instrumento?.id !== product.id
        );
      }
    }

    setCart(cartCopy);
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  return (
    <CarContext.Provider
      value={{
        cart,
        addCarrito,
        limpiarCarrito,
        removeCarrito,
        removeItemCarrito,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
