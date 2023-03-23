import { times } from "lodash";
import React from "react";
import { Col, Placeholder, Row } from "react-bootstrap";

interface IProps {
  itemCount: number;
}

const PlaceholderProductCardVertical = ({ itemCount }: IProps) => {
  return (
    <Row className="d-flex justify-content-center align-items-center">
      {times(itemCount, (index) => {
        return (
          <Col key={index} className="p-0 tg-products-cards-vertical">
            <Row className="tg-trending-products-col cursor-pointer">
              <Col sm={12} className="tg-img-div"></Col>
              <Col sm={12} className="tg-info-div p-0">
                <div className="inner-div">
                  <p className="inner-name">
                    <Placeholder animation="glow">
                      <Placeholder xs={12} size="lg" className="placeholder" />
                    </Placeholder>
                  </p>
                  <div className="inner-country">
                    <p>
                      <Placeholder animation="glow">
                        <Placeholder
                          xs={12}
                          size="lg"
                          className="placeholder"
                        />
                      </Placeholder>
                    </p>
                  </div>
                  <div className="inner-price">
                    <p>
                      <Placeholder animation="glow">
                        <Placeholder
                          xs={12}
                          size="lg"
                          className="placeholder"
                        />
                      </Placeholder>
                    </p>
                  </div>
                  <div className="inner-specs inner-qty">
                    <span>
                      <Placeholder animation="glow">
                        <Placeholder xs={4} size="lg" className="placeholder" />
                      </Placeholder>
                    </span>
                    <p>
                      <Placeholder animation="glow">
                        <Placeholder xs={4} size="lg" className="placeholder" />
                      </Placeholder>
                    </p>
                  </div>
                  <div className="inner-specs">
                    <span>
                      <Placeholder animation="glow">
                        <Placeholder xs={6} size="lg" className="placeholder" />
                      </Placeholder>
                    </span>
                    <p>
                      <Placeholder animation="glow">
                        <Placeholder
                          xs={12}
                          size="lg"
                          className="placeholder"
                        />
                      </Placeholder>
                    </p>
                  </div>
                  <div className="inner-detail">
                    <Placeholder animation="glow">
                      <Placeholder xs={5} size="lg" className="placeholder" />
                    </Placeholder>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
};

export default PlaceholderProductCardVertical;
