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
            <div className="text">
              <p className='win-message'>You Win!</p>
              <p className="extra-info">You caught all the pokemon!</p>
            </div>
            <img src={winImg} alt="win image" />
          </>}
          {!wonGame && 
          <>
            <div className="text">
              <p className='lose-message'>You Lose!</p>
              <p className="extra-info">You caught the same pokemon twice!</p>
            </div>
            <img src={loseImg} alt="lose image" />
          </>}
          <p className='score'>Final Score: {finalScore}</p>
        </div>
        <div className="action-buttons">
          <button className='play-again' onClick={playAgain}>Play Again</button>
          <button className='quit' onClick={changeToDifficultyScreen}>Quit</button>
        </div>
      </div>
    </div>
  );
}

export default EndGameScreen;