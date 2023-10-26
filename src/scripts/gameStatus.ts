import { drawnNumber, setActiveField } from './variables.js';
import { boardFieldsList, instruction } from './init.js';
import { GameBoardStatusType, GameStatsType } from './types/index.js';

export const gameStats: GameStatsType = {
  totalNumberOfStitches: 0,
  totalNumberOfThrows: 0,
};

export const gameBoardStatusDEFEAT: GameBoardStatusType = {
  gameInfoText: 'Przegrałeś... Aby rozpocząć od nowa kliknij przycisk',
  restartGameBtnText: 'Spróbuj jeszcze raz',
  bodyClassName: 'body-end-game-defeat',
};
export const gameBoardStatusWIN: GameBoardStatusType = {
  gameInfoText: 'WYGRANA! Aby rozpocząć od nowa kliknij przycisk',
  restartGameBtnText: 'Zagraj jeszcze raz',
  bodyClassName: 'body-end-game-win',
};

export const updateGameStats = () => {
  gameStats.totalNumberOfThrows++;
  gameStats.totalNumberOfStitches += drawnNumber;
};

export const handleShowGameStatus = (
  boardValues: GameBoardStatusType
): void => {
  const restartGameBtn = document.createElement('button');
  const gameInfo = document.querySelector('.game-info');

  const setGameStatus = () => {
    const dices = document.querySelectorAll('.dice');

    dices.forEach((dice) => dice.classList.add('hidden'));
    instruction.classList.add('hidden');

    restartGameBtn.classList.add('restart-game-btn');
    restartGameBtn.textContent = boardValues.restartGameBtnText;

    const gameInfoText = document.createElement('p');
    gameInfoText.textContent = boardValues.gameInfoText;
    document.body.classList.add(boardValues.bodyClassName);

    const gameInfoStats = document.createElement('div');
    gameInfoStats.classList.add('game-stats');
    gameInfoStats.innerHTML = `
    <h2>STATYSTYKI GRY</h2>
    <p>łączna liczba rzutów kostką: ${gameStats.totalNumberOfThrows}</p>
    <p>Średnia liczba wyrzuconych oczek: ${(
      gameStats.totalNumberOfStitches / gameStats.totalNumberOfThrows
    ).toPrecision(2)}</p>
        `;

    const handleResetGame = () => {
      boardFieldsList.forEach((el) => el.classList.remove('jumpedOn'));
      const firstField = document.getElementById('field-1');
      firstField?.classList.add('first-field');
      firstField?.classList.add('active-field');
      firstField?.classList.add('jumpedOn');
      instruction.classList.remove('hidden');
      dices.forEach((dice) => dice.classList.remove('hidden'));

      document.body.classList.remove(boardValues.bodyClassName);

      gameInfo?.removeChild(gameInfoText);
      gameInfo?.removeChild(restartGameBtn);
      gameInfo?.removeChild(gameInfoStats);

      gameStats.totalNumberOfStitches = 0;
      gameStats.totalNumberOfThrows = 0;

      setActiveField(1);
      restartGameBtn.removeEventListener('click', handleResetGame, true);
    };

    gameInfo?.append(gameInfoText, restartGameBtn, gameInfoStats);
    restartGameBtn.addEventListener('click', handleResetGame, true);
  };

  setGameStatus();
};
