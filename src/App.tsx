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

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="users" element={<UsersRoute />} />
      <Route path="game">
        <Route index element={<MainRoute />} />
        <Route path="scoreboard" element={<ScoreboardRoute />} />
        <Route path="ceremony" element={<CeremonyRoute />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="settings" element={<SettingsRoute />} />
      </Route>
      <Route>
        <Route path="/matchspec" element={<MatchSpecRoute />} />
        <Route path="/matchspec/match/:matchRef" element={<MatchWatch />} />
      </Route>
    </Routes>
  );
}

export default App;
