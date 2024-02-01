import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./scoreboard.styles.scss";
import BasicMenu from "../genereal-components/basic-menu/BasicMenu";
import CheckButtons from "../player-components/player-box-components/check-buttons/check-buttons.component";
import { correctPlayer } from "../../features/player/playerSlice";

export interface RowObject {
  score: number;
  stiche?: number;
  placement?: string | undefined;
  right?: boolean;
  round?: number;
  playerId?: string;
  name?: string;
  id: string | number;
}

export interface CorObj {
  score: number;
  stiche: number;
  placement: string | undefined;
  right: boolean;
  round: number;
  playerId: string;
  name: string;
  id: string;
}

const corModeStyles = {
  cursor: "pointer",
  borderColor: "#ff9800",
};

const Scoreboard = () => {
  const dispatch = useAppDispatch();
  const started = useAppSelector((state) => state.gamePara.started);
  const roundNumber = useAppSelector((state) => state.gamePara.roundNumber);
  const finished = useAppSelector((state) => state.gamePara.finished);
  const players = useAppSelector((state) => state.player.players);
  const [firstRow, setFirstRow] = useState<Array<string>>([]);
  // let firstRow: Array<string> = [];
  const [rows, setRows] = useState<Array<Array<RowObject>>>([]);
  const [corMode, setCorMode] = useState(false);
  const [corItem, setCorItem] = useState<RowObject | null>(null);
  const [toggle, setToggle] = useState(false);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
          stiche: player.stichHistory[i],
          placement,
          right,
          round: i,
          id,
          playerId: player.playerId,
          name: player.name,
        };
        row.push(rowObject);
      });
      rows.push(row);
    }
    setRows(rows);
  };

  const handleCorClick = (
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    el: RowObject
  ) => {
    if (!corMode) return;
    if (typeof el.stiche !== "number") {
      setOpen(false);
      setAnchorEl(null);
      setCorItem(null);
      return;
    }
    setOpen(true);
    setAnchorEl(e.currentTarget);
    setCorItem(el);
    setToggle((cur) => !cur);
  };

  useEffect(() => {
    createFirstRow();
    createRows();
  }, [roundNumber, started, finished, update]);

  return (
    <div className="scoreboard-component">
      {corMode ? (
        <button
          onClick={() => setCorMode((cur) => !cur)}
          className="correction-score-button cor-active-btn"
        >
          Leave Correction
        </button>
      ) : (
        <button
          onClick={() => setCorMode((cur) => !cur)}
          className="correction-score-button cor-inactive-btn"
        >
          Correct Entries
        </button>
      )}
      <h1 style={{ padding: 5 }}>Scoreboard</h1>
      <table className="score-table">
        <tbody>
          <tr>
            {firstRow.map((row) => {
              return (
                <th style={{ overflow: "hidden" }} key={row}>
                  {row}
                </th>
              );
            })}
          </tr>

          {rows.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((el) => {
                  return (
                    <td
                      onClick={(e) => handleCorClick(e, el)}
                      style={corMode ? corModeStyles : {}}
                      key={el.id}
                      className={
                        corMode
                          ? el.right !== undefined
                            ? el.right
                              ? "right"
                              : "wrong"
                            : ""
                          : el.placement
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "stretch",
                        }}
                      >
                        {typeof el.stiche === "number" && (
                          <>
                            <p> {el.stiche}</p>
                            <span className="vertical-line"></span>
                          </>
                        )}
                        <p> {el.score}</p>
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {corItem && (
        <BasicMenu
          anchorEl={anchorEl}
          open={open}
          setAnchorEl={setAnchorEl}
          setOpen={setOpen}
          title={corItem?.name}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
              fontSize: "large",
              fontWeight: "bold",
            }}
          >
            <div className="player-stiche-box">
              <p>Round: </p>
              <p>{corItem?.round}</p>
            </div>
            <div className="player-stiche-box">
              <p>Stiche: </p>
              <input
                className="player-stiche"
                type="number"
                value={corItem?.stiche}
                onChange={(e) =>
                  setCorItem({ ...corItem, stiche: +e.currentTarget.value })
                }
              />
            </div>
            <div className="player-stiche-box">
              <p>Score: </p>
              <p>{corItem?.score}</p>
            </div>
            <div style={{ width: 200, margin: "auto" }}>
              <CheckButtons
                type="correction"
                setCorItem={setCorItem}
                corItem={corItem}
                toggle={toggle}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 5,
              marginTop: 5,
            }}
          >
            <button className="btn cancle-btn">cancle</button>
            <button
              className="btn save-btn"
              onClick={() => {
                dispatch(correctPlayer(corItem as CorObj));
                setUpdate((cur) => !cur);
                setAnchorEl(null);
                setOpen(false);
              }}
            >
              save
            </button>
          </div>
        </BasicMenu>
      )}
    </div>
  );
};

export default Scoreboard;
