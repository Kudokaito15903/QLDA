import { useLocation } from "react-router-dom";
import Product from "./Product";

const SearchResult = () => {
  const location = useLocation();

  const searchResult = location.state?.searchResult || [];

  const renderResult = searchResult.map((product, index) => (
    <Product key={index} product={product} />
  ));

  return (
    <div className="py-3 py-md-5 bg-light" id="trending">
      <div className="container">
        <h4 className="mb-0">Kết quả tìm kiếm</h4>

        <div className="d-flex justify-content-between align-items-center mb-4"></div>

        <div className="row g-3">{renderResult}</div>
      </div>
    </div>
  );
};

export default SearchResult;
