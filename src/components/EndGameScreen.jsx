import '../styles/EndGameScreen.css';
import winImg from '../assets/win-img.png';
import loseImg from '../assets/lose-img.jpg';

function EndGameScreen({ 
  finalScore,
  wonGame,
  playAgain,
  changeToDifficultyScreen,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="message">
          {wonGame && 
          <>
            <p className='win-message'>You Win! <br/> You caught all the pokemon!</p>
            <img src={winImg} alt="win image" />
          </>}
          {!wonGame && 
          <>
            <p className='lose-message'>You Lose! <br/> You caught a duplicate pokemon!</p>
            <img src={loseImg} alt="lose image" />
          </>}
          <p className='score'>Final Score: {finalScore}</p>
        </div>
        <div className="action-buttons">
          <button className='play-again' onClick={playAgain}>Play Again</button>
          <button className='change-difficulty' onClick={changeToDifficultyScreen}>Change Difficulty</button>
          <button className='quit'>Quit</button>
        </div>
      </div>
    </div>
  );
}

export default EndGameScreen;