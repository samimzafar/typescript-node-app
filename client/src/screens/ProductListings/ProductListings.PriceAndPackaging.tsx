import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import AddProductFormInputs from "../../components/AddProductFormInput";
import {
  customStyles,
  IUser,
  PRICING_AND_PACKAGING_FIELD_DATA,
  selectDropDownOptions,
} from "./ProductListings.constants";
import { addPricingAndPackaging } from "./ProductListings.actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SelectDropDown from "../../components/SelectDropDown";

interface IProps {
  setVisibleForm: (visible: string) => void;
  units: IUser[] | [];
  productShipment: string[] | [];
  productAvailability: string[] | [];
}

interface IFormFields {
  minOrderQuantity: number;
  unit: {
    label: string;
    value: number;
  };
  packSizeUnit: {
    label: string;
    value: number;
  };
  unitPrice: number;
  salePrice?: number;
  productShipment: {
    label: string;
    value: string;
  };
  packSize: number;
  leadTime: number;
  availablility: {
    label: string;
    value: string;
  };
}

interface IFormValues {
  minOrderQuantity: number;
  unit: {
    label: string;
    value: number;
  };
  packSizeUnit: {
    label: string;
    value: number;
  };
  unitPrice: number;
  salePrice?: number;
  productShipment: {
    label: string;
    value: string;
  };
  packSize: number;
  leadTime: number;
  availablility: {
    label: string;
    value: string;
  };
}

const PriceAndPackaging = ({
  setVisibleForm,
  units,
  productShipment,
  productAvailability,
}: IProps) => {
  const state: any = useSelector((state) => state);
  const { userId, companyId } = state.auth;
  const { product } = state;
  const {
    unit,
    unitPrice,
    salePrice,
    readyToShip,
    packSize,
    packSizeUnit,
    leadTimeinDays,
    availability,
    minOrderQuantity,
  } = product;

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IFormFields>();

  const dispatch = useDispatch();
  const history = useHistory();

  const unitsOption = units.map((unit) => {
    return { label: unit.name, value: unit.id };
  });

  const shipmentOptions = productShipment.map((product) => {
    return {
      label: product,
      value: product,
    };
  });

  const availabilityOptions = productAvailability.map((product) => {
    return {
      label: product,
      value: product,
    };
  });

  const onHandleSubmit: any = (values: IFormValues) => {
    const payLoad = {
      unit: values.unit,
      packSizeUnit: values.packSizeUnit,
      minOrderQuantity: values.minOrderQuantity,
      unitPrice: values.unitPrice,
      salePrice: values.salePrice ? values.salePrice : null,
      packSize: values.packSize,
      leadTimeinDays: values.leadTime,
      readyToShip: values.productShipment,
      availability: values.availablility,
    };

    dispatch(addPricingAndPackaging(payLoad));
    history.push(
      `/users/${userId}/companies/${companyId}/productListings/view`
    );
  };

  useEffect(() => {
    if (
      unit &&
      unitPrice &&
      readyToShip &&
      packSize &&
      leadTimeinDays &&
      availability &&
      minOrderQuantity
    ) {
      setValue("unit", unit);
      setValue("unitPrice", unitPrice);
      setValue("productShipment", readyToShip);
      setValue("packSize", packSize);
      setValue("packSizeUnit", packSizeUnit);
      setValue("leadTime", leadTimeinDays);
      setValue("minOrderQuantity", minOrderQuantity);
      setValue("availablility", availability);
    }
    if (salePrice) {
      setValue("salePrice", salePrice);
    }
  }, []);

  return (
    <div className="form-div mb-3">
      <h5 className="font-weight-bold">Pricing and Packaging</h5>
      <form>
        <SelectDropDown
          name={"unit"}
          placeHolder={"Unit"}
          control={control}
          label={"Unit"}
          rules={{ required: true }}
          options={unitsOption}
          customStyle={customStyles}
          errorMessage={"Unit is required"}
          errors={errors}
        />
        {PRICING_AND_PACKAGING_FIELD_DATA.map((data, i) => {
          return (
            <AddProductFormInputs
              key={i}
              name={data.name}
              type={data.type}
              placeHolder={data.placeHolder}
              label={data.label}
              control={control}
              rules={data.rules}
              errors={errors}
              errorMessage={data.errorMessage}
            />
          );
        })}
        {selectDropDownOptions(
          unitsOption,
          shipmentOptions,
          availabilityOptions
        ).map((option) => {
          return (
            <SelectDropDown
              name={option.name}
              placeHolder={option.placeHolder}
              control={control}
              label={option.label}
              rules={option.rules}
              options={option.options}
              customStyle={customStyles}
              errorMessage={option.errorMessage}
              errors={errors}
            />
          );
        })}
        <div className="mt-2 d-flex justify-content-between">
          <button
            className="site-btn"
            onClick={() => setVisibleForm("description")}
          >
            {" "}
            <AiOutlineArrowLeft className="me-1 mb-1" />
            Back
          </button>
          <button className="site-btn" onClick={handleSubmit(onHandleSubmit)}>
            Confirm
            <AiOutlineArrowRight className="ms-1 mb-1" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PriceAndPackaging;
