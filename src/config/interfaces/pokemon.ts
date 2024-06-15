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
  _setPokemon: (pokemonId: number) => void;
  _setPagination: (data: PokemonAPIResponse) => void;
};
