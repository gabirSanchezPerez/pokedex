import React, {useState, createContext, FC} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Pokemon, PokemonContextType} from '../config/interfaces/pokemon';
import {getPokemons} from '../services/actions/getPokemons';
import {RootStackParams} from '../navigation/StackNavigator';

export const PokedexContext = createContext<PokemonContextType | null>(null);

const PokedexProvider: FC<{children: React.ReactNode}> = ({children}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  //const [pokemon, setPokemon] = useState();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const obtenerPokemons = async () => {
    let data = await getPokemons(1);
    console.log('obtenerPokemons', data);
    setPokemons(data);
    navigation.reset({
      routes: [{name: 'ListScreen'}],
    });
  };
  const _setPokemon = (pokemon: Pokemon) => {
    console.log(pokemon);
  };

  return (
    <PokedexContext.Provider value={{pokemons, obtenerPokemons, _setPokemon}}>
      {children}
    </PokedexContext.Provider>
  );
};

export default PokedexProvider;
