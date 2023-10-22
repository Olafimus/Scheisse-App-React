import { createSlice } from "@reduxjs/toolkit";

interface GameSettings {
  gameMode: string;
  displayMode: string;
}

const initialState: GameSettings = {
  gameMode: "normal",
  displayMode: "standard",
};

export const GameSetSlice = createSlice({
  name: "game settings",
  initialState,
  reducers: {
    setGameMode: (state, { payload }) => {
      state.gameMode = payload;
    },
  },
});

export const { setGameMode } = GameSetSlice.actions;

export default GameSetSlice.reducer;
