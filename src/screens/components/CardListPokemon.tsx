import { Image, View } from 'react-native'
import React, { useContext } from 'react'
import { Pokemon, PokemonContextType } from '../../config/interfaces/pokemon'
import { Card, MD2Colors, Text } from 'react-native-paper'
import { PokedexContext } from '../../context/PokedexContext';
import ButtonPokemon from './ButtonPokemon';

interface Props {
  pokemon: Pokemon;
}

const CardListPokemon = ({ pokemon }: Props) => {
  const { viewPokemon } =  useContext(PokedexContext) as PokemonContextType;
  const _viewPokemon = (pokemonId: number) => {
    viewPokemon(pokemonId);
  }

  return (
    <Card mode="elevated" style={{marginBottom: 10, borderColor: MD2Colors.blue700}}>
      <Card.Content>
        <Text variant="titleLarge">{pokemon.id} {pokemon.name.toUpperCase()}</Text>
        <Text variant="bodyMedium">Para saber más de este pokemón dar click en Ver Pokemon.</Text>
      </Card.Content>
      {pokemon.avatar &&
        <Card.Cover source={{ uri: pokemon.avatar }} />
      }
      <Card.Actions style={{padding: 15}}>
        <ButtonPokemon title="Ver Pokemon" press={() => _viewPokemon(pokemon.id)} />
      </Card.Actions>
    </Card>

  )
}

export default CardListPokemon