import { useContext } from 'react';
import {Pokemon, PokemonContextType} from '../../config/interfaces/pokemon';
import {PokemonAPIResponse} from '../../config/interfaces/pokemonAPI';
import {pokeApi} from '../pokeApi';

const pokemonMapper = (data: any): Pokemon => {

  let id = data.url.split("/")[6];
  return{
    id,
    name: data.name,
    url: data.url,
  }
}

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<[PokemonAPIResponse, Pokemon[]]> => {
  try {
    const url = `/pokemon?offset=${page}&limit=${limit}`;
    const {data} = await pokeApi.get<PokemonAPIResponse>(url);
    const pokemons = data.results.map( result => pokemonMapper(result));
    return [data, pokemons];
  } catch (error) {
    throw new Error('Error en getPokemons');
  }
};
