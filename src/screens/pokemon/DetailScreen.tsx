import {View, Text} from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { PokedexContext } from '../../context/PokedexContext';
import { PokemonContextType } from '../../config/interfaces/pokemon';
import CardPokemon from '../components/CardPokemon';
import { MD2Colors } from 'react-native-paper';

const DetailScreen = () => {
  const route = useRoute();
  const {obtenerPokemonById, pokemon} = useContext(PokedexContext) as PokemonContextType;
  useEffect(() => {
    obtenerPokemonById(route.params?.pokemonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pokemon === null) { return null;}
 
  return (
    <View style={{ backgroundColor: MD2Colors.amberA200, padding: 10, flex: 1}}>
      <CardPokemon pokemon={pokemon} />
    </View>
  );
};

export default DetailScreen;
