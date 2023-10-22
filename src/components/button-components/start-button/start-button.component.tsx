import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addMatch } from "../../../features/firebase/firebase";
import {
  createMatchId,
  startGame,
} from "../../../features/game-parameters/gameParaSlice";
import { createMatchDetail } from "../../../features/match-details/match-details";
import { setGiver } from "../../../features/player/playerSlice";
import CardSelector from "./card-selector/card-selector.component";
import "./start-button.styles.scss";
import MaxCardsSelect from "./max-cards-menu/max-cards.component";

const StartButton = () => {
  const dispatch = useAppDispatch();
  const { roundNumber, finished } = useAppSelector((state) => state.gamePara);
  const { players, giver } = useAppSelector((state) => state.player);

  const startGameHandler = async () => {
    const startedAt = Date.now();
    dispatch(startGame(startedAt));
    dispatch(setGiver(0));

    const matchId = nanoid().slice(-5);
    const match = createMatchDetail(
      players,
      roundNumber,
      finished,
      giver,
      matchId,
      startedAt
    );
    dispatch(createMatchId(matchId));

    addMatch(match);
  };

  return (
    <div className="start-buttons">
      <button id="start-game" onClick={startGameHandler}>
        Start Game
      </button>
      <CardSelector />
      <MaxCardsSelect />
    </div>
  );
};

export default StartButton;
