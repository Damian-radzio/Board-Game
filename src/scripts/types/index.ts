export enum GameStatusTypes {
  WIN = 'WIN',
  DEFEAT = 'DEFEAT',
}
export type GameBoardStatusType = {
  gameInfoText: string;
  restartGameBtnText: string;
  bodyClassName: string;
};
export type GameStatsType = {
  totalNumberOfStitches: number;
  totalNumberOfThrows: number;
};
