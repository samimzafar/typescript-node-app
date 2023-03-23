import React, { useState } from "react";
import Layout from "../../layouts/MainLayout/MainLayout.index";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsRow from "../../components/ProductDetailsRow";
import { ImFloppyDisk } from "react-icons/im";
import { BsCloudUpload } from "react-icons/bs";
import ErrorAlert from "../../components/ErrorAlert";
import { setLoading, deleteProductData } from "./ProductListings.actions";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { addProductListingReq } from "../../services/api";
import Breadcrumb from "../../components/Breadcrumb";
import Loading from "../../components/Loading";
import { useHistory } from "react-router";

interface IBody {
  name: string;
  images: string[];
  category: number;
  productId: number;
  keyFeatures: string;
  description: string;
  unitId: number;
  minOrderQty: number;
  salePrice: number;
  unitPrice: number;
  packSize: number;
  packSizeUnitId: number;
  leadTime: number;
  readyToShip: string;
  availability: string;
  isDraft: boolean;
}

const SellerView = () => {
  const state: any = useSelector((state) => state);
  const { auth, product, isLoading } = state;
  const { userId, companyId, companyVerified, accessToken } = auth;
  const {
    name,
    keyFeatures,
    category,
    productType,
    description,
    packSizeUnit,
    images,
    unit,
    minOrderQuantity,
    unitPrice,
    salePrice,
    packSize,
    leadTimeinDays,
    readyToShip,
    availability,
  } = product;

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addProductListing = async (body: IBody) => {
    dispatch(setLoading(true));
    try {
      await addProductListingReq(accessToken, userId, companyId, body);
      dispatch(deleteProductData());
      history.push(`/users/${userId}/companies/${companyId}/productListings`);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const handleOnAddListing = (e: any) => {
    const draft: boolean = e.target.name === "saveAsDraft" ? true : false;
    const body = {
      name: name,
      images: images,
      category: category.value,
      productId: productType.value,
      keyFeatures: keyFeatures,
      description: description,
      unitId: unit.value,
      minOrderQty: minOrderQuantity,
      salePrice: salePrice,
      unitPrice: unitPrice,
      packSize: packSize,
      packSizeUnitId: packSizeUnit.value,
      leadTime: leadTimeinDays,
      readyToShip: readyToShip.value,
      availability: availability.value,
      isDraft: draft,
    };

    addProductListing(body);
  };

  const history = useHistory();
  return (
    <>
      {isLoading && <Loading />}
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <Layout>
        <Breadcrumb
          breadcrumbs={{
            steps: [
              {
                name: "Add Product",
                target: `/users/${userId}/companies/${companyId}/productListings/addnew`,
              },
            ],
            currentStep: "Review Listing",
          }}
        />
        <div className="mt-3 container mb-3">
          {availability ? (
            <>
              <div className="mt-2 form-div">
                <h5>Product Details</h5>
                <ProductDetailsRow keyName={"Name"} value={name} />
                <ProductDetailsRow
                  keyName={"Category"}
                  value={category.label}
                />
                <ProductDetailsRow
                  keyName={"Product Type"}
                  value={productType.label}
                />
                <ProductDetailsRow
                  keyName={"Key Features"}
                  value={keyFeatures}
                />
                <ProductDetailsRow
                  keyName={"Description"}
                  value={description}
                />
                <ProductDetailsRow keyName={"Unit"} value={unit.label} />
                <ProductDetailsRow
                  keyName={"Price"}
                  value={`USD ${unitPrice}/${unit.label}`}
                />
                <ProductDetailsRow
                  keyName={"Min Order Qty"}
                  value={minOrderQuantity}
                />
                <ProductDetailsRow
                  keyName={"Sale Price"}
                  value={salePrice ? `USD ${salePrice}` : "NA"}
                />
                <ProductDetailsRow
                  keyName={"Pack Size"}
                  value={`${packSize} ${packSizeUnit.label}`}
                />
                <ProductDetailsRow
                  keyName={"Lead Time in Days"}
                  value={leadTimeinDays}
                />
                <ProductDetailsRow
                  keyName={"Ready to Ship"}
                  value={readyToShip.label}
                />
                <ProductDetailsRow
                  keyName={"Available"}
                  value={availability.label}
                />
                <h5>Photos</h5>
                <div className="photo-container">
                  {images.map((image: string, key: number) => {
                    return (
                      <img key={key} className="product-photo" src={image} />
                    );
                  })}
                </div>
                <div className="mt-2 d-flex">
                  <button
                    className="form-button me-2"
                    onClick={() => history.goBack()}
                  >
                    <AiOutlineArrowLeft size={15} className="me-2" />
                    Back
                  </button>
                  <button
                    name="saveAsDraft"
                    className="form-button me-2"
                    onClick={handleOnAddListing}
                  >
                    <ImFloppyDisk size={15} className="me-2" /> Save
                  </button>
                  <button
                    className="form-button me-2"
                    name="goLive"
                    onClick={handleOnAddListing}
                    disabled={!companyVerified ? true : false}
                  >
                    <BsCloudUpload size={15} className="me-2" />
                    Go Live
                  </button>
                </div>
                <a className="mt-3 account-prompt">
                  Can't publish your listings? Click here to verify your
                  company!
                </a>
              </div>
            </>
          ) : (
            <div className="container" style={{ height: "100vh" }}>
              <div className="no-product text-center">
                <div>No Product Listing to Display</div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default SellerView;
