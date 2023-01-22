import { useEffect, useState } from "react";
import { finished } from "stream";
import { useAppSelector } from "../../app/hooks";
import "./scoreboard.styles.scss";

interface RowObject {
  score: number;
  placement?: string | undefined;
  right?: boolean;
  round?: number;
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
    for (let i = 0; i < roundNumber; i++) {
      const row: Array<RowObject> = [{ score: i }];
      players.forEach((player) => {
        let placement = "";

        if (player.placement === 1) placement = "first";
        if (player.placement === 2) placement = "second";
        if (player.placement === 3) placement = "third";

        const rowObject: RowObject = {
          score: player.score[i],
          placement,
          right: player.rightAnswer,
          round: i,
        };
        row.push(rowObject);
      });
      rows.push(row);
    }
    setRows(rows);
    console.log(rows);
  };

  useEffect(() => {
    console.log("row-start");
    createFirstRow();
    createRows();
    console.log("row-end", firstRow);
  }, [roundNumber, started, finished]);

  return (
    <div className="scoreboard-component">
      <h1>Scoreboard</h1>
      <table className="score-table">
        <tbody>
          <tr>
            {firstRow.map((row) => {
              return <th>{row}</th>;
            })}
          </tr>

          {rows.map((row) => {
            return (
              <tr>
                {row.map((el) => {
                  return <td className={el.placement}>{el.score}</td>;
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
