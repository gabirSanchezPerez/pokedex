import { Image, View } from 'react-native'
import React, { useContext } from 'react'
import { Pokemon, PokemonContextType } from '../../config/interfaces/pokemon'
import { Avatar, Button, Card, MD2Colors, Text } from 'react-native-paper'
import { PokedexContext } from '../../context/PokedexContext';

interface Props {
  pokemon: Pokemon;
}


const CardListPokemon = ({ pokemon }: Props) => {
  const { viewPokemon } =  useContext(PokedexContext) as PokemonContextType;
  const _viewPokemon = (pokemonId: number) => {
    viewPokemon(pokemonId);
  }

  return (
    <Card style={{marginBottom: 10}}>
      <Card.Content>
        <Text variant="titleLarge">{pokemon.id} {pokemon.name.toUpperCase()}</Text>
        <Text variant="bodyMedium">Para saber más de este pokemón dar click en ner más.</Text>
      </Card.Content>
      {pokemon.avatar &&
        <Card.Cover source={{ uri: pokemon.avatar }} />
      }
      <Card.Actions style={{padding: 15}}>
        <Button buttonColor={MD2Colors.blue700}  onPress={() => _viewPokemon(pokemon.id)} mode="contained" textColor={MD2Colors.white}>Ver más</Button>
      </Card.Actions>
    </Card>

  )
}

export default CardListPokemon