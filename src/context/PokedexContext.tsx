import React, { useState, createContext, FC } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pokemon, PokemonContextType } from '../config/interfaces/pokemon';
import { getPokemons } from '../services/actions/getPokemons';
import { RootStackParams } from '../navigation/StackNavigator';
import { PokemonAPIResponse } from '../config/interfaces/pokemonAPI';
import { getPokemonById } from '../services/actions/getPokemonById';

export const PokedexContext = createContext<PokemonContextType | null>(null);

const PokedexProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
  const [pagination, setPagination] = useState<PokemonAPIResponse|null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const obtenerPokemons = async () => {
    let data = await getPokemons(0);
    setPagination(data[0]);
    setPokemons(data[1]);
    navigation.reset({
      routes: [{ name: 'ListScreen' }],
    });
  };
  const obtenerPokemonById = async (id: number) => {
    let dataPokemon = await getPokemonById(id)
    setPokemon(dataPokemon)
  }
  const viewPokemon = (pokemonId: number) => {
    navigation.navigate('DetailScreen', { pokemonId });
  };

  return (
    <PokedexContext.Provider value={{ pokemons, obtenerPokemons, viewPokemon, pagination, obtenerPokemonById, pokemon }}>
      {children}
    </PokedexContext.Provider>
  );
};

export default PokedexProvider;
