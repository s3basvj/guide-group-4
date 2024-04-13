import { Pokemon, PokemonData } from "../index";

const pokemonDB: Pokemon[] = [];
let nextPokemonId = 1;

export async function obtenerPokemon(nombrePokemon: string): Promise<Pokemon> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`
    );
    if (!response.ok) {
      throw new Error("No se pudo obtener una respuesta de la API");
    }
    const data: PokemonData = await response.json();
    const existingPokemonIndex = pokemonDB.findIndex(
      (pokemon) => pokemon.nombre === data.name
    );
    if (existingPokemonIndex !== -1) {
      pokemonDB.splice(existingPokemonIndex, 1);
    }

    const pokemon: Pokemon = {
      id: nextPokemonId++,
      nombre: data.name,
      vida: data.stats.find((stat) => stat.stat.name === "hp")?.base_stat || 0,
      tipo: data.types.map((type) => type.type.name).join(", "),
      fuerza:
        data.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0,
      webformatURL: data.sprites.front_default || "",
      precio: 10,
    };
    pokemonDB.push(pokemon);
    return pokemon;
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    throw error;
  }
}

export async function obtenerTodosLosPokemon(): Promise<Pokemon[]> {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=1000"
    );
    if (!response.ok) {
      throw new Error("No se pudo obtener una respuesta de la API");
    }
    const data = await response.json();
    const pokemons = await Promise.all(
      data.results.map(async (pokemon: { name: string }) => {
        return await obtenerPokemon(pokemon.name);
      })
    );
    return pokemons;
  } catch (error) {
    console.error("Error al obtener todos los Pokémon:", error);
    throw error;
  }
}
export default pokemonDB;
