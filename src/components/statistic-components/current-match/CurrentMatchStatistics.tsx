import React from "react";
import "./CurrentMatchStatistics.scss";
import { useAppSelector } from "../../../app/hooks";
import BackButton from "../../button-components/back-button/BackButton";
import MatchStatPlayer from "./CurrentMatchStatPlayer";
import MatchStatisticsGeneral from "./CurrentMatchStatisticsGeneral";

const MatchStatistics = () => {
  const { players } = useAppSelector((state) => state.player);

  return (
    <div className="match-statsistcs-body">
      <header>
        <BackButton />
      </header>
      <main className="match-statistics-main">
        <section className="player-statistics-section stat-sections">
          <div className="player-statistics-container">
            {players.map((pl) => (
              <MatchStatPlayer key={pl.playerId} pl={pl} />
            ))}
          </div>
        </section>
        <section className="general-statistics-section stat-sections">
          <MatchStatisticsGeneral />
        </section>
      </main>
    </div>
  );
};

export default MatchStatistics;
