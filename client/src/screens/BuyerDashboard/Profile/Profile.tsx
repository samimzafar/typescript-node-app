import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../../components/Breadcrumb";
import ErrorAlert from "../../../components/ErrorAlert";
import FloatLabelSelectDropDown from "../../../components/FloatLabelSelectDropDown";
import RegistrationFormInput from "../../../components/RegistrationFormInput";
import { customSelectStyles } from "../../../layouts/MainLayout/MainLayout.constants";
import Layout from "../../../layouts/MainLayout/MainLayout.index";
import CustomModal from "../../../components/Modal";
import UploadDocuments from "./UploadDocuments";
import {
  getCompanyInfoReq,
  completeProfileReq,
  getCompanyTypesReq,
} from "../../../services/api";
import Alert from "../../../components/Alert";
import {
  ICompanyInfoData,
  ICompanyPostData,
} from "../BuyerDashboard.constants";
import { ProfileSettingsFields } from "./Profile.constants";
import {
  COMPANY_TYPES,
  countryList,
  ROLES_CONSTANTS,
} from "../../../constants";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, isNull } from "lodash";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import CustomPhoneInput from "../../../components/CustomPhoneInput";
import ActionModal from "../../../components/ActionModal";
import SuccessSVG from "../../../components/SuccessSVG";
import { updateUserData } from "../BuyerDashboard.actions";

interface ICompanyType {
  id: number;
  name: string;
}

interface ICompanyDocuments {
  registrationCertificateUrl: string | null;
  businessCardUrl: string | null;
  portfolioUrl: string | null;
}

interface ISelectOptions {
  label: string;
  value: number;
}

interface IFormFields {
  name: string | undefined;
  phone: string;
  username: string | undefined;
  email: string | undefined;
  address: string | undefined;
  country:
    | {
        label: string;
        value: string;
      }
    | undefined;
  city: string | undefined;
  companyType:
    | {
        label: string;
        value: number;
      }
    | undefined;
  companyName: string | undefined;
  registrationNo: string | undefined;
}

const Profile = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
    watch,
  } = useForm<IFormFields>();

  const state: any = useSelector((state) => state);
  const { role, accessToken } = state.auth;
  const history = useHistory();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [flag, setFlag] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [companyDocuments, setCompanyDocuments] = useState<ICompanyDocuments>({
    registrationCertificateUrl: null,
    portfolioUrl: null,
    businessCardUrl: null,
  });
  const [buyerCompanyTypes, setBuyerCompanyTypes] = useState<
    ICompanyType[] | []
  >([]);
  const [sellerCompanyTypes, setSellerCompanyTypes] = useState<
    ICompanyType[] | []
  >([]);
  let { userId, companyId } = useParams<{
    userId?: string | undefined;
    companyId?: string | undefined;
  }>();
  const countryOptions: any = countryList.map((country) => {
    return {
      label: country,
      value: country,
    };
  });

  const handleSelectChange = (e: any, type: "companyType" | "country") => {
    setValue(type, e);
    clearErrors(type);
  };

  const getCompanyTypes = async () => {
    setIsFormLoading(true);
    try {
      const response: {
        data: {
          buyerTypes: ICompanyType[];
          sellerTypes: ICompanyType[];
        };
      } = await getCompanyTypesReq();
      const { buyerTypes, sellerTypes } = response.data;
      setBuyerCompanyTypes(buyerTypes);
      setSellerCompanyTypes(sellerTypes);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setIsFormLoading(false);
  };

  const buyerCompanyOptions: ISelectOptions[] = buyerCompanyTypes.map(
    (company) => {
      return {
        label: company.name,
        value: company.id,
      };
    }
  );

  const sellerCompanyOptions: ISelectOptions[] = sellerCompanyTypes.map(
    (company) => {
      return {
        label: company.name,
        value: company.id,
      };
    }
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onHandleSubmit = (values: IFormFields) => {
    let phoneNo;
    if (values.phone && values.phone.charAt(0) === "+") {
      phoneNo = values.phone;
    } else {
      phoneNo = values.phone ? `+${values.phone}` : null;
    }
    const body: ICompanyPostData = {
      name: values.name ? values.name : null,
      phoneNumber: phoneNo ? phoneNo : null,
      companyTypeId: values.companyType?.value
        ? values.companyType?.value
        : null,
      registrationNumber: values.registrationNo ? values.registrationNo : null,
      country: values.country?.value ? values.country.value : null,
      city: values.city ? values.city : null,
      companyName: values.companyName ? values.companyName : null,
      address: values.address ? values.address : null,
    };
    completeProfile(body);
  };

  const preSetFormValues = (res: ICompanyInfoData) => {
    setValue("username", res.user.username ? res.user.username : undefined);
    setValue("name", res.user.name ? res.user.name : undefined);
    setValue("email", res.user.email ? res?.user.email : undefined);
    setValue("phone", res?.user.phone_number ? res?.user.phone_number : "");
    setValue("address", res.company.address ? res.company.address : undefined);
    setValue("city", res?.user.city ? res?.user.city : undefined);
    setValue(
      "companyType",
      res?.company.companyType
        ? {
            label: res?.company.companyType?.name,
            value: res?.company.companyType?.id,
          }
        : undefined
    );
    setValue(
      "country",
      res?.user.country
        ? {
            label: res?.user.country,
            value: res?.user.country,
          }
        : undefined
    );
    setValue("companyName", res?.company.name ? res?.company.name : undefined);
    setValue(
      "registrationNo",
      res?.company.registration_number
        ? res?.company.registration_number
        : undefined
    );
  };

  const completeProfile = async (body: ICompanyPostData) => {
    setIsFormLoading(true);
    try {
      await completeProfileReq(userId, companyId, accessToken, body);
      const dispatchBody = {
        updatedCity: body.city,
        updatedAddress: body.address,
        updatedName: body.name,
        updatedCountry: body.country,
        updatedPhoneNumber: body.phoneNumber,
        updatedCompanyName: body.companyName,
      };
      dispatch(updateUserData(dispatchBody));
      getCompanyInfo();
      toggleModal();
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setIsFormLoading(false);
  };

  const getCompanyInfo = async () => {
    setIsFormLoading(true);
    try {
      const res: {
        data: ICompanyInfoData;
      } = await getCompanyInfoReq(userId, companyId, accessToken);
      setCompanyDocuments({
        registrationCertificateUrl:
          res.data.company.registration_certificate_url,
        portfolioUrl: res.data.company.portfolio_url,
        businessCardUrl: res.data.company.business_card_url,
      });
      preSetFormValues(res.data);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setIsFormLoading(false);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      setFlag(false);
      if (Object.values(value).some((x) => isNull(x) || isEmpty(x))) {
        setFlag(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onClickBacktoDashboard = () => {
    history.push(`/buyerDashboard`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCompanyInfo();
    getCompanyTypes();
  }, []);

  return (
    <>
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <Layout>
        <CustomModal
          title="Inquire"
          hide={toggleModal}
          show={modalVisible}
          size={"lg"}
          backdrop={"static"}
        >
          <ActionModal
            ActionElement={<SuccessSVG />}
            body={"Profile Updated Successfully"}
            buttonText={"Back to Dashboard"}
            buttonAction={onClickBacktoDashboard}
          />
        </CustomModal>
        <Breadcrumb breadcrumbs={{ currentStep: "Profile" }} />
        <Container className="tg-profile-container">
          <Alert
            className={`${flag ? "animate-alert" : "displynone"}`}
            alertType="warning"
            alertMsg="Complete your profile to access all features"
          />
          <Row>
            <Col lg={4} md={12} sm={12}>
              <h2>Account Details</h2>
            </Col>
            <Col lg={8} md={12} sm={12}>
              <Row>
                {ProfileSettingsFields.map((field, i) => {
                  return (
                    <Col key={i} lg={6} md={6} sm={12}>
                      <RegistrationFormInput
                        name={field.name}
                        required={field.required}
                        type={field.type}
                        placeHolder={field.placeHolder}
                        label={field.label}
                        isDisabled={field.disabled}
                        control={control}
                        rules={field.rules}
                        errors={errors}
                        errorMessage={field.errorMessage}
                      />
                    </Col>
                  );
                })}
                <Col lg={6} md={6} sm={12}>
                  <CustomPhoneInput
                    name={"phone"}
                    control={control}
                    rules={{
                      required: true,
                      validate: (val: string) => isValidPhoneNumber(val),
                    }}
                    label={"Phone Number"}
                    international={true}
                    defaultCountry={"PK"}
                    errorMessage={"Please enter valid phone number"}
                    errors={errors}
                    required={true}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <FloatLabelSelectDropDown
                    name={"country"}
                    placeHolder={""}
                    control={control}
                    required={true}
                    label={"Country"}
                    rules={{ required: true }}
                    menuPlacement={"top"}
                    options={countryOptions}
                    customStyle={customSelectStyles}
                    errorMessage={"Country is required"}
                    errors={errors}
                    onChange={(e) => handleSelectChange(e, "country")}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <RegistrationFormInput
                    name={"city"}
                    type={"text"}
                    placeHolder={"City"}
                    label={"City"}
                    control={control}
                    onInput={(e) => e.target.value.toString().trim()}
                    rules={{}}
                    errors={errors}
                    errorMessage={""}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={12} sm={12}>
              <h2>Company Details</h2>
            </Col>
            <Col lg={8} md={12} sm={12}>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <FloatLabelSelectDropDown
                    name={"companyType"}
                    placeHolder={""}
                    control={control}
                    label={"Company Type"}
                    menuPlacement={"top"}
                    rules={{
                      required: true,
                      validate: (value: ISelectOptions) =>
                        value.label !== COMPANY_TYPES.NotAssigned,
                    }}
                    required={true}
                    options={
                      role === ROLES_CONSTANTS.ROLE_BUYER
                        ? buyerCompanyOptions
                        : sellerCompanyOptions
                    }
                    customStyle={customSelectStyles}
                    errorMessage={"Company type is required"}
                    errors={errors}
                    onChange={(e) => handleSelectChange(e, "companyType")}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <RegistrationFormInput
                    name={"companyName"}
                    type={"text"}
                    placeHolder={"Company Name"}
                    label={"Company Name"}
                    control={control}
                    required={true}
                    onInput={(e) => e.target.value.toString().trim()}
                    rules={{ required: true }}
                    errors={errors}
                    errorMessage={"Company Name is required"}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <RegistrationFormInput
                    name={"registrationNo"}
                    type={"text"}
                    placeHolder={"Company Reg No."}
                    onInput={(e) => e.target.value.toString().trim()}
                    label={"Company Reg No."}
                    control={control}
                    rules={{}}
                    errors={errors}
                    errorMessage={""}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <RegistrationFormInput
                    name={"address"}
                    type={"text"}
                    required={true}
                    placeHolder={"Company address"}
                    onInput={(e) => e.target.value.toString().trim()}
                    label={"Company address"}
                    control={control}
                    rules={{ required: true }}
                    errors={errors}
                    errorMessage={"Address is required"}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <button
                className="signup-button"
                disabled={isFormLoading}
                onClick={handleSubmit(onHandleSubmit)}
                type="submit"
              >
                {isFormLoading && (
                  <Spinner animation="border" size="sm" className="me-3" />
                )}
                Save
              </button>
            </Col>
          </Row>
          <UploadDocuments
            setErrorMessage={setErrorMessage}
            getCompanyInfo={getCompanyInfo}
            companyDocuments={companyDocuments}
            setCompanyDocuments={setCompanyDocuments}
          />
        </Container>
      </Layout>
    </>
  );
};

export default Profile;
