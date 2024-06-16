import { Image, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { Pokemon, PokemonContextType } from '../../config/interfaces/pokemon';
import { PokedexContext } from '../../context/PokedexContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { Button, MD2Colors, Text } from 'react-native-paper';
import CardListPokemon from '../components/CardListPokemon';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import ButtonPokemon from '../components/ButtonPokemon';

const ListScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { pokemons, pagination, obtenerPokemons, pokemonCaracterist } = useContext(PokedexContext) as PokemonContextType;
  const route = useRoute();

  const mapperPage = (): number => {
    const page = pagination?.next.split("=");
    const page2 = page[1].split("&");
    return parseInt(page2[0]);
  }
  const getMorePokemons = () => {
    let page = mapperPage();
    obtenerPokemons(page);
  }

  let listPokemon = pokemons;
  if (route.params.tipoList == 1) {
    listPokemon = pokemonCaracterist
  }
  console.log('ListScreen', pokemons.length, pokemonCaracterist.length, route.params.tipoList);
  return (
    <View style={[style.container, { paddingTop: top + 10 }]}>
      <Image style={style.logo} source={require('../../assets/logo.png')} />
      <Text style={style.title} variant="headlineMedium">Lista de Pokemon</Text>
      <FlatList
        data={listPokemon}
        keyExtractor={(pokemon: Pokemon) => `${pokemon.id}`} 
        style={style.list}
        renderItem={({ item }) => <CardListPokemon pokemon={item} />} 
        ListFooterComponent={pagination?.next === null ? <></> : <ButtonPokemon title="Cargar más pokemons" press={() => getMorePokemons()} />} />

      {route.params.tipoList == 1 && <Button style={{ marginVertical: 5 }} buttonColor={MD2Colors.blue700} onPress={() => navigation.reset({ routes: [{ name: 'ListScreen', params: { tipoList: 0 } }], })} mode="contained" textColor={MD2Colors.white}>Volver al inicio</Button>}

    </View>
  );
};

export const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', },
  logo: {
    width: 257,
    height: 103,
  },
  list: {
    paddingHorizontal: '2.5%',
    width: '100%',
    marginBottom: 10,
  },
  title: {
    color: MD2Colors.blue700,
    fontWeight: "bold",
  }
});

export default ListScreen;
