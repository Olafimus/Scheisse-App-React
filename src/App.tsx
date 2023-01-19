import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import MidgameButtons from "./components/button-components/midgame-buttons/midgame-buttons.component";
import StartButton from "./components/button-components/start-button/start-button.component";
import PlayerList from "./components/player-components/player-list.component";
import RoundStats from "./components/round-stat-component/round-stat.component";
import Settings from "./components/settings/settings.components";
import {
  setCalledStiche,
  setPlayerNumber,
} from "./features/game-parameters/gameParaSlice";

function App() {
  const dispatch = useAppDispatch();
  const started = useAppSelector((state) => state.gamePara.started);
  const players = useAppSelector((state) => state.player.players);

  // const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    if (!started) dispatch(setPlayerNumber(players));
    let count = 0;
    players.forEach((player) => {
      count += player.currentStich;
    });
    dispatch(setCalledStiche(count));
  }, [players]);

  return (
    <div className="App">
      <Settings />
      {started ? (
        <>
          <RoundStats />
          <PlayerList />

          <MidgameButtons />
        </>
      ) : (
        <>
          <RoundStats />
          <PlayerList />
          <StartButton />
        </>
      )}
    </div>
  );
}

export default App;
