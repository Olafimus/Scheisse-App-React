import "./Home.styles.scss";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo_transparent.png";
import watchImage from "../../assets/pictures/binoculars2.png";
import playImage from "../../assets/pictures/cards.svg";

const Home = () => {
  return (
    <div className="home-body">
      <img src={logo} alt="Scheisse App" />

      <div className="selection-body">
        <div className="game-mode-selection">
          <Link to="/game">
            <div
              className="game-mode-box"
              style={{ backgroundImage: `url(${playImage})` }}
            >
              <h2>Play</h2>
            </div>
          </Link>
          <Link to="/matchspec">
            <div
              className="game-mode-box"
              style={{ backgroundImage: `url(${watchImage})` }}
            >
              <h2>Watch</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
