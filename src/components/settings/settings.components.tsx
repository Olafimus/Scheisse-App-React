import "./settings.styles.scss";

const Settings = () => {
  return (
    <div className="dropdown-container">
      <button className="dropdown-button" id="dropdown--button">
        <img src="threepoint2.svg" alt="threepoint" id="menu-icon" />
      </button>
      <br />
      <div className="hidden dropdown-reiter" id="dropdown--reiter">
        <button id="score-btn">
          <img src="table-icon.svg" id="table-icon" alt="table icon" />
          <p>Scoreboard</p>
        </button>
        <button id="statistics-button">Statistiken</button>
        <span id="drop-space"></span>
        <button id="new-round-button">Noch ein Match</button>
        <button id="restart-button">App Neustart</button>
      </div>
    </div>
  );
};

export default Settings;
