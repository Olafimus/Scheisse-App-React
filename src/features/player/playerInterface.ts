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

export const freshPlayer: Iplayer = {
  name: "none",
  currentScore: 0,
  score: [0],
  currentStich: 0,
  stiche: [],
  checked: false,
  rightAnswer: false,
  placement: undefined,
  placements: [],
  stichHistory: [],
  playerId: "none",
  currentWinStreak: 0,
  maxWinStreak: 0,
  currentLoseStreak: 0,
  maxLoseStreak: 0,
  firstPlacement: 0,
  placementCounts: {},
};
