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
  pokemons: Pokemon[];
  obtenerPokemons: () => void;
  obtenerPokemonById: (id: number) => void;
  viewPokemon: (pokemonId: number) => void;
  pagination: PokemonAPIResponse | null;
  pokemon: Pokemon | null;
  obtenerCaracteristica: (url: string) => void;
  pokemonCaracterist: Pokemon[];
};
