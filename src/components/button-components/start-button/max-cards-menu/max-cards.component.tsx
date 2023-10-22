import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import "./max-cards.styles.scss";
import { setMaxACards } from "../../../../features/game-parameters/gameParaSlice";
function MaxCardsSelect() {
  const dispatch = useAppDispatch();
  const { amountCards, playerNumber } = useAppSelector((s) => s.gamePara);
  const [maxCards, setMaxCards] = useState<null | number>(null);
  const [defaultVal, setDefaultVal] = useState(16);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = +e.target.value;
    if (input > defaultVal) input = defaultVal;
    setMaxCards(input || null);
    dispatch(setMaxACards(input || null));
    // console.log(input);
  };

  useEffect(() => {
    const newDef = amountCards / playerNumber;
    setDefaultVal(newDef);
    if (maxCards && maxCards > newDef) {
      setMaxCards(null);
      dispatch(setMaxACards(null));
    }
  }, [amountCards, playerNumber]);

  return (
    <div className="max-cards-setup-container">
      <label className="max-cards-label">Max Cards: </label>
      <input
        className="max-cards-input"
        type="number"
        min={1}
        max={defaultVal}
        value={maxCards ? maxCards : Math.floor(defaultVal)}
        onChange={handleChange}
      />
    </div>
  );
}

export default MaxCardsSelect;
