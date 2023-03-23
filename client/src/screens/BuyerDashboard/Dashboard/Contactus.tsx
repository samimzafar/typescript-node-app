import React from "react";
import { Col, Row } from "react-bootstrap";
import { BsTelephoneFill, BsWhatsapp } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { CONTACT_INFO } from "../../../constants";

const ContactUs = () => {
  return (
    <div>
      {" "}
      <h2>
        Contact<span> Us</span>
      </h2>
      <Row>
        <Col lg={{ span: 8, offset: 2 }}>
          <p className="contact-text">
            Get in touch with us via call, email or whatsapp
          </p>
        </Col>
      </Row>
      <Row>
        <Col
          lg={{ span: 8, offset: 2 }}
          md={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          xs={{ span: 12, offset: 0 }}
          className="contact-us"
        >
          <Row>
            <Col lg={4} md={4} sm={12} xs={12} className="col-div">
              <div className="contact-info">
                <a href={`tel: ${CONTACT_INFO.number}`}>
                  <div className="icon-section">
                    <BsTelephoneFill size={25} />
                  </div>
                </a>
                <div className="text-div">
                  <p>{CONTACT_INFO.number}</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12} className="col-div">
              <div className="contact-info">
                <a href={`mailto: ${CONTACT_INFO.email}`}>
                  <div className="icon-section">
                    <MdEmail size={25} />
                  </div>
                </a>
                <div className="text-div">
                  <p>{CONTACT_INFO.email}</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12} className="col-div">
              <div className="contact-info">
                <a
                  href={`https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="icon-section">
                    <BsWhatsapp size={25} />
                  </div>
                </a>
                <div className="text-div">
                  <p>+{CONTACT_INFO.whatsapp}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUs;
