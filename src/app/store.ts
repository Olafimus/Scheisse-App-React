import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import playerReducer from "../features/player/playerSlice";
import gameParaReducer from "../features/game-parameters/gameParaSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    player: playerReducer,
    gamePara: gameParaReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
