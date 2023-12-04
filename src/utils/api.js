export const fetchPokemonImg = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonData = await response.json();
  // console.log(pokemonData.sprites.front_default);
  return {
    img: pokemonData.sprites.front_default,
    name: pokemonData.name,
  };
};
