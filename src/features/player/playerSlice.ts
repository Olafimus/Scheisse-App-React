import { createSlice } from "@reduxjs/toolkit";
import PlayerBox from "../../components/player-components/player-box-components/player-box.component";
import { Iplayer } from "./playerInterface";

export interface playerState {
  players: Array<Iplayer>;
}

const initialState: playerState = {
  players: [],
};

export const counterSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, { payload }) => {
      const player: Iplayer = {
        name: payload.name,
        currentScore: 0,
        score: [0],
        currentStich: 0,
        stiche: [],
        rightAnswer: false,
        placement: 0,
        placements: [],
        stichHistory: [],
        playerId: payload.id,
        currentWinStreak: 0,
        maxWinStreak: 0,
        currentLoseStreak: 0,
        maxLoseStreak: 0,
        firstPlacement: 0,
        placementCounts: {},
      };
      state.players.push(player);
    },
    setRight: (state, { payload }) => {
      const player = state.players.find(
        (el) => el.playerId === payload.playerId
      );
      if (player) player.rightAnswer = true;
    },
    setWrong: (state, { payload }) => {
      const player = state.players.find(
        (el) => el.playerId === payload.playerId
      );
      if (player) player.rightAnswer = false;
    },
    setAllAnswers: (state, { payload }) => {
      state.players.forEach((player) => (player.rightAnswer = payload));
    },
    sumScore: (state) => {
      state.players.forEach((player) => {
        if (player.rightAnswer === true) {
          player.currentScore += 10 + Number(player.currentStich);
        } else {
          player.currentScore -= 10;
        }
        player.score.push(player.currentScore);
        player.stichHistory.push(player.currentStich);
      });
    },
  },
});

export const { addPlayer, setRight, setWrong, setAllAnswers, sumScore } =
  counterSlice.actions;
export default counterSlice.reducer;
