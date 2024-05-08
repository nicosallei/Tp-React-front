import { createContext, ReactNode, useState } from "react";
import Instrumento from "../entidades/Instrumento";

interface CartContextType {
  cart: Instrumento[];
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
  const [cart, setCart] = useState<Instrumento[]>([]);

  const addCarrito = async (product: Instrumento) => {
    let existe: boolean = false;
    cart.forEach(async (element: Instrumento) => {
      if (element.id === product.id) {
        existe = true;
        return existe;
      }
    });

    if (existe) {
      console.log("YA EXISTE");
      product.cantidad += 1;
      const cartClonado = await structuredClone(
        cart.filter((item) => item.id !== product.id)
      );
      await cartClonado.push(product);
      setCart(cartClonado);
    } else {
      // si el producto no esta en el carrito
      console.log("NO EXISTE");
      await setCart((prevCart) => [...prevCart, product]);
    }
  };

  const removeCarrito = async (product: Instrumento) => {
    await setCart((prevCart) =>
      prevCart.filter((item) => item.id !== product.id)
    );
  };

  const removeItemCarrito = async (product: Instrumento) => {
    let existe: boolean = false;
    cart.forEach(async (element: Instrumento) => {
      if (element.id === product.id) {
        existe = true;
      }
    });

    if (existe) {
      console.log("EXISTE");
      if (product.cantidad > 1) {
        product.cantidad -= 1;
        const cartClonado = await structuredClone(
          cart.filter((item) => item.id !== product.id)
        );
        await cartClonado.push(product);
        setCart(cartClonado);
      } else {
        await setCart((prevCart) =>
          prevCart.filter((item) => item.id !== product.id)
        );
      }
    }
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
