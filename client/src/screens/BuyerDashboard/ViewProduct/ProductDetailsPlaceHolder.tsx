import React from "react";
import { Col, Container, Placeholder, Row, Table } from "react-bootstrap";

const ProductDetailsPlaceHolder = () => {
  return (
    <section>
      <Container className="tg-product-details position-relative">
        <Row>
          <Col lg={6} className="tg-product-details-left-col">
            <div className="tg-product-details-media-div">
              <Placeholder animation="glow">
                <Placeholder
                  xs={12}
                  size="lg"
                  className="placeholder height335px"
                />
              </Placeholder>
            </div>
            <Row className="mb-3 tg-product-view-gallery m-0">
              <Col className="gallery-div"></Col>
              <Col className="d-lg-block d-md-block d-sm-none d-none gallery-div"></Col>
              <Col className="d-lg-block d-md-block d-sm-none d-none gallery-div"></Col>
              <Col className="d-lg-block d-md-block d-sm-none d-none gallery-div"></Col>
            </Row>
          </Col>
          <Col lg={6} className="tg-product-details-right-col">
            <div className="main-div d-flex flex-column justify-content-start align-items-start">
              <div className="inner-div w-100">
                <Placeholder animation="glow">
                  <Placeholder xs={3} size="lg" className="placeholder" />
                </Placeholder>
              </div>
              <div className="inner-div w-100">
                <h2 className="title">
                  <Placeholder animation="glow">
                    <Placeholder xs={6} size="lg" className="placeholder" />
                    {" - "}
                    <Placeholder xs={3} size="lg" className="placeholder" />
                  </Placeholder>
                </h2>
              </div>
              <div className="inner-div w-100">
                <p className="price-p">
                  <Placeholder animation="glow">
                    <Placeholder xs={5} size="lg" className="placeholder" />
                  </Placeholder>
                </p>
              </div>
              <div className="inner-div inner-details mb-0">
                <span>
                  <b>
                    <Placeholder animation="glow">
                      <Placeholder xs={3} size="lg" className="placeholder" />
                    </Placeholder>
                  </b>{" "}
                  <p>
                    <Placeholder animation="glow">
                      <Placeholder xs={12} size="lg" className="placeholder" />
                    </Placeholder>
                  </p>
                </span>
                <Table responsive borderless className="inner-table">
                  <tbody>
                    <tr>
                      <td>
                        <b>
                          <Placeholder animation="glow">
                            <Placeholder
                              xs={12}
                              size="lg"
                              className="placeholder"
                            />
                          </Placeholder>
                        </b>
                      </td>
                      <td className="w-50">
                        <Placeholder animation="glow">
                          <Placeholder
                            xs={3}
                            size="lg"
                            className="placeholder"
                          />
                        </Placeholder>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>
                          <Placeholder animation="glow">
                            <Placeholder
                              xs={12}
                              size="lg"
                              className="placeholder"
                            />
                          </Placeholder>
                        </b>
                      </td>
                      <td className="w-50">
                        <Placeholder animation="glow">
                          <Placeholder
                            xs={3}
                            size="lg"
                            className="placeholder"
                          />
                        </Placeholder>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>
                          <Placeholder animation="glow">
                            <Placeholder
                              xs={12}
                              size="lg"
                              className="placeholder"
                            />
                          </Placeholder>
                        </b>
                      </td>
                      <td className="w-50">
                        <Placeholder animation="glow">
                          <Placeholder
                            xs={3}
                            size="lg"
                            className="placeholder"
                          />
                        </Placeholder>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="w-100">
                <Placeholder.Button
                  className="inquire-btn"
                  variant="secondary"
                  xs={12}
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className="tg-products-detail-footer">
          <Row className="m-0">
            <Col>
              <Placeholder.Button variant="secondary" xs={12} />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};
export default ProductDetailsPlaceHolder;
