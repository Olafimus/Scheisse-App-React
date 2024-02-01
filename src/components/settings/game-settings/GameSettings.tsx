import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./GameSettings.styles.scss";
import { setAmountCards } from "../../../features/game-parameters/gameParaSlice";
import { cardCounts } from "../../button-components/start-button/card-selector/card-selector.component";
import { Iplayer } from "../../../features/player/playerInterface";
import DragAndDropComponent from "../../genereal-components/DnD/DragAndDrop";
import {
  changePlayerOrder,
  setGiver,
} from "../../../features/player/playerSlice";
import DropdownButton from "../../genereal-components/Dropddown-menu/DropdownButton";
import DropdownMenu from "../../genereal-components/Dropddown-menu/DropdownMenu";
import DropdownOptions from "../../genereal-components/Dropddown-menu/DropdownOptions";
import DropdownOption from "../../genereal-components/Dropddown-menu/DropdownOption";

const GameSettings = () => {
  const dispatch = useAppDispatch();
  const { amountCards, playerNumber, matchId } = useAppSelector(
    (state) => state.gamePara
  );
  const { sortMode, players, giver } = useAppSelector((state) => state.player);
  const { gameMode, displayMode } = useAppSelector(
    (state) => state.gameSettings
  );
  const [dragActive, setDragActive] = useState(false);
  const [dragItems, setDragItems] = useState(
    players.map((pl) => {
      return { id: pl.playerId, text: pl.name };
    })
  );

  const handleOrderChange = () => {
    setDragActive(false);
    console.log(dragItems);
    const players = dragItems.map((item, i) => {
      return { id: item.id, position: i };
    });
    dispatch(changePlayerOrder(players));
  };

  return (
    <div className="game-settings-container">
      <div>Display Settings: {displayMode} </div>
      <div>Sorted by: {sortMode} </div>
      <div>Players: {playerNumber} </div>
      <div>Amount of Cards: {amountCards}</div>
      <div className="card-selector-wrapper">
        Set to{" "}
        <div>
          {cardCounts.map((nr) => (
            <button
              className={`card-selector-buttons ${
                amountCards === nr && "active"
              }`}
              onClick={() => dispatch(setAmountCards(nr))}
            >
              {nr}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p> Seat Order:</p>
        {dragActive ? (
          <>
            <button className="btn save-btn" onClick={handleOrderChange}>
              Save
            </button>
            <button
              className="btn cancle-btn"
              onClick={() => setDragActive(false)}
            >
              X
            </button>
          </>
        ) : (
          <button
            className="btn change-btn"
            onClick={() => setDragActive(true)}
          >
            Change
          </button>
        )}
      </div>
      <DragAndDropComponent
        items={dragItems}
        setItems={setDragItems}
        dragActive={dragActive}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <span style={{ padding: 6 }}>Set Giver:</span>
        <DropdownMenu>
          <DropdownButton>{giver}</DropdownButton>
          <DropdownOptions count={players.length - 1}>
            {players
              // .filter((pl) => pl.name !== giver)
              .map((pl, i) => {
                if (pl.name === giver) return <></>;
                return (
                  <DropdownOption
                    func={() => dispatch(setGiver(i))}
                    key={pl.playerId}
                  >
                    {pl.name}
                  </DropdownOption>
                );
              })}

            {/* <DropdownOption>Eberhard</DropdownOption> */}
          </DropdownOptions>
        </DropdownMenu>
      </div>
      <div>Game Mode: {gameMode}</div>
      <div>Match-ID: {matchId}</div>
    </div>
  );
};

export default GameSettings;
