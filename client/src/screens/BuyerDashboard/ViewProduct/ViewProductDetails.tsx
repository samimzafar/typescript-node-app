import React, { useState, useEffect } from "react";
import Layout from "../../../layouts/MainLayout/MainLayout.index";
import { useParams, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "../../../components/Breadcrumb";
import {
  getCompaniesInfoReq,
  getProductDetailsReq,
} from "../../../services/api";
import ActionModal from "../../../components/ActionModal";
import WarningSVG from "../../../components/WarningSVG";
import { ICompanyInfo, IProductListing } from "../BuyerDashboard.constants";
import { productDetailsSlider } from "./ViewProduct.constants";
import ErrorAlert from "../../../components/ErrorAlert";
import CustomModal from "../../../components/Modal";
import { setLoading } from "../BuyerDashboard.actions";
import CustomStatusBadge from "../../../components/CustomStatusBadge";
import {
  Col,
  Container,
  ModalProps,
  Placeholder,
  Row,
  Table,
} from "react-bootstrap";
import CustomCarousel from "../../../components/CustomCarousel";
import ProductDetailsPlaceHolder from "./ProductDetailsPlaceHolder";
import SuccessSVG from "../../../components/SuccessSVG";
import SubmitInquiry from "../Inquiry/SubmitInquiryModal";

function ViewProductDetails() {
  const state: any = useSelector((state) => state);
  const { accessToken, userId, companyType, phoneNumber, isAuthenticated } =
    state.auth;
  const isLoading = state.isLoading;
  const [unit, setUnit] = useState<string>("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId?: string | undefined }>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [productLisiting, setProductListing] = useState<IProductListing>();
  const [modalType, setModalType] = useState<string>("");
  const [canInquire, setCanInquire] = useState<boolean>(false);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [modalSize, setModalSize] = useState<ModalProps["size"]>(undefined);
  const [companies, setCompanies] = useState<ICompanyInfo[] | []>([]);
  const [selectedProductImg, setSelectedProductImg] = useState<string>("");
  const [notAuthenticatedVisible, setNotAuthenticatedVisible] =
    useState<boolean>(false);
  const [productListingMedia, setProductListingMedia] = useState<
    { url: string }[] | []
  >([]);
  const pageLimitCompanies = 1;
  const pageNumber = 1;

  const selectImage = (value: string) => {
    setSelectedProductImg(value);
  };
  const getProductListing = async () => {
    dispatch(setLoading(true));
    try {
      const res: {
        data: {
          productListing: IProductListing;
        };
      } = await getProductDetailsReq(userId, accessToken, productId);
      const { productListing } = res.data;
      setUnit(res.data.productListing.unit.name);
      setProductListing(productListing);
      setSelectedProductImg(productListing?.productListingMedia[0].url);
      setProductListingMedia(productListing?.productListingMedia);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    dispatch(setLoading(false));
  };

  const toggleNotAuthenticatedModal = () => {
    setNotAuthenticatedVisible(!notAuthenticatedVisible);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onClickBacktoDashboard = () => {
    history.push(`/buyerDashboard`);
  };

  const onHandleInquire = () => {
    setModalSize("lg");
    setModalType("inquiry");
    toggleModal();
  };

  const getCompanies = async () => {
    setLoading(true);
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
      setCompanies(res.data.companies);
      setCanInquire(res.data.companies[0].isProfileCompleted);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
    setLoading(false);
  };

  const showModal = (): JSX.Element | undefined => {
    if (modalType === "inquiry") {
      return (
        <SubmitInquiry
          setCanInquire={setCanInquire}
          toggleModal={toggleModal}
          canInquire={canInquire}
          companyId={companyId}
          setCompanyId={setCompanyId}
          unit={unit}
          companies={companies}
          setCompanies={setCompanies}
          productListing={productLisiting}
          setModalType={setModalType}
        />
      );
    } else if (modalType === "success") {
      return (
        <ActionModal
          ActionElement={<SuccessSVG />}
          body={"Inquiry Submitted SuccessFully"}
          buttonText={"Back to Dashboard"}
          buttonAction={onClickBacktoDashboard}
        />
      );
    }
  };

  const onLogin = () => {
    dispatch(setLoading(false));
    history.push(`/login?product=${productId}`);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getProductListing();
      getCompanies();
    } else {
      setNotAuthenticatedVisible(true);
      dispatch(setLoading(true));
    }
  }, []);

  return (
    <>
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <Layout>
        <CustomModal
          title="Not Authenticated"
          hide={toggleNotAuthenticatedModal}
          show={notAuthenticatedVisible}
          size={"lg"}
          backdrop={"static"}
        >
          <ActionModal
            ActionElement={<WarningSVG />}
            body={"Please login to view product details!"}
            buttonText={"Login"}
            buttonAction={onLogin}
          />
        </CustomModal>

        <CustomModal
          title="Inquire"
          hide={toggleModal}
          show={modalVisible}
          size={"xl"}
        >
          {showModal()}
        </CustomModal>
        <Breadcrumb
          breadcrumbs={{
            currentStep: productLisiting ? productLisiting?.name : "Product",
          }}
        />

        {isLoading ? (
          <ProductDetailsPlaceHolder />
        ) : (
          <section>
            {productLisiting?.status === "Published" ? (
              <Container className="tg-product-details position-relative">
                <Row>
                  <Col lg={6} className="tg-product-details-left-col">
                    <div className="tg-product-details-media-div">
                      <img className="" src={selectedProductImg} alt="" />
                    </div>
                    {productListingMedia.length > 0 && (
                      <CustomCarousel
                        responsive={productDetailsSlider}
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        arrows={true}
                        infinite={false}
                        shouldResetAutoplay={false}
                        autoPlay={false}
                        className="tg-product-view-gallery"
                      >
                        {productListingMedia.map((media, index) => {
                          return (
                            <div
                              key={index}
                              className="d-flex justify-content-start align-items-start gallery-div"
                              style={{ backgroundImage: `url(${media.url})` }}
                              onClick={() => selectImage(media.url)}
                            >
                              <span className="span-count">{`${index + 1}/${
                                productListingMedia.length
                              }`}</span>
                            </div>
                          );
                        })}
                      </CustomCarousel>
                    )}
                  </Col>
                  <Col lg={6} className="tg-product-details-right-col">
                    <div className="main-div d-flex flex-column justify-content-start align-items-start">
                      <div className="inner-div">
                        <span className="span-info">
                          {productLisiting?.product?.name} /{" "}
                          {productLisiting?.product?.category?.name}
                        </span>
                      </div>
                      <div className="inner-div">
                        <h2 className="title">
                          {productLisiting?.name} -{" "}
                          {productLisiting?.company?.user?.country}
                        </h2>
                      </div>
                      <div className="inner-div">
                        <p className="price-p">
                          USD <b>{productLisiting?.unit_price} ~</b>
                          <span> per {productLisiting?.unit.name}</span>
                        </p>
                      </div>
                      <div className="inner-div inner-details mb-0">
                        <span>
                          <b>Available Variations:</b>{" "}
                          <p>
                            {productLisiting?.key_features
                              ? productLisiting?.key_features
                              : "N/A"}
                          </p>
                        </span>
                        <Table responsive borderless className="inner-table">
                          <tbody>
                            <tr>
                              <td>
                                <b>Min Order Qty</b>
                              </td>
                              <td>
                                <CustomStatusBadge
                                  status={`${productLisiting?.min_order_qty} ${productLisiting?.unit.name}(s)`}
                                  badgeClass="gray"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>Availability</b>
                              </td>
                              <td>
                                <CustomStatusBadge
                                  status={
                                    productLisiting?.availability
                                      ? productLisiting?.availability
                                      : "N/A"
                                  }
                                  badgeClass={
                                    productLisiting?.availability === "In stock"
                                      ? "green"
                                      : "red"
                                  }
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>Ready to ship</b>
                              </td>
                              <td>
                                <CustomStatusBadge
                                  status={
                                    productLisiting?.ready_to_ship
                                      ? productLisiting?.ready_to_ship
                                      : "N/A"
                                  }
                                  badgeClass={
                                    productLisiting?.ready_to_ship === "Yes"
                                      ? "blue"
                                      : "orange"
                                  }
                                />
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className="w-100">
                        <button
                          className="site-btn w-100 inquire-btn"
                          onClick={onHandleInquire}
                        >
                          Inquire Now
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
                {productLisiting?.description && (
                  <Row className="tg-product-details-rows tg-product-description">
                    <Col lg={12}>
                      <h2 className="tg-product-details-rows-h2">
                        Description
                      </h2>
                    </Col>
                    <Col lg={12}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productLisiting
                            ? productLisiting?.description
                            : "N/A",
                        }}
                      ></div>
                    </Col>
                  </Row>
                )}
                {productLisiting?.additional_info && (
                  <Row className="tg-product-details-rows tg-product-additional-info">
                    <Col lg={12}>
                      <h2 className="tg-product-details-rows-h2">
                        Additional Info
                      </h2>
                    </Col>
                    <Col lg={12}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productLisiting
                            ? productLisiting?.additional_info
                            : "N/A",
                        }}
                        className="inner-additional"
                      ></div>
                    </Col>
                  </Row>
                )}
                <Row className="tg-product-details-rows tg-product-packaging">
                  <Col lg={12}>
                    <h2 className="tg-product-details-rows-h2">
                      Packaging Info
                    </h2>
                  </Col>
                  <Col lg={12}>
                    {productLisiting?.pack_size && (
                      <Row>
                        <Col>
                          <span>
                            Minimum pack size is{" "}
                            <CustomStatusBadge
                              status={`${productLisiting?.pack_size} ${productLisiting?.packSizeUnit?.name}(s)`}
                              badgeClass="gray"
                            />
                          </span>
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col
                        dangerouslySetInnerHTML={{
                          __html: productLisiting
                            ? productLisiting?.pack_info
                            : "N/A",
                        }}
                      ></Col>
                    </Row>
                  </Col>
                </Row>
                {productLisiting?.lead_time && (
                  <Row className="tg-product-details-rows tg-product-packaging">
                    <Col lg={12}>
                      <h2 className="tg-product-details-rows-h2">
                        Shipping Info
                      </h2>
                    </Col>
                    <Col lg={12}>
                      <Row>
                        <Col>
                          <span>
                            Lead time to deliver is{" "}
                            <CustomStatusBadge
                              status={`${productLisiting?.lead_time} day(s)`}
                              badgeClass="gray"
                            />
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )}
                <div className="tg-products-detail-footer">
                  <Row className="m-0">
                    <Col>
                      <button
                        className="site-btn w-100"
                        onClick={onHandleInquire}
                      >
                        Inquire Now
                      </button>
                    </Col>
                  </Row>
                </div>
              </Container>
            ) : (
              <div className="page-not-found-container d-flex justify-content-center align-items-center flex-column">
                <div className="page-not-found-wrapper">
                  <h1>Oops!</h1>
                  <h2 className="text-center">Product not available</h2>
                </div>
              </div>
            )}
          </section>
        )}
      </Layout>
    </>
  );
}

export default ViewProductDetails;
