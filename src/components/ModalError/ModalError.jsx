import React from "react";
import Modal from "react-modal";
// import "./ModalError.scss";
import StyledModalError from "./StyledModalError";

const ModalError = ({ isErrorOpen, onErrorClose }) => {
  return (
    <Modal
      className="modal-error"
      isOpen={isErrorOpen}
      contentLabel="Example Modal"
      onRequestClose={onErrorClose}
    >
      <StyledModalError>
        <h1 className="modal-error__title">Error!</h1>
        <p className="modal-error__content">Cannot find path to the goal</p>
        <button
          onClick={onErrorClose}
          className="modal-error__close"
          type="button"
        >
          X
        </button>
      </StyledModalError>
    </Modal>
  );
};

export default ModalError;
