export interface Iplayer {
  name: string;
  currentScore: number;
  score: Array<number>;
  currentStich: number;
  stiche: Array<number>;
  checked: boolean;
  rightAnswer: boolean;
  placement: number | undefined;
  placements?: Array<number>;
  stichHistory: Array<number>;
  playerId: string;
  currentWinStreak?: number;
  maxWinStreak?: number;
  currentLoseStreak?: number;
  maxLoseStreak?: number;
  firstPlacement?: number;
  placementCounts?: object;
}
