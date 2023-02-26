import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Match } from "../match-details/match-details";

interface GameHistory {
  knownPlayers: Array<{ name: string; id: string }>;
  matchCount: number;
  playedMatches: Array<Match>;
}

const initialState: GameHistory = {
  knownPlayers: [],
  matchCount: 0,
  playedMatches: [],
};

export const GameHistorySlice = createSlice({
  name: "game History",
  initialState,
  reducers: {
    addKnownPlayer: (state, { payload }) => {
      state.knownPlayers.push(payload);
    },
    addMatchToHist: (state, { payload }) => {
      state.playedMatches.push(payload);
    },
    increaseMatchCount: (state) => {
      state.matchCount++;
    },
    forgetKnownPlayer: (state) => {
      state.knownPlayers = [];
    },
    resetHistory: (state) => {
      return initialState;
    },
  },
});

export const {
  addKnownPlayer,
  addMatchToHist,
  increaseMatchCount,
  forgetKnownPlayer,
  resetHistory,
} = GameHistorySlice.actions;

export default GameHistorySlice.reducer;
