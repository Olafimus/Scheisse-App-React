import React from "react";
import { useAppSelector } from "../../../../app/hooks";
import { selectMatchById } from "../../all-matches/AllMatchesSlice";
import { LoadedStatMatch, StatPlayer } from "../PlayerStatSlice";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

type Props =
  | { player: StatPlayer; matchId: string; first: false }
  | { first: true; matchId: string; player?: StatPlayer };

const MatchElement = ({ player, matchId, first }: Props) => {
  const match = useAppSelector((s) => selectMatchById(s, matchId));
  if (!match && !first) return <></>;

  const playerNames = match?.matchPlayers.map((pl) => pl.name);
  const matchstats =
    player &&
    (player.matchstats.find((el) => el.id === matchId) as LoadedStatMatch);
  const placement = matchstats?.placement;
  let date;
  if (match?.startedAt !== undefined) {
    date = new Date(match.startedAt || 0);
  }

  return (
    <div className="match-overview">
      {first ? (
        <>
          <p>Date</p>
          <p>Players</p>
          <p>Placement</p>
        </>
      ) : (
        <Link
          to={`/matchspec/match/${match?.matchRef}`}
          className="match-element"
        >
          <p>
            {date && (
              <ReactTimeAgo date={date} locale="en-US" timeStyle="twitter" />
            )}
          </p>
          <p>{playerNames?.join(", ")}</p>
          <p>{placement}</p>
        </Link>
      )}
    </div>
  );
};

export default MatchElement;
