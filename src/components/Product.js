import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { WishlistContext } from "../context/WishlistContext";
import { ProductContext } from "../context/ProductContext";

const Product = ({ product }) => {
  let stockBoard = null;
  const { addToWishList, removeFromWishList, isInWishlist } =
    useContext(WishlistContext);

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishList(product.id);
    } else {
      addToWishList(product);
    }
  };
  const {productAvailable} = useContext(ProductContext);
  const availableColors = productAvailable
    .filter((p) => p.productID === product.productID && p.available > 0)
    .map((p) => p.color);
  if (availableColors.length > 0) {
    stockBoard = (
      <span
        className="badge bg-success position-absolute top-0 start-0 m-2"
        style={{ fontSize: "12px" }}
      >
        In Stock
      </span>
    );
  } else {
    stockBoard = (
      <span
        className="badge bg-danger position-absolute top-0 start-0 m-2"
        style={{ fontSize: "12px" }}
      >
        Out of Stock
      </span>
    );

    
  }
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card h-100" style={{ border: "1px solid #ccc" }}>
        <div className="position-relative">
          {stockBoard}
          <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top img-fluid"
            style={{ height: "300px", objectFit: "cover" }}
          />
          </Link>
        </div>
        <div className="card-body d-flex flex-column">
          <p className="text-muted mb-1">{product.brand}</p>
          <h5 className="card-title text-truncate" style={{ fontSize: "20px" }}>
            {product.name}
          </h5>
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold">${product.sellingPrice}</span>
              <span className="text-decoration-line-through text-muted">
                ${product.originalPrice}
              </span>
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <a className="btn btn-dark btn-sm" onClick={handleWishlistToggle}>
                <i
                  className="fa fa-heart"
                  style={{ color: isInWishlist(product.id) ? "red" : "white" }}
                ></i>
              </a>
              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline-secondary btn-sm"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
