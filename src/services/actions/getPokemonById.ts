
import { Pokemon, PokemonContextType } from '../../config/interfaces/pokemon';
import { PokemonAPIResponse } from '../../config/interfaces/pokemonAPI';
import { pokeApi } from '../pokeApi';

const getImages = (dataImages: any): string[] => {
    const images: string[] = [
        dataImages.front_default,
        dataImages.back_default,
        dataImages.front_shiny,
        dataImages.back_shiny,
    ];

    if (dataImages.other?.home.front_default) {
        images.push(dataImages.other?.home.front_default);
    }
    if (dataImages.other?.['official-artwork'].front_default) {
        images.push(dataImages.other?.['official-artwork'].front_default);
    }
    if (dataImages.other?.['official-artwork'].front_shiny) {
        images.push(dataImages.other?.['official-artwork'].front_shiny);
    }
    if (dataImages.other?.showdown.front_default) {
        images.push(dataImages.other?.showdown.front_default);
    }
    if (dataImages.other?.showdown.back_default) {
        images.push(dataImages.other?.showdown.back_default);
    }

    return images;
};

const pokemonMapper = (data: any): Pokemon => {
    
    return {
        id: data.id,
        name: data.name,
        url: "",
        avatar: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        types: data.types.map((type: any) => type.type.name),
        images: getImages(data.sprites),
        abilities: data.abilities.map((ability: any) => ability.ability.name),
    }
}

export const getPokemonById = async (
    id: number,
): Promise<Pokemon> => {
    console.log("GET By Id", id)
    try {
        const url = `/pokemon/${id}`;
        const { data } = await pokeApi.get<PokemonAPIResponse>(url);
        const pokemon = pokemonMapper(data);
        return pokemon;
    } catch (error) {
        throw new Error('Error en getPokemonById');
    }
};
