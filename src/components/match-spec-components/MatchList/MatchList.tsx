import React from "react";
import "./MatchList.styles.scss";
import { Match } from "../../../features/match-details/match-details";
import MatchItem from "../matchitem/MatchItem";
import { Link } from "react-router-dom";

interface Iprops {
  matches?: Array<Match>;
}

const MatchList: React.FC<Iprops> = ({ matches }) => {
  // const Matches = [1, 2, 3, 4, 6, 7, 8, 9, 10];

  return (
    <div className="matchlist-container">
      <input type="text" placeholder="Search Matches"></input>
      <div className="match-item">
        <p>ID</p>
        <div className="match-item-players">
          <p>Players</p>
        </div>
        <p>Round</p>
        <p>started</p>
      </div>
      {matches?.map((match) => (
        <Link to={`match/${match.matchRef}`}>
          <MatchItem key={match.id} match={match} />
        </Link>
      ))}
    </div>
  );
};

export default MatchList;
