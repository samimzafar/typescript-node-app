import React, { useState, useEffect } from "react";
import Layout from "../../layouts/MainLayout/MainLayout.index";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import FeaturedProducts from "../../components/FeaturedProducts";
import Breadcrumb from "../../components/Breadcrumb";
import { FiHeart } from "react-icons/fi";
import { getProductListingByIdReq } from "../../services/api";
import { IProductListing } from "./Home.contants";

function ViewProductListing() {
  const { productId } = useParams<{ productId?: string | undefined }>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [productLisiting, setProductListing] = useState<IProductListing>();
  const [selectedProductImg, setSelectedProductImg] = useState<string>("");
  const [productListingMedia, setProductListingMedia] = useState<
    { url: string }[] | []
  >([]);
  const [isLoadingCategories, setIsLoadingCategories] =
    useState<boolean>(false);
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
      } = await getProductListingByIdReq(productId);
      const productListing = res?.data?.productListing;
      setProductListing(productListing);
      setSelectedProductImg(productListing?.productListingMedia[0].url);
      setProductListingMedia(productListing?.productListingMedia);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setIsLoadingCategories(false);
  };

  useEffect(() => {
    getProductListing();
  }, []);

  return (
    <Layout>
      <Breadcrumb breadcrumbs={{ currentStep: "Product" }} />
      {isLoadingCategories ? (
        <Loading />
      ) : (
        <section className="product-details spad">
          <div className="container">
            {productLisiting?.status === "Published" ? (
              <div className="row">
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
                    <a href="#" className="primary-btn tg-primary-btn">
                      Chat with buyer
                    </a>
                    <a href="#" className="heart-icon">
                      <FiHeart />
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
      <section className="related-product">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title related__product__title">
                <h2>Related Product</h2>
              </div>
            </div>
          </div>
          <FeaturedProducts />
        </div>
      </section>
    </Layout>
  );
}

export default ViewProductListing;
