import React, { useState } from "react";
import ReactCodeInput from "react-verification-code-input";
import { loginReq, resendOTPReq, verifyOTPReq } from "../../services/api";
import { useDispatch } from "react-redux";
import ErrorAlert from "../../components/ErrorAlert";
import { useTimer } from "react-timer-hook";
import { ModalProps } from "react-bootstrap";
import { setLoading, setUserData } from "../../layouts/MainLayout/Main.actions";
import {
  ERROR_TEXT_USER_DOESNOT_EXISTS,
  ROLES_CONSTANTS,
} from "../../constants";
import { useHistory } from "react-router";

interface IOTPProps {
  userName: string;
  setModalType: (modalType: string) => void;
  setModalSize: (modalSize: ModalProps["size"]) => void;
  setModalBackdrop: (modalBackdrop: ModalProps["backdrop"]) => void;
  passwordValue?: string | null;
  emailValue?: string | null;
}

interface IState {
  isAuthenticated: boolean;
  accessToken: string;
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  userName: string;
  companyId: number;
  companyName: string;
  companyType: string;
  companyVerified: boolean;
  roleId: number;
  role: string;
  country: string;
  city: string | null;
}

const OTPVerification = ({
  userName,
  setModalType,
  setModalSize,
  setModalBackdrop,
  passwordValue,
  emailValue,
}: IOTPProps) => {
  const [buttonState, setButtonState] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [otp, setOTP] = useState<string>("");
  const dispatch = useDispatch();
  let expiryTimestamp: any = new Date();
  expiryTimestamp = expiryTimestamp.setSeconds(
    expiryTimestamp.getSeconds() + 60
  );

  // Configuration Variables
  const history = useHistory();

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp,
  });

  const handleButtonState = (code: string) => {
    if (code.length === 6) {
      setButtonState(false);
      setOTP(code);
    } else {
      setButtonState(true);
    }
  };

  const handleRedirection = (role: any) => {
    if (role === ROLES_CONSTANTS.ROLE_BUYER) {
      history.push(`/buyerDashboard`);
    } else if (role === ROLES_CONSTANTS.ROLE_SELLER) {
      history.push(`/sellerDashboard`);
    } else if (role === ROLES_CONSTANTS.ROLE_ADMIN) {
      history.push(`/admin`);
    }
  };

  const login = async () => {
    dispatch(setLoading(true));
    try {
      const res: any = await loginReq({
        username: emailValue,
        password: passwordValue,
      });
      const payload: IState = {
        accessToken: res.data.accessToken,
        userId: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
        phoneNumber: res.data.user.phone_number,
        userName: res.data.user.username,
        country: res.data.user.country,
        isAuthenticated: true,
        companyId: res.data.user.userCompanies[0].id,
        companyName: res.data.user.userCompanies[0].name,
        companyType: res.data.user.userCompanies[0].companyType.name,
        companyVerified: res.data.user.userCompanies[0].verified,
        roleId: res.data.user.userRoles[0].role.id,
        role: res.data.user.userRoles[0].role.name,
        city: res.data.user.city,
      };
      dispatch(setUserData(payload));
      handleRedirection(res.data.user.userRoles[0].role.name);
    } catch (err: any) {
      setErrorMessage(
        err.response.data === ERROR_TEXT_USER_DOESNOT_EXISTS
          ? "User doesn’t exist. Try again or sign up now!"
          : err.response.data
      );
    }
    dispatch(setLoading(false));
  };

  const resendOTP = async () => {
    dispatch(setLoading(true));
    try {
      await resendOTPReq(userName);
      restart(expiryTimestamp);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const verifyOTP = async (body: object) => {
    dispatch(setLoading(true));
    try {
      await verifyOTPReq(body);
      setModalType("success");
      setModalSize("lg");
      setModalBackdrop(true);
      await login();
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const handleResend = () => {
    resendOTP();
  };

  const handleVerify = () => {
    const body = {
      code: otp,
      username: userName,
    };
    verifyOTP(body);
  };

  return (
    <div className="tg-modal-default-pd">
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <h3 className="modal-heading text-center">Verify!</h3>
      <p className="text-center">Enter the 6 digit code sent to your email</p>
      <div className="d-flex justify-content-center align-items-center tg-verification-div">
        <ReactCodeInput onChange={handleButtonState} autoFocus={true} />
      </div>
      <div className="mt-2 d-flex flex-wrap justify-content-center align-items-center">
        Didn't get the code?&nbsp;
        {!isRunning ? (
          <a className="account-prompt" onClick={handleResend}>
            Resend code
          </a>
        ) : (
          <>
            <span className="timer-prompt">
              <span className="d-md-flex d-none">Resend code in &nbsp;</span>
              {minutes.toString().length === 1
                ? "0" + minutes.toString()
                : minutes}
              :
              {seconds.toString().length === 1
                ? "0" + seconds.toString()
                : seconds}{" "}
            </span>
          </>
        )}
      </div>
      <div className="mt-4 d-grid gap-2 d-flex justify-content-center align-items-center">
        <button
          disabled={buttonState}
          onClick={handleVerify}
          className="signup-button"
        >
          Verify Acccount
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
