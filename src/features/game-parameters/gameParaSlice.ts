import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Iplayer } from "../player/playerInterface";

interface gameState {
  started: boolean;
  playerNumber: number;
  amountCards: number;
  roundNumber: number;
  endRound: number;
  calledStiche: number;
  maxStiche: number;
  sticheComp: string;
  lastRound: boolean;
  reset: boolean;
  finished: boolean;
  matchId: string;
  startedAt: number;
}

const initialState: gameState = {
  started: false,
  playerNumber: 0,
  amountCards: 32,
  roundNumber: 1,
  endRound: 0,
  calledStiche: 0,
  maxStiche: 1,
  sticheComp: "bad",
  lastRound: false,
  reset: false,
  finished: false,
  matchId: "",
  startedAt: 0,
};

const calcMaxRound = (amountCards: number, playerNumber: number) => {
  let calcEndRoundStiche = amountCards / playerNumber;
  return Math.trunc(calcEndRoundStiche) * 2 - 1;
};

export const gameParaSlice = createSlice({
  name: "game State",
  initialState,
  reducers: {
    startGame: (state, { payload }) => {
      state.started = true;
      state.startedAt = payload;
      state.matchId = nanoid().slice(-5);
    },
    createMatchId: (state, { payload }) => {
      state.matchId = payload;
    },
    setAmountCards: (state, { payload = 32 }) => {
      state.amountCards = payload;
      const er = calcMaxRound(payload, state.playerNumber);
      state.endRound = er;
    },
    setPlayerNumber: (state, { payload }) => {
      state.playerNumber = payload;
      const er = calcMaxRound(state.amountCards, state.playerNumber);
      state.endRound = er;
    },
    increaseRoundNumber: (state) => {
      state.roundNumber += 1;
      state.lastRound = false;
    },
    calcMaxStiche: (state) => {
      const roundedMaxStiche = Math.trunc(
        state.amountCards / state.playerNumber
      );
      if (state.roundNumber > roundedMaxStiche)
        state.maxStiche =
          roundedMaxStiche - (state.roundNumber - roundedMaxStiche);
      else state.maxStiche = state.roundNumber;
    },
    setCalledStiche: (state, { payload }) => {
      state.calledStiche = payload;
      if (state.calledStiche === state.maxStiche) state.sticheComp = "good";
      else state.sticheComp = "bad";
    },
    endGame: (state) => {
      state.finished = true;
    },
    lastRoundStats: (state) => {
      if (state.roundNumber > 1) state.roundNumber--;
      state.lastRound = true;
    },

    restartAppParas: (state) => {
      return initialState;
    },
  },
});

export const {
  startGame,
  createMatchId,
  setAmountCards,
  setPlayerNumber,
  increaseRoundNumber,
  calcMaxStiche,
  setCalledStiche,
  endGame,
  lastRoundStats,
  restartAppParas,
} = gameParaSlice.actions;
export default gameParaSlice.reducer;
