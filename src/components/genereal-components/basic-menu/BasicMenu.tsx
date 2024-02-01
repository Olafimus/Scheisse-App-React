import React, { useEffect, useState } from "react";

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  title?: string;
  setAnchorEl: (val: HTMLElement | null) => void;
  setOpen: (val: boolean) => void;
  children: React.ReactNode;
};

const BasicMenu = ({
  anchorEl,
  open,
  title,
  setOpen,
  setAnchorEl,
  children,
}: Props) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const rect = anchorEl?.getBoundingClientRect();
  useEffect(() => {
    if (rect) {
      setPosition({
        top: rect.bottom + window.scrollY - 20,
        left: rect.left + window.scrollX - 10,
      });
    }
  }, [anchorEl]);

  return (
    <>
      {open && (
        <div
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(69, 80, 91)",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "8px",
            zIndex: 1000,
            color: "white",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {title && <h2 style={{ padding: 5 }}>{title}</h2>}{" "}
            <button
              style={{
                // padding: 3,
                width: 25,
                height: 30,
                borderRadius: 8,
                fontWeight: "bold",
                backgroundColor: "slategrey",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => {
                setOpen(false);
                setAnchorEl(null);
              }}
            >
              X
            </button>
          </div>
          {children}
        </div>
      )}
    </>
  );
};

export default BasicMenu;
