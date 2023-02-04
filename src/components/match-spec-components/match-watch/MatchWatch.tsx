import { doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../features/firebase/firebase";
import { Match } from "../../../features/match-details/match-details";

import "./MatchWatch.styles.scss";
import WatchPlayerBox from "./watch-player-box/WatchPlayerBox";

interface IMatchParams {
  matchRef: string;
}

const MatchWatch = () => {
  const { matchRef } = useParams<{ matchRef: string }>();
  const [match, setMatch] = React.useState<Match>({});
  // useEffect(() => {}, []);
  // const [value, loading, error] = useMatchListener(params);

  const [value, loading, error] = useDocument(
    doc(db, "matches", matchRef || "failed"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  useEffect(() => {
    const match = {
      matchPlayers: value?.data()?.matchPlayers,
      giver: value?.data()?.giver,
      finished: value?.data()?.finished,
      roundNumber: value?.data()?.roundNumber,
      id: value?.data()?.id,
    };
    setMatch(match);
  }, [value]);

  return (
    <div className="match-watch-container">
      MatchWatch {matchRef}
      <button
        onClick={() => {
          console.log(typeof matchRef);
          console.log(value?.data(), loading, error);
        }}
      >
        test
      </button>
      <div className="s">
        {loading ? <span>loading</span> : <WatchPlayerBox match={match} />}
      </div>
    </div>
  );
};

export default MatchWatch;
