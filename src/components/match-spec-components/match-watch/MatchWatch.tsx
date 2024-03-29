import { doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../features/firebase/firebase";
import { Match } from "../../../features/match-details/match-details";
import BackButton from "../../button-components/back-button/BackButton";
import HomeIcon from "../../genereal-components/Home-Icon/HomeIcon";

import "./MatchWatch.styles.scss";
import WatchPlayerBox from "./watch-player-box/WatchPlayerBox";

const MatchWatch = () => {
  const { matchRef } = useParams<{ matchRef: string }>();
  const [match, setMatch] = React.useState<Match>({});

  const [value, loading] = useDocument(
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
      <HomeIcon />
      <BackButton />
      <div className="s">
        {loading ? <span>loading</span> : <WatchPlayerBox match={match} />}
      </div>
    </div>
  );
};

export default MatchWatch;
