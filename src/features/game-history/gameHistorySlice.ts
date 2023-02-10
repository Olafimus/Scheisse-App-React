import { createSlice, nanoid } from "@reduxjs/toolkit";

interface GameHistory {
  knownPlayers: Array<{ playerName: string; id: string }>;
  matchCount: number;
}

const initialState: GameHistory = {
  knownPlayers: [],
  matchCount: 0,
};

export const GameHistorySlice = createSlice({
  name: "game History",
  initialState,
  reducers: {
    addKnownPlayer: (state, { payload }) => {
      state.knownPlayers.push(payload);
    },
    increaseMatchCount: (state) => {
      state.matchCount++;
    },
  },
});

export const { addKnownPlayer, increaseMatchCount } = GameHistorySlice.actions;

export default GameHistorySlice.reducer;
