import React, { useEffect, useState } from "react";
import "./MatchSpecRoute.styles.scss";
import AchtiveMatches from "../../components/match-spec-components/ActiveMatches/AchtiveMatches";
import AllMatches from "../../components/match-spec-components/AllMatches/AllMatches";
import { getMatches } from "../../features/firebase/firebase";
import { Match } from "../../features/match-details/match-details";

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
  const [activeMatches, setActiveMatches] = useState<Array<Match>>([]);
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
      console.log(matches);
    };
    loadMatches();
  }, []);

  return (
    <div>
      <h2>Find your Match</h2>
      <div className="match-selection">
        <AchtiveMatches {...props} />
        <AllMatches {...props} />
      </div>
    </div>
  );
};

export default MatchSpecRoute;
