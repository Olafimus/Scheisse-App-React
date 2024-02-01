import "./player-box.styles.scss";
import * as React from "react";
import { Iplayer } from "../../../features/player/playerInterface";
import CheckButtons from "./check-buttons/check-buttons.component";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setCurrentStiche } from "../../../features/player/playerSlice";

interface props {
  player: Iplayer;
}

const PlayerBox: React.FC<props> = ({ player }) => {
  const sticheInput = React.useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const roundNUmber = useAppSelector((state) => state.gamePara.roundNumber);
  const rerender = useAppSelector((state) => state.player.reset);
  const lastRound = useAppSelector((state) => state.gamePara.lastRound);

  const onChangeHandler = () => {
    const count = Number(sticheInput.current?.value);
    if (count >= 0) {
      const payload = {
        count,
        id: player.playerId,
      };
      dispatch(setCurrentStiche(payload));
    }
  };

  const reset = () => {
    if (null !== sticheInput.current) {
      if (!lastRound) sticheInput.current.value = "";
      else sticheInput.current.value = player.currentStich.toString();
    }
  };

  React.useEffect(() => {
    reset();
  }, [roundNUmber, rerender]);

  return (
    <div className="player-box">
      <div className="name-container">
        {player.placement ? (
          <p className="playerName" id="player-name">
            {player.name} {player.placement}.
          </p>
        ) : (
          <p className="playerName" id={`player-name${player.playerId}`}>
            {player.name}
          </p>
        )}
      </div>

      <div className="player-information">
        <div className="player-score">
          <p className="score">Punkte</p>
          <p className="score-number" id={`core-player${player.playerId}`}>
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
            id={player.playerId}
            ref={sticheInput}
            defaultValue={""}
            onChange={onChangeHandler}
          />
        </div>

        <CheckButtons type="standard" player={player} />
      </div>
    </div>
  );
};

export default PlayerBox;
