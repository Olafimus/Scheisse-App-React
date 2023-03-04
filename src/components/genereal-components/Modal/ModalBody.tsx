import React from "react";
// import { handleClose } from "./modal-functions";
import "./ModalBody.styles.scss";

interface ModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;

  children?: React.ReactNode;
  keyClose?: boolean;
}

const ModalBody: React.FC<ModalProps> = (props) => {
  const { show, setShow } = props;

  const handleClose = () => {
    const modBod = document.querySelector(".modal-body");
    modBod?.setAttribute("aria-expanded", "true");
    const timer = setTimeout(() => {
      setShow(false);
    }, 250);
    return () => clearTimeout(timer);
  };

  return (
    <>
      {" "}
      {show && (
        <>
          <div
            className={"modal-body"}
            id="modal--body"
            tabIndex={0}
            aria-expanded={"false"}
            onKeyDown={(e) => {
              if (e.key === "Escape") setShow(false);
            }}
            onClick={handleClose}
          >
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              {props.children}
              {/* <div className="modal-header">
              Header
              <button onClick={() => setShow(false)}>X</button>
            </div>
            <div className="modal-content ">content </div>
            <div className="modal-footer">
              footer
              <button onClick={() => setShow(false)}>close</button>
            </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalBody;
