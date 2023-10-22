import "./ceremony.route.styles.scss";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { freshPlayer, Iplayer } from "../../features/player/playerInterface";
import CeremonyTable from "../../components/ceremony-components/ceremony-table/ceremony-table.component";
import BackButton from "../../components/button-components/back-button/BackButton";

const CeremonyRoute = () => {
  const [sortedPlayers, setSortedPlayers] = useState<Array<Iplayer>>([]);
  const [check, setCheck] = useState(false);
  const players = useAppSelector((state) => state.player.players);

  useEffect(() => {
    let sorted = [...players];
    sorted.sort((a, b) => {
      if (!a.placement) a.placement = 0;
      if (!b.placement) b.placement = 0;
      return a.placement - b.placement;
    });

    setSortedPlayers(sorted);
  }, [players]);

  useEffect(() => {
    if (sortedPlayers.length < 2) return;
    if (sortedPlayers.length === 2) {
      const player = {
        ...freshPlayer,
        name: "No One",
        placement: 3,
      };
      sortedPlayers.push(player);
      setSortedPlayers(sortedPlayers);
    }
    setCheck(true);
  }, [sortedPlayers]);

  return (
    <div className="ceremony-body">
      <BackButton />
      {check && (
        <div className="podest-table">
          <div className="treppchen-container">
            <div className="podest-with-name">
              <div className="name" id="name-place2">
                {sortedPlayers[1].name}
              </div>
              <div className="podest" id="place-2">
                2.
              </div>
            </div>
            <div className="podest-with-name">
              <div className="name" id="name-place1">
                {sortedPlayers[0].name}
              </div>
              <div className="podest" id="place-1">
                1.
              </div>
            </div>
            <div className="podest-with-name">
              <div className="name" id="name-place3">
                {sortedPlayers[2].name}
              </div>
              <div className="podest" id="place-3">
                3.
              </div>
            </div>
          </div>

          <CeremonyTable players={sortedPlayers} />
        </div>
      )}
    </div>
  );
};

export default CeremonyRoute;
