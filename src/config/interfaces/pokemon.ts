export interface Pokemon {
  id: number;
  name: string;
  avatar: string;
  //types: string[];
  // sprites: string[];
  // color; string;
}

export type PokemonContextType = {
  pokemons: Pokemon[];
  obtenerPokemons: () => void;
  _setPokemon: (pokemon: Pokemon) => void;
};
