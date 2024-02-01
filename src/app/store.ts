import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import counterReducer from "../features/counter/counterSlice";
import playerReducer from "../features/player/playerSlice";
import gameParaReducer from "../features/game-parameters/gameParaSlice";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import gameSetReducer from "../features/game-settings/GameSetSlice";
import gameHistoryReducer from "../features/game-history/gameHistorySlice";
import allMatchesReducer from "../components/statistic-components/all-matches/AllMatchesSlice";
import statPlayersReducer from "../components/statistic-components/player-statistics/PlayerStatSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["statPlayers"],
};

const appReducer = combineReducers({
  counter: counterReducer,
  player: playerReducer,
  gamePara: gameParaReducer,
  gameSettings: gameSetReducer,
  gameHistory: gameHistoryReducer,
  matches: allMatchesReducer,
  statPlayers: statPlayersReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
