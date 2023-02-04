import { Iplayer } from "../player/playerInterface";
import { nanoid } from "@reduxjs/toolkit";
import { setDoc } from "firebase/firestore";

export interface MatchPlayer {
  name: string;
  score: Array<number>;
  stiche: Array<number>;
  placements: Array<number>;
  placement?: number;
  right?: boolean;
}

export interface Match {
  matchPlayers?: Array<MatchPlayer>;
  roundNumber?: number;
  finished?: boolean;
  giver?: string;
  id?: string;
  matchRef?: string;
  startedAt?: number;
}

export const createMatchDetail = (
  players: Array<Iplayer>,
  roundNumber: number,
  finished: boolean,
  giver: string,
  id: string,
  startedAt: number
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
    startedAt,
  };
  console.log("matchdetails: ", match);
  return match;
};

export const updateMatchInDb = async () => {};
