import React, { useContext } from "react";
import Product from "./Product";

import { ProductContext } from "../context/ProductContext";

const ProductList = () => {
  const { products } = useContext(ProductContext);
  let trendingProduct = [...products]
    .sort((b, a) => a.sold - b.sold)
    .slice(0, 8)
    .map((product, index) => <Product key={index} product={product} />);
  let latestProduct = [...products]
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
    .slice(0, 8)
    .map((product, index) => <Product key={index} product={product} />);
  return (
    <div>
      <div className="py-3 py-md-5 bg-light" id="trending">
        <div className="container">
          <h4 className="mb-0">Sản Phẩm Thịnh Hành</h4>

          <div className="d-flex justify-content-between align-items-center mb-4"></div>

          <div className="row g-3">{trendingProduct}</div>
        </div>
      </div>
      <div className="component-container bg-white" style={{height:"5vh"}}>

      </div>
      <div className="py-3 py-md-5 bg-light" id="latest">
        <div className="container">
          <h4 className="mb-0">Sản Phẩm Mới Nhất</h4>

          <div className="d-flex justify-content-between align-items-center mb-4"></div>

          <div className="row g-3">{latestProduct}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
