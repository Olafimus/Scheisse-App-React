import React from "react";
import { Iplayer } from "../../../features/player/playerInterface";

interface Iprops {
  pl: Iplayer;
}

const MatchStatPlayer: React.FC<Iprops> = ({ pl }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const infoRef = React.useRef<HTMLTableElement>(null);

  const unroll = () => {
    if (!containerRef.current) return;
    if (!infoRef.current) return;
    const allInfoPanel = document.querySelectorAll(".player-statistic-info");
    if (!allInfoPanel) return;
    if (infoRef.current.classList.length === 1)
      return allInfoPanel.forEach((panel) => panel.classList.add("shrink"));
    console.log(infoRef.current.classList.length === 1);

    // if (infoRef.current.style.maxHeight >)
    const scrollHeigth = infoRef.current.scrollHeight;
    const newWidth = `${scrollHeigth}px`;
    const r: any = document.querySelector(":root");
    r.style.setProperty("--calc-width", newWidth);

    allInfoPanel.forEach((panel) => panel.classList.add("shrink"));
    infoRef.current.classList.remove("shrink");
  };

  return (
    <div
      className="player-statistic-box"
      ref={containerRef}
      key={pl.playerId}
      onClick={unroll}
    >
      <h4>{pl.name}</h4>
      <table className="player-statistic-info shrink" ref={infoRef}>
        <tbody className="">
          <tr className="pl-st-info-head">
            <th>Streaks</th>
          </tr>

          <tr className="pl-st-info-box">
            <p>winstreak</p>
            <p>{pl.statistics.winStreak}</p>
          </tr>
          <tr className="pl-st-info-box">
            <p>max winstreak: </p>
            <p>{pl.statistics.maxWinStreak}</p>
          </tr>
          <span className="divider"></span>
          <tr className="pl-st-info-box">
            <p>losestreak:</p>
            <p>{pl.statistics.loseStreak}</p>
          </tr>
          <tr className="pl-st-info-box">
            <p>max losestreak:</p>
            <p>{pl.statistics.maxLoseStreak}</p>
          </tr>
        </tbody>

        <tbody>
          <tr className="pl-st-info-head">
            <th>More Info</th>
          </tr>
          <tr className="pl-st-info-box">
            <p>first Places:</p>
            <p> {pl.statistics.firstPlaces}</p>
          </tr>
          <tr className="pl-st-info-box">
            <p>last Places: </p>
            <p>{pl.statistics.lastPlaces}</p>
          </tr>
          <tr className="pl-st-info-box">
            <p>max won stiche: </p>
            <p>{pl.statistics.maxWonStiche}</p>
          </tr>
          <tr className="pl-st-info-box">
            <p>max called stiche: </p>
            <p>{pl.statistics.maxCalledStiche}</p>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MatchStatPlayer;
