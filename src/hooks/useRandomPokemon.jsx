import React from 'react';
import { fetchPokemon } from '../lib/pokemonApi';

const maxPokemonId = 500;

export default () => {
  const [randomPokemon, setRandomPokemon] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const randomPokemonId = Math.floor(Math.random() * maxPokemonId) + 1;

  const getRandomPokemon = () => {
    setLoading(true);

    fetchPokemon(String(randomPokemonId)).then(pokemon => {
      setRandomPokemon(pokemon);
      setLoading(false);
    });
  }
  return [randomPokemon, getRandomPokemon, loading];
}
