export interface Iplayer {
  name: string;
  currentScore: number;
  score: Array<number>;
  currentStich: number;
  stiche: Array<number>;
  checked: boolean;
  rightAnswer: boolean;
  placement: number | undefined;
  placements: Array<number>;
  stichHistory: Array<number>;
  playerId: string;
  currentWinStreak?: number;
  maxWinStreak?: number;
  currentLoseStreak?: number;
  maxLoseStreak?: number;
  firstPlacement?: number;
  placementCounts?: object;
  position: number;
  statistics: Istatistics;
}

export interface Istatistics {
  onWinStreak: boolean;
  winStreak: number;
  maxWinStreak: number;
  loseStreak: number;
  maxLoseStreak: number;
  firstPlaces: number;
  lastPlaces: number;
  maxCalledStiche: number;
  maxWonStiche: number;
}

export const freshPlayer: Iplayer = {
  name: "none",
  currentScore: 0,
  score: [0],
  currentStich: 0,
  stiche: [0],
  checked: false,
  rightAnswer: false,
  placement: undefined,
  placements: [],
  stichHistory: [0],
  playerId: "none",
  currentWinStreak: 0,
  maxWinStreak: 0,
  currentLoseStreak: 0,
  maxLoseStreak: 0,
  firstPlacement: 0,
  placementCounts: {},
  position: 0,
  statistics: {
    onWinStreak: false,
    winStreak: 0,
    maxWinStreak: 0,
    loseStreak: 0,
    maxLoseStreak: 0,
    firstPlaces: 0,
    lastPlaces: 0,
    maxCalledStiche: 0,
    maxWonStiche: 0,
  },
};

// class classPlayer {
//   currentScore = 0;
//   score = [0];
//   currentStich = 0;
//   stiche = [];
//   checked = false;
//   rightAnswer = false;
//   placement = undefined;
//   placements = [];
//   stichHistory = [];
//   currentWinStreak = 0;
//   maxWinStreak = 0;
//   currentLoseStreak = 0;
//   maxLoseStreak = 0;
//   firstPlacement = 0;
//   placementCounts = {};
//   position = 0;
//   statistics = {
//     winStreak: 0,
//     maxWinStreak: 0,
//     loseStreak: 0,
//     maxLoseStreak: 0,
//     firstPlaces: 0,
//     lastPlaces: 0,
//     maxCalledStiche: 0,
//     maxWonStiche: 0,
//   };

//   constructor(public name: string, public playerId: string) {}
// }
