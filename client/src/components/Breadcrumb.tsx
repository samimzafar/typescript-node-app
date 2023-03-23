import React from "react";
import { useSelector } from "react-redux";
import { ROLES_CONSTANTS } from "../constants";

interface IProps {
  breadcrumbs: {
    steps?: {
      name: string;
      target: string;
    }[];
    currentStep: string;
  } | null;
}

const Breadcrumb = ({ breadcrumbs }: IProps) => {
  const state: any = useSelector((state) => state);
  const { role } = state.auth;
  return (
    <section className="breadcrumb-section set-bg set-bg-gray tg-breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-left">
            <div className="breadcrumb__text">
              <div className="breadcrumb__option">
                <a
                  href={
                    role === ROLES_CONSTANTS.ROLE_BUYER
                      ? "/buyerDashboard"
                      : "/sellerDashboard"
                  }
                >
                  Dashboard
                </a>
                {breadcrumbs?.steps &&
                  breadcrumbs.steps.map((breadcrumb, index) => {
                    return (
                      <a href={breadcrumb.target} key={index}>
                        {breadcrumb.name}
                      </a>
                    );
                  })}
                <span>{breadcrumbs?.currentStep}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
