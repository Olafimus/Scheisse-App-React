import * as React from "react";
import uuid from "react-uuid";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  setPlayerNumber,
  startGame,
} from "../../../features/game-parameters/gameParaSlice";
import { addPlayer, setGiver } from "../../../features/player/playerSlice";
import CardSelector from "./card-selector/card-selector.component";
import "./start-button.styles.scss";

const StartButton = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.player.players);
  const nameInput = React.useRef<HTMLInputElement>(null);

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

      <button
        id="start-game"
        onClick={() => {
          dispatch(startGame());
          dispatch(setGiver(0));
        }}
      >
        Start Game
      </button>
      <CardSelector />
    </div>
  );
};

export default StartButton;
