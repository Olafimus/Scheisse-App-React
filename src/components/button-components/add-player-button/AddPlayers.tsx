import { nanoid } from "@reduxjs/toolkit";
import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createUser, db } from "../../../features/firebase/firebase";
import { addKnownPlayer } from "../../../features/game-history/gameHistorySlice";
import { addPlayer } from "../../../features/player/playerSlice";
import { firstUpper } from "../../../features/scripts/scripts";
import "./AddPlayers.styles.scss";

interface Placements {
  matchId: string;
  placement: number;
}
export interface User {
  name: string;
  id: string;
  matches: string[];
  placements: Placements[];
  ref: string;
}

export interface StatUser extends User {
  placeNums: number[];
  firstPlaces: number;
  secondPlaces: number;
  thirdPlaces: number;
  matchCount: number;
}

const AddPlayers = () => {
  const searchField = React.useRef<HTMLInputElement>(null);
  const nameField = React.useRef<HTMLInputElement>(null);
  const { players } = useAppSelector((state) => state.player);
  const { knownPlayers } = useAppSelector((state) => state.gameHistory);
  const optionsMenu = React.useRef<HTMLInputElement>(null);
  const [addType, setAddType] = useState<null | "add" | "search">(null);
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<Array<User>>([]);
  const [filteredUsers, setFilteredUsers] = useState<Array<User>>([]);
  const [fail, setFail] = useState({ status: false, message: "" });
  const [value] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const playerNames: string[] = [];
  players.forEach((pl) => playerNames.push(pl.name));

  // load Users
  useEffect(() => {
    const tempUsers = value?.docs.map((doc) => {
      const user: User = {
        name: doc.data().name,
        id: doc.data().id,
        matches: doc.data().matches,
        placements: doc.data().placements,
        ref: doc.data().id,
      };
      return user;
    });
    if (tempUsers) setUsers(tempUsers);
  }, [value]);

  useEffect(() => {
    const newUsers = users.filter((user) => !playerNames.includes(user.name));
    setFilteredUsers(newUsers);
  }, [users, players]);

  // const playerBackUp = [
  //   { name: "Barbara", id: "a8arsf" },
  //   { name: "Horst", id: "aadsfsf" },
  //   { name: "Pascal", id: "aasdfwaasf" },
  //   { name: "Oliver", id: "a8aasfssf" },
  //   { name: "Shabnam", id: "a8afadsfsf" },
  //   { name: "Sina", id: "a8afadsfrtsf" },
  //   { name: "Oma", id: "a8afadsfjfsf" },
  //   { name: "Dagmar", id: "a8afnhadsfsf" },
  //   { name: "Eugen", id: "a8afaaddsfsf" },
  //   { name: "Veit", id: "afds8afadsfsf" },
  // ];

  const filteredPlayers = knownPlayers.filter(
    (player) => !playerNames.includes(player.name)
  );

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = e.currentTarget.value.toLowerCase();
    const searchedUsers = users
      .filter((user) => user.name.toLowerCase().includes(searchString))
      .filter((user) => !playerNames.includes(user.id));
    setFilteredUsers(searchedUsers);
  };

  const addNewPlayer = async () => {
    const id = nanoid().slice(0, 5);
    let input: string | undefined = nameField.current?.value;
    let name: string;
    if (!input) return;

    if (typeof input === "string") {
      name = firstUpper(input);
      if (name) {
        const userCheck = users.filter((user) => user.name === name);
        const knownCheck = knownPlayers.filter((pl) => pl.name === name);
        const playerCheck = players.filter((pl) => pl.name === name);
        if (!userCheck.length) createUser(name, id);
        if (!playerCheck.length) {
          if (userCheck.length) dispatch(addPlayer(userCheck[0]));
          else dispatch(addPlayer({ name, id }));
          if (nameField.current?.value) {
            nameField.current.value = "";
            nameField.current.focus();
          }
          if (!knownCheck.length) dispatch(addKnownPlayer({ name, id }));
        }
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value.toLowerCase();
    const btn = document.querySelector(".add-new-button");
    const lowerNames: string[] = [];
    playerNames.forEach((name) => lowerNames.push(name.toLowerCase()));

    if (!input || !btn) return;
    if (input !== "") btn.classList.add("green");
    else btn.classList.remove("green");
    if (lowerNames.includes(input)) {
      setFail({ status: true, message: "Player already added!" });
      btn.classList.remove("green");
    } else setFail({ status: false, message: "" });
  };

  const expandOptions = (count: number) => {
    if (!optionsMenu.current?.style) return;
    const val = count > 500 ? 500 : count;
    console.log(optionsMenu.current.style.maxHeight);

    optionsMenu.current.style.maxHeight = `${30 * val}px`;
  };

  const addSearched = (user: User) => {
    dispatch(addPlayer(user));
    const knownCheck = knownPlayers.filter((pl) => pl.name === user.name);
    if (!knownCheck.length) dispatch(addKnownPlayer(user));
    searchField.current?.focus();
    if (searchField.current?.value) searchField.current.value = "";
  };

  const addFiltered = (pl: { name: string; id: string }) => {
    const val = { name: pl.name, id: pl.id };
    dispatch(addPlayer(val));
  };

  const switchAddType = (btn: "add" | "search" | null) => {
    if (addType === btn) setAddType(null);
    else setAddType(btn);
    expandOptions(filteredUsers.length + 1);
  };

  return (
    <aside className="add-body">
      <div className="add-player-section">
        <div className="add-button-container">
          <span className="search-player-buttons">
            <span className="button-wrapper">
              <button
                className="add-known-player add-button"
                onClick={() => switchAddType("add")}
              >
                Add
              </button>
            </span>
            <button
              className="add-online-player add-button"
              onClick={() => switchAddType("search")}
            >
              Search
            </button>
          </span>
          <span className="new-player-button">
            <div
              className="new-player-two"
              aria-expanded={"false"}
              onClick={(e) => {
                e.stopPropagation();
                if (e.currentTarget.getAttribute("aria-expanded") === "false")
                  e.currentTarget.setAttribute("aria-expanded", "true");
                else e.currentTarget.setAttribute("aria-expanded", "false");
              }}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <input
                  placeholder="Enter Name"
                  ref={nameField}
                  onChange={handleInput}
                  // onSubmit={addNewPlayer}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addNewPlayer();
                  }}
                ></input>
                <button
                  className="add-new-button"
                  onClick={addNewPlayer}
                ></button>
              </div>
            </div>
            {fail.status && <p>{fail.message}</p>}
          </span>
        </div>
        <section className="">
          <span className="dropdown-menu" style={{ margin: "auto" }}>
            <div
              className="dropdown-options"
              id="player-choice-options"
              ref={optionsMenu}
            >
              {addType === "search" && (
                <input
                  ref={searchField}
                  onChange={searchHandler}
                  placeholder="Search Players"
                  className="user-search-field"
                ></input>
              )}
              <div
                className="option-wrapper"
                style={{ overflow: "auto", maxHeight: 350 }}
              >
                {addType === "add" &&
                  filteredPlayers.map((pl) => (
                    <option
                      key={pl.id}
                      onClick={() => addFiltered(pl)}
                      style={{ minWidth: 200 }}
                    >
                      {pl.name}
                    </option>
                  ))}
                {addType === "search" &&
                  filteredUsers.map((pl) => (
                    <option
                      key={pl.id}
                      onClick={() => addSearched(pl)}
                      style={{ minWidth: 200 }}
                    >
                      {pl.name}
                    </option>
                  ))}{" "}
              </div>
            </div>
          </span>
        </section>
      </div>
    </aside>
  );
};

export default AddPlayers;
