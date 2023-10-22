import React from "react";
import { useAppSelector } from "../../../app/hooks";
import BackButton from "../../button-components/back-button/BackButton";
import HomeIcon from "../../genereal-components/Home-Icon/HomeIcon";

const LocalStatistics = () => {
  const { knownPlayers, playedMatches } = useAppSelector(
    (state) => state.gameHistory
  );
  return (
    <div>
      <header className="local-stats-header">
        <BackButton />
        <HomeIcon />
        <h2>Local Statistics</h2>
      </header>
      <main>
        <h2>work in progress</h2>
        <div className="known-players-list-container">
          <ul className="known-player-list">
            {knownPlayers.map((pl) => (
              <li>{pl.name}</li>
            ))}
          </ul>
        </div>
        <div className="match-history-list-container">
          <ul className="match-history-list">
            {playedMatches.map((match) => (
              <li>{match.id}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default LocalStatistics;
