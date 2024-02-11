import React, { useState } from "react";
import "./PlayerView.styles.scss";
import HomeIcon from "../../../genereal-components/Home-Icon/HomeIcon";
import BackButton from "../../../button-components/back-button/BackButton";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { selectStatPlayerById } from "../PlayerStatSlice";
import MatchList from "./MatchList";
import { addMissingMatches } from "../../../../features/firebase/statistics";
import {
  selectAllMatches,
  selectMatchById,
} from "../../all-matches/AllMatchesSlice";

type Props = {};

const PlayerView = (props: Props) => {
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(true);

  const player = useAppSelector((s) => selectStatPlayerById(s, id || ""));
  const noPlayerView = (
    <main
      style={{
        padding: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <h1 style={{ textAlign: "center" }}>Player not found</h1>
      <p style={{ fontSize: "larger" }}>
        Go Back to the Player List or try again
      </p>
    </main>
  );
  const matches =
    player?.matchstats.reduce(
      (
        acc: { [key: string]: { name: string; wins: number; matches: number } },
        cur
      ) => {
        cur.players.forEach((pl) => {
          if (pl === player.name) return acc;
          acc[pl]
            ? (acc[pl] = {
                name: pl,
                matches: acc[pl].matches + 1,
                wins: cur.placement === 1 ? acc[pl].wins + 1 : acc[pl].wins,
              })
            : (acc[pl] = {
                name: pl,
                matches: 1,
                wins: cur.placement === 1 ? 1 : 0,
              });
        });
        return acc;
      },
      {}
    ) || {};
  const playersStats = Object.values(matches).sort(
    (a, b) => b.matches - a.matches
  );

  console.log(matches);

  return (
    <>
      {!player ? (
        noPlayerView
      ) : (
        <main style={{ padding: 25 }}>
          <h1 style={{ textAlign: "center", padding: 10 }}>{player.name}</h1>
          <span className="player-view-container">
            <section className="statistics-section">
              <h2>Statistics</h2>
              <div
                className="matchcount-wrapper"
                onClick={() => setCollapsed((cur) => !cur)}
              >
                <span className="overall-matches">
                  <p>Matches</p>
                  <p>{player.matchCount}</p>
                  <p
                    style={
                      collapsed
                        ? { transform: "rotate(90deg)" }
                        : { transform: "rotate(-90deg)" }
                    }
                  >
                    {" "}
                    &lt;
                  </p>
                  <p>Wins</p>
                  <p>{player.firstPlaces}</p>
                </span>
                <div
                  style={collapsed ? { maxHeight: 0 } : { maxHeight: 180 }}
                  className="detail-match-count-container"
                >
                  <p>Players</p>
                  <p>Matches</p>
                  <p>Wins</p>
                  {Object.keys(player.orderedMatchStats).map((el) => (
                    <>
                      <p>{el}</p>
                      <p>{player.orderedMatchStats[+el].matchCount}</p>
                      <p>{player.orderedMatchStats[+el].firstPlaces}</p>
                    </>
                  ))}
                </div>
              </div>
              <h4>Statistics vs Players</h4>
              <div className="player-match-container">
                <p>Name</p>
                <p>Matches</p>
                <p>Wins</p>
                {playersStats.map((pl) => (
                  <>
                    <p>{pl.name}</p>
                    <p>{pl.matches}</p>
                    <p>{pl.wins}</p>
                  </>
                ))}
              </div>
            </section>
            <section className="matches-section">
              <h2>Matches</h2>
              <MatchList player={player} />
            </section>
          </span>
          {/* <button onClick={addMissingMatches}>add missing matches</button> */}
        </main>
      )}
      <HomeIcon />
      <BackButton />
    </>
  );

  // return (
  //   <>
  //     <HomeIcon />
  //     <BackButton />
  //   </>
  // );
};

export default PlayerView;
