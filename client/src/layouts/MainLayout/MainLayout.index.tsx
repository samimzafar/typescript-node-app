import React, { ReactNode, useState } from "react";
import logoLight from "../../assets/images/logoLight.png";
import { useHistory, useLocation } from "react-router-dom";
import userImage from "../../assets/images/dummyImages/user.jpg";
import { Row, Col } from "react-bootstrap";
import { AiOutlineMenu, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { logoutUser } from "./Main.actions";
import { useSelector, useDispatch } from "react-redux";
import { BiDownArrow } from "react-icons/bi";
import {
  home_url,
  url_facebook,
  url_instagram,
  url_linkedin,
  url_twitter,
} from "../../config";
import { CONTACT_INFO } from "../../constants";

interface layoutProps {
  children: ReactNode;
}

function Layout(props: layoutProps) {
  const state: any = useSelector((state) => state);
  const { auth } = state;
  const { isAuthenticated, name, email } = auth;
  const history = useHistory();
  const dispatch = useDispatch();

  function onHandleMenuClose() {
    document
      .getElementsByClassName("humberger__menu__wrapper")[0]
      .classList.add("show__humberger__menu__wrapper");
    document
      .getElementsByClassName("humberger__menu__overlay")[0]
      .classList.add("active");
    document.getElementsByTagName("body")[0].classList.add("over_hid");
  }

  function onHandleMenuOpen() {
    document
      .getElementsByClassName("humberger__menu__wrapper")[0]
      .classList.remove("show__humberger__menu__wrapper");
    document
      .getElementsByClassName("humberger__menu__overlay")[0]
      .classList.remove("active");
    document.getElementsByTagName("body")[0].classList.remove("over_hid");
  }

  // Handle Logout
  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/login");
  };

  return (
    <>
      <div
        onClick={onHandleMenuOpen}
        className="humberger__menu__overlay"
      ></div>
      <div className="humberger__menu__wrapper">
        <div className="position-class">
          <div className="d-flex flex-column justify-content-between">
            <div className="checkout__order tg-company-div">
              {isAuthenticated ? (
                <>
                  <div className="d-flex flex-row justify-content-start align-items-center">
                    <img className="me-3" src={userImage} alt="logo" />
                    <div className="d-flex flex-column align-items-start">
                      <h4>{name}</h4>
                      <span>{email}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-around text-center">
                    <button
                      className="m-1 site-btn"
                      onClick={() => history.push(`/signUp`)}
                    >
                      Signup
                    </button>
                    <button
                      className="m-1 site-btn"
                      onClick={() => history.push(`/login`)}
                    >
                      Login
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="d-flex mt-5 justify-content-center">
            {isAuthenticated && (
              <a href={home_url}>
                <button onClick={handleLogout} className="mt-2 mb-3 site-btn">
                  Logout
                </button>
              </a>
            )}
          </div>
          <div className="humberger_menu_footer">
            <div className="humberger__menu__contact">
              <span>www.tazahtech.com</span>
              <div className="footer__widget mt-1 mb-0">
                <div className="social-links">
                  <a className="linkedin" href={url_linkedin}>
                    <AiFillLinkedin size={25} />
                  </a>
                  <a className="twitter" href={url_twitter}>
                    <BsTwitter size={25} />
                  </a>
                  <a className="facebook" href={url_facebook}>
                    <BsFacebook size={25} />
                  </a>
                  <a className="instagram" href={url_instagram}>
                    <AiFillInstagram size={25} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-lg-3">
              <div className="header__logo">
                <a href={home_url}>
                  <img className="logo-img" src={logoLight} alt="" />
                </a>
              </div>
            </div>
            <div className="col-lg-9">
              <nav className="header__menu">
                <ul>
                  <li>
                    {isAuthenticated && (
                      <>
                        <a href="#">
                          {name}
                          <BiDownArrow className="ms-1" size={10} />
                        </a>
                        <ul className="header__menu__dropdown">
                          <li>
                            <a
                              className="dropdown-item"
                              href=""
                              onClick={handleLogout}
                            >
                              Logout
                            </a>
                          </li>
                        </ul>{" "}
                      </>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div onClick={onHandleMenuClose} className="humberger__open">
            <i className="fa fa-bars">
              <AiOutlineMenu />
            </i>
          </div>
        </div>
      </header>
      <div className="main">
        <div className="body-wrapper">{props.children}</div>
      </div>
      <footer className="footer spad">
        <div className="container">
          <Row className="links-content">
            <Col
              lg={{ span: 6 }}
              md={{ span: 6 }}
              sm={{ span: 12 }}
              className="footer-columns"
            >
              <div>
                <h5>Contact</h5>
                <ul>
                  <li>
                    <a href={`mailTo: ${CONTACT_INFO.email}`}>
                      {CONTACT_INFO.email}
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              lg={{ span: 6 }}
              md={{ span: 6 }}
              sm={{ span: 12 }}
              className="footer-columns"
            >
              <div className="social-links">
                <h5>Social</h5>
                <a
                  className="linkedin"
                  href={url_linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin size={25} />
                </a>
                <a
                  className="twitter"
                  href={url_twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsTwitter size={25} />
                </a>
                <a
                  className="facebook"
                  href={url_facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsFacebook size={25} />
                </a>
                <a
                  className="instagram"
                  href={url_instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillInstagram size={25} />
                </a>
              </div>
            </Col>
          </Row>
          <hr className="hr-divider" />
          <div className="row">
            <div className="col-lg-12">
              <div className="footer__copyright">
                <div className="footer__copyright__text mb-3">
                  <p>
                    © 2022 <b>Tazah Global</b> all right reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
