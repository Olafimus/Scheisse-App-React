import React from "react";
import { IDropProps } from "./DropdownMenu";

const DropdownOption: React.FC<IDropProps> = ({ children, func }) => {
  return <option onClick={func}>{children}</option>;
};

export default DropdownOption;
