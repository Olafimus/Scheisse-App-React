import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import "./round-stat.styles.scss";

const RoundStats = () => {
  const gamePara = useAppSelector((state) => state.gamePara);

  useEffect(() => {}, [gamePara.calledStiche, gamePara.maxStiche]);

  return (
    <div className="round-stats">
      {gamePara.started && (
        <>
          <div className="round-stat">
            <p>Runde</p>
            <p id="round-number">
              {gamePara.roundNumber} von {gamePara.endRound}
            </p>
          </div>
          <div>
            <span>
              <p>Geber:</p>
              <p id="card-giver">Spieler 1</p>
            </span>
          </div>
          <div className="stiche-comparison">
            <p>Stiche:</p>
            <p id="current-stiche">{gamePara.calledStiche}</p>
            <p>/</p>
            <p id="max-stiche">{gamePara.maxStiche}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default RoundStats;
