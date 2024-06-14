import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoadingScreen from '../screens/LoadingScreen';
import ListScreen from '../screens/pokemon/ListScreen';
import DetailScreen from '../screens/pokemon/DetailScreen';

export type RootStackParams = {
  LoadingScreen: undefined;
  ListScreen: undefined;
  DetailScreen: {pokemonID: number};
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
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};
