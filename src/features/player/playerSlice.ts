import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { freshPlayer, Iplayer } from "./playerInterface";
import {
  CorObj,
  RowObject,
} from "../../components/scoreboard/scoreboard.component";

export interface playerState {
  players: Array<Iplayer>;

  allChecked: boolean;
  giverIndex: number;
  giver: string;
  sortMode: string;
  reset: boolean;
}

const initialState: playerState = {
  players: [],

  allChecked: false,
  giverIndex: 0,
  giver: "",
  sortMode: "none",
  reset: false,
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
      const player = {
        ...freshPlayer,
        name: payload.name,
        playerId: payload.id,
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
      state.players.forEach((player) => {
        for (let i = payload; i >= 0; i--) {
          if (player.currentScore === currentScores[i - 1]) {
            player.placement = i;
          } else continue;
        }
        if (player.placement !== undefined && player.placements !== undefined)
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

      const currentGiver = state.players.find((pl) => pl.name === state.giver);
      if (currentGiver?.position !== undefined)
        state.giverIndex = currentGiver.position - 1;
      if (state.giverIndex === -1) state.giverIndex = state.players.length - 1;

      const newGiver = state.players.find(
        (pl) => pl.position === state.giverIndex
      );
      if (newGiver !== undefined) state.giver = newGiver.name;
    },
    restartAppPlayers: () => {
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
      state.players.map((el, i) => (el.position = i));
      state.giver = state.players[state.giverIndex].name;
    },
    nextGiver: (state) => {
      const currentGiver = state.players.find((pl) => pl.name === state.giver);
      if (currentGiver?.position !== undefined)
        state.giverIndex = currentGiver?.position + 1;
      if (state.giverIndex === state.players.length) state.giverIndex = 0;

      const newGiver = state.players.find(
        (pl) => pl.position === state.giverIndex
      );
      if (newGiver !== undefined) state.giver = newGiver.name;

      // if (state.giverIndex < state.players.length - 1) state.giverIndex++;
      // else state.giverIndex = 0;
      // const player = state.players.find(
      //   (pl) => pl.position === state.giverIndex
      // );
      // if (player) state.giver = player.name;
    },
    setSortMode: (state, { payload }) => {
      state.sortMode = payload;
    },
    sortPlayers: (state) => {
      if (state.sortMode === "giver") {
        state.players.sort((a, b) => a.position - b.position);
        if (state.giverIndex > 0) {
          const currentGiver = state.players.find(
            (pl) => pl.name === state.giver
          );
          const index = currentGiver?.position || 0;
          const newPlayers = [...state.players];
          const splice = newPlayers.splice(index);
          state.players = [...splice, ...newPlayers];
        }
      }

      if (state.sortMode === "placement") {
        state.players.sort((a, b) => {
          if (!a.placement) a.placement = 0;
          if (!b.placement) b.placement = 0;
          return a.placement - b.placement;
        });
      }
    },
    movePlayerUp: (state, { payload }) => {
      [state.players[payload], state.players[payload - 1]] = [
        state.players[payload - 1],
        state.players[payload],
      ];
    },
    movePlayerDown: (state, { payload }) => {
      [state.players[payload], state.players[payload + 1]] = [
        state.players[payload + 1],
        state.players[payload],
      ];
    },
    deletePlayer: (state, { payload }) => {
      state.players.splice(payload, 1);
    },
    resetRound: (state) => {
      state.players.forEach((pl) => {
        pl.currentStich = 0;
        pl.rightAnswer = false;
        pl.checked = false;
      });
      state.allChecked = false;
      state.reset = !state.reset;
    },
    calcStatistics: (state, { payload }) => {
      state.players.forEach((pl) => {
        const index = pl.score.length - 1;

        if (pl.score[index] > pl.score[index - 1]) {
          pl.statistics.onWinStreak = true;
          pl.statistics.winStreak++;
          pl.statistics.loseStreak = 0;
          if (pl.statistics.winStreak > pl.statistics.maxWinStreak)
            pl.statistics.maxWinStreak = pl.statistics.winStreak;
          if (pl.stichHistory[index] > pl.statistics.maxWonStiche)
            pl.statistics.maxWonStiche = pl.stichHistory[index];
        } else {
          pl.statistics.onWinStreak = false;
          pl.statistics.winStreak = 0;
          pl.statistics.loseStreak++;
          if (pl.statistics.loseStreak > pl.statistics.maxLoseStreak)
            pl.statistics.maxLoseStreak = pl.statistics.loseStreak;
        }
        if (pl.stichHistory[index] > pl.statistics.maxCalledStiche)
          pl.statistics.maxCalledStiche = pl.stichHistory[index];
        if (pl.placement === 1) pl.statistics.firstPlaces++;
        if (pl.placement === payload) pl.statistics.lastPlaces++;
      });
    },
    changePlayerOrder: (
      s,
      a: PayloadAction<{ id: string; position: number }[]>
    ) => {
      const newPlayers: Iplayer[] = [];
      a.payload.forEach((el) => {
        const player = s.players.find((pl) => el.id === pl.playerId);
        if (!player) return;
        player.position = el.position;
        newPlayers.push(player);
      });
      s.players = newPlayers;
    },
    correctPlayer: (s, a: PayloadAction<CorObj>) => {
      const { playerId, round, right, stiche } = a.payload;
      const player = s.players.find((pl) => pl.playerId === playerId);
      if (!player) return;
      const callHis: boolean[] = player.score.map((el, i) => {
        if (i === 0) return false;
        if (el > player.score[i - 1]) return true;
        return false;
      });
      callHis[round] = right;
      player.stichHistory[round] = stiche;
      const newScoreLine = [0];
      player.stichHistory.forEach((el, i) => {
        if (i === 0) return;
        if (callHis[i]) {
          newScoreLine.push(newScoreLine[i - 1] + el + 10);
        } else {
          newScoreLine.push(newScoreLine[i - 1] - 10);
        }
      });
      player.score = newScoreLine;
      const playerIndex = s.players.findIndex((el) => el.playerId === playerId);
      s.players[playerIndex] = player;
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
  calcStatistics,
  setSortMode,
  sortPlayers,
  restartAppPlayers,
  newRoundPlayers,
  setGiver,
  nextGiver,
  lastRoundPlayers,
  movePlayerUp,
  movePlayerDown,
  deletePlayer,
  resetRound,
  changePlayerOrder,
  correctPlayer,
} = counterSlice.actions;
export default counterSlice.reducer;
