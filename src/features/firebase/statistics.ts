import { getDocs, query, where } from "firebase/firestore";
import { matchCollectionRef, usersCollectionRef } from "./firebase";
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
