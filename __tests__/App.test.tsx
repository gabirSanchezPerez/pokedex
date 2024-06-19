import 'react-native-gesture-handler/jestSetup';
import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from '../src/App';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('../src/context/PokedexContext', () => ({
  __esModule: true,
  PokedexProvider: ({children}: {children: React.ReactNode}) => <>{children}</>,
}));

jest.mock('../src/navigation/StackNavigator', () => ({
  __esModule: true,
  default: () => <div data-testid="stack-navigator" />,
}));

describe('<App />', () => {
  it('renders correctly', async () => {
    const {getByTestId} = render(<App />);

    await waitFor(() => {
      expect(getByTestId('stack-navigator')).toBeTruthy();
    });
  });
});
