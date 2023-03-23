import React from "react";
import { IInquiries } from "../BuyerDashboard.constants";
import { Col, Placeholder, Row } from "react-bootstrap";
import moment from "moment";
import { isEmpty, times } from "lodash";
import { DATE_FORMAT_Do_MMMM_YYYY, INQUIRY_STATUSES } from "../../../constants";
import CustomStatusBadge from "../../../components/CustomStatusBadge";

interface IProps {
  inquiries: IInquiries[];
  isLoading: boolean;
}

const Inquiries = ({ inquiries, isLoading }: IProps) => {
  const displayStatus = (status: string) => {
    if (status === INQUIRY_STATUSES.Submitted) {
      return "gray";
    } else if (status === INQUIRY_STATUSES.Accepted) {
      return "green";
    } else if (status === INQUIRY_STATUSES.Acknowledged) {
      return "orange";
    } else if (status === INQUIRY_STATUSES.Rejected) {
      return "red";
    } else if (status === INQUIRY_STATUSES.ContactEstablished) {
      return "blue";
    } else {
      return "";
    }
  };

  return (
    <div className="recent-inquiries">
      <div className="d-flex justify-content-between align-items-center inquiry-head">
        <h3>
          Recent<span> Inquiries</span>
        </h3>
      </div>
      {isLoading ? (
        times(3, (index) => {
          return (
            <div key={index} className="inquiry-card">
              <Row className="align-items-center">
                <Col lg={8} md={8} sm={12} xs={12}>
                  <h2>
                    <Placeholder animation="glow">
                      <Placeholder
                        xs={3}
                        size="lg"
                        className="placeholder me-2"
                      />
                      <Placeholder xs={2} size="lg" className="placeholder" />
                    </Placeholder>
                  </h2>
                  <p>
                    <span>
                      <Placeholder animation="glow">
                        <Placeholder xs={3} size="lg" className="placeholder" />
                      </Placeholder>
                    </span>{" "}
                    <Placeholder animation="glow">
                      <Placeholder xs={3} size="lg" className="placeholder" />
                    </Placeholder>
                  </p>
                  <p>
                    <span>
                      <Placeholder animation="glow">
                        <Placeholder xs={3} size="lg" className="placeholder" />
                      </Placeholder>
                    </span>{" "}
                    <Placeholder animation="glow">
                      <Placeholder xs={2} size="lg" className="placeholder" />
                    </Placeholder>{" "}
                    /{" "}
                    <Placeholder animation="glow">
                      <Placeholder xs={2} size="lg" className="placeholder" />
                    </Placeholder>
                  </p>
                  <p>
                    <span>
                      <Placeholder animation="glow">
                        <Placeholder xs={3} size="lg" className="placeholder" />
                      </Placeholder>
                    </span>{" "}
                    <Placeholder animation="glow">
                      <Placeholder xs={4} size="lg" className="placeholder" />
                    </Placeholder>
                  </p>
                  <p>
                    <span>
                      <Placeholder animation="glow">
                        <Placeholder xs={3} size="lg" className="placeholder" />
                      </Placeholder>{" "}
                    </span>{" "}
                    <Placeholder animation="glow">
                      <Placeholder xs={6} size="lg" className="placeholder" />
                    </Placeholder>
                  </p>
                </Col>
                <Col
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  className="d-flex align-items-center inquiry-status"
                >
                  <span className="inquiry-posted mobile w-50">
                    <Placeholder animation="glow">
                      <Placeholder xs={6} size="lg" className="placeholder" />
                    </Placeholder>
                  </span>
                  <Placeholder
                    animation="glow"
                    className="d-flex justify-content-end w-100"
                  >
                    <Placeholder xs={6} size="lg" className="placeholder" />
                  </Placeholder>
                </Col>
                <span className="inquiry-posted desktop">
                  <Placeholder animation="glow">
                    <Placeholder xs={2} size="lg" className="placeholder" />
                  </Placeholder>
                </span>
              </Row>
            </div>
          );
        })
      ) : !isEmpty(inquiries) ? (
        inquiries.map((inquiry, i) => {
          return (
            <div className="inquiry-card" key={i}>
              <Row className="align-items-center">
                <Col lg={8} md={8} sm={12} xs={12}>
                  <h2>
                    {inquiry.productListing.name}
                    {" - "}
                    <span>
                      {inquiry.quantity} {inquiry.productListing?.unit?.name}(s)
                    </span>
                  </h2>
                  <p>
                    <span>Variety:</span>{" "}
                    {inquiry.variety ? inquiry.variety : "N/A"}
                  </p>
                  <p>
                    <span>Mode of Delivery:</span> {inquiry.logistical_option} /{" "}
                    {inquiry.port_of_landing}
                  </p>
                  <p>
                    <span>Expected Delivery:</span>{" "}
                    {moment
                      .unix(inquiry.week_of_delivery)
                      .format(DATE_FORMAT_Do_MMMM_YYYY)}{" "}
                  </p>
                  <p>
                    <span>Additional Req: </span>{" "}
                    {inquiry.additional_requirements
                      ? inquiry.additional_requirements
                      : "N/A"}
                  </p>
                </Col>
                <Col
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  className="d-flex align-items-center inquiry-status"
                >
                  <span className="inquiry-posted mobile">
                    Posted {moment.unix(inquiry.createdAt).fromNow()}
                  </span>
                  <CustomStatusBadge
                    status={inquiry.status}
                    badgeClass={displayStatus(inquiry.status)}
                  />
                </Col>
                <span className="inquiry-posted desktop">
                  Posted {moment.unix(inquiry.createdAt).fromNow()}
                </span>
              </Row>
            </div>
          );
        })
      ) : (
        <div className="inquiry-card text-center">
          <span>No Recent Inquiries</span>
        </div>
      )}
    </div>
  );
};

export default Inquiries;
