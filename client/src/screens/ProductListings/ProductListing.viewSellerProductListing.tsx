import React, { useState, useEffect } from "react";
import Layout from "../../layouts/MainLayout/MainLayout.index";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Breadcrumb from "../../components/Breadcrumb";
import { getProductListingForSellerReq } from "../../services/api";
import ErrorAlert from "../../components/ErrorAlert";
import { IProductListing } from "../Home/Home.contants";
import Alert from "../../components/Alert";

function ViewSellerProductListing() {
  const state: any = useSelector((state) => state);
  const { auth } = state;
  const {
    userId,
    companyId,
    companyVerified,
    accessToken,
  }: {
    userId: number;
    companyId: number;
    companyVerified: boolean;
    accessToken: string;
  } = auth;
  const { productId } = useParams<{ productId?: string }>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(true);
  const [productLisiting, setProductListing] = useState<IProductListing>();
  const [selectedProductImg, setSelectedProductImg] = useState<string>("");
  const [productListingMedia, setProductListingMedia] = useState<
    { url: string }[] | []
  >([]);
  const [isLoadingCategories, setIsLoadingCategories] =
    useState<boolean>(false);
  const responsive = {
    0: {
      items: 3,
    },
    450: {
      items: 3,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  };
  const selectImage = (value: string) => {
    setSelectedProductImg(value);
  };
  const getProductListing = async () => {
    setIsLoadingCategories(true);
    try {
      const res: {
        data: {
          productListing: IProductListing;
        };
      } = await getProductListingForSellerReq(
        accessToken,
        userId,
        companyId,
        productId
      );
      const productListing = res?.data?.productListing;
      setProductListing(productListing);
      setSelectedProductImg(productListing?.productListingMedia[0].url);
      setProductListingMedia(productListing?.productListingMedia);
    } catch (err: any) {
      setErrorMessage(err.response.data);
      setIsError(false);
    }
    setIsLoadingCategories(false);
  };

  useEffect(() => {
    getProductListing();
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
            currentStep: "Product",
          }}
        />
        {isLoadingCategories ? (
          <Loading />
        ) : (
          <section className="product-details spad">
            <div className="container">
              {isError ? (
                <div className="row">
                  {productLisiting?.status === "Pending" && (
                    <Alert
                      alertType="warning"
                      alertMsg="This product is not published yet."
                      companyVerified={companyVerified}
                      companyVerifiedMsg="Verify your company to publish it."
                    />
                  )}
                  <div className="col-lg-6 col-md-6">
                    <div className="product__details__pic">
                      <div className="product__details__pic__item">
                        <img
                          className="product__details__pic__item--large"
                          src={selectedProductImg}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="product__details__text">
                      <h3>{productLisiting?.name}</h3>
                      <div className="product__details__rating">
                        <span className="color-black">
                          {productLisiting?.product?.name} /{" "}
                          {productLisiting?.product?.category?.name}
                        </span>
                      </div>
                      <div className="product__details__price">
                        {productLisiting?.sale_price ? (
                          <>
                            <s className="color-black me-1">
                              USD {productLisiting?.unit_price}
                            </s>
                            <span className="">
                              {" "}
                              USD {productLisiting?.sale_price}
                            </span>
                          </>
                        ) : (
                          <span className="color-black">
                            {" "}
                            USD {productLisiting?.unit_price}
                          </span>
                        )}
                      </div>
                      <p>{productLisiting?.key_features}</p>
                      <a
                        href="#"
                        className={
                          companyVerified
                            ? "primary-btn tg-primary-btn"
                            : "primary-btn tg-primary-btn disabled"
                        }
                      >
                        Go Live
                      </a>
                      <ul>
                        <li>
                          <b>Availability</b>{" "}
                          <span>{productLisiting?.availability}</span>
                        </li>
                        <li>
                          <b>Unit</b> <span>{productLisiting?.unit?.name}</span>
                        </li>
                        <li>
                          <b>Min Order Qty</b>{" "}
                          <span>{productLisiting?.min_order_qty}</span>
                        </li>
                        <li>
                          <b>Company</b>{" "}
                          <span>{productLisiting?.company?.name}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="product__details__tab">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#tabs-1"
                            role="tab"
                            aria-selected="true"
                          >
                            Description
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#tabs-2"
                            role="tab"
                            aria-selected="false"
                          >
                            Package Details
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#tabs-3"
                            role="tab"
                            aria-selected="false"
                          >
                            Shipping Details
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          className="tab-pane active"
                          id="tabs-1"
                          role="tabpanel"
                        >
                          <div className="product__details__tab__desc">
                            <p>{productLisiting?.description}</p>
                          </div>
                        </div>
                        <div className="tab-pane" id="tabs-2" role="tabpanel">
                          <div className="product__details__tab__desc">
                            <p>
                              <b>Pack size</b>{" "}
                              <span>{productLisiting?.pack_size}</span>
                            </p>
                            <p>
                              <b>Pack size unit</b>{" "}
                              <span>{productLisiting?.packSizeUnit?.name}</span>
                            </p>
                          </div>
                        </div>
                        <div className="tab-pane" id="tabs-3" role="tabpanel">
                          <div className="product__details__tab__desc">
                            <p>
                              <b>Ready to ship</b>{" "}
                              <span>{productLisiting?.ready_to_ship}</span>
                            </p>
                            <p>
                              <b>Lead time (in days)</b>{" "}
                              <span>{productLisiting?.lead_time}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <h2 className="text-center">Sorry product not available</h2>
              )}
            </div>
          </section>
        )}
      </Layout>
    </>
  );
}

export default ViewSellerProductListing;
