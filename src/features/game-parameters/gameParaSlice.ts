import { createSlice } from "@reduxjs/toolkit";
import { Iplayer } from "../player/playerInterface";

interface gameState {
  started: boolean;
  playerNumber: number;
  amountCards: number;
  roundNumber: number;
  endRound: number;
  calledStiche: number;
  maxStiche: number;
  finished: boolean;
}

const initialState: gameState = {
  started: false,
  playerNumber: 0,
  amountCards: 32,
  roundNumber: 1,
  endRound: 0,
  calledStiche: 0,
  maxStiche: 1,
  finished: false,
};

const calcMaxRound = (amountCards: number, playerNumber: number) => {
  let calcEndRoundStiche = amountCards / playerNumber;
  return Math.trunc(calcEndRoundStiche) * 2 - 1;
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
      const er = calcMaxRound(payload, state.playerNumber);
      state.endRound = er;
    },
    setPlayerNumber: (state, { payload }) => {
      state.playerNumber = payload.length;
      const er = calcMaxRound(state.amountCards, state.playerNumber);
      state.endRound = er;
    },
    increaseRoundNumber: (state) => {
      state.roundNumber += 1;
      const roundedMaxStiche = Math.trunc(
        state.amountCards / state.playerNumber
      );
      if (state.roundNumber > roundedMaxStiche)
        state.maxStiche =
          roundedMaxStiche - (state.roundNumber - roundedMaxStiche);
      else state.maxStiche = state.roundNumber;
    },
    decreaseRoundNumber: (state) => {
      state.roundNumber -= 1;
      const roundedMaxStiche = Math.trunc(
        state.amountCards / state.playerNumber
      );
      if (state.roundNumber > roundedMaxStiche)
        state.maxStiche =
          roundedMaxStiche - (state.roundNumber - roundedMaxStiche);
      else state.maxStiche = state.roundNumber;
    },
    addStiche: (state, { payload }) => {
      let count = 0;
      payload.forEach((player: Iplayer) => {
        count += player.currentStich;
      });
      state.calledStiche = count;
    },
    setCalledStiche: (state, { payload }) => {
      state.calledStiche = payload;
    },
    endGame: (state) => {
      state.finished = true;
    },
    restartAppParas: (state) => {
      return initialState;
    },
  },
});

export const {
  startGame,
  setAmountCards,
  setPlayerNumber,
  increaseRoundNumber,
  decreaseRoundNumber,
  addStiche,
  setCalledStiche,
  endGame,
  restartAppParas,
} = gameParaSlice.actions;
export default gameParaSlice.reducer;
