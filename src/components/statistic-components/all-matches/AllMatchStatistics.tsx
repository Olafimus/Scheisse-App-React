import React from "react";
import { getMatches } from "../../../features/firebase/firebase";
import { Match } from "../../../features/match-details/match-details";
import BackButton from "../../button-components/back-button/BackButton";
import HomeIcon from "../../genereal-components/Home-Icon/HomeIcon";
import MatchList from "../../match-spec-components/MatchList/MatchList";
import "./AllMatchStatistics.scss";

const AllMatchStatistics = () => {
  const [matches, setMatches] = React.useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = React.useState<Match>();

  React.useEffect(() => {
    const loadMatches = async () => {
      const matches = await getMatches();
      setMatches(matches);
    };
    loadMatches();
  }, []);

  const clickHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    console.log(e.currentTarget.firstChild?.textContent);
    const ref = e.currentTarget.firstChild?.textContent;
    const match = matches.find((el) => el.id === ref);
    if (!match) return;
    const names: string[] = [];
    match.matchPlayers?.forEach((pl) => names.push(pl.name));
    match.playerNames = names;
    match.matchPlayers?.sort(
      (a, b) =>
        // if (!a.score.length) a.score.push(0);
        // if (!b.score.at(-1)) return;
        b.score[a.score.length - 1] - a.score[b.score.length - 1]
    );

    setSelectedMatch(match);
  };
  console.log(selectedMatch?.matchPlayers);
  return (
    <div className="match-stat-body">
      <header className="player-stat-header">
        <h2>Match Statistics</h2>
        <HomeIcon />
        <BackButton />
      </header>
      <main className="match-stat-main">
        <section className="match-search-section match-stat-section">
          <MatchList clickHandler={clickHandler} matches={matches} />
        </section>
        <section className="match-preview-section match-stat-section">
          {selectedMatch && (
            <div className="">
              <h3>Match Preview</h3>

              <table>
                <thead>
                  <tr>
                    <td>name</td>
                    <td>place</td>
                    <td>score</td>
                    <td>best streak</td>
                  </tr>
                </thead>
                <tbody>
                  {selectedMatch.matchPlayers?.map((pl) => (
                    <tr>
                      <td>{pl.name}</td>
                      <td>{pl.placements.at(-1)}</td>
                      <td>{pl.score.at(-1)}</td>
                      <td>{pl.statistics?.maxWinStreak}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AllMatchStatistics;
