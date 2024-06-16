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
    <Card style={{marginBottom: 10, borderColor: MD2Colors.blue900, borderWidth: 1}}>
      <Card.Content>
        <Text variant="titleLarge" selectionColor={MD2Colors.grey900}># {pokemon.id}: {pokemon.name}</Text>
        
      </Card.Content>
      <Card.Actions>
        <ButtonPokemon title="Ver" press={() => _viewPokemon(pokemon.id)} />
      </Card.Actions>
    </Card>

  )
}

export default CardListPokemon