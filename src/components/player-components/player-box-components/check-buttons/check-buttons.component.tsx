import "./check-buttons.styles.scss";
import * as React from "react";
import { Iplayer } from "../../../../features/player/playerInterface";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setRight, setWrong } from "../../../../features/player/playerSlice";

interface props {
  player: Iplayer;
}

const CheckButtons: React.FC<props> = ({ player }) => {
  const dispatch = useAppDispatch();
  const rightButton = React.useRef<HTMLButtonElement>(null);
  const wrongButton = React.useRef<HTMLButtonElement>(null);
  const checked = useAppSelector((state) => state.player.allChecked);

  React.useEffect(() => {
    if (!checked) {
      wrongButton.current?.classList.remove("wrong");
      rightButton.current?.classList.remove("right");
    }
  }, [checked]);

  const rightBtnClick = () => {
    console.log(rightButton.current);
    wrongButton.current?.classList.remove("wrong");
    rightButton.current?.classList.add("right");
    dispatch(setRight(player));
  };
  const wrongBtnClick = () => {
    console.log(rightButton.current);
    wrongButton.current?.classList.add("wrong");
    rightButton.current?.classList.remove("right");
    dispatch(setWrong(player));
  };

  return (
    <div className="radio-buttons">
      <div>
        <p>Richtig?</p>
      </div>
      <div className="checkbos-button-container">
        <button
          onClick={rightBtnClick}
          className="checkbox-button right-button"
          id="right-button"
          ref={rightButton}
        >
          &#10003;
        </button>
        <button
          className="checkbox-button wrong-button"
          id="wrong-button"
          ref={wrongButton}
          onClick={wrongBtnClick}
        >
          &#10007;
        </button>
      </div>
    </div>
  );
};

export default CheckButtons;
