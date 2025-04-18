import React, { useContext } from "react";
import Product from "./Product";
import SortBy from "./SortBy";
import { ProductContext } from "../context/ProductContext";

const TabletProduct = () => {
  const { products } = useContext(ProductContext);
  let tabletList = products.filter(
    (products) => products.productType === "tablet"
  );
  let tabletProduct = tabletList.map((tablet, index) => {
    return <Product key={index} product={tablet} />;
  });

  return (
    <div className="py-3 py-md-5 bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">All Tablet Products</h4>
          <SortBy />
        </div>
        <div className="row g-3">{tabletProduct}</div>
      </div>
    </div>
  );
};

export default TabletProduct;
