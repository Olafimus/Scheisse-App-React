import {
  arrayUnion,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, matchCollectionRef, usersCollectionRef } from "./firebase";
import { queryAllByAltText } from "@testing-library/react";
import { Match } from "../../components/statistic-components/all-matches/AllMatchesSlice";
import { BasePlayer } from "../../components/statistic-components/player-statistics/PlayerStatSlice";

export const fetchAllMatches = async (timeStamp: number): Promise<Match[]> => {
  const data = await getDocs(matchCollectionRef);
  const q = query(
    matchCollectionRef,
    where("finished", "==", true),
    where("startedAt", ">", timeStamp)
  );
  const querySnapshot = await getDocs(q);

  const matches = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    matchRef: doc.id,
  }));
  console.log(matches.length);
  return matches as Match[];
};

export const getAllPlayers = async () => {
  const data = await getDocs(usersCollectionRef);
  console.log(data.docs[0].data());
  return data.docs.map((doc) => ({
    ref: doc.id,
    id: doc.data().id,
    name: doc.data().name,
    matches: doc.data().matches,
  })) as BasePlayer[];
};

export const addMissingMatches = async () => {
  const matches = await fetchAllMatches(0);
  const players = matches.reduce(
    (acc: { [key: string]: { matches: string[]; name: string } }, cur) => {
      const players = cur.matchPlayers.map((pl) => pl.name);
      players.forEach((pl) => {
        acc[pl]
          ? acc[pl].matches.push(cur.id)
          : (acc[pl] = { matches: [cur.id], name: pl });
      });
      return acc;
    },
    {}
  );
  console.log(players);
  Object.values(players).forEach((pl) => addMatchToUser(pl.name, pl.matches));
};

const addMatchToUser = async (user: string, matchId: string[]) => {
  const q = query(usersCollectionRef, where("name", "==", user));
  const querySnapshot = await getDocs(q);
  let ref = "";

  querySnapshot.forEach((doc) => {
    ref = doc.id;
  });
  const userRef = doc(db, "users", ref);

  await updateDoc(userRef, {
    matches: arrayUnion(...matchId),
  });
};
