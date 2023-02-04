import React from "react";
import { IDropProps } from "./DropdownMenu";

const DropdownOption: React.FC<IDropProps> = ({ children, func }) => {
  const clickHandler = () => {
    if (func) func();
    const dropOptions = document.querySelector(".dropdown-options");
    dropOptions?.classList.toggle("active");
  };
  return <option onClick={clickHandler}>{children}</option>;
};

export default DropdownOption;
