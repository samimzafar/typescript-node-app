import React from "react";
import { Placeholder } from "react-bootstrap";
import { BsGlobe } from "react-icons/bs";
import {
  MdEmail,
  MdInfo,
  MdLocationPin,
  MdOutlineConfirmationNumber,
  MdPhoneEnabled,
} from "react-icons/md";
import { useHistory } from "react-router";
import companyLogo from "../../../assets/images/dummyImages/user.jpg";
import CustomStatusBadge from "../../../components/CustomStatusBadge";
import { ICompanyInfo } from "../BuyerDashboard.constants";

interface IProps {
  company: ICompanyInfo | null;
  isLoading: boolean;
}

const CompanyCard = ({ company, isLoading }: IProps) => {
  const history = useHistory();

  return (
    <>
      <div className="tg-company-div">
        {isLoading ? (
          <>
            <div className="d-flex justify-content-center align-items-center tg-company-img-div">
              <img src={companyLogo} alt="Tazah Global" />
              <Placeholder animation="glow" className="w-50">
                <Placeholder xs={6} size="lg" className="placeholder" />
              </Placeholder>
            </div>
            <h2>
              <Placeholder animation="glow">
                <Placeholder xs={8} size="lg" className="placeholder" />
              </Placeholder>
            </h2>
            <div className="tg-company-info-div">
              <span className="icon-card">
                <MdInfo />
              </span>{" "}
              <p className="w-100">
                <Placeholder animation="glow">
                  <Placeholder xs={6} size="lg" className="placeholder" />
                </Placeholder>
              </p>
            </div>
            <div className="tg-company-info-div">
              <span className="icon-card">
                <MdLocationPin />
              </span>{" "}
              <p className="w-100">
                <Placeholder animation="glow">
                  <Placeholder xs={6} size="lg" className="placeholder" />
                </Placeholder>
              </p>
            </div>
            <div className="tg-company-info-div">
              <span className="icon-card">
                <MdEmail />
              </span>{" "}
              <p className="w-100">
                <Placeholder animation="glow">
                  <Placeholder xs={6} size="lg" className="placeholder" />
                </Placeholder>
              </p>
            </div>
            <div className="tg-company-info-div">
              <span className="icon-card">
                <MdPhoneEnabled />
              </span>{" "}
              <p className="w-100">
                <Placeholder animation="glow">
                  <Placeholder xs={6} size="lg" className="placeholder" />
                </Placeholder>
              </p>
            </div>
            <div className="mt-4">
              <Placeholder animation="glow">
                <Placeholder xs={4} size="lg" className="placeholder" />
              </Placeholder>
            </div>
          </>
        ) : company ? (
          <>
            <div className="d-flex justify-content-center align-items-center tg-company-img-div">
              <img src={companyLogo} alt="Tazah Global" />
              <span className={company.verified ? "verified" : "not-verified"}>
                {company?.verified ? "Verified" : "Not Verified"}
              </span>
            </div>
            <h2>{company?.name}</h2>
            <div className="tg-company-info-div">
              <span className="icon-card">
                <MdInfo />
              </span>{" "}
              <p>
                {company?.companyType?.name},{" "}
                {company?.companyType?.registered_as}
              </p>
            </div>
            <div className="tg-company-info-div">
              <span className="icon-card">
                <BsGlobe />
              </span>{" "}
              <p>
                {company?.user?.city && `${company?.user?.city}, `}
                {company?.user?.country ? company?.user?.country : "N/A"}
              </p>
            </div>
            <div className="tg-company-info-div">
              <span className="icon-card">
                <MdEmail />
              </span>{" "}
              <p>{company?.user?.email}</p>
            </div>
            <div className="tg-company-info-div">
              <span className="icon-card">
                <MdPhoneEnabled />
              </span>{" "}
              <p>
                {company?.user?.phone_number
                  ? company?.user?.phone_number
                  : "N/A"}
              </p>
            </div>
            <div className="tg-company-info-div">
              <span className="icon-card">
                <MdOutlineConfirmationNumber />
              </span>{" "}
              <p>
                Reg. No.{" "}
                {company?.registration_number
                  ? company?.registration_number
                  : "N/A"}
              </p>
            </div>
            <div className="tg-company-info-div">
              <span className="icon-card">
                <MdLocationPin />
              </span>{" "}
              <p>{company?.address ? company?.address : "N/A"}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <CustomStatusBadge
                status={
                  company?.isProfileCompleted
                    ? "Update Profile"
                    : "Incomplete Profile"
                }
                badgeClass={company?.isProfileCompleted ? "blue" : "red"}
                onClick={() =>
                  history.push(
                    `/buyerDashboard/${company?.user?.id}/companies/${company?.id}/profile`
                  )
                }
              />
            </div>
          </>
        ) : (
          <div>Company not registered</div>
        )}
      </div>
    </>
  );
};

export default CompanyCard;
