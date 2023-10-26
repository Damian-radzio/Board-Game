export let drawnNumber: number;
export let activeField: number = 1;

export const setDrawnNumber = (value: number) => (drawnNumber = value);
export const setActiveField = (value: number) => (activeField = value);
