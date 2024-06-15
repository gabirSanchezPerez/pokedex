
import { Pokemon } from '../../config/interfaces/pokemon';
import { PokemonAPIResponse, Result } from '../../config/interfaces/pokemonAPI';
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

const caracteristMapper = (caracterist: Result) => {
    return {
        name: caracterist.name,
        url: caracterist.url,
    }
}
const pokemonMapper = (data: any): Pokemon => {
    return {
        id: data.id,
        name: data.name,
        url: "",
        avatar: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        types: data.types.map((type: any) => caracteristMapper(type.type)),
        images: getImages(data.sprites),
        abilities: data.abilities.map((ability: any) => caracteristMapper(ability.ability)),
    }
}

export const getPokemonById = async (
    id: number,
): Promise<Pokemon> => {
    try {
        const url = `/pokemon/${id}`;
        const { data } = await pokeApi.get<PokemonAPIResponse>(url);
        const pokemon = pokemonMapper(data);
        return pokemon;
    } catch (error) {
        throw new Error('Error en getPokemonById');
    }
};
