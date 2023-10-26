import { drawnNumber, setDrawnNumber } from './variables.js';
import { updateGameStats } from './gameStatus.js';
import { generatePointOfDice } from './helpers/index.js';
import { diceList, maxPointOfDice } from './init.js';
import { handleMovePawn } from './board.js';

export const handleBlockDiceOnJump = (): void => {
  diceList.forEach((el) => el.classList.remove('active-dice'));
  setTimeout(() => {
    diceList.map((dice) => {
      if (dice.className.includes(`${drawnNumber}`)) {
        dice.classList.add('active-dice', 'blocked-dice');
        setTimeout(() => {
          dice.classList.remove('blocked-dice');
        }, 1000 + 400 * drawnNumber);
      }
    });
  }, 100);
};

export const handleRollDice = (): number => {
  setDrawnNumber(generatePointOfDice(1, maxPointOfDice));

  handleBlockDiceOnJump();
  setTimeout(() => {
    handleMovePawn();
  }, 500);
  updateGameStats();
  return drawnNumber;
};
