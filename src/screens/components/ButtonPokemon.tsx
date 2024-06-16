import {StyleSheet} from 'react-native';
import React from 'react';
import { Button, MD2Colors } from 'react-native-paper';

interface Props {
  title: string;
  press: () => void;
}
const ButtonPokemon = ({ title, press }: Props) => {

  return (
    <Button buttonColor={MD2Colors.yellow700} textColor={MD2Colors.black} onPress={() => press()} mode="contained" style={{borderColor: MD2Colors.blue700, borderWidth: 2}} >
      {title}
    </Button>
  );
};

export const style = StyleSheet.create({
  
});

export default ButtonPokemon;
