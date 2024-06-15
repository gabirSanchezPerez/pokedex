import React, {useContext, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ActivityIndicator, MD2Colors, Text, MD3Colors} from 'react-native-paper';
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
        <Image style={style.logo} source={require('../assets/logo.png')}  />
        <ActivityIndicator
          animating={true}
          color={MD2Colors.yellow700}
          size={50}
        />
        <Text style={style.title} variant="headlineSmall">Un momento por favor</Text>
      </View>
    </View>
  );
};

export const style = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  body: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:20,
  },
  logo: {
    width: 257,
    height: 103,
  },
  title: {
    color: "#3761a8",
    fontWeight: "bold",
  }
});

export default LoadingScreen;
