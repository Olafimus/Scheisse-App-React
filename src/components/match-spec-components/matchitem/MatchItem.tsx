import React from "react";
import ReactTimeAgo from "react-time-ago";
import "./MatchItem.styles.scss";
import { Match } from "../../../features/match-details/match-details";

interface Iprops {
  match: Match;
  clickHandler?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const MatchItem = ({ match, clickHandler }: Iprops) => {
  const names: Array<string> = [];
  match.matchPlayers?.forEach((pl) => names.push(pl.name));
  let date;
  if (match.startedAt !== undefined) {
    date = new Date(match.startedAt || 0);
  }

  return (
    <div className="match-item" onClick={clickHandler}>
      <p>{match.id}</p>
      <div className="match-item-players">
        <p>{match.matchPlayers?.length}</p>
        <span className="match-item-divider"></span>
        <p className="match-item-player-names">{names.join(", ")}</p>
      </div>
      <p> {match.roundNumber}</p>
      <p>
        {date && (
          <ReactTimeAgo date={date} locale="en-US" timeStyle="twitter" />
        )}
      </p>
    </div>
  );
};

export default MatchItem;
