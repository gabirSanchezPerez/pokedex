
import { Pokemon } from '../../config/interfaces/pokemon';
import { pokeApi } from '../pokeApi';

const pokemonMapper = (data: any): Pokemon => {
    let id = data.url.split("/")[6];
    return {
        id,
        name: data.name,
        url: data.url,
    }
}

export const getCaracteristic = async (
    origen: string,
    id: number
): Promise<[string, Pokemon[]]> => {
    try {
        const url = `/${origen}/${id}`;
        const { data } = await pokeApi.get(url);
        
        const pokemons = data.pokemon.map( (pokemons: any) => pokemonMapper(pokemons.pokemon));
        
        return [data.name, pokemons];
    } catch (error) {
        throw new Error('Error en getCaracteristic');
    }
};
