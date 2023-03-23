import React from "react";
import { Accordion } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import banner from "../assets/images/dummyImages/banner/banner.jpg";
import { CATEGORY } from "../screens/Home/Home.contants";
import Loading from "./Loading";

interface IProps {
  categories: CATEGORY[] | [];
  isLoading: boolean;
}

function HeroHeader({ categories, isLoading }: IProps) {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item
                eventKey="0"
                className="hero__categories hero-position"
              >
                <Accordion.Header className="hero__categories__all">
                  <AiOutlineMenu className="me-2" /> Categories
                </Accordion.Header>
                <Accordion.Body className="position">
                  <ul className="z-index">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      categories.map((category, index) => {
                        return (
                          <li key={index}>
                            <a href="#">{category.name}</a>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="col-lg-9">
            <div className="hero__search">
              <div className="hero__search__form">
                <form action="#">
                  {/* <div className="hero__search__categories">
                    Search
                    <span className="arrow_carrot-down"></span>
                  </div> */}
                  <input type="text" placeholder="What do yo u need?" />
                  <button type="submit" className="site-btn">
                    SEARCH
                  </button>
                </form>
              </div>
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="hero__search__phone__text">
                  <h5>+92 3256778764</h5>
                  <span>support 24/7 time</span>
                </div>
              </div>
            </div>
            <div
              className="hero__item set-bg"
              data-setbg={banner}
              style={{ backgroundImage: `url(${banner})` }}
            >
              <div className="hero__text">
                <span>FRUIT FRESH</span>
                <h2>
                  Vegetable <br />
                  100% Organic
                </h2>
                <p>Free Pickup and Delivery Available</p>
                <a href="#" className="primary-btn">
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroHeader;
function value(value: any, key: any): React.ReactNode {
  throw new Error("Function not implemented.");
}

function key(value: any, key: any): React.ReactNode {
  throw new Error("Function not implemented.");
}
