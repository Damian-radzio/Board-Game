import { GameStatusTypes } from './types/index.js';
import { numberOfBoardFields, diceList, boardFieldsList } from './init.js';
import { gameBoardStatusDEFEAT, gameBoardStatusWIN, handleShowGameStatus, } from './gameStatus.js';
import { handleRollDice } from './dice.js';
import { setActiveField, activeField, drawnNumber } from './variables.js';
import { bodyWarningAlarm } from './helpers/index.js';
const goToField = (fieldNumber) => {
    setActiveField(fieldNumber);
    setTimeout(() => {
        boardFieldsList.forEach((el) => el.classList.remove('jumpedOn'));
        boardFieldsList[activeField - 1].classList.add('jumpedOn');
    }, 500);
};
const checkSpecialFields = () => {
    setTimeout(() => {
        if (activeField === 12) {
            bodyWarningAlarm();
            setTimeout(() => {
                handleShowGameStatus(GameStatusTypes.DEFEAT, gameBoardStatusDEFEAT);
            }, 2000);
        }
        else if (activeField === 20) {
            handleShowGameStatus(GameStatusTypes.WIN, gameBoardStatusWIN);
        }
        else if (activeField === 19) {
            bodyWarningAlarm();
            setTimeout(() => {
                goToField(11);
            }, 2000);
        }
    }, drawnNumber * 500);
};
export const handleMovePawn = () => {
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
    }
    else if (activeField + drawnNumber > numberOfBoardFields) {
        bodyWarningAlarm();
        setTimeout(() => {
            setActiveField(numberOfBoardFields - (activeField + drawnNumber - numberOfBoardFields));
            for (let i = numberOfBoardFields; i >= activeField - 1; i--) {
                animationDelayMultiplier++;
                setTimeout(() => {
                    boardFieldsList.forEach((el) => el.classList.remove('jumpedOn'));
                    boardFieldsList[i].classList.add('jumpedOn');
                }, animationDelayMultiplier * 350);
            }
        }, 2000);
    }
    else if (activeField + drawnNumber === 19) {
        goToField(11);
    }
    checkSpecialFields();
    diceList.forEach((el) => el.removeEventListener('click', handleRollDice));
};
