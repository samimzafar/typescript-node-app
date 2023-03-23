import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { ICompanyInfo, IProductListing } from "../BuyerDashboard.constants";
import pakflag from "../../../assets/images/dummyImages/pak_flag.png";
import ImproveCredibility from "./ImproveCredibility";
import PostInquiryModal from "./PostInquiryModal";
import ErrorAlert from "../../../components/ErrorAlert";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Alert from "../../../components/Alert";

interface IProps {
  canInquire: boolean;
  setCanInquire: (status: boolean) => void;
  companyId: number | null;
  setCompanyId: (id: number) => void;
  setModalType: (type: string) => void;
  toggleModal: () => void;
  unit: string;
  productListing?: IProductListing;
  companies: ICompanyInfo[] | [];
  setCompanies: (company: ICompanyInfo[] | []) => void;
}

const SubmitInquiry = ({
  canInquire,
  productListing,
  setCanInquire,
  companies,
  setCompanies,
  unit,
  setModalType,
  toggleModal,
  companyId,
  setCompanyId,
}: IProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const history = useHistory();
  const state: any = useSelector((state) => state);
  const { userId } = state.auth;
  const [companyCardInfo, setcompanyCardInfo] = useState<ICompanyInfo | null>(
    null
  );

  return (
    <>
      <ErrorAlert message={errorMessage} setErrorMessage={setErrorMessage} />
      <Row className="m-0 inquiry-form">
        {!canInquire && (
          <Alert
            alertMsg="You need to complete your Company Profile before submitting an
              inquiry"
            alertType="warning"
          />
        )}
        <Col
          lg={12}
          xs={12}
          className="tg-inquiry-left position-relative show-mobile"
        >
          <Row className="row-first align-items-center justify-content-between">
            <Col lg={10} xs={10}>
              <h5 className="heading-first">Submit your inquiry for</h5>
            </Col>
            <Col
              lg={2}
              xs={2}
              className="d-flex justify-content-end align-items-center"
            >
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={toggleModal}
              ></button>
            </Col>
          </Row>
        </Col>
        <Col lg={4} md={12} className="tg-inquiry-left position-relative">
          <Row className="row-first show-desktop">
            <Col>
              <h5 className="heading-first">Submit your inquiry for</h5>
            </Col>
          </Row>
          <Row className="d-flex align-items-center row-second">
            <Col lg={5} md={5} sm={5} xs={5} className="pe-0">
              <img
                src={productListing?.productListingMedia[0]?.url}
                alt="Tazah Global"
                className="product-img"
              />
            </Col>
            <Col lg={7} md={7} sm={7} xs={7}>
              <p className="product-name">{productListing?.name}</p>
              <div className="product-country d-flex justify-content-start align-items-center">
                <img src={pakflag} alt="Tazah Global" className="" />
                <span>{productListing?.company.user.country}</span>
              </div>
            </Col>
          </Row>
          <Row>
            {canInquire && (
              <Col lg={12} sm={12} className="company-box-col">
                <div className="company-box">
                  <div className="d-flex justify-content-between align-items-center header-div">
                    <h2>Your company info</h2>
                    <span
                      onClick={() =>
                        history.push(
                          `/buyerDashboard/${userId}/companies/${companyId}/profile`
                        )
                      }
                    >
                      <MdEdit />
                    </span>
                  </div>
                  <p>
                    <span>Contact Number:</span>{" "}
                    {companyCardInfo?.user.phone_number
                      ? companyCardInfo?.user.phone_number
                      : "N/A"}
                  </p>
                  <p>
                    <span>Company type:</span>{" "}
                    {companyCardInfo?.companyType.name
                      ? companyCardInfo?.companyType.name
                      : "N/A"}
                  </p>
                  <p>
                    <span>Registration No:</span>{" "}
                    {companyCardInfo?.registration_number
                      ? companyCardInfo?.registration_number
                      : "N/A"}
                  </p>
                </div>
              </Col>
            )}
          </Row>
        </Col>
        <Col lg={8} md={12} className="tg-inquiry-right">
          <form>
            <Row>
              <ImproveCredibility
                setCanInquire={setCanInquire}
                canInquire={canInquire}
                companyId={companyId}
                setCompanyId={setCompanyId}
                companies={companies}
                setCompanies={setCompanies}
                setcompanyCardInfo={setcompanyCardInfo}
              />
              {canInquire && (
                <PostInquiryModal
                  toggleModal={toggleModal}
                  setModalType={setModalType}
                  canInquire={canInquire}
                  companyId={companyId}
                  unit={unit}
                />
              )}
            </Row>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default SubmitInquiry;
