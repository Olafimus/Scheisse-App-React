import React from "react";

interface IListItem {
  children?: React.ReactNode;
  name: string;
  val: string | number;
}

const StatisticListItem: React.FC<IListItem> = ({ children, name, val }) => {
  return (
    <>
      <li className={""}>
        <p className="list-name">{name}</p>
        <p className="list-value">{val}</p>
      </li>
      {children}
    </>
  );
};

export default StatisticListItem;
