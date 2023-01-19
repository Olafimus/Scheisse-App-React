import { useRef, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { useAppDispatch } from "../../app/hooks";
import { restartAppParas } from "../../features/game-parameters/gameParaSlice";
import {
  newRoundPlayers,
  restartAppPlayers,
} from "../../features/player/playerSlice";
import "./settings.styles.scss";

const Settings = () => {
  const [show, setShow] = useState(false);
  const dropdownBtn = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();

  return (
    <div className="dropdown-container">
      <button
        className="dropdown-button"
        id="dropdown--button"
        ref={dropdownBtn}
        onClick={() => setShow(!show)}
      >
        <GiHamburgerMenu color="white" id="menu-icon" />
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
            <button
              id="new-round-button"
              onClick={() => {
                dispatch(newRoundPlayers());
                dispatch(restartAppParas());
              }}
            >
              Noch ein Match
            </button>
            <button
              id="restart-button"
              onClick={() => {
                dispatch(restartAppPlayers());
                dispatch(restartAppParas());
              }}
            >
              App Neustart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
