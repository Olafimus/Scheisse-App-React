import BackButton from "../../components/button-components/back-button/BackButton";
import Scoreboard from "../../components/scoreboard/scoreboard.component";
import "./scoreboard.route.styles.scss";

const ScoreboardRoute = () => {
  return (
    <div className="scoreboard-container">
      <BackButton />
      <Scoreboard />
    </div>
  );
};

export default ScoreboardRoute;
