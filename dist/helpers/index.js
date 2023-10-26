export const generatePointOfDice = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
export const bodyWarningAlarm = () => {
    document.body.classList.add('warning');
    setTimeout(() => {
        document.body.classList.remove('warning');
    }, 2000);
};
