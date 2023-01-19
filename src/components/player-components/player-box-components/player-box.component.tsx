import "./player-box.styles.scss";
import * as React from "react";
import { Iplayer } from "../../../features/player/playerInterface";
import CheckButtons from "./check-buttons/check-buttons.component";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  setCurrentStiche,
  sumScore,
} from "../../../features/player/playerSlice";
import { addStiche } from "../../../features/game-parameters/gameParaSlice";

interface props {
  player: Iplayer;
}

const PlayerBox: React.FC<props> = ({ player }) => {
  const sticheInput = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.player.players);
  const roundNUmber = useAppSelector((state) => state.gamePara.roundNumber);

  const onChangeHandler = () => {
    console.log(sticheInput.current?.value);
    const count = Number(sticheInput.current?.value);
    if (count) {
      const payload = {
        count,
        id: player.playerId,
      };
      dispatch(setCurrentStiche(payload));
      dispatch(addStiche(players));
    }
  };

  const reset = () => {
    if (sticheInput.current?.value) sticheInput.current.value = "";
  };

  React.useEffect(() => {
    reset();
  }, [roundNUmber]);

  return (
    <div className="player-box">
      <div className="name-container">
        {player.placement ? (
          <p className="playerName" id="player-name${playerId}">
            {player.name} {player.placement}.
          </p>
        ) : (
          <p className="playerName" id="player-name${playerId}">
            {player.name}
          </p>
        )}
      </div>

      <div className="player-information">
        <div className="player-score">
          <p className="score">Punkte</p>
          <p className="score-number" id="score-player${playerId}">
            {player.currentScore}
          </p>
        </div>
        <div className="player-stiche-box">
          <p>Stiche</p>
          <input
            type="number"
            name="stiche"
            max="16"
            min="0"
            className="player-stiche"
            ref={sticheInput}
            onChange={onChangeHandler}
          />
        </div>

        <CheckButtons player={player} />
      </div>
    </div>
  );
};

export default PlayerBox;
