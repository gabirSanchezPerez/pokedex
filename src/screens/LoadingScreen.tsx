import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, MD2Colors, Text} from 'react-native-paper';
import {PokedexContext} from '../context/PokedexContext';
import {PokemonContextType} from '../config/interfaces/pokemon';

const LoadingScreen = () => {
  const {obtenerPokemons} = useContext(PokedexContext) as PokemonContextType;
  useEffect(() => {
    obtenerPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={style.container}>
      <View style={style.body}>
        <ActivityIndicator
          animating={true}
          color={MD2Colors.red800}
          size={50}
        />
        <Text variant="titleLarge">Un momento por favor</Text>
      </View>
    </View>
  );
};

export const style = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  body: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },
});

export default LoadingScreen;
