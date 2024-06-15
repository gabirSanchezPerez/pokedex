import { Image, View } from 'react-native'
import React, { useContext } from 'react'
import { Pokemon, PokemonContextType } from '../../config/interfaces/pokemon'
import { Avatar, Button, Card, Text } from 'react-native-paper'
import { PokedexContext } from '../../context/PokedexContext';

interface Props {
  pokemon: Pokemon;
}


const PokemonCard = ({ pokemon }: Props) => {
  const { _setPokemon } =  useContext(PokedexContext) as PokemonContextType;
  const viewPokemon = (pokemonId: number) => {
    _setPokemon(pokemonId);
  }

  return (
    <Card>
      <Card.Content>
        <Text variant="titleLarge">{pokemon.id} {pokemon.name}</Text>
        <Text variant="bodyMedium">Para saber más de este pokemón dar click en ner más.</Text>
      </Card.Content>
      {pokemon.avatar &&
        <Card.Cover source={{ uri: pokemon.avatar }} />
      }
      <Card.Actions>
        <Button onPress={() => viewPokemon(pokemon.id)} mode="contained">Ver más</Button>
      </Card.Actions>
    </Card>

  )
}
/** <View>
      <Image src={pokemon.avatar} style={{ objectFit: 'cover', width: 150, height: 150 }} />
      <Text>{pokemon.name}??</Text>
    </View>  */
export default PokemonCard