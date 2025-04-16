import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogInContext from "../context/LogInContext";
import CartContext from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { WishlistContext } from "../context/WishlistContext";
import Login from "../pages/Login";

function Navbar() {
  const { LoginData } = useContext(LogInContext); //thông tin đăng nhập
  const { numberOfProduct } = useContext(CartContext); //số lượng sản phẩm trong giỏ hàng
  const { products } = useContext(ProductContext); //giá trị input tìm kiếm hiện tại
  const { numberOfItem } = useContext(WishlistContext); //số sản phẩm trong wishlist
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleLogOut = () => {
    LoginData.logout();
    navigate("/"); //liệt
  };

  // Xử lý tìm kiếm sản phẩm
  const handleSearch = (event) => {
    event.preventDefault(); // ngăn hành vi mặc định khi submit form
    let searchResult = products.filter(
      (products) =>
        products.name.toLowerCase().includes(searchText.toLowerCase()) ||
        products.brand.toLowerCase().includes(searchText.toLowerCase())
    );
    // mảng mới gồm các sản phẩm thỏa mãn đkien
    setSearchText(""); //xoá nội dung ô tìm kiếm để trống trở lại
    //Nếu không có kết quả nào tìm được
    if (searchResult.length === 0) {
      alert("Không có kết quả, hãy quay lại Trang chủ và tìm kiếm lại.");
      navigate("/");
    } else {
      navigate(`/search/${searchText}`, { state: { searchResult } });
      //state: { searchResult }: Truyền dữ liệu kết quả sang trang mới
    }
  };
  return (
    <div className="main-navbar shadow-sm sticky-top">
      {/* Top Navbar */}
      <div className="top-navbar">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-md-3 my-auto d-none d-sm-none d-md-block d-lg-block"></div> */}
            <div className="col-md-5 my-auto" onSubmit={handleSearch}>
              <form role="search">
                <div className="input-group">
                  <input
                    type="search"
                    placeholder="Tìm kiếm sản phẩm"
                    className="form-control"
                    name="keyword"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button className="btn bg-white" type="submit">
                    <i className="fa fa-search" onClick={handleSearch} />
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-7 my-auto"> {/*cu la col-md-7*/}
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <Link className="nav-link" to={"/cart"}>
                    <i className="fa fa-shopping-cart" /> Giỏ hàng (
                    {numberOfProduct})
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user" /> {LoginData.username}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to={
                          LoginData.username === "Username"
                            ? "/login"
                            : "/profile"
                        }
                      >
                        <i className="fa fa-user" /> {LoginData.loginState ===
                        true ? "Tiểu sử" : "Đăng nhập"}
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to={"/wishlist"}>
                        <i class="fa fa-heart"></i> Danh sách yêu thích ({numberOfItem})
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={"/order"}>
                        <i className="fa fa-list" /> Lịch sử đơn hàng
                      </Link>
                    </li>
                    {LoginData.loginState && (
                      <li>
                        <Link className="dropdown-item" onClick={handleLogOut}>
                          <i className="fas fa-sign-out-alt" /> Đăng xuất
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav w-100 d-flex justify-content-between">
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to={"/"}>
                  <i
                    className="fa fa-home"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to="/phone">
                  <i
                    className="fa fa-mobile"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Điện thoại
                </Link>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to="/tablet">
                  <i
                    className="fa fa-tablet"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Tablet
                </Link>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to="/laptop">
                  <i
                    className="fa fa-laptop"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Laptop
                </Link>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to="/headphone">
                  <i
                    className="fa fa-headphones"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Âm thanh
                </Link>
              </li>
              <li className="nav-item flex-grow-1 text-center">
                <Link className="nav-link" to={"/chatbot"}>
                  <i
                    className="fa fa-robot"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Chatbot
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
