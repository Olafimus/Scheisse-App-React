import React from "react";
import { useAppSelector } from "../../../app/hooks";
import "./GameSettings.styles.scss";

const GameSettings = () => {
  const { amountCards, playerNumber } = useAppSelector(
    (state) => state.gamePara
  );
  const { sortMode } = useAppSelector((state) => state.player);
  const { gameMode } = useAppSelector((state) => state.gameSettings);
  return (
    <div>
      <div>Display Settings</div>
      <div>Sorted by: {sortMode} </div>
      <div>Playernumber: {playerNumber} </div>
      <div>Amount of Cards: {amountCards}</div>
      <div>Game Mode: {gameMode}</div>
    </div>
  );
};

export default GameSettings;
