import PlayerBox from "./player-box-components/player-box.component";
import "./player-list.styles.scss";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Iplayer } from "../../features/player/playerInterface";

const PlayerList = () => {
  const players = useAppSelector((state) => state.player.players);
  const { roundNumber, started } = useAppSelector((state) => state.gamePara);

  // useEffect(() => {
  //   setPlayers(playerState.players);
  //   if (roundNumber > 1) {
  //     players.sort((a, b) => {
  //       if (!a.placement) a.placement = 0;
  //       if (!b.placement) b.placement = 0;
  //       console.log("fire");
  //       return a.placement - b.placement;
  //     });
  //   }
  //   setPlayers(players);
  //   console.log(plaöyers);
  // }, [roundNumber]);

  // players.sort((a, b) => {
  //   if (!a.placement) a.placement = 0;
  //   if (!b.placement) b.placement = 0;
  //   console.log("fire");
  //   return a.placement - b.placement;
  // });

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
