import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AddProductFormInputs from "../../../components/AddProductFormInput";
import { IPostInquiry } from "../BuyerDashboard.constants";
import FloatLabelSelectDropDown from "../../../components/FloatLabelSelectDropDown";
import { customSelectStyles } from "../../../layouts/MainLayout/MainLayout.constants";
import { useSelector } from "react-redux";
import {
  getLogisticalOptionsReq,
  submitInquiryReq,
} from "../../../services/api";
import { useParams } from "react-router";
import { Row, Col, Spinner, Form } from "react-bootstrap";
import TextArea from "../../../components/TextArea";
import { countryList, DATE_FORMAT_DD_MMM_YYYY } from "../../../constants";
import DatePicker from "react-date-picker";
import moment from "moment";

interface IProps {
  toggleModal: () => void;
  setModalType: (modalType: string) => void;
  canInquire: boolean;
  companyId: number | null;
  unit: string;
}

interface IFormFields {
  quantity: string;
  variety: string;
  logisticalOptions: {
    label: string;
    value: string;
  };
  portOfLanding: {
    label: string;
    value: string;
  };
  weekOfDelivery: Date | string;
  additionalRequirements?: string;
}

interface IFormValues {
  quantity: string;
  variety: string;
  logisticalOptions: {
    label: string;
    value: string;
  };
  portOfLanding: {
    label: string;
    value: string;
  };
  weekOfDelivery: string | Date | any;
  additionalRequirements?: string;
}

const PostInquiryModal = ({
  toggleModal,
  unit,
  setModalType,
  canInquire,
  companyId,
}: IProps) => {
  const state: any = useSelector((state) => state);
  const { accessToken, userId } = state.auth;
  const { productId } = useParams<{ productId?: string | undefined }>();
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [logistics, setLogistics] = useState<string[] | []>([]);
  const [date, setDate] = useState<
    Date | [Date | null, Date | null] | null | undefined
  >(new Date());
  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
  } = useForm<IFormFields>();

  const countryOptions: any = countryList.map((country) => {
    return {
      label: country,
      value: country,
    };
  });

  const onChangeDate = (date: Date) => {
    setDate(date);
    setValue("weekOfDelivery", date.toLocaleDateString("en-US"));
    clearErrors("weekOfDelivery");
  };

  const logisticsOptions: any = logistics.map((log) => {
    return {
      label: log,
      value: log,
    };
  });

  const submitInquiry = async (body: IPostInquiry) => {
    setIsFormLoading(true);
    try {
      await submitInquiryReq(userId, accessToken, companyId, productId, body);
      setModalType("success");
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setIsFormLoading(false);
  };

  const getLogisticalOptions = async () => {
    setIsFormLoading(true);
    try {
      const res: { data: { logisticalOptions: string[] } } =
        await getLogisticalOptionsReq(userId, accessToken);
      setLogistics(res.data.logisticalOptions);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setIsFormLoading(false);
  };

  const onHandleSubmit = (values: IFormValues) => {
    const body = {
      quantity: values.quantity,
      variety: values.variety ? values.variety : null,
      logisticalOption: values.logisticalOptions.value,
      portOfLanding: values.portOfLanding.value,
      weekOfDelivery: moment(values.weekOfDelivery).format(
        DATE_FORMAT_DD_MMM_YYYY
      ),
      additionalRequirements: values.additionalRequirements,
    };

    submitInquiry(body);
  };

  const handleSelectChange = (
    e: any,
    type: "logisticalOptions" | "portOfLanding" | "weekOfDelivery"
  ) => {
    setValue(type, e);
    clearErrors(type);
  };

  const disableSubmit = () => {
    if (canInquire === false || companyId === null) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getLogisticalOptions();
    setValue("weekOfDelivery", new Date(Date.now() + 12096e5));
  }, []);

  return (
    <>
      <Col lg={6}>
        <AddProductFormInputs
          name={"quantity"}
          rules={{
            required: true,
            validate: (value: number) => value > 0,
          }}
          required={true}
          isdisabled={!canInquire}
          label={`Quantity needed in ${unit}(s)`}
          placeHolder={"Quantity Needed"}
          type={"number"}
          control={control}
          errors={errors}
          errorMessage={"Quantity should be  > 0"}
        />
      </Col>
      <Col lg={6}>
        <FloatLabelSelectDropDown
          name={"portOfLanding"}
          placeHolder={""}
          control={control}
          disabled={!canInquire}
          label={"Port of Landing"}
          required={true}
          rules={{ required: true }}
          options={countryOptions}
          customStyle={customSelectStyles}
          errorMessage={"Landing Port is required"}
          errors={errors}
          onChange={(e) => handleSelectChange(e, "portOfLanding")}
        />
      </Col>
      <Col lg={6}>
        <AddProductFormInputs
          name={"variety"}
          rules={{
            required: true,
            validate: (value: string) =>
              !(value.toString().trim().length === 0),
          }}
          label={"Variety"}
          required={true}
          isdisabled={!canInquire}
          placeHolder={"Variety"}
          type={"text"}
          control={control}
          errors={errors}
          errorMessage={"Variety is required"}
        />
      </Col>
      <Col lg={6}>
        <FloatLabelSelectDropDown
          name={"logisticalOptions"}
          placeHolder={""}
          control={control}
          disabled={!canInquire}
          label={"Mode of Delivery"}
          rules={{ required: true }}
          required={true}
          options={logisticsOptions}
          customStyle={customSelectStyles}
          errorMessage={"Mode of delivery is required"}
          errors={errors}
          onChange={(e) => handleSelectChange(e, "logisticalOptions")}
        />
      </Col>
      <Col lg={6}>
        {" "}
        <Controller
          name="weekOfDelivery"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <>
              <div className="tg-datepicker-wrapper">
                <label>
                  Preferred Day of Delivery
                  <span className="required-field">*</span>
                </label>
                <DatePicker
                  onChange={onChangeDate}
                  value={date}
                  minDate={new Date(Date.now() + 12096e5)}
                  clearIcon={null}
                />
              </div>
              <p className="validation-error-alert">
                {errors.weekOfDelivery && (
                  <Form.Text className="text-danger">
                    {"Phone Num is required"}
                  </Form.Text>
                )}
              </p>
            </>
          )}
        />
      </Col>
      <Col lg={12}>
        <TextArea
          name={"additionalRequirements"}
          rules={{}}
          label={""}
          isDisabled={!canInquire}
          placeHolder={
            "Preferred payment options, Traceable logistics, Packaging requirements, Any required certificates, Product specifications"
          }
          type={"text"}
          control={control}
          errors={errors}
          errorMessage={""}
        />
      </Col>
      <Col
        lg={12}
        className="d-flex flex-column justify-content-center align-items-end"
      >
        <button
          disabled={disableSubmit()}
          className="site-btn d-flex justify-content-center align-items-center"
          onClick={handleSubmit(onHandleSubmit)}
        >
          {isFormLoading && (
            <Spinner animation="border" size="sm" className="me-2" />
          )}{" "}
          Inquire Now
        </button>
      </Col>
    </>
  );
};

export default PostInquiryModal;
