import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const [productInfo, setProductInfo] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/productInfo")
      .then((response) => {
        setProductInfo(response.data);
      })
      .catch((error) => console.error("Error fetching productInfo:", error));
  },[]);
  
  const [headphoneInfo, setHeadphoneInfo] = useState([]);
  useEffect(() =>{
    axios.get("http://localhost:8080/headphoneInfo")
    .then((res) =>{
      setHeadphoneInfo(res.data);
    })
    .catch((err) =>{
      console.log(err);
    })
  },[]);
  
  const [productAvailable, setProductAvailable] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/productAvailable")
      .then((response) => {
        setProductAvailable(response.data);
      })
      .catch((error) => console.error("Error fetching productAvailable:", error));
  },[]);

  const [sortType, setSortType] = useState("default");
  let sortedProducts = [...products]; //tạo bản sao của product 
  const sortProduct = (sortOption) => {
    if (sortOption === "price-asc") {
      sortedProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
    } else if (sortOption === "price-desc") {
      sortedProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
    } else if (sortOption === "name-asc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name)); //Sắp xếp theo bảng chữ cái bằng localeCompare
    } else if (sortOption === "name-desc") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "hotsold") {
      sortedProducts.sort((a, b) => b.sold - a.sold);
    } else if (sortOption === "discount") {
      sortedProducts.sort(
        (b, a) =>
          (a.originalPrice - a.sellingPrice) / a.originalPrice -
          (b.originalPrice - b.sellingPrice) / b.originalPrice
      );
    } else if (sortOption === "newest") {
      sortedProducts.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    }
    setProducts(sortedProducts); //Cập nhật danh sách sản phẩm đã được sắp xếp.
    setSortType(sortOption);
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        sortProduct,
        sortType,
        productInfo,
        headphoneInfo,
        productAvailable,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
