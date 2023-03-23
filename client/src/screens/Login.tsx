import React, { useState, useEffect } from "react";
import RegistrationFormInput from "../components/RegistrationFormInput";
import { ERROR_TEXT_USER_DOESNOT_EXISTS, ROLES_CONSTANTS } from "../constants";
import { LoginFieldConstants } from "../layouts/MainLayout/MainLayout.constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginReq } from "../services/api";
import { setLoading, setUserData } from "../layouts/MainLayout/Main.actions";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../components/ErrorAlert";
import Loading from "../components/Loading";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Col, ModalProps, Row } from "react-bootstrap";
import logoDark from "../assets/images/logoDark.png";
import CustomModal from "../components/Modal";
import VerificationSuccess from "../layouts/MainLayout/VerificationSuccess.Modal";
import OTPVerification from "../layouts/MainLayout/OTPVerification.Modal";
import UserNotVerified from "../layouts/MainLayout/UserNotVerified";
import { home_url } from "../config";

interface IFormFields {
  email: string;
  password: string;
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
  address: string | null;
}

const Login = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormFields>();

  const state: any = useSelector((state) => state);
  const isLoading = state.isLoading;
  const { isAuthenticated, role } = state.auth;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const [userName, setUsername] = useState<string>("");
  const [modalSize, setModalSize] = useState<ModalProps["size"]>(undefined);
  const [modalBackdrop, setModalBackdrop] = useState<ModalProps["backdrop"]>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordValue, setPasswordValue] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState<string | null>(null);
  const history = useHistory();
  const { search } = useLocation();
  const product = new URLSearchParams(search).get("product");
  const handleRedirection = (role: any) => {
    let params: string;
    if (role === ROLES_CONSTANTS.ROLE_BUYER) {
      params = "/buyerDashboard";
      if (product) {
        params = `/products/${product}`;
      }
      history.push(`${params}`);
    } else if (role === ROLES_CONSTANTS.ROLE_SELLER) {
      params = "/sellerDashboard";
      if (product) {
        params = `/products/${product}`;
      }
      history.push(`${params}`);
    } else if (role === ROLES_CONSTANTS.ROLE_ADMIN) {
      history.push(`/admin`);
    }
  };

  const login = async (body: object) => {
    dispatch(setLoading(true));
    try {
      const res: any = await loginReq(body);
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
        address: res.data.user.userCompanies[0].address,
      };
      dispatch(setUserData(payload));
      handleRedirection(res.data.user.userRoles[0].role.name);
    } catch (err: any) {
      if (err.response.data.msg === "User is not confirmed.") {
        setUsername(err.response.data.data.username);
        setModalType("notVerified");
        setModalSize("lg");
        setModalBackdrop(true);
        toggleModal();
      } else {
        setErrorMessage(
          err.response.data === ERROR_TEXT_USER_DOESNOT_EXISTS
            ? "User doesn’t exist. Try again or sign up now!"
            : err.response.data
        );
      }
    }
    dispatch(setLoading(false));
  };

  const handleLogin: any = (values: IFormFields) => {
    setEmailValue(values.email);
    setPasswordValue(values.password);
    const body = {
      username: values.email,
      password: values.password,
    };
    login(body);
  };

  const toggleModal = (): void => {
    setModalVisible(!modalVisible);
  };

  const showModal = (): JSX.Element | undefined => {
    if (modalType === "success") {
      return (
        <VerificationSuccess
          setModalType={setModalType}
          setModalSize={setModalSize}
          setModalBackdrop={setModalBackdrop}
          toggleModal={toggleModal}
        />
      );
    } else if (modalType === "verification") {
      return (
        <OTPVerification
          userName={userName}
          setModalType={setModalType}
          setModalSize={setModalSize}
          setModalBackdrop={setModalBackdrop}
          passwordValue={passwordValue}
          emailValue={emailValue}
        />
      );
    } else if (modalType === "notVerified") {
      return (
        <UserNotVerified
          userName={userName}
          setModalType={setModalType}
          setModalSize={setModalSize}
          setModalBackdrop={setModalBackdrop}
        />
      );
    }
  };

  const onForgotPasswordClick = () => {
    history.replace(`forgotPassword`);
  };

  const onHandleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit(handleLogin)();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleRedirection(role);
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <CustomModal
        title="SignUp"
        hide={toggleModal}
        show={modalVisible}
        size={modalSize}
        backdrop={modalBackdrop}
      >
        {showModal()}
      </CustomModal>
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
            <h3 className="modal-heading text-center">Login to Your Account</h3>
            {LoginFieldConstants.map((field, i) => {
              return (
                <RegistrationFormInput
                  key={i}
                  keyPressed={onHandleKeyPress}
                  name={field.name}
                  type={field.type}
                  placeHolder={field.placeHolder}
                  label={field.label}
                  control={control}
                  required={field.required}
                  onInput={field.onInput}
                  rules={field.rules}
                  errors={errors}
                  errorMessage={field.errorMessage}
                />
              );
            })}
            <div className="d-flex justify-content-end align-items-center">
              <a className="login-link-hover" onClick={onForgotPasswordClick}>
                Forgot password?
              </a>
            </div>
            <div className="mt-3 mb-3 d-grid gap-2">
              <button
                className="signup-button"
                onClick={handleSubmit(handleLogin)}
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
