import React, { useEffect, useState } from "react";

import "./MatchSpecRoute.styles.scss";
import { deleteMatch, getMatches } from "../../features/firebase/firebase";
import { Match } from "../../features/match-details/match-details";
import MatchList from "../../components/match-spec-components/MatchList/MatchList";
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
  const [allMatches, setAllMatches] = useState<Array<Match>>([]);

  useEffect(() => {
    const loadMatches = async () => {
      const matches = (await getMatches()) as Match[];
      matches.forEach((match) => {
        if (!match.startedAt) return;
        const canceled = Date.now() - match.startedAt > 1000 * 60 * 60 * 24;
        if (!match.finished && canceled) deleteMatch(match.matchRef);
      });
      setAllMatches(
        matches.sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0))
      );
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
      </div>
    </div>
  );
};

export default MatchSpecRoute;
