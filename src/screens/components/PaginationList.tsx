import { StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { PokemonContextType } from '../../config/interfaces/pokemon';
import { PokedexContext } from '../../context/PokedexContext';
import ButtonPokemon from './ButtonPokemon';
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

interface Props {
    listCaracteristic: string
}
const PaginationList = ({ listCaracteristic }: Props) => {
    const route = useRoute();
    const { pagination, obtenerPokemons, pokemonCaracterist } = useContext(PokedexContext) as PokemonContextType;
    const [numInitial, setNumberInitial] = useState(1);
    const [numEnd, setNumEnd] = useState(20);
    const [loading, setLoading] = useState(true);
    

    const mapperPage = (): number[] => {
        const { next, previous } = pagination;
        const extraerParametros = (next !== null) ? next.split("?") : previous.split("&");
        const parametros = extraerParametros[1].split("&").map((params: any) => params.split("="));
        return [parametros[0][1], parametros[1][1]];
    }
    const getMorePokemons = async (order: string) => {
        setLoading(true);
        let page = mapperPage();
        if (order === "+") {
            await obtenerPokemons(page[0]);
        } else if (order === "-") {
            await obtenerPokemons(page[0] - (page[1] * 2));
        } else {
            setNumberInitial(page[0] - page[1] + 1)
            setNumEnd(page[0])
        }
        setLoading(false);
    }

    useEffect(() => { 
        if(listCaracteristic !== "") {
            setNumberInitial(1)
            setNumEnd(pokemonCaracterist.length)
        } else {
            getMorePokemons("") 
        }
    }, [listCaracteristic]);

    return (
        <View style={style.container} >
            {pagination?.previous === null || listCaracteristic !== "" ? <ButtonPokemon title="<" type="secondary"  /> : <ButtonPokemon title="<" press={() => getMorePokemons('-')} type="primary" />}

            {loading ? (
                <ActivityIndicator size="large" color={MD2Colors.blue900} /> 
            ) : (
                <Text variant="bodyMedium">mostrando <Text>{numInitial}</Text> al <Text>{numEnd}</Text> de <Text>{listCaracteristic !== "" ? numEnd: pagination?.count}</Text></Text>
            )}

            {pagination?.next === null || listCaracteristic !== "" ? <ButtonPokemon title=">" type="secondary" /> : <ButtonPokemon title=">" press={() => getMorePokemons('+')} type="primary" />}
        </View>
    )
}

export const style = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: "center", height: 60, width: '100%', backgroundColor: MD2Colors.amber100 }
  });

export default PaginationList