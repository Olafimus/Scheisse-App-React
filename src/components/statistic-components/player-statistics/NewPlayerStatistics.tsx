import React, { useEffect } from "react";
import BestList from "./BestList";
import { useAppSelector } from "../../../app/hooks";
import { loadStatPlayers, selectAllStatPlayers } from "./PlayerStatSlice";
import { store } from "../../../app/store";
import { selectAllMatches } from "../all-matches/AllMatchesSlice";
import { useSelector } from "react-redux";
import PlayerList from "./PlayerList";
import HomeIcon from "../../genereal-components/Home-Icon/HomeIcon";
import BackButton from "../../button-components/back-button/BackButton";

type Props = {};

const NewPlayerStatistics = (props: Props) => {
  const matches = useSelector(selectAllMatches);
  const players = useAppSelector(selectAllStatPlayers);

  useEffect(() => {
    if (matches.length < 1) return;
    store.dispatch(loadStatPlayers());
  }, [matches.length]);

  return (
    <>
      <main>
        {/* <section style={{ padding: 25, textAlign: "center" }}>
          <PlayerList players={players} />
        </section> */}
        <section style={{ padding: 25 }}>
          <BestList players={players} />
        </section>
      </main>
      <HomeIcon />
      <BackButton />
    </>
  );
};

export default NewPlayerStatistics;
