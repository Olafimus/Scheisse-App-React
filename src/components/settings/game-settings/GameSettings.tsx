import React from "react";
import { useAppSelector } from "../../../app/hooks";
import "./GameSettings.styles.scss";

const GameSettings = () => {
  const { amountCards, playerNumber, matchId } = useAppSelector(
    (state) => state.gamePara
  );
  const { sortMode } = useAppSelector((state) => state.player);
  const { gameMode, displayMode } = useAppSelector(
    (state) => state.gameSettings
  );
  return (
    <div>
      <div>Display Settings: {displayMode} </div>
      <div>Sorted by: {sortMode} </div>
      <div>Playernumber: {playerNumber} </div>
      <div>Amount of Cards: {amountCards}</div>
      <div>Game Mode: {gameMode}</div>
      <div>Match-ID: {matchId}</div>
    </div>
  );
};

export default GameSettings;
