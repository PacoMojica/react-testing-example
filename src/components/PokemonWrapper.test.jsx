import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonWrapper from './PokemonWrapper';
import { fetchPokemon } from "../lib/pokemonApi";
import { pikachuMock } from '../__mocks__/pokemonMocks';

jest.mock("../lib/pokemonApi", () => ({
  fetchPokemon: jest.fn(),
}));

describe('PokemonWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('searches and displays a pokemon', async () => {
    fetchPokemon.mockResolvedValue(pikachuMock);

    render(<PokemonWrapper name="pikachu" />);

    expect(await screen.findByText('Pikachu')).toBeTruthy();
  });

  it('displays loading indicator', async () => {
    fetchPokemon.mockReturnValue(new Promise(() => {}));

    render(<PokemonWrapper name="pikachu" />);

    expect(await screen.findByText('Loading...')).toBeTruthy();
  });

  it('displays a not found message', async () => {
    fetchPokemon.mockReturnValue(Promise.resolve(null));

    render(<PokemonWrapper name="pika" />);

    expect(await screen.findByText('Not found')).toBeTruthy();
  });

  it('displays an empty state if no name is provided', async () => {
    fetchPokemon.mockResolvedValue(null);

    render(<PokemonWrapper />);

    expect(await screen.findByTestId('empty-state')).toBeTruthy();
  });
  
});
