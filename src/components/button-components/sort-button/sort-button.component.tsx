import "./sort-button.styles.scss";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setSortMode, sortPlayers } from "../../../features/player/playerSlice";
import {
  sortByGiver,
  sortByPlacement,
} from "../../../features/player/state-variables";
import DropdownMenu from "../../genereal-components/Dropddown-menu/DropdownMenu";
import DropdownButton from "../../genereal-components/Dropddown-menu/DropdownButton";
import DropdownOptions from "../../genereal-components/Dropddown-menu/DropdownOptions";
import DropdownOption from "../../genereal-components/Dropddown-menu/DropdownOption";

const SortButton = () => {
  const dispatch = useAppDispatch();

  const placeSort = () => {
    dispatch(setSortMode(sortByPlacement));
    dispatch(sortPlayers());
  };
  const giveSort = () => {
    dispatch(setSortMode(sortByGiver));
    dispatch(sortPlayers());
  };

  return (
    <div className="sort-button-container">
      <DropdownMenu>
        <DropdownButton>Sort</DropdownButton>
        <DropdownOptions count={2}>
          <DropdownOption func={placeSort}>Sort by Placement</DropdownOption>
          <DropdownOption func={giveSort}>Sort by Card Giver</DropdownOption>
        </DropdownOptions>
      </DropdownMenu>
    </div>
  );
};

export default SortButton;
