import React from "react";
import { StatPlayer } from "./PlayerStatSlice";
import "./PlayerList.styles.scss";

type Props = {
  players: StatPlayer[];
};

const PlayerList = ({ players }: Props) => {
  return (
    <>
      <h2>Players</h2>
      <ul className="stat-player-list">
        {players.map((pl) => (
          <li key={pl.id}>{pl.name}</li>
        ))}
      </ul>
    </>
  );
};

export default PlayerList;
