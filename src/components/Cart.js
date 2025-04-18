import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";
const CartItem = ({ product, quantity, handleQuantityChange }) => {
  let totalPrice = product.sellingPrice * quantity;
  const { removeItem } = useContext(CartContext);
  return (
    <div className="cart-item">
      <div className="row align-items-center">
        <div className="col-md-4 my-auto">
          <Link to={`/product/${product.id}`} state={{ product }}>
            <label className="product-name d-flex align-items-center">
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "50px", height: "50px", marginRight: "15px" }}
              />
              {product.name}
            </label>
          </Link>
        </div>
        <div className="col-md-2 my-auto">
          <span className="product-color d-flex align-items-center">
            <strong>{product.color}</strong>
          </span>
        </div>
        <div className="col-md-2 my-auto">
          <label className="price">${totalPrice}</label>
        </div>
        <div className="col-md-2 col-7 my-auto">
          <div className="quantity">
            <div className="input-group">
              <button
                className="btn btn1"
                onClick={() => handleQuantityChange(product.productID,product.color, -1)}
              >
                <i className="fa fa-minus"></i>
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="input-quantity"
              />
              <button
                className="btn btn1"
                onClick={() => handleQuantityChange(product.productID,product.color, 1)}
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-5 my-auto">
          <div className="remove">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeItem(product.productID,product.color)}
            >
              <i className="fa fa-trash"></i> Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function CartTotal({ products }) {
  const subtotal = products.reduce(
    (sum, product) => sum + product.sellingPrice * product.quantity,
    0
  );
  const navigate = useNavigate();
  const handleToCheckOut = () => {
    navigate("/checkout", { state: { subtotal } });
  };
  return (
    <div
      className="border border-dark rounded p-4 w-100"
      style={{ maxWidth: "500px" }}
    >
      <h3 className="h5 mb-4">Tổng số giỏ hàng</h3>

      {/* toFixed để hiển thị bao nhiêu chữ số sau số thập phân */}
      <div className="d-flex justify-content-between py-2 border-bottom">
        <p className="mb-0">Tổng phụ:</p>
        <p className="mb-0">${subtotal.toFixed(2)}</p>
      </div>
      <div className="d-flex justify-content-between py-2 border-bottom">
        <p className="mb-0">Phí vận chuyển:</p>
        <p className="mb-0">$0</p>
      </div>
      {/* Total Row */}
      <div className="d-flex justify-content-between py-2 border-bottom">
        <p className="mb-0">Tổng:</p>
        <p className="mb-0">${subtotal.toFixed(2)}</p>
      </div>

      {/* Checkout Button */}
      <form method="post" className="mt-4">
        <button
          style={{ marginTop: "16px" }}
          onClick={handleToCheckOut}
          type="submit"
          className={`btn btn-primary w-100 ${
            products.length === 0 ? "disabled" : ""
          }`}
        >
          Tiến hành thanh toán
        </button>
      </form>
    </div>
  );
}

const Cart = () => {
  const { cartItem, updateCartQuantity } = useContext(CartContext);
  console.log(cartItem);
  if (!cartItem || cartItem.length === 0) {
    return (
      <div className="py-3 py-md-5 bg-light" id="trending">
        <div className="container">
          <p>Giỏ hàng của bạn đang rỗng.</p>
          <Link to="/" className="btn" style={{ 
              background: "#871C1C",
              color: "#fff"
          }}>
            Quay trở lại trang chính
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="py-3 py-md-5 bg-light">
      <div className="container">
        <div className="shopping-cart">
          <div className="cart-header d-none d-sm-none d-md-block">
            <div className="row">
              <div className="col-md-4">
                <h4>Sản phẩm</h4>
              </div>
              <div className="col-md-2">
                <h4>Màu sắc</h4>
              </div>
              <div className="col-md-2">
                <h4>Giá</h4>
              </div>
              <div className="col-md-2">
                <h4>Số lượng</h4>
              </div>
              <div className="col-md-2">
                <h4>Xóa</h4>
              </div>
            </div>
          </div>

          {cartItem.map((product) => (
            <CartItem
              key={product.id + " " + product.color}
              product={product}
              quantity={product.quantity}
              handleQuantityChange={updateCartQuantity}
            />
          ))}
        </div>

        <div className="mt-4 d-flex justify-content-between align-items-center">
          <Link to="/" className="btn" style={{ 
            background: "#871C1C",
            color: "#fff",
          }}>
            Quay về Trang Chủ
          </Link>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <CartTotal products={cartItem} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
