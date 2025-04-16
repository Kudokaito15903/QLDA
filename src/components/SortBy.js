import { useContext } from "react";
import React, { useState } from "react";
import { ProductContext } from "../context/ProductContext";

const SortBy = () => {
  const { sortProduct } = useContext(ProductContext);

  return (
    <div className="mt-4">
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ 
            background: "#871C1C",
            color: "#fff",
            textDecoration: "none"
          }}
        >
          Sắp xếp theo
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <button
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("name-asc")}
            >
              Tên
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("hotsold")}
            >
              Bán chạy nhất
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("discount")}
            >
              Giảm giá
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("newest")}
            >
              Mới
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("price-asc")}
            >
              Giá: Thấp tới cao
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => sortProduct("price-desc")}
            >
              Giá: Cao tới thấp
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SortBy;
