export interface Iplayer {
  name: string;
  currentScore: number;
  score: Array<number>;
  currentStich: number;
  stiche: Array<number>;
  rightAnswer: boolean;
  placement: number;
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
