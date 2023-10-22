import { Iplayer, Istatistics } from "../player/playerInterface";

export interface MatchPlayer {
  name: string;
  score: Array<number>;
  stiche: Array<number>;
  placements: Array<number>;
  placement?: number;
  right?: boolean;
  statistics?: Istatistics;
}

export interface Match {
  matchPlayers?: Array<MatchPlayer>;
  playerNames?: Array<string>;
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
    const { name, score, stichHistory, placements, statistics } = pl;

    matchPlayers.push({
      name,
      score,
      stiche: stichHistory,
      placements,
      statistics,
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
  return match;
};

export const updateMatchInDb = async () => {};
