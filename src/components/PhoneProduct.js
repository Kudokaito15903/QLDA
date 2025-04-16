import React, { useContext } from "react";
import Product from "./Product";
import SortBy from "./SortBy";
import { ProductContext } from "../context/ProductContext";

const PhoneProduct = () => {
  const { products } = useContext(ProductContext);
  let phoneList = products.filter((product) => product.productType === "phone");
  let phoneProduct = phoneList.map((phone, index) => {
    return <Product key={index} product={phone} />;
  });

  return (
    <div className="py-3 py-md-5 bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">All Phone Products</h4>
          <SortBy />
        </div>
        <div className="row g-3">{phoneProduct}</div>
      </div>
    </div>
  );
};

export default PhoneProduct;
