import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CardPokemon from '../src/screens/components/CardPokemon';
import {PokedexContext} from '../src/context/PokedexContext';
import {PokemonContextType} from '../src/config/interfaces/pokemon';
import {NavigationContext} from '@react-navigation/native';
import {Pokemon} from '../src/config/interfaces/pokemon';

// Mocks
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: jest.fn(),
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

const mockContextValue: PokemonContextType = {
  obtenerCaracteristica: jest.fn(),
  // otros valores de contexto si es necesario
};

describe('CardPokemon', () => {
  it('renders correctly', () => {
    const {getByText, getByTestId} = render(
      <PokedexContext.Provider value={mockContextValue}>
        <CardPokemon pokemon={mockPokemon} />
      </PokedexContext.Provider>,
    );

    expect(getByText('Bulbasaur')).toBeTruthy();
    expect(getByTestId('pokemon-avatar')).toBeTruthy();
  });

  it('calls obtenerCaracteristica when an ability chip is pressed', () => {
    const {getByText} = render(
      <PokedexContext.Provider value={mockContextValue}>
        <CardPokemon pokemon={mockPokemon} />
      </PokedexContext.Provider>,
    );

    const abilityChip = getByText('Overgrow');
    fireEvent.press(abilityChip);

    expect(mockContextValue.obtenerCaracteristica).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/ability/65/',
    );
  });

  it('calls obtenerCaracteristica when a type chip is pressed', () => {
    const {getByText} = render(
      <PokedexContext.Provider value={mockContextValue}>
        <CardPokemon pokemon={mockPokemon} />
      </PokedexContext.Provider>,
    );

    const typeChip = getByText('Grass');
    fireEvent.press(typeChip);

    expect(mockContextValue.obtenerCaracteristica).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/type/12/',
    );
  });

  /*it('calls navigation.goBack when the back button is pressed', () => {
    const mockGoBack = jest.fn();

    const {getByText} = render(
      <NavigationContext.Provider value={{goBack: mockGoBack} as any}>
        <PokedexContext.Provider value={mockContextValue}>
          <CardPokemon pokemon={mockPokemon} />
        </PokedexContext.Provider>
      </NavigationContext.Provider>,
    );

    const backButton = getByText('Regresar');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });*/
});
