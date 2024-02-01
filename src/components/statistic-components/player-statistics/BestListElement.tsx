import "./BestList.styles.scss";
import React from "react";
import { StatPlayer } from "./PlayerStatSlice";
import { spawn } from "child_process";
import { BestListSortModes } from "./BestList";
import { useNavigate } from "react-router-dom";

type Props =
  | {
      player: StatPlayer;
      first: false;
      sortMode: BestListSortModes;
      setSortMode: (val: BestListSortModes) => void;
      i: number;
    }
  | {
      first: true;
      player?: StatPlayer;
      sortMode: BestListSortModes;
      setSortMode: (val: BestListSortModes) => void;
      i?: number;
    };

const BestListElement = ({
  player,
  i,
  first,
  sortMode,
  setSortMode,
}: Props) => {
  const nav = useNavigate();

  return (
    <div
      className={
        first
          ? "best-list-element first-element"
          : "best-list-element player-element"
      }
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (first) return;
        nav(`/statistics/players/${player.id}`);
      }}
    >
      <p>{first ? "#" : i + 1}</p>
      <p>{first ? "Name" : player.name}</p>
      <p
        onClick={() => setSortMode("averageRating")}
        className={sortMode === "averageRating" ? "active-element" : ""}
      >
        {first
          ? "Rating"
          : Math.round((player.averageRating + Number.EPSILON) * 100) / 100}
      </p>
      <p
        onClick={() => setSortMode("averagePoints")}
        className={sortMode === "averagePoints" ? "active-element" : ""}
      >
        {first ? (
          <>
            <span>&#8709;</span> Points
          </>
        ) : (
          Math.round((player.averagePoints + Number.EPSILON) * 100) / 100
        )}
      </p>
      <p
        onClick={() => setSortMode("firstPlaces")}
        className={sortMode === "firstPlaces" ? "active-element" : ""}
      >
        {first ? "Wins" : player.firstPlaces}
      </p>
      <p
        onClick={() => setSortMode("winRate")}
        className={sortMode === "winRate" ? "active-element" : ""}
      >
        {first
          ? "Winrate"
          : Math.round((player.winRate + Number.EPSILON) * 100) / 100 || 0}
      </p>
      <p
        onClick={() => setSortMode("matchCount")}
        className={sortMode === "matchCount" ? "active-element" : ""}
      >
        {first ? "Matches" : player.matchCount}
      </p>
    </div>
  );
};

export default BestListElement;
