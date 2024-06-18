import { PokemonAPIResponse, Result } from "./pokemonAPI";

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  avatar?: string;
  types?: Result[];
  images?: string[];
  abilities?: Result[];
}

export type PokemonContextType = {
  obtenerPokemons: (page: number) => void;
  pokemons: Pokemon[];
  obtenerPokemonById: (id: number) => void;
  pokemon: Pokemon | null;
  obtenerCaracteristica: (url: string) => void;
  pokemonCaracterist: Pokemon[];
  pagination: PokemonAPIResponse | null;
};
