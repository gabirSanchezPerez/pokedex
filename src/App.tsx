import 'react-native-gesture-handler';

import * as React from 'react';
import {StackNavigator} from './navigation/StackNavigator';
import {ThemeContextProvider} from './context/ThemeContext';
import PokedexProvider from './context/PokedexContext';

const App = () => {
  return (
    <ThemeContextProvider>
      <PokedexProvider>
        <StackNavigator />
      </PokedexProvider>
    </ThemeContextProvider>
  );
};

export default App;
