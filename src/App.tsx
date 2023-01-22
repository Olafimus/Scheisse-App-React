import { Route, Routes } from "react-router-dom";
import "./App.css";
import CeremonyRoute from "./routes/ceremony-route/ceremony.route";
import MainRoute from "./routes/main-route/main.route";
import ScoreboardRoute from "./routes/scoreboard-route/scoarboard.route";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainRoute />} />
      <Route path="scoreboard" element={<ScoreboardRoute />} />
      <Route path="ceremony" element={<CeremonyRoute />} />
    </Routes>
  );
}

export default App;
