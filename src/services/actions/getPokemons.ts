import {Pokemon} from '../../config/interfaces/pokemon';
import {PokemonAPIResponse} from '../../config/interfaces/pokemonAPI';
import {pokeApi} from '../pokeApi';

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon?offset=${page}&limit=${limit}`;
    const {data} = await pokeApi.get<PokemonAPIResponse>(url);
    console.log(data);
    return [];
  } catch (error) {
    throw new Error('Error en getPokemons');
  }
};
