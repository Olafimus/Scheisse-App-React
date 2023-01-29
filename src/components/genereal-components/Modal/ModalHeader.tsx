import React from "react";

interface ModalHeader {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeader> = ({ setShow, children }) => {
  const handleClose = () => {
    const modBod = document.querySelector(".modal-body");
    modBod?.setAttribute("aria-expanded", "true");
    const timer = setTimeout(() => {
      setShow(false);
    }, 250);
    return () => clearTimeout(timer);
  };

  return (
    <div className="modal-header">
      <span className="modal-header-content">{children}</span>
      <button className="modal-header-button" onClick={handleClose}>
        &#10007;
      </button>
    </div>
  );
};

export default ModalHeader;
