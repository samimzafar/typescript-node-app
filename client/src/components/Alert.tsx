import React from "react";

interface IProps {
  alertType: string;
  alertMsg: string;
  companyVerified?: boolean;
  className?: string;
  companyVerifiedMsg?: string;
}

const Alert = ({
  alertType,
  alertMsg,
  companyVerified,
  className,
  companyVerifiedMsg,
}: IProps) => {
  return (
    <div className="col-lg-12 col-md-12 mb-5">
      <div className={`alert alert-${alertType} ${className}`} role="alert">
        {alertMsg} {!companyVerified && companyVerifiedMsg}
      </div>
    </div>
  );
};

export default Alert;
