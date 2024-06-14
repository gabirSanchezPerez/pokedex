import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {PokemonContextType} from '../../config/interfaces/pokemon';
import {PokedexContext} from '../../context/PokedexContext';

const ListScreen = () => {
  const {pokemons} = useContext(PokedexContext) as PokemonContextType;
  console.log(pokemons);
  return (
    <View>
      <Text>ListScreen</Text>
    </View>
  );
};

export default ListScreen;
