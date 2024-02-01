import "./App.css";
import { Route, Routes } from "react-router-dom";

import CeremonyRoute from "./routes/ceremony-route/ceremony.route";
import MainRoute from "./routes/main-route/main.route";
import ScoreboardRoute from "./routes/scoreboard-route/scoarboard.route";
import SettingsRoute from "./routes/settings-route/SettingsRoute";
import Statistics from "./routes/statistics-route/Statistics";
import UsersRoute from "./routes/users-route/users";
import MatchSpecRoute from "./routes/match-spectator-route/MatchSpecRoute";
import MatchWatch from "./components/match-spec-components/match-watch/MatchWatch";
import Home from "./routes/home-route/Home";
import MatchStatistics from "./components/statistic-components/current-match/CurrentMatchStatistics";
import PlayerStatistics from "./components/statistic-components/player-statistics/PlayerStatistics";
import AllMatchStatistics from "./components/statistic-components/all-matches/AllMatchStatistics";
import LocalStatistics from "./components/statistic-components/local-statistics/LocalStatistics";
import NewPlayerStatistics from "./components/statistic-components/player-statistics/NewPlayerStatistics";
import PlayerView from "./components/statistic-components/player-statistics/player-view/PlayerView";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="users" element={<UsersRoute />} />
      <Route path="game">
        <Route index element={<MainRoute />} />
        <Route path="scoreboard" element={<ScoreboardRoute />} />
        <Route path="ceremony" element={<CeremonyRoute />} />
        {/* <Route path="statistics" element={<Statistics />} /> */}
        <Route path="settings" element={<SettingsRoute />} />
        <Route path="statistics" element={<MatchStatistics />} />
      </Route>
      <Route path="/matchspec">
        <Route index element={<MatchSpecRoute />} />
        <Route path="match/:matchRef" element={<MatchWatch />} />
      </Route>
      <Route path="statistics">
        <Route index element={<Statistics />} />
        <Route path="currentmatch" element={<MatchStatistics />} />
        <Route path="matches">
          <Route index element={<AllMatchStatistics />} />
          <Route path="match/:matchRef" element={<AllMatchStatistics />} />
        </Route>
        <Route path="players">
          <Route index element={<NewPlayerStatistics />} />
          <Route path=":id" element={<PlayerView />} />
        </Route>

        <Route path="localstats" element={<LocalStatistics />} />
      </Route>
    </Routes>
  );
}

export default App;
