import React from "react";
import { fetchPokemon } from "../lib/pokemonApi";
import Pokemon from "./Pokemon";

export default ({ name }) => {
  const [pokemon, setPokemon] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    fetchPokemon(name).then((pokemonData) => {
      setPokemon(pokemonData);
      setLoading(false);
    });
  }, [name]);

  return (
    <div>
      {!name ? (
        <p data-testid="empty-state">Search for a pokemon!</p>
      ) : loading ? (
        <h2>Loading...</h2>
      ) : !pokemon ? (
        <span>Not found</span>
      ) : (
        <Pokemon {...pokemon} />
      )}
    </div>
  );
};
