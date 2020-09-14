import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { fetchPokemon } from "./lib/pokemonApi";
import { pikachuMock, snorlaxMock, zapdosMock } from './__mocks__/pokemonMocks';
import useRandomPokemon from './hooks/useRandomPokemon';

jest.mock("./lib/pokemonApi", () => ({
  fetchPokemon: jest.fn(),
}));
jest.mock('./hooks/useRandomPokemon', () => jest.fn(() => []));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    fetchPokemon.mockImplementation(async (name) => {
      if (name === 'pikachu') {
        return pikachuMock;
      }
      if (name === 'snorlax') {
        return snorlaxMock;
      }
      return null;
    });
  });

  it('renders App component', async () => {
    render(<App />);

    expect(await screen.findByDisplayValue('pikachu')).toBeTruthy();
    expect(await screen.findByText(pikachuMock.name)).toBeTruthy();
  });

  it('changes rendered component on search', async () => {
    render(<App />);

    const input = await screen.findByDisplayValue('pikachu');
    const button = await screen.findByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'snorlax' } });
    fireEvent.click(button);

    expect(await screen.findByText(snorlaxMock.name)).toBeTruthy();
  });

  it('displays random pokemon', async () => {
    useRandomPokemon.mockImplementation(() => [zapdosMock, jest.fn, false]);

    render(<App />);

    expect(await screen.findByText(zapdosMock.name)).toBeTruthy();
  });

  it('displays loading message on randomize button', async () => {
    useRandomPokemon.mockImplementation(() => [null, jest.fn(), true]);

    render(<App />);

    const button = await screen.findByRole('button', { name: 'Loading...' });

    expect(button).toHaveAttribute('disabled');
  });
  
});
