import React, { useEffect, useState } from "react";
import "./MatchList.styles.scss";
import { Match } from "../../../features/match-details/match-details";
import MatchItem from "../matchitem/MatchItem";
import { Link } from "react-router-dom";

interface Iprops {
  matches?: Array<Match>;
  link?: string;
  clickHandler?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const MatchList: React.FC<Iprops> = ({ matches, link, clickHandler }) => {
  // const Matches = [1, 2, 3, 4, 6, 7, 8, 9, 10];
  const [filteredMatches, setFilteredMatches] = useState<Array<Match>>([]);

  useEffect(() => {
    if (matches) setFilteredMatches(matches);
  }, [matches]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const includesPlayer =
        el.playerNames?.filter((el) => el.includes(searchString)).length || 0;
      if (el.id?.toLowerCase().includes(searchString) || includesPlayer > 0)
        return true;
      else return false;
    });
    setFilteredMatches(newMatches);
  };

  return (
    <div className="matchlist-container">
      <input
        type="text"
        placeholder="Search Match-ID or Players"
        onChange={changeHandler}
      ></input>
      <div className="match-item match-item-header">
        <p>ID</p>
        <div className="match-item-players">
          <p>Players</p>
        </div>
        <p>Round</p>
        <p>started</p>
      </div>
      {filteredMatches.length === 0 && (
        <p style={{ padding: 15 }}>No Active Matches right now</p>
      )}
      {filteredMatches?.map((match) => (
        <span key={match.id} className="match-item-list">
          {link ? (
            <Link to={`${link}/${match.matchRef}`}>
              <MatchItem
                clickHandler={clickHandler}
                key={match.id}
                match={match}
              />
            </Link>
          ) : (
            <MatchItem
              clickHandler={clickHandler}
              key={match.id}
              match={match}
            />
          )}
        </span>
      ))}
    </div>
  );
};

export default MatchList;
