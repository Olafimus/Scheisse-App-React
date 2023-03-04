import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import "./scoreboard.styles.scss";

interface RowObject {
  score: number;
  placement?: string | undefined;
  right?: boolean;
  round?: number;
  id: string | number;
}

const Scoreboard = () => {
  const started = useAppSelector((state) => state.gamePara.started);
  const roundNumber = useAppSelector((state) => state.gamePara.roundNumber);
  const finished = useAppSelector((state) => state.gamePara.finished);
  const players = useAppSelector((state) => state.player.players);
  const [firstRow, setFirstRow] = useState<Array<string>>([]);
  // let firstRow: Array<string> = [];
  const [rows, setRows] = useState<Array<Array<RowObject>>>([]);

  const createFirstRow = () => {
    const newRow: Array<string> = ["Round"];
    players.forEach((player) => {
      newRow.push(player.name);
    });
    setFirstRow(newRow);
  };

  const createRows = () => {
    const rows = [];
    for (let i = 1; i < players[0].score.length; i++) {
      const row: Array<RowObject> = [{ score: i, id: i }];
      players.forEach((player) => {
        let placement = "";
        const id = nanoid();
        let right = false;

        if (player.score[i] > player.score[i - 1]) right = true;

        if (player.placements[i - 1] === 1) placement = "first";
        if (player.placements[i - 1] === 2) placement = "second";
        if (player.placements[i - 1] === 3) placement = "third";

        const rowObject: RowObject = {
          score: player.score[i],
          placement,
          right,
          round: i,
          id,
        };
        row.push(rowObject);
      });
      rows.push(row);
    }
    setRows(rows);
  };

  useEffect(() => {
    createFirstRow();
    createRows();
  }, [roundNumber, started, finished]);

  return (
    <div className="scoreboard-component">
      <h1>Scoreboard</h1>
      <table className="score-table">
        <tbody>
          <tr>
            {firstRow.map((row) => {
              return <th key={row}>{row}</th>;
            })}
          </tr>

          {rows.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((el) => {
                  return (
                    <td key={el.id} className={el.placement}>
                      {el.score}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
