import React, { useEffect, useState } from "react";
import "./MatchList.styles.scss";
import { Match } from "../../../features/match-details/match-details";
import MatchItem from "../matchitem/MatchItem";
import { Link } from "react-router-dom";
import { GiElderberry } from "react-icons/gi";
import { match } from "assert";

interface Iprops {
  matches?: Array<Match>;
}

const MatchList: React.FC<Iprops> = ({ matches }) => {
  // const Matches = [1, 2, 3, 4, 6, 7, 8, 9, 10];
  const [filteredMatches, setFilteredMatches] = useState<Array<Match>>([]);

  useEffect(() => {
    if (matches) setFilteredMatches(matches);
  }, [matches]);

  return (
    <div className="matchlist-container">
      <input
        type="text"
        placeholder="Search Match-ID or Players"
        onChange={(e) => {
          console.log(e.currentTarget.value);
          const searchString = e.currentTarget.value.toLowerCase();
          let searchMatches: Array<Match> = [];
          if (matches) searchMatches = [...matches];
          searchMatches.forEach((m) => {
            m.playerNames = [];
            m.matchPlayers?.forEach((pl) =>
              m.playerNames?.push(pl.name.toLowerCase())
            );
          });
          const newMatches = searchMatches?.filter((el) => {
            console.log(
              el.playerNames?.filter((el) => el.includes(searchString)).length
            );
            const includesPlayer =
              el.playerNames?.filter((el) => el.includes(searchString))
                .length || 0;
            if (
              el.id?.toLowerCase().includes(searchString) ||
              includesPlayer > 0
            )
              return true;
            else return false;
          });
          setFilteredMatches(newMatches);
        }}
      ></input>
      <div className="match-item match-item-header">
        <p>ID</p>
        <div className="match-item-players">
          <p>Players</p>
        </div>
        <p>Round</p>
        <p>started</p>
      </div>
      {filteredMatches?.map((match) => (
        <span className="match-item-list">
          <Link to={`match/${match.matchRef}`}>
            <MatchItem key={match.id} match={match} />
          </Link>
        </span>
      ))}
    </div>
  );
};

export default MatchList;
