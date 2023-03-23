import React, { useState } from "react";
import RegistrationFormInput from "../components/RegistrationFormInput";
import { useForm } from "react-hook-form";
import { confirmPasswordReq } from "../services/api";
import { setLoading } from "../layouts/MainLayout/Main.actions";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../components/ErrorAlert";
import Loading from "../components/Loading";
import { useHistory } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import logoDark from "../assets/images/logoDark.png";
import Alert from "../components/Alert";
import { ERROR_TEXT_USER_DOESNOT_EXISTS } from "../constants";
import { home_url } from "../config";

interface IFormFields {
  code: string;
  password: string;
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

  const sendCode = async (body: { code: string; password: string }) => {
    dispatch(setLoading(true));
    try {
      let forgotPasswordEmail: any = localStorage.getItem(
        "forgotPasswordEmail"
      );
      await confirmPasswordReq({ email: forgotPasswordEmail, ...body });
      history.replace("login");
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
      code: values.code,
      password: values.password,
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
            <h3 className="modal-heading text-center">Set New Password</h3>
            <Alert
              alertType="warning"
              alertMsg="Please check your email for verification code to reset your password"
            />
            <RegistrationFormInput
              name="code"
              type="number"
              placeHolder="Enter Code"
              label="Verification Code*"
              control={control}
              rules={{
                required: true,
              }}
              errors={errors}
              errorMessage="Code must be 6 digits number"
            />
            <RegistrationFormInput
              name="password"
              type="password"
              placeHolder="Enter New Password"
              label="New Password*"
              control={control}
              rules={{
                required: true,
              }}
              errors={errors}
              errorMessage="New Password is required"
            />
            <div className="mt-3 mb-3 d-grid gap-2">
              <button
                className="signup-button"
                onClick={handleSubmit(onSubmit)}
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
