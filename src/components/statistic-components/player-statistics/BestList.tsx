import React, { useState } from "react";
import { StatPlayer } from "./PlayerStatSlice";
import "./BestList.styles.scss";
import BestListElement from "./BestListElement";
import useSearch from "../../../lib/custom-hooks/useSearch";

type Props = { players: StatPlayer[] };
export type BestListSortModes =
  | "matchCount"
  | "winRate"
  | "averageRating"
  | "averagePoints"
  | "firstPlaces";

const BestList = ({ players }: Props) => {
  const [sortMode, setSortMode] = useState<BestListSortModes>("averageRating");
  const {
    searchTerm,
    handleSearch,
    filteredItems: filteredPlayers,
  } = useSearch(players, "name");

  console.log(filteredPlayers);

  return (
    <>
      <h2
        style={{
          fontSize: "xx-large",
          textAlign: "center",
          padding: 5,
          marginBottom: 15,
        }}
      >
        Best List
      </h2>
      <div>
        <input
          type="text"
          name="player-search"
          id="player-search-field"
          value={searchTerm}
          onChange={(e) => handleSearch(e.currentTarget.value)}
        />
      </div>
      <ul className="best-list">
        <li>
          <BestListElement
            sortMode={sortMode}
            setSortMode={setSortMode}
            first={true}
          />
        </li>
        {filteredPlayers
          .sort((a, b) => b[sortMode] - a[sortMode])
          .map((pl, i) => (
            <li key={pl.id}>
              <BestListElement
                sortMode={sortMode}
                setSortMode={setSortMode}
                player={pl}
                first={false}
                i={i}
              />
            </li>
          ))}
      </ul>
    </>
  );
};

export default BestList;
