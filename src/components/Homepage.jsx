import '../styles/Homepage.css';
import { useState } from 'react';
import Game from './Game';
import DifficultyScreen from './DifficultyScreen';

const screens = {
  difficultyScreen: 'difficulty',
  gameScreen: 'game',
};

const difficultyMapping = {
  easy: 5,
  medium: 12,
  hard: 20,
};

const Homepage = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(screens.difficultyScreen);
  const [highscores, setHighscores] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });
  const numberOfCards = difficulty ? difficultyMapping[difficulty] : 0;

  function setNewHighScore(highscore, difficulty) {
    setHighscores((prevHighScores) => ({
      ...prevHighScores,
      [difficulty]: highscore
    }));
  }

  function selectDifficulty(e) {
    const { name } = e.target;
    setDifficulty(name);
  }

  function playGame() {
    if (!difficulty) {
      return;
    }
    setCurrentScreen(screens.gameScreen);
  }

  function changeToDifficultyScreen() {
    setCurrentScreen(screens.difficultyScreen);
  }

  return (
    <>
      <h1 className="title">Pokemon Memory Card Game</h1>
      <main>
        {currentScreen === screens.difficultyScreen && 
        <DifficultyScreen 
          difficulty={difficulty}
          selectDifficulty={selectDifficulty}
          playGame={playGame}
        />}
        {currentScreen === screens.gameScreen && 
        <Game 
          numberOfCards={numberOfCards} 
          difficulty={difficulty} 
          setNewHighScore={setNewHighScore} 
          changeToDifficultyScreen={changeToDifficultyScreen} 
          highscore={highscores[difficulty]}
        />}
      </main>
    </>
  );
};

export default Homepage;