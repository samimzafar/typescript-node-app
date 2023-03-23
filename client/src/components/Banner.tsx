import React from "react";
import banner1 from "../assets/images/dummyImages/banner/banner1.jpg";
import banner2 from "../assets/images/dummyImages/banner/banner2.jpg";

const Banner = () => {
  return (
    <>
      <div className="banner mb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic mt-1 mb-1">
                <img src={banner1} alt="" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic mt-1 mb-1">
                <img src={banner2} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
