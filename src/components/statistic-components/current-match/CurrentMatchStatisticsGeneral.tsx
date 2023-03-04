import React from "react";
import { useAppSelector } from "../../../app/hooks";
import Statistics from "../../../routes/statistics-route/Statistics";
import StatisticListItem from "../general/StatisticListItem";
import StatisticsList from "../general/StatisticsList";

const MatchStatisticsGeneral = () => {
  const { players } = useAppSelector((state) => state.player);
  return (
    <div className="general-statistics-container">
      <StatisticsList head={"Current Streaks"}>
        {players.map((pl) => {
          const val = pl.statistics.onWinStreak
            ? pl.statistics.winStreak
            : pl.statistics.loseStreak;
          return <StatisticListItem name={pl.name} val={val} />;
        })}
      </StatisticsList>
      <StatisticsList head={"Most first places"}>
        {players.map((pl) => (
          <StatisticListItem name={pl.name} val={pl.statistics.firstPlaces} />
        ))}
      </StatisticsList>
      <StatisticsList head={"Most last places"}>
        {players.map((pl) => (
          <StatisticListItem name={pl.name} val={pl.statistics.lastPlaces} />
        ))}
      </StatisticsList>
      <StatisticsList head={"Longest Lose-Streak"}>
        {players.map((pl) => (
          <StatisticListItem name={pl.name} val={pl.statistics.maxLoseStreak} />
        ))}
      </StatisticsList>
      <StatisticsList head={"Longest Win-Streak"}>
        {players.map((pl) => (
          <StatisticListItem name={pl.name} val={pl.statistics.maxWinStreak} />
        ))}
      </StatisticsList>
      <StatisticsList head={"Most first places"}>
        {players.map((pl) => (
          <StatisticListItem name={pl.name} val={pl.statistics.firstPlaces} />
        ))}
      </StatisticsList>
      <StatisticsList head={"Most last places"}>
        {players.map((pl) => (
          <StatisticListItem name={pl.name} val={pl.statistics.lastPlaces} />
        ))}
      </StatisticsList>
      <StatisticsList head={"Most Called Stiche"}>
        {players.map((pl) => (
          <StatisticListItem
            name={pl.name}
            val={pl.statistics.maxCalledStiche}
          />
        ))}
      </StatisticsList>
      <StatisticsList head={"Most Won Stiche"}>
        {players.map((pl) => (
          <StatisticListItem name={pl.name} val={pl.statistics.maxWonStiche} />
        ))}
      </StatisticsList>
    </div>
  );
};

export default MatchStatisticsGeneral;
