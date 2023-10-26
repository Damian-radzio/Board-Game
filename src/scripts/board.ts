import { numberOfBoardFields, diceList, boardFieldsList } from './init.js';
import {
  gameBoardStatusDEFEAT,
  gameBoardStatusWIN,
  handleShowGameStatus,
} from './gameStatus.js';
import { handleBlockDiceOnJump, handleRollDice } from './dice.js';
import { setActiveField, activeField, drawnNumber } from './variables.js';
import { bodyWarningAlarm } from './helpers/index.js';

const goToField = (fieldNumber: number): void => {
  setActiveField(fieldNumber);
  diceList.forEach((el) => el.classList.add('hidden'));
  setTimeout(() => {
    boardFieldsList.forEach((el) => el.classList.remove('jumpedOn'));
    boardFieldsList[activeField - 1].classList.add('jumpedOn');
    diceList.forEach((el) => el.classList.remove('hidden'));
  }, 500);
};

const checkSpecialFields = (): void => {
  setTimeout(() => {
    if (activeField === 12) {
      diceList.forEach((el) => el.classList.add('hidden'));
      bodyWarningAlarm();
      setTimeout(() => {
        handleShowGameStatus(gameBoardStatusDEFEAT);
      }, 2000);
    } else if (activeField === 20) {
      handleShowGameStatus(gameBoardStatusWIN);
    } else if (activeField === 19) {
      bodyWarningAlarm();
      handleBlockDiceOnJump();
      diceList.forEach((el) => el.classList.add('hidden'));

      setTimeout(() => {
        goToField(11);
        diceList.forEach((el) => el.classList.add('hidden'));
      }, 2000);
    }
  }, drawnNumber * 500);
};

export const handleMovePawn = (): void => {
  let animationDelayMultiplier = 1;
  if (activeField + drawnNumber <= numberOfBoardFields) {
    for (let i = activeField; i <= activeField + drawnNumber - 1; i++) {
      animationDelayMultiplier++;
      setTimeout(() => {
        boardFieldsList.forEach((el) => el.classList.remove('jumpedOn'));
        boardFieldsList[i].classList.add('jumpedOn');
      }, animationDelayMultiplier * 350);
    }
    setActiveField(activeField + drawnNumber);
    checkSpecialFields();
  } else if (activeField + drawnNumber > numberOfBoardFields) {
    bodyWarningAlarm();
    setTimeout(() => {
      diceList.forEach((el) => el.classList.add('hidden'));
    }, 1000);
    setTimeout(() => {
      setActiveField(
        numberOfBoardFields - (activeField + drawnNumber - numberOfBoardFields)
      );
      for (let i = numberOfBoardFields; i >= activeField - 1; i--) {
        animationDelayMultiplier++;
        setTimeout(() => {
          boardFieldsList.forEach((el) => el.classList.remove('jumpedOn'));
          boardFieldsList[i]?.classList.add('jumpedOn');
        }, animationDelayMultiplier * 350);
      }
    }, 2000);
    setTimeout(() => {
      diceList.forEach((el) => el.classList.remove('hidden'));
    }, 4000);
    checkSpecialFields();
  }

  diceList.forEach((el) => el.removeEventListener('click', handleRollDice));
};
