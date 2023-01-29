import { PayloadAction } from "@reduxjs/toolkit";
import React, { Dispatch, SyntheticEvent } from "react";
import { DispatchProp } from "react-redux";
import "./DropdownMenu.styles.scss";

export interface IDropProps {
  children?: React.ReactNode;
  func?: () => void;
}

const DropdownMenu: React.FC<IDropProps> = ({ children }) => {
  return (
    <>
      <div className="dropdown-menu">{children}</div>
    </>
  );
};

export default DropdownMenu;
