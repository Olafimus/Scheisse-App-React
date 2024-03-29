import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  calcMaxStiche,
  endGame,
  increaseRoundNumber,
  lastRoundStats,
} from "../../../features/game-parameters/gameParaSlice";
import {
  lastRoundPlayers,
  nextGiver,
  resetRound,
  setAllAnswers,
  sortPlayers,
  sumScore,
  calcStatistics,
} from "../../../features/player/playerSlice";
import "./midgame-buttons.styles.scss";

const MidgameButtons = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const playerNumber = useAppSelector((state) => state.gamePara.playerNumber);
  const roundNumber = useAppSelector((state) => state.gamePara.roundNumber);
  const endRound = useAppSelector((state) => state.gamePara.endRound);
  const finished = useAppSelector((state) => state.gamePara.finished);
  const allChecked = useAppSelector((state) => state.player.allChecked);

  const nextRound = () => {
    if (!finished && allChecked) {
      dispatch(sumScore(playerNumber));
      dispatch(calcStatistics(playerNumber));
      dispatch(nextGiver());
      dispatch(sortPlayers());

      if (roundNumber !== endRound) {
        dispatch(increaseRoundNumber());
        dispatch(calcMaxStiche());
      }
      if (roundNumber === endRound) dispatch(endGame());
    } else if (finished) navigate("/ceremony");
  };

  const allRight = () => {
    const allRightBtns = document.querySelectorAll(".right-button");
    const allWrongBtns = document.querySelectorAll(".wrong-button");
    allRightBtns.forEach((btn) => {
      btn.classList.add("right");
    });
    allWrongBtns.forEach((btn) => {
      btn.classList.remove("wrong");
    });
    dispatch(setAllAnswers(true));
  };

  const lastRound = () => {
    if (!finished) {
      if (roundNumber > 1) {
        dispatch(lastRoundPlayers(true));
        dispatch(lastRoundStats());
        dispatch(calcMaxStiche());
      }
    }
  };

  const reset = () => {
    const allRightBtns = document.querySelectorAll(".right-button");
    const allWrongBtns = document.querySelectorAll(".wrong-button");

    allRightBtns.forEach((btn) => {
      btn.classList.remove("right");
    });
    allWrongBtns.forEach((btn) => {
      btn.classList.remove("wrong");
    });
    dispatch(resetRound());
  };

  const allWrong = () => {
    const allRightBtns = document.querySelectorAll(".right-button");
    const allWrongBtns = document.querySelectorAll(".wrong-button");

    allRightBtns.forEach((btn) => {
      btn.classList.remove("right");
    });
    allWrongBtns.forEach((btn) => {
      btn.classList.add("wrong");
    });
    dispatch(setAllAnswers(false));
  };

  return (
    <div>
      <div className="bottom hidden">
        {finished ? (
          <Link to={"/game/ceremony"}>
            <button className="ceremony-button">Go To Cerermony</button>
          </Link>
        ) : (
          <>
            <button className="bottom-button" id="end-game" onClick={lastRound}>
              Last Round
            </button>
            <button
              className="bottom-button allCheck-btn"
              id="all-wrong"
              onClick={allWrong}
            >
              all <span className="all-wrong-x">&#10007;</span>{" "}
            </button>
            <button className="bottom-button" id="reset" onClick={reset}>
              Reset
            </button>
            <button
              className="bottom-button allCheck-btn"
              id="all-right"
              onClick={allRight}
            >
              all <span className="all-right-check">&#10003;</span>{" "}
            </button>
            <button
              className="bottom-button"
              id="end-round"
              onClick={nextRound}
            >
              Next Round
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MidgameButtons;
