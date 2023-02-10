import React from "react";
import { IMatchSpecProps } from "../../../routes/match-spectator-route/MatchSpecRoute";
import MatchList from "../MatchList/MatchList";

const AchtiveMatches: React.FC<IMatchSpecProps> = ({
  showActive,
  showAll,
  setShowActive,
  setShowAll,
  allMatches,
}) => {
  // const clickHandler = () => {
  //   setShowActive(!showActive);
  //   setShowAll(false);
  // };

  // const activeMatches = allMatches
  //   ?.filter((el) => el.finished === false)
  //   .sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0));

  return (
    <>
      {/* <button onClick={clickHandler}>Active Matches</button> */}
      {/* <div>{showActive && <MatchList matches={activeMatches} />}</div> */}
    </>
  );
};

export default AchtiveMatches;
