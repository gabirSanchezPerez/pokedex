import 'react-native-gesture-handler';

import * as React from 'react';
import { StackNavigator } from './navigation/StackNavigator';
import PokedexProvider from './context/PokedexContext';
import { PaperProvider, MD3LightTheme as themaDefault  } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

const theme = {
  ...themaDefault,
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <PokedexProvider>
          <StackNavigator />
        </PokedexProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
