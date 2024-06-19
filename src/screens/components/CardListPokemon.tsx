import React from 'react'
import { Pokemon } from '../../config/interfaces/pokemon'
import { Card, MD2Colors, Text } from 'react-native-paper'
import ButtonPokemon from './ButtonPokemon';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props {
  pokemon: Pokemon;
}

const CardListPokemon = ({ pokemon }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Card style={{marginBottom: 10, borderColor: MD2Colors.blue900, borderWidth: 1}}>
      <Card.Content>
        <Text variant="titleLarge" selectionColor={MD2Colors.grey900}># {pokemon.id}: {pokemon.name}</Text>
      </Card.Content>
      <Card.Actions>
        <ButtonPokemon title="Ver" press={() => navigation.navigate('DetailScreen', { pokemonId: pokemon.id })} />
      </Card.Actions>
    </Card>
  )
}

export default CardListPokemon