import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { store } from "../../../app/store";
import { getAllPlayers } from "../../../features/firebase/statistics";
import { calcMatchRating } from "../../../lib/helper-functinos/statistics/calcMatchRating";

export type BasePlayer = {
  ref: string;
  id: string;
  matches: string[];
  name: string;
};

export type StatPlayer = BasePlayer & {
  matchCount: number;
  winRate: number;
  averagePoints: number;
  averageRating: number;
  placements: placements;
  firstPlaces: number;
  matchstats: LoadedStatMatch[];
  ref: string;
  id: string;
  matches: string[];
  name: string;
  orderedMatchStats: { [key: number]: LoadedStatMatch[] };
};

type FailedStatMatch = {
  id: string;
  status: "failed";
};

export type LoadedStatMatch = {
  id: string;
  status: "succeeded";
  score: number;
  avgScore: number;
  allScores: number[];
  placement: number;
  rating: number;
  rounds: number;
  playerCount: number;
};

export type StatPlayers = {
  entities: Record<string, StatPlayer>;
  ids: string[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: null | string;
  count: number;
  lastUpdate: number;
};

const StatPlayersAdapter = createEntityAdapter({
  selectId: (player: StatPlayer) => player.id,
  sortComparer: (a, b) => b.matchCount - a.matchCount,
});

const initialState = StatPlayersAdapter.getInitialState({
  status: "idle",
  error: null,
  count: 0,
  lastUpdate: 0,
}) as StatPlayers;

const getMatchStats = (match: string, name: string) => {
  const fullMatch =
    Object.values(store.getState().matches.entities).find(
      (ent) => ent.id === match
    ) || null;
  // console.log(fullMatch);
  if (!fullMatch) return { id: match, status: "failed" } as FailedStatMatch;
  const player = fullMatch.matchPlayers.find((mpl) => mpl.name === name);
  if (!player) return { id: match, status: "failed" } as FailedStatMatch;
  const playerCount = fullMatch.matchPlayers.length;
  const score = player.score.at(-1) || 0;
  const allScores = fullMatch.matchPlayers.map((pl) => pl.score.at(-1) || 0);
  const sortedAllScores = allScores.sort((a, b) => b - a);
  const placement = sortedAllScores.findIndex((el) => el === score) + 1;
  const avgScore = score / fullMatch.roundNumber;
  const rating = calcMatchRating(placement, playerCount, avgScore);
  const data: LoadedStatMatch = {
    id: match,
    status: "succeeded",
    score,
    avgScore,
    allScores,
    placement,
    rating,
    rounds: fullMatch.roundNumber,
    playerCount,
  };
  return data;
};
type placements = { [key: number]: number };

export const loadStatPlayers = createAsyncThunk(
  "statPlayers/loadStatPlayers",
  async () => {
    const data = (await getAllPlayers()).map((pl) => ({
      ...pl,
      matchstats: pl.matches
        .map((match) => getMatchStats(match, pl.name))
        .filter((ms) => ms.status === "succeeded") as LoadedStatMatch[],
    }));
    console.log(data[0]);
    const players = data.map((pl) => ({
      ...pl,
      matchCount: pl.matchstats.length,
      winRate: pl.matchstats.reduce((acc, cur, i) => {
        // if (cur.status === "failed") return acc;
        // const maxScore = Math.max(...cur.allScores);
        const count = cur.placement === 1 ? acc + 1 : acc;
        if (i === pl.matchstats.length - 1) return count / (i + 1);
        return count;
      }, 0),
      averagePoints: pl.matchstats.reduce((acc, cur, i) => {
        // if (cur.status === "failed") return acc;
        const count = cur.score / cur.rounds + acc;
        if (i === pl.matchstats.length - 1) return count / (i + 1);
        return count;
      }, 0),
      averageRating: pl.matchstats.reduce((acc, cur, i) => {
        // if (cur.status === "failed") return acc;
        const count = cur.rating + acc;
        if (i === pl.matchstats.length - 1) return count / (i + 1);
        return count;
      }, 0),
      placements: pl.matchstats.reduce((acc: placements, cur) => {
        // if (cur.status === "failed") return acc;
        acc[cur.placement] = acc[cur.placement] ? acc[cur.placement] + 1 : 1;
        return acc;
      }, {}),
      firstPlaces: pl.matchstats.reduce((acc: number, cur) => {
        // if (cur.status === "failed") return acc;
        const count = cur.placement === 1 ? acc + 1 : acc;
        return count;
      }, 0),
      orderedMatchStats: pl.matchstats.reduce(
        (acc: { [key: number]: LoadedStatMatch[] }, cur) => {
          // if (cur.status === "failed") return acc;
          const key = cur.playerCount;
          acc[key] ? acc[key].push(cur) : (acc[key] = [cur]);
          return acc;
        },
        {}
      ),
    }));

    console.log(players[0]);
    return players;
  }
);

export const StatPlayersSlice = createSlice({
  name: "Stat Players",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadStatPlayers.pending, (s, a) => {
      s.status = "loading";
      s.error = null;
    });
    builder.addCase(loadStatPlayers.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.error.message || null;
    });
    builder.addCase(loadStatPlayers.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.error = null;
      s.lastUpdate = Date.now();
      // console.log(a.payload[10].matchstats);
      StatPlayersAdapter.upsertMany(s, a.payload);
    });
  },
});

export const {
  selectAll: selectAllStatPlayers,
  selectById: selectStatPlayerById,
} = StatPlayersAdapter.getSelectors(
  (s: { statPlayers: StatPlayers }) => s.statPlayers
);

export const {} = StatPlayersSlice.actions;

export default StatPlayersSlice.reducer;
