import { useRef, useState } from "react";
import "./settings.styles.scss";

const Settings = () => {
  const [show, setShow] = useState(false);
  const dropdownBtn = useRef<HTMLButtonElement>(null);

  return (
    <div className="dropdown-container">
      <button
        className="dropdown-button"
        id="dropdown--button"
        ref={dropdownBtn}
        onClick={() => setShow(!show)}
      >
        <div>X</div>
      </button>
      {show && (
        <>
          <br />
          <div className="hidden dropdown-reiter" id="dropdown--reiter">
            <button id="score-btn">
              {/* <img src="table-icon.svg" id="table-icon" alt="table icon" /> */}
              <p>Scoreboard</p>
            </button>
            <button id="statistics-button">Statistiken</button>
            <span id="drop-space"></span>
            <button id="new-round-button">Noch ein Match</button>
            <button id="restart-button">App Neustart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
