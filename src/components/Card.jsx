
import '../styles/Card.css';
import { capitalize } from 'lodash';

function Card({ pokemonImg, pokemonName, handlePokemonClicked }) {
  const capitalizedPokemonName = capitalize(pokemonName);
  return (
    <button className="card" onClick={handlePokemonClicked} name={pokemonName}>
      <img src={pokemonImg} alt="" />
      <p>{capitalizedPokemonName}</p>
    </button>
  )
}

export default Card;
