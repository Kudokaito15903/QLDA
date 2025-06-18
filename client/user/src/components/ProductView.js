import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import Product from "./Product";
import { WishlistContext } from "../context/WishlistContext";
import axios from "axios";
const ProductView = ({ id }) => {
  const { addToWishList, removeFromWishList, isInWishlist } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  let [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { productAvailable } = useContext(ProductContext);
  const { productInfo, headphoneInfo } = useContext(ProductContext);
  const [image, setImage] = useState("");
  
  // console.log("product: ", product)
  // console.log("productInfo: ", productInfo)
  // console.log("hpInfo: ", headphoneInfo)
  
  useEffect(() => {
    // Fetch product data from API
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((response) => {
        console.log("API response:", response.data);
        setProduct(response.data);
        setImage(response.data.image);
        // console.log("Đây: ", response)
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);
  if (!product) {
    return <p>Đang tải sản phẩm...</p>; // Display a loading message if product is null
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishList(product.id);
    } else {
      addToWishList(product);
    }
  };
  
  let WishDefinition = isInWishlist(product.id) ? "Xóa khỏi danh sách yêu thích" : "Thêm vào danh sách yêu thích";
  
  const information = product.productType === "headphone" ? headphoneInfo.find((info) => info.productId === product.id) : productInfo.find((info) => info.productId === product.id);
  
  if (!information) {
    return <p>Sản phẩm không có thông tin</p>;
  }
  let rowInformation = [
    "CPU",
    "RAM",
    "Ổ cứng",
    "Card đồ họa",
    "Màn hình",
    "Dung lượng pin",
  ];
  if (product.productType === "headphone") {
    rowInformation = [
      "Loại tai nghe",
      "Kích thước loa",
      "Độ nhạy loa",
      "Trở kháng loa",
      "Độ nhạy micro",
      "Dải tần số",
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
  console.log(renderResult)
  const handleAddToCart = () => {
    if (selectedColor) {
      addToCart({ ...product, color: selectedColor }, quantity);
    } else {
      alert("Vui lòng hãy chọn màu.");
    }
  };
  console.log("product: ", product)
  const availableColors = productAvailable
  .filter((p) => p.id === product.id && p.available > 0)
  .map((p) => ({
    color: p.color,
    available: p.available,
  }));
  let stockBoard = null;
  let CartButton = null;
  const inStoke = "Còn hàng";
  const outStoke = "Hết hàng";
  if (availableColors.length > 0) {
    stockBoard = <label className="label-stock bg-success">{inStoke}</label>;
    CartButton = (
      <div className="mt-2">
        <button onClick={handleAddToCart} className="btn btn1">
          <i className="fa fa-shopping-cart"></i> Thêm vào giỏ hàng
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
              <img src={image} className="w-100" alt={product.name} />
            </div>
            <div className="mt-5">
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
                <Link to={"/"} style={{ 
                color: "#871C1C",
                textDecoration: "none",
                fontWeight: "bold"
              }}>Trang chủ</Link> / {product.name}
              </p>
              <div>
                <span className="selling-price">{product.sellingPrice.toLocaleString('vi-VN')}đ</span>
                <span className="original-price">{product.originalPrice.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label
                    htmlFor="colorSelect"
                    className="form-label fw-bold"
                    style={{ fontSize: "1.2rem" }}
                  >
                    Màu:
                  </label>
                  <select
                    id="colorSelect"
                    className="form-select shadow-sm"
                    value={selectedColor}
                    onChange={handleColorSelect}
                    style={{ borderRadius: "8px", padding: "10px" }}
                  >
                    <option value="">Hãy chọn màu</option>
                    {availableColors.map((item, index) => (
                      <option key={index} value={item.color}>
                        {item.color} ({item.available} sản phẩm)
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
                <h5 className="mb-0">Mô tả ngắn</h5>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-3">
            <div className="card">
              <div className="card-header bg-white">
                <h4>Thông số sản phẩm:</h4>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>{rowInformation[0]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.headphoneType
                          : information.cpu
                          }
                      </td>
                    </tr>
                    <tr>
                      <td>{rowInformation[1]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.speakerSize
                          : information.ram}
                      </td>
                    </tr>
                    <tr>
                      <td>{rowInformation[2]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.speakerSensitivity
                          : information.hardDrive}
                      </td>
                    </tr>
                    <tr>
                      <td>{rowInformation[3]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.speakerImpedance
                          : information.gpu}
                      </td>
                    </tr>
                    <tr>
                      <td>{rowInformation[4]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.microphoneSensitivity
                          : information.display}
                      </td>
                    </tr>
                    <tr>
                      <td>{rowInformation[5]}</td>
                      <td>
                        {product.productType === "headphone"
                          ? information.microphoneFrequencyRange
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
          {renderResult && renderResult.length > 0  && (
            <div className="py-3 py-md-5 bg-light">
              <div className="card">
                <div className="card-header bg-white">
                  <h4 className="mb-0">Sản phẩm tương tự</h4>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4"></div>
                <div className="row g-3">{renderResult}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
