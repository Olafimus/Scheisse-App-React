import React from "react";
import { IMatchSpecProps } from "../../../routes/match-spectator-route/MatchSpecRoute";
import MatchList from "../MatchList/MatchList";

const AllMatches: React.FC<IMatchSpecProps> = ({
  allMatches,
  showActive,
  showAll,
  setShowActive,
  setShowAll,
}) => {
  const clickHandler = () => {
    setShowAll(!showAll);
    setShowActive(false);
  };
  return (
    <div>
      <button onClick={clickHandler}>Show All Matches</button>
      {showAll && <MatchList matches={allMatches} />}
    </div>
  );
};

export default AllMatches;
