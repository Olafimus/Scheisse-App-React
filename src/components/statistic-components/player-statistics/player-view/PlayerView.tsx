import React from "react";
import "./PlayerView.styles.scss";
import HomeIcon from "../../../genereal-components/Home-Icon/HomeIcon";
import BackButton from "../../../button-components/back-button/BackButton";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { selectStatPlayerById } from "../PlayerStatSlice";
import MatchList from "./MatchList";

type Props = {};

const PlayerView = (props: Props) => {
  const { id } = useParams();

  const player = useAppSelector((s) => selectStatPlayerById(s, id || ""));
  if (!player)
    return (
      <>
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
        <HomeIcon />
        <BackButton />
      </>
    );

  console.log(id);
  console.log(player);
  return (
    <>
      <main style={{ padding: 25 }}>
        <h1 style={{ textAlign: "center", padding: 10 }}>{player.name}</h1>
        <span className="player-view-container">
          <section className="statistics-section">
            <h2>Statistics</h2>
            integrieren: most played with..., nemesis...
          </section>
          <section className="matches-section">
            <h2>Matches</h2>
            <MatchList player={player} />
          </section>
        </span>
      </main>
      <HomeIcon />
      <BackButton />
    </>
  );
};

export default PlayerView;
