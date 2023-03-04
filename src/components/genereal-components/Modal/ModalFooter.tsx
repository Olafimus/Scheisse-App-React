import React from "react";

interface ModalFooterProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ setShow, children }) => {
  const handleClose = () => {
    const modBod = document.querySelector(".modal-body");
    modBod?.setAttribute("aria-expanded", "true");
    const timer = setTimeout(() => {
      setShow(false);
    }, 250);
    return () => clearTimeout(timer);
  };
  return (
    <div className="modal-footer">
      {children}
      <button className="close-button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default ModalFooter;
