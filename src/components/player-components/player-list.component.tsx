import PlayerBox from "./player-box-components/player-box.component";
import "./player-list.styles.scss";
import { useAppSelector } from "../../app/hooks";

const PlayerList = () => {
  const players = useAppSelector((state) => state.player.players);

  return (
    <>
      <div className="player-list" id="player--list">
        {players?.map((el) => {
          return <PlayerBox key={el.playerId} player={el} />;
        })}
      </div>
    </>
  );
};

export default PlayerList;
