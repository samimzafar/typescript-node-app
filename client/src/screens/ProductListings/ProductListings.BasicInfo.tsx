import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addBasicInfo } from "./ProductListings.actions";
import { useHistory } from "react-router";
import AddProductFormInputs from "../../components/AddProductFormInput";
import {
  customStyles,
  BASIC_INFO_FIELD_DATA,
} from "./ProductListings.constants";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { ICategory, IProducts } from "./ProductListings.constants";
import _ from "lodash";
import SelectDropDown from "../../components/SelectDropDown";

interface IBasicInfoProps {
  categories: ICategory[];
  products: IProducts[];
  setVisibleForm: (visible: string) => void;
}

interface IProductType {
  label: string;
  value: number;
}

interface ICategorySelect {
  label: string;
  value: number;
}

interface IFormFields {
  name: string;
  keyFeatures: string;
  category: ICategorySelect;
  productType: IProductType;
}

interface IFormValues {
  name: string;
  keyFeatures: string;
  category: ICategorySelect;
  productType: IProductType;
}

const BasicInfo = ({
  categories,
  products,
  setVisibleForm,
}: IBasicInfoProps) => {
  const state: any = useSelector((state) => state);
  const { name, keyFeatures, category, productType } = state.product;
  const { companyId, userId } = state.auth;

  const [productTypeOptions, setProductTypeOptions] = useState<
    IProductType[] | []
  >([]);
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<IFormFields>();

  const dispatch = useDispatch();
  const history = useHistory();

  const categoryOptions = categories.map((category) => {
    return {
      label: category.name,
      value: category.id,
    };
  });

  const setProducts = (selectedValue: { label: string; value: number }) => {
    const filteredProducts = _.filter(
      products,
      (products) => products.fk_category_id === selectedValue.value
    );
    setProductTypeOptions(
      filteredProducts.map((product) => {
        return {
          label: product.name,
          value: product.id,
        };
      })
    );
  };

  const onHandleNext: any = (values: IFormValues) => {
    dispatch(addBasicInfo(values));
    setVisibleForm("description");
  };

  useEffect(() => {
    if (name && keyFeatures && category && productType) {
      setValue("name", name);
      setValue("keyFeatures", keyFeatures);
      setValue("category", category);
      setValue("productType", productType);
    }
  });

  return (
    <div>
      <div className="form-div">
        <h5 className="font-weight-bold">Basic Info</h5>
        <form>
          <SelectDropDown
            name={"category"}
            placeHolder={"Category"}
            control={control}
            label={"Category"}
            rules={{ required: true }}
            options={categoryOptions}
            customStyle={customStyles}
            errorMessage={"Category is required"}
            errors={errors}
            onBlur={(value) => setProducts(value)}
          />
          <SelectDropDown
            name={"productType"}
            placeHolder={"Product Type"}
            control={control}
            label={"Product Type"}
            rules={{ required: true }}
            options={productTypeOptions}
            customStyle={customStyles}
            errorMessage={"Product Type is required"}
            errors={errors}
          />
          {BASIC_INFO_FIELD_DATA.map((data, i) => {
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
          <div className="mt-2 d-flex justify-content-between">
            <button
              className="site-btn"
              onClick={() =>
                history.push(
                  `/users/${userId}/companies/${companyId}/productListings`
                )
              }
            >
              {" "}
              <AiOutlineArrowLeft className="me-1 mb-1" />
              Back
            </button>
            <button className="site-btn" onClick={handleSubmit(onHandleNext)}>
              Next
              <AiOutlineArrowRight className="ms-1 mb-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInfo;
