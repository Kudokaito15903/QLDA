import React, { useContext } from "react";
import Product from "./Product";
import SortBy from "./SortBy";
import { ProductContext } from "../context/ProductContext";

const LaptopProduct = () => {
  const { products } = useContext(ProductContext);
  let LaptopList = products.filter(
    (products) => products.productType === "laptop"
  );
  let laptopProduct = LaptopList.map((laptop, index) => {
    return <Product key={index} product={laptop} />;
  });

  return (
    <div className="py-3 py-md-5 bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">All Laptop Products</h4>
          <SortBy />
        </div>
        <div className="row g-3">{laptopProduct}</div>
      </div>
    </div>
  );
};
export default LaptopProduct;
