import { createSlice } from "@reduxjs/toolkit";

interface gameState {
  started: boolean;
  amountCards: number;
}

const initialState: gameState = {
  started: false,
  amountCards: 32,
};

export const gameParaSlice = createSlice({
  name: "game State",
  initialState,
  reducers: {
    startGame: (state) => {
      state.started = true;
    },
    setAmountCards: (state, { payload = 32 }) => {
      state.amountCards = payload;
    },
  },
});

export const { startGame, setAmountCards } = gameParaSlice.actions;
export default gameParaSlice.reducer;
