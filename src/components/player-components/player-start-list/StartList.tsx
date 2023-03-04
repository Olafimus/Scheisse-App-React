import React from "react";
import "./startList.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deletePlayer,
  movePlayerDown,
  movePlayerUp,
} from "../../../features/player/playerSlice";

const StartList = () => {
  const { players } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  const buttonBox = (i: number) => {
    if (i === 0) {
      return (
        <button
          className="down-arrow"
          onClick={() => dispatch(movePlayerDown(i))}
        >
          <svg
            fill="#000000"
            height="15px"
            width="15px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 330 330"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                id="XMLID_225_"
                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
              ></path>{" "}
            </g>
          </svg>
        </button>
      );
    } else if (i === players.length - 1) {
      return (
        <button className="up-arrow" onClick={() => dispatch(movePlayerUp(i))}>
          <svg
            fill="#000000"
            height="15px"
            width="15px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 330 330"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                id="XMLID_224_"
                d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
              ></path>{" "}
            </g>
          </svg>
        </button>
      );
    } else {
      return (
        <>
          <button
            className="down-arrow"
            onClick={() => dispatch(movePlayerDown(i))}
          >
            <svg
              fill="#000000"
              height="15px"
              width="15px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 330 330"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  id="XMLID_225_"
                  d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <button
            className="up-arrow"
            onClick={() => dispatch(movePlayerUp(i))}
          >
            <svg
              fill="#000000"
              height="15px"
              width="15px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 330 330"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  id="XMLID_224_"
                  d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </>
      );
    }
  };

  return (
    <div className="player-start-list">
      {players.map((pl, i) => (
        <div key={pl.playerId} className="player-start-box">
          <p>{pl.name}</p>
          <div className="start-list-button-container">{buttonBox(i)}</div>
          <button onClick={() => dispatch(deletePlayer(i))}>X</button>
        </div>
      ))}
    </div>
  );
};

export default StartList;
