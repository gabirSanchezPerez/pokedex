import { Image, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { Pokemon, PokemonContextType } from '../../config/interfaces/pokemon'
import { Button, Card, Chip, MD2Colors, Text } from 'react-native-paper';
import { PokedexContext } from '../../context/PokedexContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { FlatList } from 'react-native-gesture-handler';
import ButtonPokemon from './ButtonPokemon';

interface Props {
  pokemon: Pokemon;
}


const CardPokemon = ({ pokemon }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { obtenerCaracteristica } = useContext(PokedexContext) as PokemonContextType;
  return (
    <Card >
      <Text style={style.title} variant="headlineMedium">{pokemon.name}</Text>
      <Image source={{ uri: pokemon.avatar }} style={{ objectFit: 'cover', width: 250, height: 250, alignSelf: "center" }} />

      <Card.Content>

        <FlatList horizontal showsHorizontalScrollIndicator={false} data={pokemon.images} keyExtractor={item => item} renderItem={({ item }) => (<Image source={{ uri: item }} style={style.gallery} />)} />

        <Text variant="labelLarge">Habilidades:</Text>
        <View style={style.bodyCarateristics}>
          {pokemon.abilities?.map((ability, i) => (
            <Chip key={i} mode="outlined" onPress={() => obtenerCaracteristica(ability.url)} style={style.caracteristc}>{ability.name}</Chip>
          ))}
        </View>

        <Text variant="labelLarge">Tipo:</Text>
        <View style={style.bodyCarateristics}>
          {pokemon.types?.map((type, i) => (
            <Chip key={i} mode="outlined" onPress={() => obtenerCaracteristica(type.url)} style={style.caracteristc} >{type.name}</Chip>
          ))}
        </View>

      </Card.Content>
      <Card.Actions style={{ padding: 15 }}>
        <ButtonPokemon title="Regresar" press={() => navigation.goBack()} />
      </Card.Actions>
    </Card>
  )
}

export const style = StyleSheet.create({
  bodyCarateristics:{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10, flexWrap: "wrap" },
  title: { textAlign: "center", marginHorizontal: 10, marginTop: 10, padding: 15, backgroundColor: MD2Colors.amberA200, color: MD2Colors.blue900, fontWeight: "bold", textTransform: "uppercase" },
  caracteristc: { marginLeft: 5, marginTop: 5 },
  gallery: { resizeMode: "contain", width: 100, height: 100, alignSelf: "center" }
});
export default CardPokemon