import React from "react";
import feature1 from "../assets/images/dummyImages/Featured/feature1.jpg";
import feature2 from "../assets/images/dummyImages/Featured/feature2.jpg";
import feature3 from "../assets/images/dummyImages/Featured/feature3.jpg";
import feature4 from "../assets/images/dummyImages/Featured/feature4.jpg";
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TiArrowSync } from "react-icons/ti";

const FeaturedProducts = () => {
  return (
    <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="featured__item">
          <div
            className="featured__item__pic set-bg"
            data-setbg={feature1}
            style={{ backgroundImage: `url(${feature1})` }}
          >
            <ul className="featured__item__pic__hover">
              <li>
                <a href="#">
                  <FiHeart />
                </a>
              </li>
              <li>
                <a href="#">
                  <AiOutlineShoppingCart />
                </a>
              </li>
              <li>
                <a href="#">
                  <TiArrowSync />
                </a>
              </li>
            </ul>
          </div>
          <div className="featured__item__text">
            <h6>
              <a href="#">Crab Pool Security</a>
            </h6>
            <h5>$30.00</h5>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="featured__item">
          <div
            className="featured__item__pic set-bg"
            data-setbg={feature2}
            style={{ backgroundImage: `url(${feature2})` }}
          >
            <ul className="featured__item__pic__hover">
              <li>
                <a href="#">
                  <FiHeart />
                </a>
              </li>
              <li>
                <a href="#">
                  <AiOutlineShoppingCart />
                </a>
              </li>
              <li>
                <a href="#">
                  <TiArrowSync />
                </a>
              </li>
            </ul>
          </div>
          <div className="featured__item__text">
            <h6>
              <a href="#">Crab Pool Security</a>
            </h6>
            <h5>$30.00</h5>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="featured__item">
          <div
            className="featured__item__pic set-bg"
            data-setbg={feature3}
            style={{ backgroundImage: `url(${feature3})` }}
          >
            <ul className="featured__item__pic__hover">
              <li>
                <a href="#">
                  <FiHeart />
                </a>
              </li>
              <li>
                <a href="#">
                  <AiOutlineShoppingCart />
                </a>
              </li>
              <li>
                <a href="#">
                  <TiArrowSync />
                </a>
              </li>
            </ul>
          </div>
          <div className="featured__item__text">
            <h6>
              <a href="#">Crab Pool Security</a>
            </h6>
            <h5>$30.00</h5>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="featured__item">
          <div
            className="featured__item__pic set-bg"
            data-setbg={feature4}
            style={{ backgroundImage: `url(${feature4})` }}
          >
            <ul className="featured__item__pic__hover">
              <li>
                <a href="#">
                  <FiHeart />
                </a>
              </li>
              <li>
                <a href="#">
                  <AiOutlineShoppingCart />
                </a>
              </li>
              <li>
                <a href="#">
                  <TiArrowSync />
                </a>
              </li>
            </ul>
          </div>
          <div className="featured__item__text">
            <h6>
              <a href="#">Crab Pool Security</a>
            </h6>
            <h5>$30.00</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
