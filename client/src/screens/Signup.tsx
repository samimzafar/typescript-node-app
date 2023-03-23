import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegistrationFormInput from "../components/RegistrationFormInput";
import { useForm } from "react-hook-form";
import VerificationSuccess from "../layouts/MainLayout/VerificationSuccess.Modal";
import OTPVerification from "../layouts/MainLayout/OTPVerification.Modal";
import CustomModal from "../components/Modal";
import logoLight from "../assets/images/logoLight.png";
import Loading from "../components/Loading";
import { countryList, ROLES_CONSTANTS, EMAIL_PATTERN } from "../constants";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  Label,
  customSelectStyles,
} from "../layouts/MainLayout/MainLayout.constants";
import { components } from "react-select";
import { Col, ModalProps, Row } from "react-bootstrap";
import ErrorAlert from "../components/ErrorAlert";
import { setLoading } from "../layouts/MainLayout/Main.actions";
import { signUpReq, getRolesReq } from "../services/api";
import { useHistory } from "react-router";
import FloatLabelSelectDropDown from "../components/FloatLabelSelectDropDown";
import { AxiosResponse } from "axios";
import { includes } from "lodash";
import { home_url } from "../config";
import CustomPhoneInput from "../components/CustomPhoneInput";
import { isValidPhoneNumber } from "react-phone-number-input";

interface ISelectOptions {
  label: string;
  value: number;
}

interface ISignupResponseUser {
  archived: boolean;
  archivedBy: null;
  aws_user_id: string;
  city: string | null;
  country: string;
  createdAt: number;
  email: string;
  id: number;
  name: string;
  phone_number: string;
  updatedAt: number;
  username: string;
}

interface ISignupResponseCompany {
  createdAt: number;
  fk_company_type_id: number;
  fk_user_id: number;
  id: number;
  name: string;
  supplied_products: string;
  updatedAt: number;
  verified: boolean;
}

interface ISignupResponseAWS {
  CodeDeliveryDetails: {
    AttributeName: string;
    DeliveryMedium: string;
    Destination: string;
  };
  UserConfirmed: boolean;
  UserSub: string;
}

interface IFormFields {
  email: string;
  country: {
    label: string;
    value: string;
  };
  userName: string;
  password: string;
  companyName: string;
  role: ISelectOptions;
  phone: string;
}

interface IRole {
  id: number;
  name: string;
}

interface IFormValues {
  email: string;
  password: string;
  userName: string;
  phone?: string;
  role: ISelectOptions;
  country: {
    label: string;
    value: string;
  };
  companyName: string;
}
interface ICustomResData extends AxiosResponse<object> {
  awsResponse: ISignupResponseAWS;
  company: ISignupResponseCompany;
  user: ISignupResponseUser;
}
export const Control = (props: any) => {
  return (
    <>
      <Label
        isFloating={props.isFocused || props.hasValue}
        className="d-flex justify-content-center align-items-center"
      >
        {props.selectProps["aria-label"]}
      </Label>
      <components.Control {...props} />
    </>
  );
};

const SignUp = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
  } = useForm<IFormFields>();

  const state: any = useSelector((state) => state);
  const isLoading = state.isLoading;

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const [userName, setUsername] = useState<string>("");
  const [modalSize, setModalSize] = useState<ModalProps["size"]>(undefined);
  const [modalBackdrop, setModalBackdrop] = useState<ModalProps["backdrop"]>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<IRole[] | []>([]);
  const [role, setRole] = useState<{
    name: string | null;
    value: number | null;
  }>({
    name: null,
    value: null,
  });
  const [passwordValue, setPasswordValue] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState<string | null>(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const countryOptions: any = countryList.map((country) => {
    return {
      label: country,
      value: country,
    };
  });

  const signUp = async (body: object) => {
    dispatch(setLoading(true));

    try {
      const res: AxiosResponse<any> = await signUpReq(body);
      const { data }: { data: ICustomResData } = res;
      setUsername(data.user.username);
      setModalType("verification");
      setModalSize("lg");
      setModalBackdrop("static");
      toggleModal();
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const handleSelectChange = (e: any, type: "role" | "country") => {
    setValue(type, e);
    clearErrors(type);
    type === "role" &&
      setRole({
        name: e.label,
        value: e.value,
      });
  };

  const getRoles = async () => {
    dispatch(setLoading(true));
    try {
      const response: {
        data: {
          roles: IRole[];
        };
      } = await getRolesReq();
      setUserRoles(response.data.roles);
      response.data.roles.map((role: IRole) => {
        if (role.name === ROLES_CONSTANTS.ROLE_BUYER)
          handleSelectChange(
            {
              label: role.name,
              value: role.id,
            },
            "role"
          );
        return true;
      });
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };
  const userTypeOptions: any = userRoles.map((role) => {
    return {
      label: role.name,
      value: role.id,
    };
  });

  const toggleModal = (): void => {
    setModalVisible(!modalVisible);
  };

  const handleSignup: any = (values: IFormValues) => {
    setPasswordValue(values.password);
    setEmailValue(values.email);
    const body = {
      email: values.email,
      password: values.password,
      roleId: values.role.value,
      phoneNumber: values.phone ? values.phone : null,
      companyName: values.companyName.toString().trim(),
      country: values.country.label,
    };
    signUp(body);
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
    }
  };

  useEffect(() => {
    clearErrors();
    if (role.name === ROLES_CONSTANTS.ROLE_SELLER) {
      setValue("country", {
        label: "Pakistan",
        value: "Pakistan",
      });
    }
  }, [role.name]);

  useEffect(() => {
    getRoles();
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
          className="tg-signUp-col-l"
        >
          <div className="tg-signUp-overlay"></div>
          <div className="logo-z-index">
            <a href={home_url}>
              <img src={logoLight} alt="Tazah Global" />
            </a>
          </div>
          <h3 className="modal-heading">Why Tazah Global?</h3>
          <ul>
            <li>
              <AiOutlineCheckCircle /> Better Prices
            </li>
            <li>
              <AiOutlineCheckCircle /> Network of Trusted Suppliers
            </li>
            <li>
              <AiOutlineCheckCircle /> Certified Quality Assurances
            </li>
            <li>
              <AiOutlineCheckCircle /> Logistics and Easy Payments
            </li>
          </ul>
        </Col>
        <Col
          lg={{ span: 6 }}
          md={{ span: 12 }}
          sm={{ span: 12 }}
          className="tg-signup-screen-col-r d-flex align-items-center"
        >
          <div className="w-100">
            <div className="tg-modal-signup">
              <h3 className="modal-heading text-center">
                Sign Up to{" "}
                {role.name === ROLES_CONSTANTS.ROLE_BUYER
                  ? "Start Sourcing From Pakistan"
                  : "Explore Newer Export Geographies"}
              </h3>
              <form>
                <Row>
                  <Col lg={6} md={12} sm={12}>
                    <Row>
                      <Col>
                        <FloatLabelSelectDropDown
                          name={"role"}
                          placeHolder={""}
                          control={control}
                          label={"Sign up as"}
                          required={true}
                          rules={{ required: true }}
                          options={userTypeOptions}
                          customStyle={customSelectStyles}
                          errorMessage={"Role is required"}
                          errors={errors}
                          onChange={(e) => handleSelectChange(e, "role")}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <RegistrationFormInput
                          name={"email"}
                          type={"text"}
                          placeHolder={"Email"}
                          label={"Email"}
                          required={true}
                          control={control}
                          rules={{
                            required: true,
                            pattern: EMAIL_PATTERN,
                          }}
                          onInput={(e) => e.target.value.toString().trim()}
                          errors={errors}
                          errorMessage={"Email is required"}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <RegistrationFormInput
                          name={"password"}
                          type={"password"}
                          placeHolder={"Password"}
                          required={true}
                          label={"Password"}
                          control={control}
                          rules={{
                            required: true,
                            validate: (value: string) => value.length >= 6,
                          }}
                          onInput={(e) => e.target.value.toString().trim()}
                          errors={errors}
                          errorMessage={
                            "Password should have alteast 6 characters"
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <FloatLabelSelectDropDown
                          name={"country"}
                          placeHolder={""}
                          control={control}
                          label={"Country"}
                          required={true}
                          disabled={
                            includes([ROLES_CONSTANTS.ROLE_SELLER], role.name)
                              ? true
                              : false
                          }
                          rules={{ required: true }}
                          options={countryOptions}
                          customStyle={customSelectStyles}
                          errorMessage={"Country is required"}
                          errors={errors}
                          onChange={(e) => handleSelectChange(e, "country")}
                        />
                      </Col>
                    </Row>
                    {role.name === ROLES_CONSTANTS.ROLE_SELLER && (
                      <Row>
                        <Col>
                          <CustomPhoneInput
                            name={"phone"}
                            control={control}
                            rules={{
                              required: true,
                              validate: (val: string) =>
                                isValidPhoneNumber(val),
                            }}
                            label={"Phone Number"}
                            defaultCountry={"PK"}
                            errorMessage={"Please enter valid phone number"}
                            errors={errors}
                            countries={["PK"]}
                            required={true}
                          />
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col>
                        <RegistrationFormInput
                          name={"companyName"}
                          type={"text"}
                          placeHolder={"Company Name"}
                          label={"Company Name"}
                          control={control}
                          required={true}
                          rules={{
                            required: true,
                            validate: (value: string) =>
                              !(value.toString().trim().length === 0),
                          }}
                          errors={errors}
                          errorMessage={"Company name is required"}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <div className="tg-modal-signup-screen-footer mt-2 mb-2 gap-2">
                    <button
                      className="signup-button"
                      onClick={handleSubmit(handleSignup)}
                      type="submit"
                    >
                      Sign Up
                    </button>
                    <div>
                      Already a member?&nbsp;
                      <a className="" onClick={() => history.push(`/login`)}>
                        Login here!
                      </a>
                    </div>
                  </div>
                  <span className="tg-signup-footer-line-mbl">
                    By creating an account, you agree to Tazah Global’s&nbsp;
                    <a className="footer-anchor">Terms of Service</a> and{" "}
                    <a className="footer-anchor">Privacy Policy</a>.
                  </span>
                </Row>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SignUp;
