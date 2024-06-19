import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ButtonPokemon from '../src/screens/components/ButtonPokemon';

describe('ButtonPokemon', () => {
  it('renders correctly with primary type', () => {
    const { getByText } = render(<ButtonPokemon title="Primary Button" />);
    const button = getByText('Primary Button');
    expect(button).toBeTruthy();
  });

  it('renders correctly with secondary type', () => {
    const { getByText } = render(<ButtonPokemon title="Secondary Button" type="secondary" />);
    const button = getByText('Secondary Button');
    expect(button).toBeTruthy();
  });

  it('calls press function when button is pressed', () => {
    const pressMock = jest.fn();
    const { getByText } = render(<ButtonPokemon title="Press Me" press={pressMock} />);
    const button = getByText('Press Me');
    fireEvent.press(button);
    expect(pressMock).toHaveBeenCalledTimes(1);
  });
});

