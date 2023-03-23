import React, { ReactNode } from "react";
import { Modal, ModalProps } from "react-bootstrap";

interface IProps extends ModalProps {
  show: boolean;
  hide: () => void;
  title: string;
  children: ReactNode;
}

function CustomModal(props: IProps) {
  return (
    <>
      {props.show && (
        <Modal
          scrollable
          show={props.show}
          onHide={props.hide}
          centered={true}
          backdrop={props.backdrop}
          size={props.size}
          keyboard={props.backdrop && props.backdrop === "static" && false}
          className="modal-wrapper"
          fullscreen={props.fullscreen ? props.fullscreen : "sm-down"}
        >
          <Modal.Body>{props.children}</Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default CustomModal;
