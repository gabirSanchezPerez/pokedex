import { Image, View } from 'react-native'
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
    <Card>
      <Text style={{ textAlign: "center", marginHorizontal: 10, marginTop: 10, padding: 15, backgroundColor: MD2Colors.yellow600, color: MD2Colors.blue700, fontWeight: "bold", textTransform: "uppercase" }} variant="headlineMedium">{pokemon.name}</Text>
      <Image source={{ uri: pokemon.avatar }} style={{ objectFit: 'cover', width: 250, height: 250, alignSelf: "center" }} />

      <Card.Content>

        <FlatList horizontal showsHorizontalScrollIndicator={false} data={pokemon.images} keyExtractor={item => item} renderItem={({ item }) => (<Image source={{ uri: item }} style={{ resizeMode: "contain", width: 100, height: 100, alignSelf: "center" }} />)} />

        <Text variant="labelLarge">Habilidades:</Text>
        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
          {pokemon.abilities?.map((ability, i) => (
            <Chip key={i} mode="outlined" onPress={() => obtenerCaracteristica(ability.url)} style={{ marginLeft: 10 }}>{ability.name}</Chip>
          ))}
        </View>

        <Text variant="labelLarge">Tipo:</Text>
        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
          {pokemon.types?.map((type, i) => (
            <Chip key={i} mode="outlined" onPress={() => obtenerCaracteristica(type.url)} style={{ marginLeft: 10 }} >{type.name}</Chip>
          ))}
        </View>

      </Card.Content>
      <Card.Actions style={{ padding: 15 }}>
        <ButtonPokemon title="Regresar" press={() => navigation.goBack()} />
      </Card.Actions>
    </Card>

  )
}

export default CardPokemon