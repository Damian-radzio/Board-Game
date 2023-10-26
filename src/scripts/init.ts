import { handleRollDice } from './dice';

export const minPointOfDice: number = 1;
export const maxPointOfDice: number = 6;
export const numberOfBoardFields: number = 20;
export const diceList: Array<HTMLElement> = [];
export const boardFieldsList: Array<HTMLElement> = [];
export const instruction = document.createElement('div');

export const findActiveDice = () => {
  const activeDice = diceList.find((dice) =>
    dice.className.includes('active-dice')
  );
  return activeDice;
};

(function () {
  const board = document.getElementById('board');

  for (let i = 1; i <= numberOfBoardFields; i++) {
    const field = document.createElement('div');
    field.classList.add('board-field');
    field.id = `field-${i}`;
    board?.appendChild(field);

    const fieldNumberSpan = document.createElement('span');
    fieldNumberSpan.classList.add('field-number-span');
    fieldNumberSpan.innerHTML = i.toString();
    field.appendChild(fieldNumberSpan);

    boardFieldsList.push(field);
  }

  const firstField = document.getElementById('field-1');
  firstField?.classList.add('first-field', 'active-field', 'jumpedOn');

  const startImage = document.createElement('img');
  startImage.src = 'src/assets/start.png';
  firstField?.appendChild(startImage);

  const lastField = document.getElementById(
    `field-${numberOfBoardFields.toString()}`
  );
  const finishImage = document.createElement('img');
  finishImage.src = 'src/assets/finish.png';
  lastField?.appendChild(finishImage);
  lastField?.classList.add('last-field');

  const specialFields = [
    document.getElementById('field-12'),
    document.getElementById('field-19'),
  ];
  specialFields.map((field) => {
    field?.classList.add('special-field');
    const warningImg = document.createElement('img');
    warningImg.src = 'src/assets/warning.png';
    field?.appendChild(warningImg);
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
    <p>1. Uważaj na pole 12! Wejdziesz? Przegrywasz!</p>
    <p>2. Uważaj na pole 19! Wejdziesz? Cofasz się do pola o numerze 11!</p>
    <p>3. Gra kończy się wygraną poprzez wejście na pole 20.</p>
    <p>4. UWAGA! Jeśli przekroczysz pole mety cofasz się z niej o tyle pól o ile ją przekroczyłeś.</p>
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
