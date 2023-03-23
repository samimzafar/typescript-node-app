import React, { useState, useEffect } from "react";
import Layout from "../../layouts/MainLayout/MainLayout.index";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import {
  getCategoriesReq,
  getProductAvailabilityAndShipmentReq,
  getProductsReq,
  getUnitsReq,
} from "../../services/api";
import { setLoading } from "./ProductListings.actions";
import ErrorAlert from "../../components/ErrorAlert";
import { ICategory, IProducts, IUser } from "./ProductListings.constants";
import BasicInfo from "./ProductListings.BasicInfo";
import Description from "./ProductListings.Description";
import PriceAndPackaging from "./ProductListings.PriceAndPackaging";
import Breadcrumb from "../../components/Breadcrumb";

const AddProductListing = () => {
  const state: any = useSelector((state) => state);
  const { product, auth } = state;
  const { userId, companyId, accessToken } = auth;
  const {
    name,
    keyFeatures,
    category,
    productType,
    description,
    images,
    unit,
    unitPrice,
    readyToShip,
    packSize,
    leadTimeinDays,
    availability,
    minOrderQuantity,
  } = product;

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const [productShipment, setProductShipment] = useState<string[] | []>([]);
  const [productAvailability, setProductAvailability] = useState<string[] | []>(
    []
  );
  const [units, setUnits] = useState<IUser[] | []>([]);
  const [products, setProducts] = useState<IProducts[] | []>([]);
  const [visibleForm, setVisibleForm] = useState("basicInfo");

  const showForm = () => {
    if (visibleForm === "basicInfo") {
      return (
        <BasicInfo
          categories={categories}
          products={products}
          setVisibleForm={setVisibleForm}
        />
      );
    } else if (visibleForm === "description") {
      return <Description setVisibleForm={setVisibleForm} />;
    } else if (visibleForm === "priceAndPackaging") {
      return (
        <PriceAndPackaging
          productShipment={productShipment}
          productAvailability={productAvailability}
          units={units}
          setVisibleForm={setVisibleForm}
        />
      );
    }
  };

  const getCategories = async () => {
    dispatch(setLoading(true));
    try {
      const res: any = await getCategoriesReq();
      setCategories(res.data.categories);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const getunits = async () => {
    dispatch(setLoading(true));
    try {
      const res: any = await getUnitsReq();
      setUnits(res.data.units);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const getProductAvailabilityAndShipment = async () => {
    dispatch(setLoading(true));
    try {
      const res: {
        data: {
          availability: string[];
          readyToShip: string[];
        };
      } = await getProductAvailabilityAndShipmentReq(
        accessToken,
        userId,
        companyId
      );
      const { availability, readyToShip } = res.data;
      setProductAvailability(availability);
      setProductShipment(readyToShip);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const getProducts = async () => {
    dispatch(setLoading(true));
    try {
      const res: any = await getProductsReq();
      setProducts(res.data.products);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getCategories();
    getProductAvailabilityAndShipment();
    getProducts();
    getunits();
  }, []);

  return (
    <>
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <Layout>
        <Breadcrumb
          breadcrumbs={{
            steps: [
              {
                name: "Company",
                target: `/users/${userId}/companies/${companyId}/productListings`,
              },
            ],
            currentStep: "Add Product",
          }}
        />
        <div className="container checkout mb-3">
          <div className="d-flex justify-content-center mb-3">
            <p
              className={`${
                name && keyFeatures && category && productType && `form-heading`
              }`}
            >
              Basic Information
            </p>
            <hr className="horizontal-divider" />
            <p className={description && images && `form-heading`}>
              Description and Images
            </p>
            <hr className="horizontal-divider" />
            <p
              className={
                unit &&
                unitPrice &&
                readyToShip &&
                packSize &&
                leadTimeinDays &&
                availability &&
                minOrderQuantity &&
                `form-heading`
              }
            >
              Pricing and Packaging
            </p>
          </div>
          {showForm()}
        </div>
      </Layout>
    </>
  );
};
export default AddProductListing;
