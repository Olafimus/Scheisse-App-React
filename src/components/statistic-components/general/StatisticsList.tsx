import React, { useRef, useState } from "react";

interface IList {
  children?: React.ReactNode;
  head: string;
}

const StatisticsList: React.FC<IList> = ({ children, head }) => {
  const [active, setActive] = useState(false);
  const statsBox = useRef<HTMLUListElement>(null);

  const toggleStats = () => {
    if (!statsBox.current) return;
    if (!active) {
      const scrollHeight = statsBox.current.scrollHeight;
      statsBox.current.style.maxHeight = `${scrollHeight}px`;
    } else {
      statsBox.current.style.maxHeight = `0px`;
    }

    setActive(!active);
  };

  return (
    <span className="general-statistics-list">
      <h3 onClick={toggleStats}>{head}</h3>
      <ul className="stats-info-box" ref={statsBox}>
        {children}
      </ul>
    </span>
  );
};

export default StatisticsList;
