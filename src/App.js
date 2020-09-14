import React from 'react';
import './App.css';

import PokemonWrapper from "./components/PokemonWrapper";
import SearchInput from "./components/SearchInput";
import useRandomPokemon from './hooks/useRandomPokemon';
import Pokemon from './components/Pokemon';

export default function App() {
  const [name, setName] = React.useState("pikachu");
  const [randomPokemon, getRandomPokemon, loading] = useRandomPokemon();

  return (
    <div className="App">
      <div>
        <h1>Search your Pokemon!</h1>
        <SearchInput initSearchTerm={name} onChange={setName} />
        <PokemonWrapper name={name} />
      </div>
      <div>
        <h1>Get random Pokemon!</h1>
        {randomPokemon && (
          <Pokemon {...randomPokemon} />
        )}
        <button disabled={loading} onClick={getRandomPokemon}>
          {loading ? 'Loading...' : 'Randomize!'}
        </button>
      </div>
    </div>
  );
}
