import { nanoid } from "@reduxjs/toolkit";
import * as React from "react";
import uuid from "react-uuid";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addMatch } from "../../../features/firebase/firebase";
import {
  createMatchId,
  setPlayerNumber,
  startGame,
} from "../../../features/game-parameters/gameParaSlice";
import { createMatchDetail } from "../../../features/match-details/match-details";
import { addPlayer, setGiver } from "../../../features/player/playerSlice";
import CardSelector from "./card-selector/card-selector.component";
import "./start-button.styles.scss";

const StartButton = () => {
  const dispatch = useAppDispatch();
  const { started, roundNumber, finished, matchId } = useAppSelector(
    (state) => state.gamePara
  );
  const { players, giver } = useAppSelector((state) => state.player);
  const nameInput = React.useRef<HTMLInputElement>(null);

  const startGameHandler = () => {
    dispatch(startGame());
    dispatch(setGiver(0));

    const matchId = nanoid().slice(-5);
    const match = createMatchDetail(
      players,
      roundNumber,
      finished,
      giver,
      matchId
    );
    dispatch(createMatchId(matchId));

    addMatch(match);
  };

  return (
    <div className="start-buttons">
      <div className="add-container">
        <input
          type="text"
          placeholder="Dein Name"
          id="player-name-input"
          ref={nameInput}
        />
        <button
          id="add-player"
          onClick={() => {
            if (nameInput.current?.value) {
              const id = uuid();
              const payload = {
                name: nameInput.current.value,
                id,
              };
              dispatch(addPlayer(payload));

              nameInput.current.value = "";
            }
          }}
        >
          <span id="add-plus">+</span>
        </button>
      </div>

      <button id="start-game" onClick={startGameHandler}>
        Start Game
      </button>
      <CardSelector />
    </div>
  );
};

export default StartButton;
