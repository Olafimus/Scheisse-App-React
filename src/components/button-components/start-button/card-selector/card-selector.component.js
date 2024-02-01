import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setAmountCards } from "../../../../features/game-parameters/gameParaSlice";
import "./card-selector.styles.scss";

export const cardCounts = [32, 52, 64];

const CardSelector = () => {
  const dispatch = useAppDispatch();
  const { amountCards } = useAppSelector((s) => s.gamePara);

  return (
    <div className="card-selector">
      {cardCounts.map((nr) => (
        <button
          onClick={() => dispatch(setAmountCards(nr))}
          className={`card-button ${amountCards === nr && "active"}`}
          id={`cards-${nr}`}
        >
          {nr}
        </button>
      ))}
    </div>
  );
};

export default CardSelector;
