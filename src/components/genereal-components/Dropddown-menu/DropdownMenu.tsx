import React from "react";
import "./DropdownMenu.styles.scss";

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
