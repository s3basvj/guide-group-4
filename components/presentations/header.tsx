"use client";
import React, { useState } from "react";
import { Dispatch, useMemo } from "react";
import type { CartItem } from "../containers/index";
import type { CartActions } from "../containers/reducers/cart-reducer";
import FloatingScreen from "./FloatingScreen";

type HeaderProps = {
  cart: CartItem[];
  dispatch: Dispatch<CartActions>;
};

export default function Header({ cart, dispatch }: HeaderProps) {
  const [showFloatingScreen, setShowFloatingScreen] = useState(false);
  const [disabledBuyButton, setDisabledBuyButton] = useState(false);
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce((total: number, cartItem: CartItem) => {
        const precio =
          cartItem.item && "precio" in cartItem.item ? cartItem.item.precio : 0;
        return total + precio * cartItem.quantity;
      }, 0),
    [cart]
  );

  const totalUniqueItemsInCart = useMemo(() => {
    return cart.length; // Cada elemento en 'cart' es un producto único
  }, [cart]);
  const getImageUrl = (cartItem: CartItem): string => {
    if (!cartItem.item) {
      console.error("CartItem.item está indefinido.", cartItem);
      return "";
    }

    return cartItem.item.webformatURL;
  };

  const getItemName = (cartItem: CartItem): string => {
    if (!cartItem.item) {
      console.error("CartItem.item está indefinido.", cartItem);
      return "";
    }

    if (cartItem.type === "pokemon" && cartItem.item.nombre) {
      return cartItem.item.nombre;
    } else {
      return "Pixabay Image";
    }
  };

  const handleBuyClick = () => {
    if (!isEmpty) {
      setDisabledBuyButton(true);

      setTimeout(() => {
        dispatch({ type: "buy" });
        setShowFloatingScreen(true);

        setDisabledBuyButton(false);
      }, 2000);
    }
  };

  const closeFloatingScreen = () => {
    setShowFloatingScreen(false);
  };

  return (
    <header className="py-1 flex justify-around bg-slate-900">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a className="text-white btn-home" href={"/"}>
              {" "}
              <img
                src="https://img.icons8.com/metro/48/bcbcbc/home.png"
                alt="home"
              />
            </a>
          </div>
          <nav className="md:ml-auto flex mt-5 md:mt-0 items-center">
            <div className="text-white ml-10 hover:underline">
              <a href={"/gifProducts"}>Productos Naturaleza</a>
            </div>
            <div className="text-white ml-10 hover:underline">
              <a href={"/products"}>Productos Pokemon</a>
            </div>
            <div className="carrito relative ms-14">
              <img
                className="hover:shadow-gray-50 cursor-pointer"
                src="https://img.icons8.com/stickers/56/shopping-cart.png"
                alt="shopping-cart"
              />
              {totalUniqueItemsInCart > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                  {totalUniqueItemsInCart}
                </span>
              )}
              <div
                id="carrito"
                className="bg-white p-3 absolute top-full right-0 hidden"
              >
                {isEmpty ? (
                  <p className="text-center font-bold">El carrito está vacío</p>
                ) : (
                  <>
                    <table className="table-fixed text-shadow-effect font-bold drop-shadow bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl">
                      <thead className="">
                        <tr>
                          <th className="w-20 ">Imagen</th>
                          <th className="w-24">Nombre</th>
                          <th className="w-24">Precio</th>
                          <th className="w-24">Cantidad</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>

                      <tbody className="text-center">
                        {cart.map((cartItem, index) => (
                          <tr className="my-1" key={index}>
                            {" "}
                            {/* Usar index como key solo si no tienes mejor opción */}
                            <td>
                              <img
                                className="h-20 img-shadow-effect"
                                src={getImageUrl(cartItem)}
                                alt="Imagen del producto"
                              />
                            </td>
                            <td className="capitalize">
                              {getItemName(cartItem)}
                            </td>
                            <td className="text-xl">
                              ${cartItem.item?.precio}
                            </td>
                            <td className="gap-4">
                              <div className="flex grow items-center">
                                <div className="flex flex-row items-center grow">
                                  <button
                                    type="button"
                                    className="btn btn-dark w-8 "
                                    onClick={() =>
                                      dispatch({
                                        type: "decrease-quantity",
                                        payload: { id: cartItem.id },
                                      })
                                    }
                                  >
                                    <img
                                      src="https://img.icons8.com/metro/28/minus.png"
                                      alt="minus"
                                    />
                                  </button>
                                  <div className="grow">
                                    <span className="text-xl">
                                      {cartItem.quantity}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-dark w-8"
                                    onClick={() =>
                                      dispatch({
                                        type: "increase-quantity",
                                        payload: { id: cartItem.id },
                                      })
                                    }
                                  >
                                    <img
                                      src="https://img.icons8.com/metro/26/plus.png"
                                      alt="plus"
                                    />
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <button
                                className="bg-red-500 text-white rounded-3xl p-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                type="button"
                                onClick={() =>
                                  dispatch({
                                    type: "remove-from-cart",
                                    payload: { id: cartItem.id },
                                  })
                                }
                              >
                                <img
                                  src="https://img.icons8.com/ffffff/glyph-neue/100/delete-trash.png"
                                  alt="delete-trash"
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-right font-bold text-xl">
                      Total a pagar:{" "}
                      <span className="text-2xl">${cartTotal}</span>
                    </p>
                  </>
                )}
                <button
                  className="btn btn-dark w-full mt-3 p-2 hover:underline hover:text-blue-700"
                  onClick={() => dispatch({ type: "clear-cart" })}
                >
                  Vaciar Carrito
                </button>
                <div className="flex">
                  <div className="mx-5 items-center grow">
                    <button
                      type="button"
                      className="bg-green-600 btn btn-green w-full mt-3 p-2 transition-all duration-300 rounded-lg ease-in-out transform hover:scale-105 hover:bg-lime-500 hover:text-white focus:ring-green-400"
                      onClick={handleBuyClick}
                      disabled={disabledBuyButton}
                    >
                      {disabledBuyButton ? (
                        <>
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 me-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                          Procesando...
                        </>
                      ) : (
                        "Comprar"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {showFloatingScreen && (
              <FloatingScreen onClose={closeFloatingScreen} />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
