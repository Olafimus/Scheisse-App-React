import React from "react";
import { StatPlayer } from "../PlayerStatSlice";
import MatchElement from "./MatchElement";

type Props = {
  player: StatPlayer;
};

const MatchList = ({ player }: Props) => {
  return (
    <div className="player-matchlist-container">
      <MatchElement first={true} matchId="none" />
      {player.matches.map((m) => (
        <MatchElement key={m} matchId={m} player={player} first={false} />
      ))}
    </div>
  );
};

export default MatchList;
