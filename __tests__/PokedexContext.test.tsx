import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import PokedexProvider, { PokedexContext } from '../src/context/PokedexContext';
import { getPokemons } from '../src/services/actions/getPokemons';
import { getPokemonById } from '../src/services/actions/getPokemonById';
import { getCaracteristic } from '../src/services/actions/getCaracterist';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native-paper';

// Mock de las funciones de obtención de datos
jest.mock('../src/services/actions/getPokemons');
jest.mock('../src/services/actions/getPokemonById');
jest.mock('../src/services/actions/getCaracterist');

const mockedGetPokemons = getPokemons as jest.MockedFunction<typeof getPokemons>;
const mockedGetPokemonById = getPokemonById as jest.MockedFunction<typeof getPokemonById>;
const mockedGetCaracteristic = getCaracteristic as jest.MockedFunction<typeof getCaracteristic>;

const Stack = createStackNavigator();

const TestScreen = () => {
    return (
        <PokedexProvider>
            <TestComponent />
        </PokedexProvider>
    );
};

const TestComponent = () => {
    const context = React.useContext(PokedexContext);
    if (!context) {
        return null;
    }

    return (
        <>
            {context.pokemons.map(pokemon => (
                <Text key={pokemon.id}>{pokemon.name}</Text>
            ))}
        </>
    );
};

describe('PokedexProvider', () => {
    beforeEach(() => {
       // mockedGetPokemons.mockReset();
        mockedGetPokemonById.mockReset();
        mockedGetCaracteristic.mockReset();
    });

    it('provides pokemons after initial render', async () => {
        const mockPokemons = [{ id: 1, name: 'Bulbasaur', url: "https://pokeapi.co/api/v2/pokemon/1/" }];
        mockedGetPokemons.mockResolvedValue([{
            count: 150,
            next: "https://pokeapi.co/api/v2/pokemon?offset=40&limit=20",
            previous: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
            results: [
                { name: 'Bulbasaur', url: "https://pokeapi.co/api/v2/pokemon/1/" },
                { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
                { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
            ]
        }, mockPokemons]);

        

        const { getByText } = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="TestScreen" component={TestScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        await waitFor(() => expect(getByText('Bulbasaur')).toBeTruthy());
    });

    it('calls obtenerPokemonById and sets the pokemon', async () => {
        const mockPokemon = { id: 1, name: 'Bulbasaur', url: "https://pokeapi.co/api/v2/pokemon/1/" };
        mockedGetPokemonById.mockResolvedValue(mockPokemon);

        const TestComponentWithPokemon = () => {
            const context = React.useContext(PokedexContext);
            if (!context) {
              return null;
            }
      
            React.useEffect(() => {
              context.obtenerPokemonById(1);
            }, []);
      
            return <Text>{context.pokemon?.name}</Text>;
          };

        const { getByText } = render(
            <NavigationContainer>
                <PokedexProvider>
                    <TestComponentWithPokemon  />
                </PokedexProvider>
            </NavigationContainer>
        );

        await waitFor(() => expect(getByText('Bulbasaur')).toBeTruthy());
    });

    it('calls obtenerCaracteristica and sets the pokemonCaracterist', async () => {
         const mockCaracteristic = ["Tipo: flying", [
             { id: 1, name: 'Bulbasaur', url: "https://pokeapi.co/api/v2/pokemon/1/" },
             { id: 2, name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
         ]];
         mockedGetCaracteristic.mockResolvedValue(mockCaracteristic);
 
         const TestComponent = () => {
             const context = React.useContext(PokedexContext);
             if (!context) {
                 return null;
             }
 
             React.useEffect(() => {
                 context.obtenerCaracteristica('https://pokeapi.co/api/v2/type/3');
             }, []);
 
             return <Text>{context.pokemonCaracterist[0]?.name}</Text>;
         };
 
         const { getByText } = render(
             <NavigationContainer>
                 <PokedexProvider>
                     <TestComponent />
                 </PokedexProvider>
             </NavigationContainer>
         );
 
         await waitFor(() => expect(getByText('Bulbasaur')).toBeTruthy());
     });
});
