import React from "react";
import { IDropProps } from "./DropdownMenu";

const DropdownOptions: React.FC<IDropProps> = ({ children }) => {
  return <div className="dropdown-options">{children}</div>;
};

export default DropdownOptions;
