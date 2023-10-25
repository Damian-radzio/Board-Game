"use strict";
const numberOfBoardFields = 20;
const maxPointOfDice = 6;
const diceList = [];
const boardFieldsList = [];
const specialFields = [12, 19];
let drawnNumber;
let activeField = 1;
const instruction = document.createElement('div');
(function () {
    const board = document.getElementById('board');
    let field = document.createElement('div');
    for (let i = 1; i <= numberOfBoardFields; i++) {
        field = document.createElement('div');
        field.classList.add('board-field');
        field.id = `field-${i}`;
        board === null || board === void 0 ? void 0 : board.appendChild(field);
        const fieldNumberSpan = document.createElement('span');
        fieldNumberSpan.classList.add('field-number-span');
        fieldNumberSpan.innerHTML = i.toString();
        field.appendChild(fieldNumberSpan);
        boardFieldsList.push(field);
    }
    const firstField = document.getElementById('field-1');
    const startImage = document.createElement('img');
    startImage.src = 'src/assets/start.png';
    firstField === null || firstField === void 0 ? void 0 : firstField.appendChild(startImage);
    const lastField = document.getElementById(`field-${numberOfBoardFields.toString()}`);
    const finishImage = document.createElement('img');
    finishImage.src = 'src/assets/finish.png';
    lastField === null || lastField === void 0 ? void 0 : lastField.appendChild(finishImage);
    firstField === null || firstField === void 0 ? void 0 : firstField.classList.add('first-field');
    firstField === null || firstField === void 0 ? void 0 : firstField.classList.add('active-field');
    firstField === null || firstField === void 0 ? void 0 : firstField.classList.add('jumpedOn');
    lastField === null || lastField === void 0 ? void 0 : lastField.classList.add('last-field');
    // special fields
    const specialFields = [
        document.getElementById('field-12'),
        document.getElementById('field-19'),
    ];
    specialFields.map((field) => {
        field === null || field === void 0 ? void 0 : field.classList.add('special-field');
    });
    specialFields.map((field) => {
        const warningImg = document.createElement('img');
        warningImg.src = 'src/assets/warning.png';
        field === null || field === void 0 ? void 0 : field.appendChild(warningImg);
    });
    for (let i = 1; i <= maxPointOfDice; i++) {
        const dice = document.createElement('div');
        dice.classList.add('dice');
        dice.classList.add(`dice-${i}`);
        document.body.appendChild(dice);
        for (let x = 1; x <= i; x++) {
            const diceDot = document.createElement('div');
            diceDot.classList.add('dice-dot');
            diceDot.classList.add(`dot-${x}`);
            dice.appendChild(diceDot);
        }
        diceList.push(dice);
    }
    instruction.innerHTML = `
<h2>INSTRUKCJA</h2>
<p>1. Uwazaj na pole 12! Wejdziesz? Przegrywasz!</p>
<p>2. Uwazaj na pole 19! Wejdziesz? Cofasz się do pola o numerze 11!</p>
<p>3. Gra kończy się wejściem na pole 20</p>
<p>4. Uwaga! Jeśli przekroczysz pole mety cofasz się z niej o tyle pól o ile ją przekroczyłeś!</p>
  `;
    instruction.classList.add('instruction');
    document.body.appendChild(instruction);
    const gameInfo = document.createElement('div');
    gameInfo.classList.add('game-info');
    document.body.appendChild(gameInfo);
})();
const gameStats = {
    totalNumberOfStitches: 0,
    totalNumberOfThrows: 0,
};
const gameBoardStatusDEFEAT = {
    gameInfoText: 'Przegrałeś... Aby rozpocząć od nowa kliknij przycisk',
    restartGameBtnText: 'Spróbuj jeszcze raz',
    bodyClassName: 'body-end-game-defeat',
};
const gameBoardStatusWIN = {
    gameInfoText: 'WYGRANA! Aby rozpocząć od nowa kliknij przycisk',
    restartGameBtnText: 'Zagraj jeszcze raz',
    bodyClassName: 'body-end-game-win',
};
const bodyWarningAlarm = () => {
    document.body.classList.add('warning');
    setTimeout(() => {
        document.body.classList.remove('warning');
    }, 2000);
};
const generatePointOfDice = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const goToField = (fieldNumber) => {
    activeField = fieldNumber;
    setTimeout(() => {
        boardFieldsList.forEach((el) => el.classList.remove('jumpedOn'));
        boardFieldsList[activeField - 1].classList.add('jumpedOn');
    }, 500);
};
const handleMovePawn = () => {
    let animationDelayMultiplier = 1;
    if (activeField + drawnNumber <= numberOfBoardFields) {
        for (let i = activeField; i <= activeField + drawnNumber - 1; i++) {
            animationDelayMultiplier++;
            setTimeout(() => {
                boardFieldsList.forEach((el) => el.classList.remove('jumpedOn'));
                boardFieldsList[i].classList.add('jumpedOn');
            }, animationDelayMultiplier * 350);
        }
        activeField = activeField + drawnNumber;
    }
    else if (activeField + drawnNumber > numberOfBoardFields) {
        bodyWarningAlarm();
        setTimeout(() => {
            activeField =
                numberOfBoardFields - (activeField + drawnNumber - numberOfBoardFields);
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
    setTimeout(() => {
        if (activeField === 12) {
            bodyWarningAlarm();
            setTimeout(() => {
                handleShowGameStatus('DEFEAT', gameBoardStatusDEFEAT);
            }, 2000);
        }
        else if (activeField === 20)
            return handleShowGameStatus('WIN', gameBoardStatusWIN);
        else if (activeField === 19) {
            bodyWarningAlarm();
            setTimeout(() => {
                goToField(11);
            }, 2000);
        }
    }, drawnNumber * 500);
    diceList.forEach((el) => el.removeEventListener('click', handleRollDice));
};
const handleRollDice = () => {
    let drawnDice;
    diceList.forEach((el) => el.classList.remove('active-dice'));
    drawnNumber = generatePointOfDice(1, maxPointOfDice);
    const handleBlockDice = (dice) => {
        dice.classList.add('blocked-dice');
        setTimeout(() => {
            dice.classList.remove('blocked-dice');
        }, 1000 + 400 * drawnNumber);
    };
    setTimeout(() => {
        diceList.map((dice) => {
            if (dice.className.includes(`${drawnNumber}`)) {
                dice.classList.add('active-dice');
                handleBlockDice(dice);
            }
        });
    }, 100);
    setTimeout(() => {
        handleMovePawn();
    }, 500);
    gameStats.totalNumberOfThrows++;
    gameStats.totalNumberOfStitches += drawnNumber;
    return drawnNumber;
};
const handleShowGameStatus = (gameStatus, boardValues) => {
    const restartGameBtn = document.createElement('button');
    const gameInfo = document.querySelector('.game-info');
    const setGameStatus = () => {
        const dices = document.querySelectorAll('.dice');
        const handleResetGame = () => {
            boardFieldsList.forEach((el) => el.classList.remove('jumpedOn'));
            const firstField = document.getElementById('field-1');
            firstField === null || firstField === void 0 ? void 0 : firstField.classList.add('first-field');
            firstField === null || firstField === void 0 ? void 0 : firstField.classList.add('active-field');
            firstField === null || firstField === void 0 ? void 0 : firstField.classList.add('jumpedOn');
            instruction.classList.remove('hidden');
            dices.forEach((dice) => dice.classList.remove('hidden'));
            document.body.classList.remove(boardValues.bodyClassName);
            gameInfo === null || gameInfo === void 0 ? void 0 : gameInfo.removeChild(gameInfoText);
            gameInfo === null || gameInfo === void 0 ? void 0 : gameInfo.removeChild(restartGameBtn);
            gameStats.totalNumberOfStitches = 0;
            gameStats.totalNumberOfThrows = 0;
            activeField = 1;
            restartGameBtn.removeEventListener('click', handleResetGame, true);
        };
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
    <p>Średnia liczba wyrzuconych oczek: ${(gameStats.totalNumberOfStitches / gameStats.totalNumberOfThrows).toPrecision(2)}</p>
    `;
        gameInfo === null || gameInfo === void 0 ? void 0 : gameInfo.appendChild(gameInfoText);
        gameInfo === null || gameInfo === void 0 ? void 0 : gameInfo.appendChild(restartGameBtn);
        gameInfo === null || gameInfo === void 0 ? void 0 : gameInfo.appendChild(gameInfoStats);
        console.log(gameStats);
        restartGameBtn.addEventListener('click', handleResetGame, true);
    };
    setGameStatus();
};
if (diceList.findIndex((el) => el.className.includes('active-dice')) === -1) {
    diceList[0].classList.add('active-dice');
}
diceList.forEach((el) => el.addEventListener('click', handleRollDice, true));
