import './App.css'
import { useEffect, useState } from 'react'
import Card from './components/Card'
import './styles/global.css'
import { fetchPokemonImg } from './utils/api';
import { shuffle } from 'underscore';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [chosenPokemon, setChosenPokemon] = useState(new Set());
  
  useEffect(() => {
    async function fillPokemonImgs() {
      const tempPokemonImgs = []
      const randomPokemonIds = getRandomPokemonIds(12);
      for (let i = 0; i < randomPokemonIds.length; i++) {
        const pokemonImg = await fetchPokemonImg(randomPokemonIds[i]);
        tempPokemonImgs.push(pokemonImg);
      }
      setPokemonData(tempPokemonImgs);
    }
    fillPokemonImgs();
  }, []);

  function getRandomPokemonIds(count) {
    let numbers = Array.from({ length: 151 }, (_, index) => index + 1);
    numbers = shuffle(numbers);
    console.log(numbers);
    const randomIds = numbers.slice(0, count);
    return randomIds;
  }

  function handlePokemonClicked(e) {
    const { name } = e.target.closest('button');
    console.log(e.target);
    console.log(name);
    if (!chosenPokemon.has(name)) {
      setChosenPokemon((prevSet) => new Set(prevSet).add(name));
      setCurrentScore((prevScore) => prevScore + 1);
      if (currentScore + 1 > highscore) {
        setHighscore(currentScore + 1);
      }
    }
  }
  

  return (
    <>
      <div className="scores">
        <p className='current-score'>Current Score: {currentScore}</p>
        <p className='highscore'>Highscore: {highscore}</p>
      </div>
      <div className="cards-container">
        {pokemonData.length > 0 && pokemonData.map((pokemonInfo) => 
          <Card key={pokemonInfo.name} pokemonImg={pokemonInfo.img} pokemonName={pokemonInfo.name} handlePokemonClicked={handlePokemonClicked}/>)}
        {pokemonData.length === 0 && <p>Loading...</p>}
      </div>
    </>
  )
}

export default App
