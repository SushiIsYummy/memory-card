import '../styles/DifficultyScreen.css';

function DifficultyScreen({
  difficulty,
  selectDifficulty,
  playGame,
}) {
  return (
    <div className="difficulty-selection">
      <h2>SELECT DIFFICULTY</h2>
      
      <div className="difficulty-buttons">
        <button name='easy' className={difficulty === 'easy' ? 'selected' : ''} onClick={selectDifficulty}>EASY</button>
        <button name='medium' className={difficulty === 'medium' ? 'selected' : ''} onClick={selectDifficulty}>MEDIUM</button>
        <button name='hard' className={difficulty === 'hard' ? 'selected' : ''} onClick={selectDifficulty}>HARD</button>
      </div>

      <div className="action-buttons">
        <button className='play-button' onClick={playGame}>PLAY</button> 
        <button className='quit-button'>QUIT</button>
      </div>
    </div>
  )
}

export default DifficultyScreen;