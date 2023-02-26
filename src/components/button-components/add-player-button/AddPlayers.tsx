import { nanoid } from "@reduxjs/toolkit";
import { Console } from "console";
import { collection, collectionGroup } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getUsers, createUser, db } from "../../../features/firebase/firebase";
import {
  addKnownPlayer,
  forgetKnownPlayer,
} from "../../../features/game-history/gameHistorySlice";
import { addPlayer } from "../../../features/player/playerSlice";
import { firstUpper } from "../../../features/scripts/scripts";
import DropdownButton from "../../genereal-components/Dropddown-menu/DropdownButton";
import DropdownMenu from "../../genereal-components/Dropddown-menu/DropdownMenu";
import DropdownOption from "../../genereal-components/Dropddown-menu/DropdownOption";
import DropdownOptions from "../../genereal-components/Dropddown-menu/DropdownOptions";
import "./AddPlayers.styles.scss";
import plusIcon from "../../../assets/pictures/plus-icon.svg";

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
  // const [knownPlayers, setknownPlayers] = useState([]);
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<Array<User>>([]);
  const [filteredUsers, setFilteredUsers] = useState<Array<User>>([]);
  const [fail, setFail] = useState({ status: false, message: "" });
  const [value, loading, error] = useCollection(collection(db, "users"), {
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

  const playerBackUp = [
    { name: "Barbara", id: "a8arsf" },
    { name: "Horst", id: "aadsfsf" },
    { name: "Pascal", id: "aasdfwaasf" },
    { name: "Oliver", id: "a8aasfssf" },
    { name: "Shabnam", id: "a8afadsfsf" },
    { name: "Sina", id: "a8afadsfrtsf" },
    { name: "Oma", id: "a8afadsfjfsf" },
    { name: "Dagmar", id: "a8afnhadsfsf" },
    { name: "Eugen", id: "a8afaaddsfsf" },
    { name: "Veit", id: "afds8afadsfsf" },
  ];

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
    const btn = document.querySelector(".add-button");
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

  return (
    <div className="add-body">
      <div className="create-container">
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
            <button className="add-button" onClick={addNewPlayer}></button>
          </div>
        </div>
        {fail.status && <p>{fail.message}</p>}
      </div>
      <div className="add-container ">
        <div className="known-player">
          <DropdownMenu>
            <DropdownButton position="center">Add</DropdownButton>
            <DropdownOptions count={filteredPlayers.length}>
              {filteredPlayers.map((pl) => {
                const handleClick = () => {
                  const val = { name: pl.name, id: pl.id };
                  dispatch(addPlayer(val));
                  // const newPlayers = filteredPlayers.filter(
                  //   (player) => player.id !== pl.id
                  // );
                  // setFilteredPlayers(newPlayers);
                };
                return (
                  <DropdownOption
                    func={handleClick}
                    stayOpen={true}
                    key={pl.id}
                  >
                    {pl.name}
                  </DropdownOption>
                );
              })}
            </DropdownOptions>
          </DropdownMenu>
        </div>
        <div className="search-player">
          <DropdownMenu>
            <DropdownButton position="center">Search Players</DropdownButton>
            <DropdownOptions count={filteredUsers.length + 1}>
              <input
                ref={searchField}
                onChange={searchHandler}
                placeholder="Search Players"
                className="user-search-field"
              ></input>
              {filteredUsers.map((user) => {
                const clickHanlder = () => {
                  dispatch(addPlayer(user));
                  const knownCheck = knownPlayers.filter(
                    (pl) => pl.name === user.name
                  );
                  // dispatch(forgetKnownPlayer());
                  if (!knownCheck.length) dispatch(addKnownPlayer(user));
                  searchField.current?.focus();
                  if (searchField.current?.value)
                    searchField.current.value = "";
                };

                return (
                  <DropdownOption
                    func={clickHanlder}
                    stayOpen={true}
                    key={user.id}
                  >
                    {user.name}
                  </DropdownOption>
                );
              })}
            </DropdownOptions>
            {/* <DropdownButton>test</DropdownButton> */}
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AddPlayers;
