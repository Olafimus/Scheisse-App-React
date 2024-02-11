import React from "react";
import "./BestListNav.styles.scss";

export type PlayerCountNrs = 0 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type Props = {
  searchTerm: string;
  handleSearch: (val: string) => void;
  activeCount: PlayerCountNrs;
  setActiveCount: (val: PlayerCountNrs) => void;
};

const BestListNav = ({
  searchTerm,
  handleSearch,
  activeCount,
  setActiveCount,
}: Props) => {
  const nrs: PlayerCountNrs[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <nav className="best-list-nav">
      <input
        className="best-list-search"
        type="text"
        name="player-search"
        placeholder="Search"
        id="player-search-field"
        value={searchTerm}
        onChange={(e) => handleSearch(e.currentTarget.value)}
      />
      {nrs.map((nr) => (
        <button
          className={
            activeCount === 0
              ? "btn"
              : nr === activeCount
              ? "btn active"
              : "btn inactive"
          }
          onClick={() => {
            const newVal = activeCount === nr ? 0 : nr;
            setActiveCount(newVal);
          }}
        >
          {nr}
        </button>
      ))}
    </nav>
  );
};

export default BestListNav;
