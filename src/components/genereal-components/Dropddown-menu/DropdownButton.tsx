import React from "react";
import "./DropdownButton.styles.scss";
import { IDropProps } from "./DropdownMenu";

const DropdownButton: React.FC<IDropProps> = ({ children }) => {
  return (
    <button
      className="dropdown-button"
      // style={{ backgroundColor: "red" }}
      onClick={(e) => {
        const dropOptions = e.currentTarget.nextElementSibling;
        dropOptions?.classList.toggle("active");
      }}
    >
      {children}
    </button>
  );
};

export default DropdownButton;
