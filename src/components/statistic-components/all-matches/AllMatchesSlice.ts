import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { MatchPlayer } from "../../../features/match-details/match-details";
import { fetchAllMatches } from "../../../features/firebase/statistics";
import { RootState } from "../../../app/store";

// type AllMatchesPlayer = { name: string; playerId: string; placement: number };
export type Match = {
  matchPlayers: Array<MatchPlayer>;
  playerNames: Array<string>;
  roundNumber: number;
  finished: boolean;
  giver: string;
  id: string;
  matchRef: string;
  startedAt: number;
};

export type AllMatchesType = {
  entities: Record<string, Match>;
  ids: string[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: null | string;
  count: number;
  lastUpdate: number;
};

const allMatchesAdapter = createEntityAdapter({
  selectId: (match: Match) => match.id,
  sortComparer: (a, b) => b.startedAt - a.startedAt,
});

const initialState = allMatchesAdapter.getInitialState({
  status: "idle",
  error: null,
  count: 0,
  lastUpdate: 0,
}) as AllMatchesType;

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (lastUpdate: number) => {
    const matches = await fetchAllMatches(0);
    console.log(matches.length);
    return matches;
  }
);

export const AllMatchesSlice = createSlice({
  name: "All Matches",
  initialState,
  reducers: {
    updateComplete: (s, a: PayloadAction<number>) => {
      s.lastUpdate = a.payload;
    },
    setCount: (s, a: PayloadAction<number>) => {
      s.count = a.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMatches.pending, (s, a) => {
      s.status = "loading";
    });
    builder.addCase(fetchMatches.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.error.message || null;
    });
    builder.addCase(fetchMatches.fulfilled, (s, a) => {
      console.log();
      s.status = "succeeded";
      s.error = null;
      s.lastUpdate = Date.now();

      allMatchesAdapter.setAll(s, a.payload);
      s.count = Object.keys(s.entities).length;
      console.log(s.count);
    });
  },
});

export const {
  selectAll: selectAllMatches,
  selectById: selectMatchById,
  selectEntities: selectMatchEntities,
  selectIds: selectMatchIds,
  selectTotal: selectMatchTotal,
} = allMatchesAdapter.getSelectors(
  (s: { matches: AllMatchesType }) => s.matches
);

export const {} = AllMatchesSlice.actions;

export default AllMatchesSlice.reducer;
