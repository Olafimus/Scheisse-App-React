import React from "react";
import logo from "../../../assets/logo/logo_transparent.png";
import { Link } from "react-router-dom";
import "./HomeIcon.styles.scss";

const HomeIcon = () => {
  return (
    <Link to="/">
      <img alt="Logo" className="back-home-button" src={logo} />
    </Link>
  );
};

export default HomeIcon;
