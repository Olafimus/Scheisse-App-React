import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import "./round-stat.styles.scss";

const RoundStats = () => {
  const gamePara = useAppSelector((state) => state.gamePara);
  const giver = useAppSelector((state) => state.player.giver);
  const sticheComp = useAppSelector((state) => state.gamePara.sticheComp);

  useEffect(() => {}, [gamePara.calledStiche, gamePara.maxStiche]);

  return (
    <div className="round-stats">
      {gamePara.started && (
        <>
          <div className="round-stat">
            <p id="round-number">
              Runde {gamePara.roundNumber} von {gamePara.endRound}
            </p>
          </div>
          <div>
            <span>
              <p id="card-giver">Geber: {giver}</p>
            </span>
          </div>
          <div className={`stiche-comparison ${sticheComp}`}>
            <p id="current-stiche">
              Stiche: {gamePara.calledStiche} / {gamePara.maxStiche}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default RoundStats;
