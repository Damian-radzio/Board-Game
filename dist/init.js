import { handleRollDice } from './dice.js';
export const maxPointOfDice = 6;
export const numberOfBoardFields = 20;
export const diceList = [];
export const boardFieldsList = [];
export const instruction = document.createElement('div');
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
    firstField === null || firstField === void 0 ? void 0 : firstField.classList.add('first-field', 'active-field', 'jumpedOn');
    const startImage = document.createElement('img');
    startImage.src = 'src/assets/start.png';
    firstField === null || firstField === void 0 ? void 0 : firstField.appendChild(startImage);
    const lastField = document.getElementById(`field-${numberOfBoardFields.toString()}`);
    const finishImage = document.createElement('img');
    finishImage.src = 'src/assets/finish.png';
    lastField === null || lastField === void 0 ? void 0 : lastField.appendChild(finishImage);
    lastField === null || lastField === void 0 ? void 0 : lastField.classList.add('last-field');
    // special fields
    const specialFields = [
        document.getElementById('field-12'),
        document.getElementById('field-19'),
    ];
    specialFields.map((field) => {
        field === null || field === void 0 ? void 0 : field.classList.add('special-field');
        const warningImg = document.createElement('img');
        warningImg.src = 'src/assets/warning.png';
        field === null || field === void 0 ? void 0 : field.appendChild(warningImg);
    });
    for (let i = 1; i <= maxPointOfDice; i++) {
        const dice = document.createElement('div');
        dice.classList.add('dice', `dice-${i}`);
        document.body.appendChild(dice);
        for (let x = 1; x <= i; x++) {
            const diceDot = document.createElement('div');
            diceDot.classList.add('dice-dot', `dot-${x}`);
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
if (diceList.findIndex((el) => el.className.includes('active-dice')) === -1) {
    diceList[0].classList.add('active-dice');
}
diceList.forEach((el) => el.addEventListener('click', handleRollDice, true));
