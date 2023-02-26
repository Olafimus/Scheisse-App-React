import React, { useEffect, useState } from "react";

import "./MatchSpecRoute.styles.scss";
import { getMatches } from "../../features/firebase/firebase";
import { Match } from "../../features/match-details/match-details";
import MatchList from "../../components/match-spec-components/MatchList/MatchList";
import { Link } from "react-router-dom";
import HomeIcon from "../../components/genereal-components/Home-Icon/HomeIcon";

export interface IMatchSpecProps {
  showActive: boolean;
  setShowActive: React.Dispatch<React.SetStateAction<boolean>>;

  showAll: boolean;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
  allMatches?: Array<Match>;
}

const MatchSpecRoute = () => {
  const [showActive, setShowActive] = useState(false);
  const [showAll, setShowAll] = useState(false);
  // const [activeMatches, setActiveMatches] = useState<Array<Match>>([]);
  const [allMatches, setAllMatches] = useState<Array<Match>>([]);
  const props = {
    showActive,
    showAll,
    setShowActive,
    setShowAll,
    allMatches,
  };

  useEffect(() => {
    // const match = createMatchDetail(
    //   players,
    //   roundNumber,
    //   finished,
    //   giver,
    //   matchId
    // );

    const loadMatches = async () => {
      const matches = await getMatches();
      setAllMatches(matches);
    };
    loadMatches();
  }, []);

  const showActiveHandler = () => {
    setShowActive(!showActive);
    setShowAll(false);
  };
  const showAllHandler = () => {
    setShowAll(!showAll);
    setShowActive(false);
  };

  const activeMatches = allMatches
    ?.filter((el) => el.finished === false)
    .sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0));

  return (
    <div className="match-spec-body">
      <HomeIcon />
      <h2>Find your Match</h2>
      <button className="match-select-button" onClick={showActiveHandler}>
        Active Matches
      </button>
      <button className="match-select-button" onClick={showAllHandler}>
        All Matches
      </button>
      <div className="match-selection">
        {showActive && <MatchList link="match" matches={activeMatches} />}
        {showAll && <MatchList link="match" matches={allMatches} />}
        {/* <AchtiveMatches {...props} /> */}

        {/* <AllMatches {...props} /> */}
      </div>
    </div>
  );
};

export default MatchSpecRoute;
