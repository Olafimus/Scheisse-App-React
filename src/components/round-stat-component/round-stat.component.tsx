import "./round-stat.styles.scss";

const RoundStats = () => {
  return (
    <div className="round-stats">
      <div className="round-stat">
        <p>Runde</p>
        <p id="round-number">6 von 16</p>
      </div>
      <div>
        <span>
          <p>Geber:</p>
          <p id="card-giver">Spieler 1</p>
        </span>
      </div>
      <div className="stiche-comparison">
        <p>Stiche:</p>
        <p id="current-stiche">?</p>
        <p>/</p>
        <p id="max-stiche">?</p>
      </div>
    </div>
  );
};

export default RoundStats;
