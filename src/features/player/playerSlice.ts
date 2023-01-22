import { createSlice } from "@reduxjs/toolkit";
import { freshPlayer, Iplayer } from "./playerInterface";

export interface playerState {
  players: Array<Iplayer>;
  allChecked: boolean;
  giverIndex: number;
  giver: string;
}

const initialState: playerState = {
  players: [],
  allChecked: false,
  giverIndex: 0,
  giver: "",
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

      currentScores.sort((a, b) => b - a);
      console.log("scores: ", currentScores);
      state.players.forEach((player) => {
        for (let i = payload; i >= 0; i--) {
          if (player.currentScore === currentScores[i - 1]) {
            player.placement = i;
          } else continue;
        }
        if (player.placement != undefined && player.placements != undefined)
          player.placements.push(player.placement);
      });

      state.allChecked = false;
    },
    lastRoundPlayers: (state, { payload }) => {
      state.players.forEach((player) => {
        player.score?.pop();
        player.currentScore = player.score.at(-1) || 0;
        player.currentStich = player.stichHistory?.pop() || 0;
        player.placements?.pop();
        player.placement = player.placements?.at(-1) || undefined;
        player.checked = false;
      });
      state.allChecked = false;
      if (state.giverIndex === 0) state.giverIndex = state.players.length - 1;
      else state.giverIndex--;
      state.giver = state.players[state.giverIndex].name;
    },
    restartAppPlayers: (state) => {
      return initialState;
    },
    newRoundPlayers: (state) => {
      const newPlayers: Array<Iplayer> = [];
      state.players.forEach((player) => {
        const newPlayer = { ...freshPlayer };
        newPlayers.push(newPlayer);

        newPlayers[newPlayers.length - 1].name = player.name;
        newPlayers[newPlayers.length - 1].playerId = player.playerId;
      });
      state.players = newPlayers;
    },
    setGiver: (state, { payload }) => {
      state.giverIndex = payload;
      state.giver = state.players[state.giverIndex].name;
    },
    nextGiver: (state) => {
      if (state.giverIndex < state.players.length - 1) state.giverIndex++;
      else state.giverIndex = 0;
      state.giver = state.players[state.giverIndex].name;
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
  restartAppPlayers,
  newRoundPlayers,
  setGiver,
  nextGiver,
  lastRoundPlayers,
} = counterSlice.actions;
export default counterSlice.reducer;
