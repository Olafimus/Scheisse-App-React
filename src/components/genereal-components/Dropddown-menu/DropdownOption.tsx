import React from "react";
import { IDropProps } from "./DropdownMenu";

const DropdownOption: React.FC<IDropProps> = ({
  children,
  func,

  val,
  stayOpen = false,
}) => {
  const clickHandler = (e: React.MouseEvent<HTMLOptionElement, MouseEvent>) => {
    if (func) func(val);
    if (!stayOpen) {
      const dropOptions = e.currentTarget.closest(".dropdown-options");
      dropOptions?.classList.remove("active");
    }
  };
  return <option onClick={clickHandler}>{children}</option>;
};

export default DropdownOption;
