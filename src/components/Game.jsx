import '../styles/Game.css'
import { useEffect, useState } from 'react'
import Card from './Card'
import '../styles/global.css'
import { fetchPokemonData } from '../utils/api';
import { shuffle } from 'underscore';
import EndGameScreen from './EndGameScreen';

function Game({
  numberOfCards,
  difficulty,
  highscore,
  setNewHighScore,
  changeToDifficultyScreen,
}) {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [chosenPokemon, setChosenPokemon] = useState(new Set());
  const [gamehasEnded, setGameHasEnded] = useState(false);
  const [wonGame, setWonGame] = useState(null);
  const [playCount, setPlayCount] = useState(0);

  useEffect(() => {
    async function fillPokemonImgs() {
      const tempPokemonData = []
      const randomPokemonIds = getRandomPokemonIds(numberOfCards);
      for (let i = 0; i < randomPokemonIds.length; i++) {
        const pokemonData = await fetchPokemonData(randomPokemonIds[i]);
        tempPokemonData.push(pokemonData);
      }
      setPokemonData(tempPokemonData);
    }
    fillPokemonImgs();
  }, [numberOfCards, playCount]);

  function getRandomPokemonIds(count) {
    let numbers = Array.from({ length: 151 }, (_, index) => index + 1);
    numbers = shuffle(numbers);
    const randomIds = numbers.slice(0, count);
    return randomIds;
  }

  function handlePokemonClicked(e) {
    const { name } = e.target.closest('button');
    if (!chosenPokemon.has(name)) {
      setChosenPokemon((prevSet) => new Set(prevSet).add(name));
      setCurrentScore((prevScore) => prevScore + 1);
      if (currentScore + 1 > highscore) {
        setNewHighScore(currentScore + 1, difficulty);
      }
      if (chosenPokemon.size + 1 === pokemonData.length) {
        endGame();
        return;
      }
      shuffleCards();
    } else {
      endGame();
      setWonGame(false);
    }
  }

  function shuffleCards() {
    setPokemonData((prevPokemonData) => shuffle(prevPokemonData))
  }

  function playAgain() {
    setGameHasEnded(false);
    setCurrentScore(0);
    setPokemonData([]);
    setWonGame(null);
    setChosenPokemon(new Set());
    setPlayCount((prevPlayCount) => prevPlayCount + 1);
  }

  function endGame() {
    if (chosenPokemon.size + 1 === pokemonData.length) {
      setWonGame(true);
    }
    setGameHasEnded(true);
  }
  
  return (
    <div className="game">
      <p className='instructions'>Click a Pokemon card to earn points, but don't click the same Pokemon twice.</p>
      <div className="scores-container">
        <div className="scores">
          <p className='highscore'>High Score: {highscore}</p>
          <p className='current-score'>Current Score: {currentScore}</p>
        </div>
      </div>
      <div className="cards-container">
        {pokemonData.length > 0 && pokemonData.map((pokemonInfo) =>
          <Card key={pokemonInfo.name} pokemonImg={pokemonInfo.img} pokemonName={pokemonInfo.name} handlePokemonClicked={handlePokemonClicked}/>)}
        {pokemonData.length === 0 && <p className='loading-text'>Loading Cards...</p>}
      </div>
      {gamehasEnded && <EndGameScreen finalScore={currentScore} wonGame={wonGame} playAgain={playAgain} changeToDifficultyScreen={changeToDifficultyScreen}/>}
    </div>
  )
}

export default Game
