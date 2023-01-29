import "./App.css";
import { Route, Routes } from "react-router-dom";

import CeremonyRoute from "./routes/ceremony-route/ceremony.route";
import MainRoute from "./routes/main-route/main.route";
import ScoreboardRoute from "./routes/scoreboard-route/scoarboard.route";
import SettingsRoute from "./routes/settings-route/SettingsRoute";
import Statistics from "./routes/statistics-route/Statistics";
import UsersRoute from "./routes/users-route/users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainRoute />} />
      <Route path="scoreboard" element={<ScoreboardRoute />} />
      <Route path="ceremony" element={<CeremonyRoute />} />
      <Route path="/users" element={<UsersRoute />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/settings" element={<SettingsRoute />} />
    </Routes>
  );
}

export default App;
