import React, { useEffect, useState } from "react";
import "./WatchPlayerBox.styles.scss";
import {
  Match,
  MatchPlayer,
} from "../../../../features/match-details/match-details";
import Scoreboard from "../../../scoreboard/scoreboard.component";

interface Iprops {
  match: Match;
}

const WatchPlayerBox: React.FC<Iprops> = ({ match }) => {
  const [players, setPlayers] = useState<Array<MatchPlayer>>([]);
  // const [load, setLoad] = useState(false);

  useEffect(() => {
    if (match.matchPlayers != undefined) {
      // setLoad(!load);
      match.matchPlayers.forEach((pl) => {
        pl.placement = pl.placements.at(-1);

        if ((pl.score.at(-1) || 0) > (pl.score.at(-2) || 0)) pl.right = true;
        else pl.right = false;
      });
      match.matchPlayers.sort((a, b) => {
        if (!a.placement) a.placement = 0;
        if (!b.placement) b.placement = 0;

        return a.placement - b.placement;
      });
      setPlayers(match.matchPlayers);
    }
  }, [match]);

  // useEffect(() => {
  //   console.log("players on load:", players);
  //   players.forEach((pl) => {
  //     pl.placement = pl.placements.at(-1);

  //     if ((pl.score.at(-1) || 0) > (pl.score.at(-2) || 0)) pl.right = true;
  //     else pl.right = false;
  //   });
  //   players.sort((a, b) => {
  //     if (!a.placement) a.placement = 0;
  //     if (!b.placement) b.placement = 0;

  //     return a.placement - b.placement;
  //   });
  //   setPlayers(players);
  // }, [players]);

  return (
    <div>
      <section>
        <div className="watch-header">
          <h2>Round: {match.roundNumber}</h2>
          <h3>Giver: {match.giver}</h3>
        </div>
      </section>
      <section>
        <div className="watch-player-list">
          <div key={"header"} className="watch-player-box">
            <p>Place</p>
            <p>Name</p>
            <p>Stiche</p>
            <p>points</p>
          </div>
          {players.map((pl) => (
            <div
              key={pl.name}
              className={`${pl.right ? "right" : "wrong"} watch-player-box `}
            >
              <p>{pl.placements.at(-1)}.</p>
              <p>{pl.name}</p>
              <p>{pl.stiche.at(-1)}</p>
              <p>{pl.score.at(-1)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WatchPlayerBox;
