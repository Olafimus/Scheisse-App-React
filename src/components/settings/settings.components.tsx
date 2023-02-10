import { useRef, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { restartAppParas } from "../../features/game-parameters/gameParaSlice";
import {
  newRoundPlayers,
  restartAppPlayers,
} from "../../features/player/playerSlice";
import ModalBody from "../genereal-components/Modal/ModalBody";
import ModalContent from "../genereal-components/Modal/ModalContent";
import ModalFooter from "../genereal-components/Modal/ModalFooter";
import ModalHeader from "../genereal-components/Modal/ModalHeader";
import GameSettings from "./game-settings/GameSettings";
import "./settings.styles.scss";

const Settings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showGameSettings, setShowGameSettings] = useState(false);
  const dropdownBtn = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();

  return (
    <div className="dropdown-container">
      <button
        className="dropdown-button"
        id="dropdown--button"
        ref={dropdownBtn}
        onClick={() => setShowSettings(!showSettings)}
      >
        <GiHamburgerMenu color="white" id="menu-icon" />
      </button>
      {showSettings && (
        <>
          <br />
          <div className="hidden dropdown-reiter" id="dropdown--reiter">
            <Link to={"/"}>
              <button id="score-btn">
                <p>Home</p>
              </button>
            </Link>
            <Link to={"/game/scoreboard"}>
              <button id="score-btn">
                <p>Scoreboard</p>
              </button>
            </Link>
            <Link to={"/game/statistics"}></Link>
            {/* <Link to={"/settings"}>
              <button
              id="settings-button"
              onClick={() => {
                setShowSettings(!showSettings);
                setShowGameSettings(true);
              }}
              >
              Settings
              </button>
            </Link> */}
            <button
              id="statistics-button"
              onClick={() => setShowSettings(!showSettings)}
            >
              Statistiken
            </button>
            <button
              id="settings-button"
              onClick={() => {
                setShowGameSettings(true);
                console.log(showGameSettings);
                setShowSettings(!showSettings);
              }}
            >
              Settings
            </button>
            {/* <span id="drop-space"></span> */}
            {/* <Link to={"/game/ceremony"}>
              <button>Ceremony</button>
            </Link> */}
            <button
              id="new-round-button"
              onClick={() => {
                setShowSettings(!showSettings);
                dispatch(newRoundPlayers());
                dispatch(restartAppParas());
              }}
            >
              Noch ein Match
            </button>
            <Link to={"/"}>
              <button
                id="restart-button"
                onClick={() => {
                  setShowSettings(!showSettings);
                  dispatch(restartAppPlayers());
                  dispatch(restartAppParas());
                }}
              >
                App Neustart
              </button>
            </Link>
          </div>
        </>
      )}
      <ModalBody show={showGameSettings} setShow={setShowGameSettings}>
        <ModalHeader setShow={setShowGameSettings}>Game Settings</ModalHeader>
        <ModalContent>
          <GameSettings />
        </ModalContent>
        <ModalFooter setShow={setShowGameSettings}></ModalFooter>
      </ModalBody>
    </div>
  );
};

export default Settings;
