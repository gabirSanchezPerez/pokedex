import { StyleSheet } from 'react-native';
import React from 'react';
import { Button, MD2Colors } from 'react-native-paper';

interface Props {
  title: string;
  type?: string;
  press?: () => void;
}
const ButtonPokemon = ({ title, press, type = "primary" }: Props) => {

  return (
    <>{
      press ? (
        <Button
          buttonColor={type === "primary" ? MD2Colors.blue900 : MD2Colors.grey400}
          textColor={MD2Colors.white}
          onPress={() => press()}
          mode="contained"
          style={{ borderColor: MD2Colors.white, borderWidth: 1, marginBottom: 5 }}  >
          {title}
        </Button >
      ) : (
        <Button
          buttonColor={type === "primary" ? MD2Colors.blue900 : MD2Colors.grey400}
          textColor={MD2Colors.white}
          mode="outlined"
          style={{ borderColor: MD2Colors.white, borderWidth: 1, marginBottom: 5 }}  >
          {title}
        </Button>
      )}</>

  );
};

export const style = StyleSheet.create({

});

export default ButtonPokemon;
