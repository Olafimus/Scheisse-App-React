import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import MidgameButtons from "../../components/button-components/midgame-buttons/midgame-buttons.component";
import SortButton from "../../components/button-components/sort-button/sort-button.component";
import StartButton from "../../components/button-components/start-button/start-button.component";
import PlayerList from "../../components/player-components/player-list.component";
import StartList from "../../components/player-components/player-start-list/StartList";
import RoundStats from "../../components/round-stat-component/round-stat.component";
import Settings from "../../components/settings/settings.components";
import {
  addMatch,
  getMatches,
  updateMatch,
} from "../../features/firebase/firebase";
import {
  setCalledStiche,
  setPlayerNumber,
} from "../../features/game-parameters/gameParaSlice";
import {
  createMatchDetail,
  Match,
} from "../../features/match-details/match-details";
import "./main.route.styles.scss";

const MainRoute = () => {
  const dispatch = useAppDispatch();
  const [matches, setMatches] = useState<Array<Match>>([]);
  const { started, roundNumber, finished, matchId } = useAppSelector(
    (state) => state.gamePara
  );
  const { players, giver } = useAppSelector((state) => state.player);

  // displaying stiche in RoundStats
  useEffect(() => {
    if (!started) dispatch(setPlayerNumber(players.length));
    let count = 0;
    players.forEach((player) => {
      count += player.currentStich;
    });
    dispatch(setCalledStiche(count));
  }, [players]);

  // update Match in DB
  useEffect(() => {
    const match = createMatchDetail(
      players,
      roundNumber,
      finished,
      giver,
      matchId
    );

    const loadMatches = async () => {
      let test = [];
      test = await getMatches();
      const arr: Array<Match> = [...test];
      const currentMatch = arr.find((el) => el.id === matchId);
      console.log("all", arr, "matchId", matchId);
      console.log(currentMatch);
      updateMatch(currentMatch?.matchRef, match);
    };
    if (!finished) loadMatches();
    console.log("main: ", matches);
  }, [players]);

  // add Match to Users
  useEffect(() => {
    if (finished) {
    }
  }, [finished]);

  return (
    <div className="App">
      <Settings />
      {started ? (
        <>
          <SortButton />
          <RoundStats />
          <PlayerList />

          <MidgameButtons />
        </>
      ) : (
        <>
          {/* <RoundStats /> */}
          <StartList />
          <StartButton />
        </>
      )}
    </div>
  );
};

export default MainRoute;
