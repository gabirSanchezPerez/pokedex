import React, { useState, createContext, FC } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Pokemon, PokemonContextType } from '../config/interfaces/pokemon';
import { getPokemons } from '../services/actions/getPokemons';
import { RootStackParams } from '../navigation/StackNavigator';
import { PokemonAPIResponse } from '../config/interfaces/pokemonAPI';
import { getPokemonById } from '../services/actions/getPokemonById';
import { getCaracteristic } from '../services/actions/getCaracterist';

export const PokedexContext = createContext<PokemonContextType | null>(null);

const PokedexProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pagination, setPagination] = useState<PokemonAPIResponse | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [pokemonCaracterist, setPokemonCaracterist] = useState<Pokemon[]>([]);

  const obtenerPokemons = async () => {
    console.log("obtenerPokemons")
    let data = await getPokemons(0);
    setPagination(data[0]);
    setPokemons(data[1]);
    navigation.reset({
      routes: [{ name: 'ListScreen' }],
    });
  };
  const obtenerPokemonById = async (id: number) => {
    console.log("obtenerPokemonById")
    let dataPokemon = await getPokemonById(id)
    setPokemon(dataPokemon)
  }
  const viewPokemon = (pokemonId: number) => {
    console.log("viewPokemon")
    navigation.navigate('DetailScreen', { pokemonId });
  };

  const obtenerCaracteristica = async (url: string) => {
    console.log("obtenerCaracteristica")
    let urlData = url.split("/");
    let caracterist = await getCaracteristic(urlData[5], parseInt(urlData[6]));
    setPokemonCaracterist(caracterist);
    navigation.navigate('ListScreen');
  }
  return (
    <PokedexContext.Provider value={{ pokemons, obtenerPokemons, viewPokemon, pagination, obtenerPokemonById, pokemon, obtenerCaracteristica, pokemonCaracterist }}>
      {children}
    </PokedexContext.Provider>
  );
};

export default PokedexProvider;
