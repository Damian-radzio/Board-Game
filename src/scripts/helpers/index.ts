export const generatePointOfDice = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const bodyWarningAlarm = (): void => {
  document.body.classList.add('warning');
  setTimeout(() => {
    document.body.classList.remove('warning');
  }, 2000);
};
