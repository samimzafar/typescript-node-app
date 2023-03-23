import React from "react";

interface IProps {
  keyName: string;
  value: string;
}

const ProductDetailsRow = ({ keyName, value }: IProps) => {
  return (
    <div className="row details-row">
      <p className="col-5">{keyName}</p>
      <p className="col-7">{value}</p>
    </div>
  );
};

export default ProductDetailsRow;
