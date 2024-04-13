"use client";

import React, { useState, useEffect, useReducer } from "react";
import Product from "../presentations/products";
import Header from "../presentations/header";
import Footer from "../presentations/footer";
import SearchFilter from "../presentations/SearchFilter";
import { cartReducer, initialState } from "../containers/reducers/cart-reducer";
import { obtenerTodosLosPokemon } from "../containers/apis/pokeApi";
import { Pokemon } from "../containers";

function ProductsIndex() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [filterText, setFilterText] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    async function initialFetch() {
      let pokemons = JSON.parse(localStorage.getItem("pokemonDB") || "[]");
      if (pokemons.length === 0) {
        try {
          pokemons = await obtenerTodosLosPokemon();
          localStorage.setItem("pokemonDB", JSON.stringify(pokemons));
        } catch (error) {
          console.error("Error al obtener datos de Pokémon:", error);
        }
      }
      setAllPokemons(pokemons);
      setFilteredPokemons(pokemons);
      setTotalPages(Math.ceil(pokemons.length / pageSize));
    }
    initialFetch();
  }, [pageSize]);

  const handleSearch = async () => {
    const filtered = allPokemons.filter((pokemon) =>
      pokemon.nombre.toLowerCase().includes(filterText.toLowerCase())
    );

    setFilteredPokemons(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll hasta arriba
  };

  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = filteredPokemons.slice(indexOfFirstProduct,indexOfLastProduct);

  return (
    <>
      <Header cart={state.cart} dispatch={dispatch} />
      <main className="mt-5">
        <h2 className="text-center text-4xl lg:text-5xl font-black uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500">
          Galería Artistica
        </h2>
        <SearchFilter
          filterText={filterText}
          setFilterText={setFilterText}
          onSearch={handleSearch}
        />
        <div className="flex justify-center">
          <div className="m-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {currentProducts.map((poke) => (
                <Product key={poke.id} poke={poke} dispatch={dispatch} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Siguiente
          </button>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default ProductsIndex;