import {Image, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {Pokemon, PokemonContextType} from '../../config/interfaces/pokemon';
import {PokedexContext} from '../../context/PokedexContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { MD2Colors, Text } from 'react-native-paper';
import CardPokemon from '../components/CardPokemon';

const ListScreen = () => {
  const { top } = useSafeAreaInsets();
  const {pokemons} = useContext(PokedexContext) as PokemonContextType;
  console.log(pokemons);
  return (
    <View style={[style.container,{paddingTop: top+10}]}>
      <Image style={style.logo} source={require('../../assets/logo.png')}  />
      <FlatList data={pokemons} keyExtractor={(pokemon: Pokemon) => `${pokemon.id}`} ListHeaderComponent={() => (
        <Text style={style.title} variant="headlineMedium">Lista de Pokemon</Text>
      )}  style={style.list} renderItem={({item}) => <CardPokemon pokemon={item}/>}/>
     
    </View>
  );
};

export const style = StyleSheet.create({
  container: {flex: 1, alignItems: 'center',},
  logo: {
    width: 257,
    height: 103,
  },
  list: {
    paddingHorizontal: '2.5%',
    width: '100%',
  },
  title: {
    color: MD2Colors.blue700,
    fontWeight: "bold",
  }
});

export default ListScreen;
