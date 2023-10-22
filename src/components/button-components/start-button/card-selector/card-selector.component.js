import { useEffect } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { setAmountCards } from "../../../../features/game-parameters/gameParaSlice";
import "./card-selector.styles.scss";

const CardSelector = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const cardsBtn = document.querySelectorAll(".card-button");
    const cardButtonBox = document.querySelector(".card-selector");

    cardButtonBox?.addEventListener("click", function (e) {
      if (e.target.classList.contains("card-button")) {
        cardsBtn.forEach((btn) => btn.classList.remove("active"));
        e.target.classList.add("active");
      }
      const id = e.target.getAttribute("id");
      if (id === "cards-32") dispatch(setAmountCards(32));
      else if (id === "cards-52") dispatch(setAmountCards(52));
      else if (id === "cards-64") dispatch(setAmountCards(64));
      // calcEndRoundF();
    });
  }, []);

  return (
    <div className="card-selector">
      <button className="card-button active" id="cards-32">
        32
      </button>
      <button className="card-button" id="cards-52">
        52
      </button>
      <button className="card-button" id="cards-64">
        64
      </button>
      {/* <button onClick={() => console.log(cards)}>test</button> */}
    </div>
  );
};

export default CardSelector;
