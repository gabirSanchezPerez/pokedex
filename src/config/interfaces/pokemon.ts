import { PokemonAPIResponse } from "./pokemonAPI";

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  avatar?: string;
  types?: string[];
  images?: string[];
  abilities?: string[];
}

export type PokemonContextType = {
  pokemons: Pokemon[];
  obtenerPokemons: () => void;
  obtenerPokemonById: (id: number) => void;
  viewPokemon: (pokemonId: number) => void;
  pagination: PokemonAPIResponse | null;
  pokemon: Pokemon | null;
};
