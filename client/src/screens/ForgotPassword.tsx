import React, { useState, useEffect } from "react";
import RegistrationFormInput from "../components/RegistrationFormInput";
import { EMAIL_PATTERN, ERROR_TEXT_USER_DOESNOT_EXISTS } from "../constants";
import { useForm } from "react-hook-form";
import { forgotPasswordReq } from "../services/api";
import { setLoading, setUserData } from "../layouts/MainLayout/Main.actions";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../components/ErrorAlert";
import Loading from "../components/Loading";
import { useHistory } from "react-router-dom";
import { Col, ModalProps, Row } from "react-bootstrap";
import logoDark from "../assets/images/logoDark.png";
import { home_url } from "../config";

interface IFormFields {
  email: string;
}

const ForgotPassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormFields>();

  const state: any = useSelector((state) => state);
  const isLoading = state.isLoading;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const history = useHistory();

  const sendCode = async (body: { email: string }) => {
    dispatch(setLoading(true));
    try {
      await forgotPasswordReq(body);
      localStorage.setItem("forgotPasswordEmail", body.email);
      history.replace("confirmPassword");
    } catch (err: any) {
      setErrorMessage(
        err.response.data === ERROR_TEXT_USER_DOESNOT_EXISTS
          ? "User doesn’t exist. Try again or sign up now!"
          : err.response.data
      );
    }
    dispatch(setLoading(false));
  };

  const onSubmit = (values: IFormFields) => {
    const body = {
      email: values.email,
    };
    sendCode(body);
  };

  return (
    <>
      {isLoading && <Loading />}
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <Row className="m-0">
        <Col
          lg={{ span: 6 }}
          md={{ span: 12 }}
          sm={{ span: 12 }}
          className="tg-signin-col-l"
        >
          <div className="tg-signin-overlay"></div>
          <h3 className="modal-heading text-center">New Here?</h3>
          <p>
            Sign up in a minute and explore a great deal of food and
            agricultural products at <b>Tazah Global</b>
          </p>
          <button
            className="signup-button"
            onClick={() => history.push(`/signup`)}
          >
            Sign Up
          </button>
        </Col>
        <Col
          lg={{ span: 6 }}
          md={{ span: 12 }}
          sm={{ span: 12 }}
          className="tg-signin-screen-col-r d-flex align-items-center"
        >
          <div className="w-100">
            <div className="text-center">
              <a href={home_url}>
                <img className="logo-img" src={logoDark} alt="" />
              </a>
            </div>
            <h3 className="modal-heading text-center">Recover Your Account</h3>
            <RegistrationFormInput
              name="email"
              type="text"
              placeHolder="Enter Email"
              label="Email*"
              control={control}
              rules={{
                required: true,
                pattern: EMAIL_PATTERN,
              }}
              errors={errors}
              errorMessage="Email is required"
            />
            <div className="mt-3 mb-3 d-grid gap-2">
              <button
                className="signup-button"
                onClick={handleSubmit(onSubmit)}
                type="submit"
              >
                Send Code
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
