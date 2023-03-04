import React from "react";
import { useAppDispatch } from "../../app/hooks";
import BackButton from "../../components/button-components/back-button/BackButton";
import DropdownButton from "../../components/genereal-components/Dropddown-menu/DropdownButton";
import DropdownMenu from "../../components/genereal-components/Dropddown-menu/DropdownMenu";
import DropdownOption from "../../components/genereal-components/Dropddown-menu/DropdownOption";
import DropdownOptions from "../../components/genereal-components/Dropddown-menu/DropdownOptions";
import ModalBody from "../../components/genereal-components/Modal/ModalBody";
import ModalContent from "../../components/genereal-components/Modal/ModalContent";
import ModalFooter from "../../components/genereal-components/Modal/ModalFooter";
import ModalHeader from "../../components/genereal-components/Modal/ModalHeader";
import { setSortMode, sortPlayers } from "../../features/player/playerSlice";
import { sortByPlacement } from "../../features/player/state-variables";
import "./Settings.styles.scss";

const SettingsRoute = () => {
  const [show1, setShow1] = React.useState(false);
  const dispatch = useAppDispatch();

  const func1 = () => {
    dispatch(setSortMode(sortByPlacement));
    dispatch(sortPlayers());
  };

  return (
    <div>
      <button
        tabIndex={0}
        onClick={() => setShow1(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setShow1(false);
        }}
      >
        show Modal
      </button>
      <DropdownMenu>
        <DropdownButton>Sort</DropdownButton>
        <DropdownOptions>
          <DropdownOption func={func1}>Option1</DropdownOption>
          <DropdownOption>Option2</DropdownOption>
          <DropdownOption>Option3</DropdownOption>
        </DropdownOptions>
      </DropdownMenu>

      <BackButton />

      <ModalBody show={show1} setShow={setShow1}>
        <ModalHeader setShow={setShow1}>Header</ModalHeader>
        <ModalContent>Content</ModalContent>
        <ModalFooter setShow={setShow1}>Footer</ModalFooter>
      </ModalBody>
    </div>
  );
};

export default SettingsRoute;
