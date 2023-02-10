import "./users.scss";
import * as React from "react";
import { useEffect, useState } from "react";
import { getUsers, createUser } from "../../features/firebase/firebase";
import { nanoid } from "@reduxjs/toolkit";

interface User {
  name?: string;
  id: string;
}

const UsersRoute = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    let test = [];
    const loadUsers = async () => {
      test = await getUsers();
      const arr = [...test];
      setUsers(arr);
      console.log(arr);
    };
    loadUsers();
  }, []);

  const addUser = () => {
    const id = nanoid();
    createUser(name, id);
    setName("");
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  return (
    <div className="users-body">
      <h1>users</h1>
      <form onSubmit={addUser}>
        <input
          type={"text"}
          name="name"
          onChange={handleChange}
          value={name}
        ></input>
        <button type="button" onClick={addUser}>
          submit
        </button>
      </form>
      {users?.map((user) => (
        <div key={user.id}>
          <h2>{user.id}</h2>
          <h3>{user.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default UsersRoute;
