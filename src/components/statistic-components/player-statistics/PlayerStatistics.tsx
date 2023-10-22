import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../features/firebase/firebase";
import { StatUser } from "../../button-components/add-player-button/AddPlayers";
import BackButton from "../../button-components/back-button/BackButton";
import HomeIcon from "../../genereal-components/Home-Icon/HomeIcon";
import "./PlayerStatistics.scss";

const PlayerStatistics = () => {
  const [users, setUsers] = useState<StatUser[]>([]);
  const [bestUsers, setBestUsers] = useState<StatUser[]>([]);
  const [value] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    const tempUsers = value?.docs.map((doc) => {
      const user: StatUser = {
        name: doc.data().name,
        id: doc.data().id,
        matches: doc.data().matches,
        placements: doc.data().placements,
        placeNums: doc.data().placeNums,
        firstPlaces: doc.data().firstPlaces,
        secondPlaces: doc.data().secondPlaces,
        thirdPlaces: doc.data().thirdPlaces,
        matchCount: doc.data().matchCount,
        ref: doc.data().id,
      };
      return user;
    });
    if (tempUsers) setUsers(tempUsers);
  }, [value]);

  useEffect(() => {
    const tempUsers = [...users];
    tempUsers.forEach((user) => {
      user.placeNums = Array.from(user.placements, (el) => el.placement);
      user.firstPlaces = user.placeNums.filter((el) => el === 1).length;
      user.secondPlaces = user.placeNums.filter((el) => el === 2).length;
      user.thirdPlaces = user.placeNums.filter((el) => el === 3).length;
      user.matchCount = user.matches.length;
    });

    tempUsers.sort((a, b) => b.firstPlaces - a.firstPlaces);
    setBestUsers(tempUsers);
  }, [users]);

  return (
    <div>
      <header className="player-stat-header">
        <HomeIcon />
        <BackButton />
        <h2>Player Statistics</h2>
      </header>
      <main className="player-stat-main">
        <section className="stat-player-search-list player-stat-section">
          <h3 className="player-search-title">Player List</h3>
          <div className="player-stat-list-container">
            <input
              type="text"
              className="stat-player-search"
              placeholder="Search Players"
            />
            <span className="player-stat-list">
              <span className="player-stat-list-items">
                <p>Name</p>
                <p>Matches</p>
                <p>Wins</p>
              </span>
              {users.map((user) => (
                <span className="player-stat-list-items" key={user.id}>
                  <p>{user.name}</p>
                  <p>{user.matches?.length}</p>
                  <p>{user.firstPlaces}</p>
                </span>
              ))}
            </span>
          </div>
        </section>
        <section className="player-best-list player-stat-section">
          <h3 className="player-search-title">Best List</h3>
          <div className="player-stat-list-container">
            <span className="player-stat-list best-list-players">
              <span className="player-stat-list-items">
                <p>Place</p>
                <p>Name</p>
                <p>Wins</p>
              </span>
              {bestUsers.map((user, i) => (
                <span className="player-stat-list-items">
                  <p>{i + 1}.</p>
                  <p>{user.name}</p>
                  <p>{user.firstPlaces}</p>
                </span>
              ))}
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlayerStatistics;
