import '../styles/WinScreen.css';
import winImg from '../assets/win-img.png'

const WinScreen = ({ finalScore }) => {

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="message">
          <p className='win-message'>You Win! <br/> You caught all the pokemon!</p>
          <img src={winImg} alt="" />
          <p className='score'>Final Score: {finalScore}</p>
        </div>
        <div className="action-buttons">
          <button className='play-again'>Play Again</button>
          <button className='quit'>Quit</button>
        </div>
      </div>
    </div>
  );
};

export default WinScreen;