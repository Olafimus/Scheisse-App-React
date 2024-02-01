import "./check-buttons.styles.scss";
import * as React from "react";
import { Iplayer } from "../../../../features/player/playerInterface";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setRight, setWrong } from "../../../../features/player/playerSlice";
import { RowObject } from "../../../scoreboard/scoreboard.component";

interface CorrectionProps {
  type: "correction";
  setCorItem: (val: RowObject) => void;
  corItem: RowObject;
  toggle: boolean;
}
interface StandardProps {
  type: "standard";
  player: Iplayer;
  toggle?: boolean;
}

type props = StandardProps | CorrectionProps;

const CheckButtons: React.FC<props> = (props) => {
  const { type } = props;
  const player = type === "standard" ? props.player : undefined;
  const dispatch = useAppDispatch();
  const rightButton = React.useRef<HTMLButtonElement>(null);
  const wrongButton = React.useRef<HTMLButtonElement>(null);
  const checked = useAppSelector((state) => state.player.allChecked);

  React.useEffect(() => {
    if (!checked && player) {
      wrongButton.current?.classList.remove("wrong");
      rightButton.current?.classList.remove("right");
    }
    if (props.type === "correction") {
      wrongButton.current?.classList.remove("wrong");
      rightButton.current?.classList.remove("right");
      props.corItem?.right
        ? rightButton.current?.classList.add("right")
        : wrongButton.current?.classList.add("wrong");
    }
  }, [checked, props.toggle]);

  const rightBtnClick = () => {
    wrongButton.current?.classList.remove("wrong");
    rightButton.current?.classList.add("right");
    if (player) dispatch(setRight(player));
    if (type === "correction") {
      props.setCorItem({ ...props.corItem, right: true });
    }
  };
  const wrongBtnClick = () => {
    wrongButton.current?.classList.add("wrong");
    rightButton.current?.classList.remove("right");
    if (player) dispatch(setWrong(player));
    if (type === "correction") {
      props.setCorItem({ ...props.corItem, right: false });
    }
  };

  return (
    <div className="radio-buttons">
      {type === "standard" && (
        <div>
          <p>Richtig?</p>
        </div>
      )}
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
