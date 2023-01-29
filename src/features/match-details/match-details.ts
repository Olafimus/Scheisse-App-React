import { Iplayer } from "../player/playerInterface";
import { nanoid } from "@reduxjs/toolkit";
import { setDoc } from "firebase/firestore";

export interface MatchPlayer {
  name: string;
  score: Array<number>;
  stiche: Array<number>;
  placements: Array<number>;
}

export interface Match {
  matchPlayers?: Array<MatchPlayer>;
  roundNumber?: number;
  finished?: boolean;
  giver?: string;
  id?: string;
  matchRef?: string;
}

export const createMatchDetail = (
  players: Array<Iplayer>,
  roundNumber: number,
  finished: boolean,
  giver: string,
  id: string
) => {
  const matchPlayers: Array<MatchPlayer> = [];

  players.forEach((pl) => {
    const { name, score, stichHistory, placements } = pl;

    matchPlayers.push({
      name,
      score,
      stiche: stichHistory,
      placements,
    });
  });
  const match = {
    matchPlayers,
    roundNumber,
    finished,
    giver,
    id,
  };
  console.log("matchdetails: ", match);
  return match;
};

export const updateMatchInDb = async () => {};
