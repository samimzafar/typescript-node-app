import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useHistory } from "react-router";
import logoDark from "../assets/images/logoDark.png";

function PageNotFound() {
  const history = useHistory();
  return (
    <div className="page-not-found-container d-flex justify-content-center align-items-center flex-column">
      <div className="text-center">
        <a href="/home">
          <img className="logo-img" src={logoDark} alt="" />
        </a>
      </div>
      <div className="page-not-found-wrapper">
        <h1>Oops! Page Not Found</h1>
        <button className="site-btn mt-3" onClick={() => history.goBack()}>
          <BiArrowBack className="me-2" /> Go Back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
