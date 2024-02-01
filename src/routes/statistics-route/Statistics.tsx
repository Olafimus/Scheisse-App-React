import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/button-components/back-button/BackButton";
import "./Statistics.styles.scss";
import { store } from "../../app/store";
import {
  fetchMatches,
  selectAllMatches,
} from "../../components/statistic-components/all-matches/AllMatchesSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";

store.dispatch(fetchMatches(store.getState().matches.lastUpdate));

const Statistics = () => {
  const dispatch = useAppDispatch();
  const matches = useSelector(selectAllMatches);
  // dispatch()
  return (
    <div className="statistics-main-route">
      <header className="statistics-header">
        <h1>Statistics</h1>
        <BackButton />
      </header>
      <main className="statistics-main">
        <Link to={"currentmatch"}>
          <div className="statistic-option">
            <h2>Current Match Statistics</h2>
          </div>
        </Link>
        <Link to="players">
          <div className="statistic-option">
            <h2>Players</h2>
          </div>
        </Link>
        <Link to="matches">
          <div className="statistic-option">
            <h2>Matches</h2>
          </div>
        </Link>
        <Link to={"localstats"}>
          <div className="statistic-option">
            <h2>Local Statistics</h2>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default Statistics;
