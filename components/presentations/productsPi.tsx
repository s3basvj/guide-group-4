import { Dispatch } from "react";
import type { PixabayImage } from "../containers/index";
import type { CartActions } from "../containers/reducers/cart-reducer";

type PixaProps = {
  pixa: PixabayImage;
  dispatch: Dispatch<CartActions>;
};

export default function Products({ pixa, dispatch }: PixaProps) {
  const { id, webformatURL, tags, precio } = pixa;
  return (
    <div className="col-md-6 col-lg-4 my-4">
      <div className="card shadow-lg border-0 rounded-lg transform transition hover:scale-105 duration-300">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg">
          <div className="row align-items-center">
            <div className="col-4">
              <img
                className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 2xl:w-120 2xl:h-120 mx-auto rounded-full border-4 border-white shadow-md"
                src={`${webformatURL}`}
                alt="imagen"
              />
            </div>
            <div className="col-8">
              <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold text-shadow">
                Name: Picture
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-b-lg">
          <p className="text-gray-800">
            <span className="font-bold">Tags:</span> {tags}
          </p>
          <p className="text-lg font-bold text-gray-800">${precio}</p>
          <button
            type="button"
            className="mt-4 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={() =>
              dispatch({ type: "add-to-cart", payload: { item: pixa } })
            }
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
