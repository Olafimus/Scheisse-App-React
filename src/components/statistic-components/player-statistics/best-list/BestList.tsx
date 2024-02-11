import React, { useEffect, useState } from "react";
import { StatPlayer } from "../PlayerStatSlice";
import "./BestList.styles.scss";
import BestListElement from "./BestListElement";
import useSearch from "../../../../lib/custom-hooks/useSearch";
import BestListNav, { PlayerCountNrs } from "./best-list-bar/BestListNav";

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
    filteredItems: searchedPlayers,
  } = useSearch(players, "name");

  const [activeCount, setActiveCount] = useState<PlayerCountNrs>(0);
  const [filteredPlayers, setFilterdPlayers] = useState(searchedPlayers);

  useEffect(() => {
    if (activeCount === 0) return setFilterdPlayers([...searchedPlayers]);

    const newPlayers = [...searchedPlayers]
      .map((pl) => {
        const matches = pl.orderedMatchStats[activeCount];
        if (!matches) return null;
        const {
          matchCount,
          winRate,
          averagePoints,
          averageRating,
          firstPlaces,
        } = matches;
        const newObj: StatPlayer = {
          ...pl,
          matchCount,
          winRate,
          firstPlaces,
          averagePoints,
          averageRating,
        };
        return newObj;
      })
      .filter((el) => el !== null);
    setFilterdPlayers(newPlayers as StatPlayer[]);
  }, [activeCount, players.length]);

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
        <BestListNav
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          activeCount={activeCount}
          setActiveCount={setActiveCount}
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
