import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingScreen from '../src/screens/LoadingScreen';

describe('LoadingScreen', () => {

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<LoadingScreen />);

    expect(getByTestId('loading-logo')).toBeTruthy();
    expect(getByTestId('loading-indicator')).toBeTruthy();
    expect(getByText('Un momento por favor')).toBeTruthy();

  });
});
