import "./sort-button.styles.scss";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setSortMode, sortPlayers } from "../../../features/player/playerSlice";
import {
  sortByGiver,
  sortByPlacement,
} from "../../../features/player/state-variables";

const SortButton = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="sort-button-container">
      <button>Sort</button>
      <button
        onClick={() => {
          dispatch(setSortMode(sortByGiver));
          dispatch(sortPlayers());
          console.log("click");
        }}
      >
        Sort by card Giver
      </button>
      <button
        onClick={() => {
          dispatch(setSortMode(sortByPlacement));
          dispatch(sortPlayers());
        }}
      >
        Sort by placement
      </button>
    </div>
  );
};

export default SortButton;
