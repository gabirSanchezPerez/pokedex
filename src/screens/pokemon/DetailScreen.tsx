import {View, Text} from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { PokedexContext } from '../../context/PokedexContext';
import { PokemonContextType } from '../../config/interfaces/pokemon';
import CardPokemon from '../components/CardPokemon';

const DetailScreen = () => {
  const route = useRoute();console.log(route.params);
  const {obtenerPokemonById, pokemon} = useContext(PokedexContext) as PokemonContextType;
  useEffect(() => {
    obtenerPokemonById(route.params?.pokemonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pokemon === null) { return null;}
 
  return (
    <View>
      <CardPokemon pokemon={pokemon} />
    </View>
  );
};

export default DetailScreen;
