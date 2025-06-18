import { Link, useLocation, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const onTrendingScroll = () => {
    // kiểm tra xem path có phải là "/" ko
    if (location.pathname !== "/") {
      navigate("/");
    }
    const productListSection = document.getElementById("trending");
    if (productListSection) {
      productListSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    //tìm phần tử có id="trending" trong DOM và scroll đến phần đó một cách mượt (smooth scroll)
  };

  const onLatestScroll = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    const productListSection = document.getElementById("latest");
    if (productListSection) {
      productListSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    //tìm phần tử có id="latest" trong DOM và scroll đến phần đó một cách mượt (smooth scroll)
  };
  return (
    <div>
      <div className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h4 className="footer-heading">Mua ngay</h4>
              <div className="footer-underline"/>
              <div className="mb-2">
                <a href="" className="text-white">
                  Bộ sưu tập
                </a>
              </div>
              <div className="mb-2">
                <a onClick={onTrendingScroll} className="text-white" style={{cursor:"pointer"}}>
                  Sản phẩm thịnh hành
                </a>
              </div>
              <div className="mb-2">
                <a onClick={onLatestScroll} className="text-white" style={{cursor:"pointer"}}>
                  Sản phẩm mới nhất
                </a>
              </div>
              <div className="mb-2">
                <a href="" className="text-white">
                  Sản phẩm nổi bật
                </a>
              </div>
              <div className="mb-2">
                <Link to={"/cart"} className="text-white">
                  Giỏ hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
