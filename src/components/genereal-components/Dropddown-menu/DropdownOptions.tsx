import React from "react";
import { IDropProps } from "./DropdownMenu";

const DropdownOptions: React.FC<IDropProps> = ({ children, count = 2 }) => {
  const setMaxHeight = () => {
    const r: any = document.querySelector(":root");
    r.style.setProperty("--option-count", count);
  };
  setMaxHeight();

  return <div className="dropdown-options">{children}</div>;
};

export default DropdownOptions;
