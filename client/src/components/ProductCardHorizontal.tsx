import React from "react";
import { Col, Row } from "react-bootstrap";
import pakFlag from "../assets/images/dummyImages/pak_flag.png";
import { useHistory } from "react-router";
import CustomStatusBadge from "./CustomStatusBadge";
import { IProduct } from "../screens/BuyerDashboard/BuyerDashboard.constants";

interface IProps {
  product: IProduct;
}

const ProductCardHorizontal = ({ product }: IProps) => {
  const history = useHistory();
  return (
    <Col lg={6} sm={12} className="p-0 tg-products-cards-horizontal">
      <Row
        className="tg-trending-products-col cursor-pointer"
        onClick={() => history.push(`/products/${product.id}`)}
      >
        <Col
          lg={7}
          md={7}
          sm={12}
          className="tg-img-div"
          style={{
            backgroundImage: `url(${product.productListingMedia[0].url})`,
          }}
        ></Col>
        <Col lg={6} md={7} sm={12} className="tg-info-div p-0">
          <div className="inner-div d-flex flex-column justify-content-start align-items-start">
            <div className="inner-name">
              <h2>{product.name}</h2>
            </div>
            <div className="inner-country d-flex justify-content-center align-items-center">
              <img src={pakFlag} alt="Tazah Global" />
              <p>{product.company.user.country}</p>
            </div>
            <div className="inner-price">
              <p>
                USD <b>{product.unit_price}</b> ~
                <span> per {product.unit.name}</span>
              </p>
            </div>
            <div className="inner-specs inner-qty">
              <span>Min Order Qty: </span>
              <p>
                <CustomStatusBadge
                  status={`${product.min_order_qty} ${product.unit.name}(s)`}
                  badgeClass="gray"
                />
              </p>
            </div>
            <div className="inner-specs">
              <span>Available Varieties:</span>
              <p>{product.key_features}</p>
            </div>
            <div className="inner-detail">
              <a href={`/products/${product.id}`}>See Details</a>
            </div>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductCardHorizontal;
