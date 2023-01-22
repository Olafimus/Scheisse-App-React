import * as React from "react";
import { Iplayer } from "../../../features/player/playerInterface";
import "./ceremony-table.styles.scss";

interface props {
  players: Array<Iplayer>;
}

const CeremonyTable: React.FC<props> = ({ players }) => {
  return (
    <div className="table-end-container" id="table--end--container">
      <div className="player-final-table row-1">
        <p className="placement-row">#</p>
        <p className="name-row">Name</p>
        <p className="points-row">Punkte</p>
      </div>
      {players.map((pl) => {
        if (pl.placement === undefined) pl.placement = 1;
        return (
          <div className={`player-final-table row-${pl.placement + 1}`}>
            <p className="placement-row">{pl.placement}.</p>
            <p className="name-row">{pl.name}</p>
            <p className="points-row">{pl.score.at(-1)}</p>
          </div>
        );
      })}
      {/* 
      <div className="player-final-table row-3">
        <p className="placement-row">2.</p>
        <p className="name-row">Horst</p>
        <p className="points-row">102</p>
      </div>
      <div className="player-final-table row-4">
        <p className="placement-row">3.</p>
        <p className="name-row">Oliver</p>
        <p className="points-row">97</p>
      </div>
      <div className="player-final-table row-5">
        <p className="placement-row">4.</p>
        <p className="name-row">Shabnam</p>
        <p className="points-row">83</p>
      </div>
      <div className="player-final-table row-6">
        <p className="placement-row">5.</p>
        <p className="name-row">Pascal</p>
        <p className="points-row">77</p>
      </div> */}
    </div>
  );
};

export default CeremonyTable;
