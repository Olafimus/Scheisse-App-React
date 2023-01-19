import { createSlice } from "@reduxjs/toolkit";
import PlayerBox from "../../components/player-components/player-box-components/player-box.component";
import PlayerList from "../../components/player-components/player-list.component";
import { Iplayer } from "./playerInterface";

export interface playerState {
  players: Array<Iplayer>;
  allChecked: boolean;
}

const initialState: playerState = {
  players: [],
  allChecked: false,
};

const handleCheck = (
  players: Array<Iplayer>,
  id: string,

  bool: boolean
) => {
  const player = players.find((el) => el.playerId === id);
  if (player) {
    player.checked = true;
    let checks = true;
    players.forEach((el) => {
      if (!el.checked) checks = false;
    });
    player.rightAnswer = bool;
    if (checks) return true;
    else return false;
  } else console.log("player undefined");
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
        checked: false,
        rightAnswer: false,
        placement: undefined,
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
      let check = handleCheck(state.players, payload.playerId, true);
      if (check) state.allChecked = true;
    },
    setWrong: (state, { payload }) => {
      let check = handleCheck(state.players, payload.playerId, false);
      if (check) state.allChecked = true;
    },
    setAllAnswers: (state, { payload }) => {
      state.players.forEach((player) => (player.rightAnswer = payload));
      state.allChecked = true;
    },
    setCurrentStiche: (state, { payload }) => {
      const { id, count } = payload;
      const player = state.players.find((el) => el.playerId === id);
      if (player) player.currentStich = count;
      else console.log("player undefined");
    },
    sumScore: (state, { payload }) => {
      const currentScores: Array<number> = [];
      state.players.forEach((player) => {
        if (player.rightAnswer === true) {
          player.currentScore += 10 + Number(player.currentStich);
        } else {
          player.currentScore -= 10;
        }
        player.score.push(player.currentScore);
        player.stichHistory.push(player.currentStich);
        currentScores.push(player.currentScore);
        player.checked = false;
        player.currentStich = 0;
      });

      state.players.forEach((player) => {
        for (let i = payload; i >= 0; i--) {
          if (player.currentScore === currentScores[i - 1])
            player.placement = i;
          else continue;
        }
      });

      state.allChecked = false;
    },
  },
});

export const {
  addPlayer,
  setRight,
  setWrong,
  setAllAnswers,
  setCurrentStiche,
  sumScore,
} = counterSlice.actions;
export default counterSlice.reducer;
