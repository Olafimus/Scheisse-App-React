import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AddPlayers from "../../components/button-components/add-player-button/AddPlayers";
import MidgameButtons from "../../components/button-components/midgame-buttons/midgame-buttons.component";
import SortButton from "../../components/button-components/sort-button/sort-button.component";
import StartButton from "../../components/button-components/start-button/start-button.component";
import PlayerList from "../../components/player-components/player-list.component";
import StartList from "../../components/player-components/player-start-list/StartList";
import RoundStats from "../../components/round-stat-component/round-stat.component";
import Settings from "../../components/settings/settings.components";
import {
  addMatchToUser,
  getMatches,
  updateMatch,
} from "../../features/firebase/firebase";
import { addMatchToHist } from "../../features/game-history/gameHistorySlice";
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
  const { started, startedAt, roundNumber, finished, matchId } = useAppSelector(
    (state) => state.gamePara
  );
  const { playedMatches } = useAppSelector((state) => state.gameHistory);
  const { players, giver } = useAppSelector((state) => state.player);
  const buildMatch = () => {
    return createMatchDetail(
      players,
      roundNumber,
      finished,
      giver,
      matchId,
      startedAt
    );
  };

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
    if (!started) return;
    const match = createMatchDetail(
      players,
      roundNumber,
      finished,
      giver,
      matchId,
      startedAt
    );

    const loadMatches = async () => {
      let test = [];
      test = await getMatches();
      const arr: Array<Match> = [...test];
      const currentMatch = arr.find((el) => el.id === matchId);
      updateMatch(currentMatch?.matchRef, match);
    };
    loadMatches();
  }, [players, finished]);

  // add Match to Users
  useEffect(() => {
    if (!started) return;

    players.forEach((pl) => {
      addMatchToUser(pl.name, matchId, pl.placement);
    });
  }, [started]);

  // add Match to Game History

  useEffect(() => {
    if (!finished) return;
    const match = buildMatch();
    const matches = playedMatches.filter((m) => m.id === matchId);
    if (!matches.length) dispatch(addMatchToHist(match));
    players.forEach((pl) => {
      addMatchToUser(pl.name, matchId, pl.placement);
    });
    // dispatch(resetHistory());
  }, [finished]);

  return (
    <div className="App">
      <Settings />
      {started ? (
        <>
          <header>
            <SortButton />
            <RoundStats />
          </header>
          <PlayerList />

          <MidgameButtons />
        </>
      ) : (
        <>
          {/* <RoundStats /> */}
          <div className="before-started-container">
            <main className="configure-players-container">
              <AddPlayers />
              <StartList />
            </main>
            <footer className="start-buttons-container">
              <StartButton />
            </footer>
          </div>
        </>
      )}
    </div>
  );
};

export default MainRoute;
