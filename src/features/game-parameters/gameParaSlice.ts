import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

interface gameState {
  started: boolean;
  playerNumber: number;
  amountCards: number;
  roundNumber: number;
  endRound: number;
  calledStiche: number;
  maxStiche: number;
  setMaxCards: number | null;
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
  setMaxCards: null,
  sticheComp: "bad",
  lastRound: false,
  reset: false,
  finished: false,
  matchId: "",
  startedAt: 0,
};

const calcMaxRound = (
  amountCards: number,
  playerNumber: number,
  setMax: null | number
) => {
  // if (setMax) return setMax;
  let calcEndRoundStiche = setMax ? setMax : amountCards / playerNumber;
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
      const er = calcMaxRound(payload, state.playerNumber, state.setMaxCards);
      state.endRound = er;
    },
    setPlayerNumber: (state, { payload }) => {
      state.playerNumber = payload;
      const er = calcMaxRound(
        state.amountCards,
        state.playerNumber,
        state.setMaxCards
      );
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
    setMaxACards: (s, a: PayloadAction<null | number>) => {
      s.setMaxCards = a.payload;
      const er = calcMaxRound(s.amountCards, s.playerNumber, a.payload);
      s.endRound = er;
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
  setMaxACards,
  endGame,
  lastRoundStats,
  restartAppParas,
} = gameParaSlice.actions;
export default gameParaSlice.reducer;
