import { useEffect, useState } from "react";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import MidgameButtons from "./components/button-components/midgame-buttons/midgame-buttons.component";
import StartButton from "./components/button-components/start-button/start-button.component";
import PlayerList from "./components/player-components/player-list.component";
import RoundStats from "./components/round-stat-component/round-stat.component";

function App() {
  const started = useAppSelector((state) => state.gamePara.started);
  const players = useAppSelector((state) => state.player.players);

  // const [todos, setTodos] = useState<Array<Todo>>([]);

  // useEffect(() => {
  //   setStarted(true);
  // });

  return (
    <div className="App">
      {started ? (
        <>
          <RoundStats />
          <PlayerList />
          <button
            onClick={() => {
              console.log(players);
            }}
          >
            test
          </button>
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
