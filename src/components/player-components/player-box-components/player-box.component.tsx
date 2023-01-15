import "./player-box.styles.scss";
import { Iplayer } from "../../../features/player/playerInterface";
import CheckButtons from "./check-buttons/check-buttons.component";

interface props {
  player: Iplayer;
}

const PlayerBox: React.FC<props> = ({ player }) => {
  return (
    <div className="player-box">
      <div className="name-container">
        <p className="playerName" id="player-name${playerId}">
          {player.name}
        </p>
      </div>

      <div className="player-information">
        <div className="player-score">
          <p className="score">Punkte</p>
          <p className="score-number" id="score-player${playerId}">
            {player.score}
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
            id="stiche-player${playerId}"
          />
        </div>

        <CheckButtons player={player} />
      </div>
    </div>
  );
};

export default PlayerBox;
