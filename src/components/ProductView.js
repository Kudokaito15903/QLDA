import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import Product from "./Product";
import ProductReview from "./ProductReview";
import { WishlistContext } from "../context/WishlistContext";
import axios from "axios";
const ProductView = ({ id }) => {
  const { addToWishList, removeFromWishList, isInWishlist } =
    useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  let [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { productAvailable } = useContext(ProductContext);
  const { productInfo, headphoneInfo } = useContext(ProductContext);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    // Fetch product data from API
    axios
      .get(`http://localhost:8080/view/product/${id}`)
      .then((response) => {
        console.log("API response:", response.data);
        setProduct(response.data);
        setCurrentImage(response.data.image);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);
  if (!product) {
    return <p>Loading product...</p>; // Display a loading message if product is null
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishList(product.id);
    } else {
      addToWishList(product);
    }
  };
  let WishDefinition = isInWishlist(product.id)
    ? "Remove from wishlist"
    : "Add to wishlist";
  const information =
    product.productType === "headphone"
      ? headphoneInfo.find((info) => info.productID === product.productID)
      : productInfo.find((info) => info.productID === product.productID);
  if (!information) {
    return <p>Product information not available.</p>;
  }
  let rowInformation = [
    "CPU",
    "RAM",
    "Hard Drive",
    "GPU",
    "Display",
    "Battery Capacity",
  ];
  if (product.productType === "headphone") {
    rowInformation = [
      "Headphone Type",
      "Speaker Size",
      "Speaker Sensitivity",
      "Speaker Impedance",
      "Microphone Sensitivity",
      "Microphone Frequency Range",
    ];
  }
  const relatedProduct = products.filter(
    (products) =>
      products.productType === product.productType && product.id !== products.id
  );

  const renderResult = relatedProduct
    .sort(
      (a, b) =>
        Math.abs(a.sellingPrice - product.sellingPrice) -
        Math.abs(b.sellingPrice - product.sellingPrice)
    )
    .slice(0, 4)
    .map((product, index) => <Product key={index} product={product} />);
  const handleAddToCart = () => {
    if (selectedColor) {
      addToCart({ ...product, color: selectedColor }, quantity);
    } else {
      alert("Please select a color.");
    }
  };
  const availableColors = productAvailable
    .filter((p) => p.productID === product.productID && p.available > 0)
    .map((p) => p.color);
  let stockBoard = null;
  let CartButton = null;
  const inStoke = "In Stoke";
  const outStoke = "Out of Stoke";
  if (availableColors.length > 0) {
    stockBoard = <label className="label-stock bg-success">{inStoke}</label>;
    CartButton = (
      <div className="mt-2">
        <button onClick={handleAddToCart} className="btn btn1">
          <i className="fa fa-shopping-cart"></i> Add To Cart
        </button>
        <button className="btn btn1" onClick={handleWishlistToggle}>
          {" "}
          <i className="fa fa-heart"></i> {WishDefinition}{" "}
        </button>
      </div>
    );
  } else {
    stockBoard = <label className="label-stock bg-danger">{outStoke}</label>;
    CartButton = (
      <button className="btn btn1" onClick={handleWishlistToggle}>
        {" "}
        <i className="fa fa-heart"></i> {WishDefinition}{" "}
      </button>
    );
  }
  const handleColorSelect = (e) => {
    setSelectedColor(e.target.value); // Handle color change
  };
  return (
    <div className="py-3 py-md-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-5 mt-3">
            <div className="bg-white border">
              <img src={currentImage} className="w-100" alt={product.name} />
            </div>
            <div className="d-flex justify-content-center mt-3">
              {[product.image, product.image1, product.image2].map(
                (img, index) => (
                  <button
                    key={index}
                    className={`btn btn-outline-primary mx-2 ${
                      currentImage === img ? "active" : ""
                    }`}
                    onClick={() => setCurrentImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Option ${index + 1}`}
                      className="img-thumbnail"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </button>
                )
              )}
            </div>
          </div>
          <div className="col-md-7 mt-3">
            <div className="product-view">
              <h4 className="product-name">
                {product.name}
                {stockBoard}
              </h4>
              <hr />
              <p className="product-path">
                <Link to={"/"}>Home</Link> / {product.name}
              </p>
              <div>
                <span className="selling-price">${product.sellingPrice}</span>
                <span className="original-price">${product.originalPrice}</span>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label
                    htmlFor="colorSelect"
                    className="form-label fw-bold text-primary"
                    style={{ fontSize: "1.2rem" }}
                  >
                    Choose Color:
                  </label>
                  <select
                    id="colorSelect"
                    className="form-select shadow-sm"
                    value={selectedColor}
                    onChange={handleColorSelect}
                    style={{ borderRadius: "8px", padding: "10px" }}
                  >
                    <option value="">Select a color</option>
                    {availableColors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-2">
                <div className="input-group">
                  <button
                    className="btn btn1"
                    onClick={
                      quantity > 1 ? () => setQuantity(quantity - 1) : null
                    }
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  <input
                    type="text"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="input-quantity"
                    readOnly
                  />
                  <button
                    className="btn btn1"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              {CartButton}
              <div className="mt-3">
                <h5 className="mb-0">Small Description</h5>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-3">
            <div className="card">
              <div className="card-header bg-white">
                <h4>Description</h4>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Attribute</th>
                      <th scope="col">Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{rowInformation[0]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.headphone_type
                          : information.cpu}
                      </td>
                    </tr>
                    <tr>
                      <td>{rowInformation[1]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.speaker_size
                          : information.ram}
                      </td>
                    </tr>
                    <tr>
                      <td>{rowInformation[2]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.speaker_sensitivity
                          : information.hardDrive}
                      </td>
                    </tr>
                    <tr>
                      <td>{rowInformation[3]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.speaker_impedance
                          : information.gpu}
                      </td>
                    </tr>
                    <tr>
                      <td>{rowInformation[4]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.microphone_sensitivity
                          : information.display}
                      </td>
                    </tr>
                    <tr>
                      <td>{rowInformation[5]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.microphone_frequency_range
                          : information.battery}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="py-3 py-md-5 bg-light">
            <div className="card">
              <div className="card-header bg-white">
                <h4 className="mb-0">Similar Products</h4>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4"></div>
              <div className="row g-3">{renderResult}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="py-3 py-md-5 bg-light">
            <div className="card">
              <div className="card-header bg-white">
                <h4 className="mb-0">Customer's Feedback</h4>
              </div>
              <ProductReview productID={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
