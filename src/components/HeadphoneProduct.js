import React, { useContext } from "react";
import Product from "./Product";
import SortBy from "./SortBy";
import { ProductContext } from "../context/ProductContext";

const HeadphoneProduct = () => {
  const { products } = useContext(ProductContext);
  let headphoneList = products.filter(
    (products) => products.productType === "headphone"
  );
  let headphoneProduct = headphoneList.map((headphone, index) => {
    return <Product key={index} product={headphone} />;
  });

  return (
    <div className="py-3 py-md-5 bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">All Headphone Products</h4>
          <SortBy />
        </div>
        <div className="row g-3">{headphoneProduct}</div>
      </div>
    </div>
  );
};
export default HeadphoneProduct;
