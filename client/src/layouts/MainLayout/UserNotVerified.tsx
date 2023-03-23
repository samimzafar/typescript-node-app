import React, { useState } from "react";
import { resendOTPReq } from "../../services/api";
import { useDispatch } from "react-redux";
import { setLoading } from "./Main.actions";
import { ModalProps } from "react-bootstrap";
import ActionModal from "../../components/ActionModal";
import WarningSVG from "../../components/WarningSVG";

interface IOTPProps {
  userName: string;
  setModalType: (modalType: string) => void;
  setModalSize: (modalSize: ModalProps["size"]) => void;
  setModalBackdrop: (modalBackdrop: ModalProps["backdrop"]) => void;
}

const UserNotVerified = ({
  userName,
  setModalType,
  setModalSize,
  setModalBackdrop,
}: IOTPProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  const resendOTP = async () => {
    dispatch(setLoading(true));
    try {
      await resendOTPReq(userName);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const onHandleVerify = () => {
    setModalType("verification");
    setModalSize("lg");
    setModalBackdrop("static");
    resendOTP();
  };

  return (
    <ActionModal
      ActionElement={<WarningSVG />}
      body={"Please verify your account!"}
      buttonText={"Verify now"}
      buttonAction={onHandleVerify}
    />
  );
};

export default UserNotVerified;
