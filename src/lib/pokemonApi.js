const apiBaseUrl = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemon(name) {
  if (!name) {
    return null;
  }
  return fetch(`${apiBaseUrl}/${name.trim().toLowerCase()}`)
    .then(response => response.ok ? response.json() : null)
    .then((data) => data ? {
      name: data.name,
      image: data.sprites.other.dream_world.front_default,
      types: data.types.map((type) => type.type.name)
    } : null);
}
