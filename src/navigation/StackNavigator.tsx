import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingScreen from '../screens/LoadingScreen';
import ListScreen from '../screens/pokemon/ListScreen';
import DetailScreen from '../screens/pokemon/DetailScreen';

export type RootStackParams = {
  LoadingScreen: undefined;
  ListScreen: { listCaracteristic: string};
  DetailScreen: {pokemonId: number};
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="ListScreen" component={ListScreen} initialParams={{ listCaracteristic: "" }} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};
