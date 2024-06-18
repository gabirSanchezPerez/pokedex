import React, { useState, createContext, FC, useEffect } from 'react';
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

  const obtenerPokemons = async (page: number = 0) => {
    let data = await getPokemons(page);
    setPagination(data[0]);
    if (page === 0) {
      setPokemons(data[1]);
    } else {
      setPokemons(data[1]);
    }
    
    navigation.reset({
      routes: [{ name: 'ListScreen' ,params: {listCaracteristic: ''}},],
    });
  };
  const obtenerPokemonById = async (id: number) => {
    let dataPokemon = await getPokemonById(id)
    setPokemon(dataPokemon)
  }

  const obtenerCaracteristica = async (url: string) => {
    let urlData = url.split("/");
    let caracterist = await getCaracteristic(urlData[5], parseInt(urlData[6]));
    setPokemonCaracterist(caracterist[1]);
    let typeCatracterist = ""
    if ( urlData[5] === "type") {
      typeCatracterist = "Tipo:";
    } else {
      typeCatracterist= "Con Habilidad:";
    }
    navigation.navigate('ListScreen',{ listCaracteristic: `${typeCatracterist} ${caracterist[0]}` });
  }

  useEffect(() => {
    obtenerPokemons(0);
  }, []);

  return (
    <PokedexContext.Provider value={{ pokemons, obtenerPokemons, pagination, obtenerPokemonById, pokemon, obtenerCaracteristica, pokemonCaracterist }}>
      {children}
    </PokedexContext.Provider>
  );
};

export default PokedexProvider;
