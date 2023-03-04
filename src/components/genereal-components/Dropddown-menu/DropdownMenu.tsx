import { PayloadAction } from "@reduxjs/toolkit";
import React, { Dispatch, SyntheticEvent } from "react";
import { DispatchProp } from "react-redux";
import "./DropdownMenu.styles.scss";

enum Position {
  center = "center",
  left = "left",
  right = "right",
}
export interface IDropProps {
  children?: React.ReactNode;
  position?: "center" | "left" | "right";
  count?: number;
  stayOpen?: boolean;
  val?: { name: string; id: string };
  func?: (val?: { name: string; id: string }) => void;
}

const DropdownMenu: React.FC<IDropProps> = ({ children }) => {
  return (
    <>
      <div className="dropdown-menu">{children}</div>
    </>
  );
};

export default DropdownMenu;
