import { useAppDispatch } from "../../../app/hooks";
import { setAllAnswers } from "../../../features/player/playerSlice";
import "./midgame-buttons.styles.scss";

const MidgameButtons = () => {
  const dispatch = useAppDispatch();

  const allRight = () => {
    const allRightBtns = document.querySelectorAll(".right-button");
    const allWrongBtns = document.querySelectorAll(".wrong-button");
    console.log(allRightBtns, allWrongBtns);
    allRightBtns.forEach((btn) => {
      btn.classList.add("right");
    });
    allWrongBtns.forEach((btn) => {
      btn.classList.remove("wrong");
    });
    dispatch(setAllAnswers(true));
  };

  const allWrong = () => {
    const allRightBtns = document.querySelectorAll(".right-button");
    const allWrongBtns = document.querySelectorAll(".wrong-button");
    console.log(allRightBtns, allWrongBtns);
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
        <button className="bottom-button" id="end-game">
          Last Round
        </button>
        <button
          className="bottom-button allCheck-btn"
          id="all-wrong"
          onClick={allWrong}
        >
          all <span className="all-wrong-x">&#10007;</span>{" "}
        </button>
        <button className="bottom-button" id="reset">
          Reset
        </button>
        <button
          className="bottom-button allCheck-btn"
          id="all-right"
          onClick={allRight}
        >
          all <span className="all-right-check">&#10003;</span>{" "}
        </button>
        <button className="bottom-button" id="end-round">
          Next Round
        </button>
      </div>
    </div>
  );
};

export default MidgameButtons;
