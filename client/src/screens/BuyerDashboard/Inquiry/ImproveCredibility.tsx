import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import FloatLabelSelectDropDown from "../../../components/FloatLabelSelectDropDown";
import { COMPANY_TYPES, ROLES_CONSTANTS } from "../../../constants";
import {
  getCompanyTypesReq,
  completeProfileReq,
  getCompaniesInfoReq,
} from "../../../services/api";
import { customSelectStyles } from "../../../layouts/MainLayout/MainLayout.constants";
import { ICompanyInfo } from "../BuyerDashboard.constants";
import RegistrationFormInput from "../../../components/RegistrationFormInput";
import { find } from "lodash";
import { isValidPhoneNumber } from "react-phone-number-input";
import CustomPhoneInput from "../../../components/CustomPhoneInput";
import ErrorAlert from "../../../components/ErrorAlert";

interface IProps {
  canInquire: boolean;
  setCanInquire: (status: boolean) => void;
  companyId: number | null;
  setCompanyId: (id: number) => void;
  companies: ICompanyInfo[] | [];
  setcompanyCardInfo: (info: ICompanyInfo) => void;
  setCompanies: (company: ICompanyInfo[] | []) => void;
}

interface ICompanyType {
  id: number;
  name: string;
}

interface ISelectOptions {
  label: string;
  value: number;
}

interface ICompanyOption {
  label: string;
  value: number;
  phone: string;
  companyType: ISelectOptions;
}

interface IFormFields {
  phone?: string;
  companyType: ISelectOptions;
  registrationNo?: string;
  companyName: ISelectOptions;
}

interface IFormValues {
  phone?: string;
  companyName: ISelectOptions;
  companyType: ISelectOptions;
  registrationNo?: string;
}

const ImproveCredibility = ({
  canInquire,
  setCanInquire,
  companyId,
  setCompanyId,
  setcompanyCardInfo,
}: IProps) => {
  const state: any = useSelector((state) => state);
  const { role, userId, accessToken } = state.auth;
  const dispatch = useDispatch();
  const pageLimitCompanies = 1;
  const pageNumber = 1;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<ICompanyInfo[] | []>([]);
  const [buyerCompanyTypes, setBuyerCompanyTypes] = useState<
    ICompanyType[] | []
  >([]);
  const [sellerCompanyTypes, setSellerCompanyTypes] = useState<
    ICompanyType[] | []
  >([]);

  const handleSelectChange = (e: any, type: "companyType" | "companyName") => {
    setValue(type, e);
    clearErrors(type);
    if (type === "companyName") {
      setCompanyId(e.value);
      setCanInquire(e.isProfileCompleted);
      setValue("companyType", e.companyType);
      clearErrors("companyType");
      setValue("phone", e.phone ? e.phone : undefined);
      clearErrors("phone");
      setValue(
        "registrationNo",
        e.registrationNumber ? e.registrationNumber : undefined
      );
      clearErrors("registrationNo");
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
  } = useForm<IFormFields>();

  const onHandleSubmit = (values: IFormValues) => {
    let phoneNo;
    if (values.phone && values.phone.charAt(0) === "+") {
      phoneNo = values.phone;
    } else {
      phoneNo = `+${values.phone}`;
    }
    const body = {
      phoneNumber: phoneNo,
      companyTypeId: values.companyType.value,
      registrationNumber: values.registrationNo ? values.registrationNo : null,
    };
    completeProfile(body);
  };

  const preSetVaues = (companyData: ICompanyInfo) => {
    setcompanyCardInfo(companyData);
    setValue("companyName", {
      label: companyData.name,
      value: companyData.id,
    });
    setCompanyId(companyData.id);
    setCanInquire(companyData.isProfileCompleted);
    setValue("companyType", {
      value: companyData.companyType.id,
      label: companyData.companyType.name,
    });
    clearErrors("companyType");
    setValue(
      "phone",
      companyData.user.phone_number ? companyData.user.phone_number : undefined
    );
    clearErrors("phone");
    setValue(
      "registrationNo",
      companyData.registration_number
        ? companyData.registration_number
        : undefined
    );
    clearErrors("registrationNo");
  };

  const getCompanies = async () => {
    setIsFormLoading(true);
    try {
      const res: {
        data: { companies: ICompanyInfo[] };
      } = await getCompaniesInfoReq(
        userId,
        accessToken,
        pageLimitCompanies,
        pageNumber,
        "all"
      );
      preSetVaues(res.data.companies[0]);
      setCompanies(res.data.companies);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setIsFormLoading(false);
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

  const completeProfile = async (body: {
    phoneNumber: string;
    companyTypeId: number;
    registrationNumber: string | null;
  }) => {
    setIsFormLoading(true);
    try {
      await completeProfileReq(userId, companyId, accessToken, body);
      await getCompanies();
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

  const companyOptions: ICompanyOption[] = companies.map((company) => {
    return {
      label: company.name,
      value: company.id,
      phone: company.user.phone_number,
      registrationNumber: company.registration_number,
      isProfileCompleted: company.isProfileCompleted,
      companyType: {
        label: company.companyType.name,
        value: company.companyType.id,
      },
    };
  });

  const sellerCompanyOptions: ISelectOptions[] = sellerCompanyTypes.map(
    (company) => {
      return {
        label: company.name,
        value: company.id,
      };
    }
  );

  useEffect(() => {
    getCompanyTypes();
    getCompanies();
  }, []);

  useEffect(() => {
    let companyOption: any = find(companies, { id: companyId });
    if (companyOption) {
      setCanInquire(companyOption.isProfileCompleted);
    }
  }, [completeProfile]);

  return (
    <>
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <Col lg={6}>
        <FloatLabelSelectDropDown
          name={"companyName"}
          placeHolder={""}
          control={control}
          label={"Company Name"}
          rules={{ required: true }}
          options={companyOptions}
          customStyle={customSelectStyles}
          errorMessage={"Company Name is required"}
          errors={errors}
          onChange={(e) => handleSelectChange(e, "companyName")}
        />
      </Col>
      {!canInquire && (
        <>
          <Col lg={6}>
            <FloatLabelSelectDropDown
              name={"companyType"}
              placeHolder={""}
              control={control}
              label={"Company Type"}
              rules={{
                required: true,
                validate: (value: ISelectOptions) =>
                  value.label !== COMPANY_TYPES.NotAssigned,
              }}
              options={
                role === ROLES_CONSTANTS.ROLE_BUYER
                  ? buyerCompanyOptions
                  : sellerCompanyOptions
              }
              disabled={canInquire}
              customStyle={customSelectStyles}
              errorMessage={"Company type is required"}
              errors={errors}
              onChange={(e) => handleSelectChange(e, "companyType")}
            />
          </Col>
          <Col lg={6}>
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
          <Col lg={6}>
            <RegistrationFormInput
              name={"registrationNo"}
              type={"text"}
              placeHolder={"Company Reg No."}
              isDisabled={canInquire}
              label={"Company Reg No"}
              control={control}
              rules={{}}
              errors={errors}
              errorMessage={""}
            />
          </Col>
          <Col
            lg={12}
            md={12}
            className="d-flex justify-content-end align-items-center"
          >
            <button
              className="site-btn d-flex justify-content-center align-items-center"
              disabled={canInquire}
              type="submit"
              onClick={handleSubmit(onHandleSubmit)}
            >
              {isFormLoading && (
                <Spinner animation="border" size="sm" className="me-2" />
              )}{" "}
              Update Info
            </button>
          </Col>
        </>
      )}
    </>
  );
};

export default ImproveCredibility;
