import React from "react";
import "./BackButton.styles.scss";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <Link to={"/game"}>
      <button className="back-button">Go Back</button>
    </Link>
  );
};

export default BackButton;
