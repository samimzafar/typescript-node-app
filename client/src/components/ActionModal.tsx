import React from "react";

interface IProps {
  ActionElement: JSX.Element;
  body: string;
  buttonText: string;
  buttonAction: any;
}

const ActionModal = ({
  ActionElement,
  body,
  buttonText,
  buttonAction,
}: IProps) => {
  return (
    <div className="tg-modal-default-pd">
      {ActionElement}
      <h5 className="success-message">{body}</h5>
      <div className="mt-5 d-grid text-center d-flex justify-content-center">
        <button onClick={buttonAction} className="signup-button">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ActionModal;
