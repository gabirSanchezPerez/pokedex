import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import CardListPokemon from '../src/screens/components/CardListPokemon';
import {NavigationContext} from '@react-navigation/native';
import {Pokemon} from '../src/config/interfaces/pokemon';

// Mocks
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const mockPokemon: Pokemon = {
  id: 1,
  name: 'Bulbasaur',
  url: '',
  avatar:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  images: [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  ],
  abilities: [{name: 'Overgrow', url: 'https://pokeapi.co/api/v2/ability/65/'}],
  types: [{name: 'Grass', url: 'https://pokeapi.co/api/v2/type/12/'}],
};

describe('CardListPokemon', () => {
  it('renders correctly', () => {
    const {getByText} = render(<CardListPokemon pokemon={mockPokemon} />);

    expect(getByText(`# ${mockPokemon.id}: ${mockPokemon.name}`)).toBeTruthy();
  });

  /*it('navigates to DetailScreen when the button is pressed', () => {
    const mockNavigate = jest.fn();

    const {getByText} = render(
      <NavigationContext.Provider value={{navigate: mockNavigate} as any}>
        <CardListPokemon pokemon={mockPokemon} />
      </NavigationContext.Provider>,
    );

    const viewButton = getByText('Ver');
    fireEvent.press(viewButton);
    expect(mockNavigate).toHaveBeenCalledWith('DetailScreen', {
      pokemonId: mockPokemon.id,
    });
  });*/
});
