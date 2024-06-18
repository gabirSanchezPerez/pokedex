import { Image, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { Pokemon, PokemonContextType } from '../../config/interfaces/pokemon';
import { PokedexContext } from '../../context/PokedexContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { MD2Colors, Text } from 'react-native-paper';
import CardListPokemon from '../components/CardListPokemon';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import PaginationList from '../components/PaginationList';
import ButtonPokemon from '../components/ButtonPokemon';

const ListScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { pokemons, pokemonCaracterist } = useContext(PokedexContext) as PokemonContextType;
  const route = useRoute();
  const listCaracteristic = route.params.listCaracteristic;

  let listPokemon = pokemons;
  if (listCaracteristic !== "") {
    listPokemon = pokemonCaracterist
  }

  return (
    <View style={[style.container, { paddingTop: top + 10 }]}>
      <Image style={style.logo} source={require('../../assets/logo.png')} />
      <Text style={style.title} variant="headlineMedium">Lista de Pokemon</Text>

      {listCaracteristic !== "" && <Text style={style.title} variant="headlineSmall">{listCaracteristic}</Text>}

      <Text style={style.title} variant="bodyLarge" selectionColor={MD2Colors.grey900}>Para saber más del pokemón dar clic en Ver.</Text>
      <FlatList
        data={listPokemon}
        keyExtractor={(pokemon: Pokemon) => `${pokemon.id}`}
        style={style.list}
        renderItem={({ item }) => <CardListPokemon pokemon={item} />}
      />

      {listCaracteristic !== "" && (
        <ButtonPokemon press={() => navigation.reset({ routes: [{ name: 'ListScreen', params: { listCaracteristic: "" } }], })} title="Volver al inicio" />
      )}

      <PaginationList listCaracteristic={listCaracteristic} />

    </View>
  );
};

export const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: MD2Colors.amberA200 },
  logo: {
    width: 257,
    height: 103,
  },
  list: {
    paddingHorizontal: '2.5%',
    width: '100%',
    marginBottom: 5,
  },
  title: {
    color: MD2Colors.blue900,
    fontWeight: "bold",
    marginBottom: 10
  }
});

export default ListScreen;
