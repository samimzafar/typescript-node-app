import React from "react";
import { Row } from "react-bootstrap";
import { IProduct } from "../BuyerDashboard.constants";
import { isEmpty } from "lodash";
import ProductCardVertical from "../../../components/ProductCardVertical";
import PlaceholderProductCardVertical from "../../../components/PlaceholderProductCardVertical";

interface IProps {
  products: IProduct[] | [];
  isLoading: boolean;
}

const TrendingProducts = ({ products, isLoading }: IProps) => {
  return (
    <div>
      <Row className="d-flex justify-content-center align-items-center">
        {isLoading ? (
          <PlaceholderProductCardVertical itemCount={5} />
        ) : !isEmpty(products) ? (
          products.map((product, i) => {
            return <ProductCardVertical key={i} product={product} />;
          })
        ) : (
          <div className="text-center">No Product Found</div>
        )}
      </Row>
    </div>
  );
};
export default TrendingProducts;
