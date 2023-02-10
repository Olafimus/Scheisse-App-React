import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getUsers } from "../../../features/firebase/firebase";
import { addPlayer } from "../../../features/player/playerSlice";
import DropdownButton from "../../genereal-components/Dropddown-menu/DropdownButton";
import DropdownMenu from "../../genereal-components/Dropddown-menu/DropdownMenu";
import DropdownOption from "../../genereal-components/Dropddown-menu/DropdownOption";
import DropdownOptions from "../../genereal-components/Dropddown-menu/DropdownOptions";
import "./AddPlayers.styles.scss";

interface User {
  name: string;
  id: string;
  ref: string;
}

const AddPlayers = () => {
  const searchField = React.useRef<HTMLInputElement>(null);
  const { players } = useAppSelector((state) => state.player);
  const { knownPlayers } = useAppSelector((state) => state.gameHistory);
  // const [knownPlayers, setknownPlayers] = useState([]);
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<Array<User>>([]);
  const [filteredUsers, setFilteredUsers] = useState<Array<User>>([]);

  const playerIds: string[] = [];
  players.forEach((pl) => playerIds.push(pl.playerId));

  useEffect(() => {
    let temp = [];
    const loadUsers = async () => {
      temp = await getUsers();
      const arr = [...temp];
      setUsers(arr);
      const newUsers = arr.filter((user) => !playerIds.includes(user.id));
      setFilteredUsers(newUsers);
      console.log(arr);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const newUsers = users.filter((user) => !playerIds.includes(user.id));
    setFilteredUsers(newUsers);
  }, [players]);

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
    (player) => !playerIds.includes(player.id)
  );

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = e.currentTarget.value.toLowerCase();
    const searchedUsers = users
      .filter((user) => user.name.toLowerCase().includes(searchString))
      .filter((user) => !playerIds.includes(user.id));
    setFilteredUsers(searchedUsers);
  };

  return (
    <div>
      <div>
        Add Players on this device
        <DropdownMenu>
          <DropdownButton>Add</DropdownButton>
          <DropdownOptions count={filteredPlayers.length}>
            {filteredPlayers.map((pl) => {
              const handleClick = () => {
                const val = pl;
                dispatch(addPlayer(val));
                // const newPlayers = filteredPlayers.filter(
                //   (player) => player.id !== pl.id
                // );
                // setFilteredPlayers(newPlayers);
              };
              return (
                <DropdownOption func={handleClick} stayOpen={true} key={pl.id}>
                  {pl.playerName}
                </DropdownOption>
              );
            })}
          </DropdownOptions>
        </DropdownMenu>
      </div>
      <div>Search Player</div>
      <div>
        <button>New Player</button>
      </div>
      <div>
        <DropdownMenu>
          <DropdownButton>Search Players</DropdownButton>
          <DropdownOptions count={filteredUsers.length + 1}>
            <input
              ref={searchField}
              onChange={searchHandler}
              placeholder="Search Players"
            ></input>
            {filteredUsers.map((user) => {
              const clickHanlder = () => {
                dispatch(addPlayer(user));
                searchField.current?.focus();
                if (searchField.current?.value) searchField.current.value = "";
              };

              return (
                <DropdownOption func={clickHanlder} stayOpen={true}>
                  {user.name}
                </DropdownOption>
              );
            })}
          </DropdownOptions>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AddPlayers;
