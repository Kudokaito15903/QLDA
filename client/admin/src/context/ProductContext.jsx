import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const navigate = useNavigate();
  const addProducts = async (input) => {
    const res = await fetch("http://127.0.0.1:8080/admin/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: input.name,
        sellingPrice: input.sellingPrice,
        productType: input.productType,
        sold: input.sold,
        description: input.description,
        originalPrice: input.originalPrice,
        image: input.image,
        image1: input.image1,
        image2: input.image2,
        brand: input.brand,
        productID: input.productID,
        createdDate: new Date(),
      }),
    });
    const data = await res.text();
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/product");
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Do you want try again?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Yes",
        confirmButtonText: "Go Back Home",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/product");
        }
      });
    }
  };
  const editProducts = async (input) => {
    const res = await fetch(
      `http://localhost:8080/admin/products/update/${input.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: input.id,
          name: input.nameProduct,
          sellingPrice: input.sellingPrice,
          productType: input.productType,
          sold: input.sold,
          description: input.description,
          originalPrice: input.originalPrice,
          image: input.image,
          image1: input.image1,
          image2: input.image2,
          brand: input.brand,
          productID: input.ProductID,
        }),
      }
    );
    const data = await res.text();
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/product");
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Do you want try again?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Yes",
        confirmButtonText: "Go Back Home",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/product");
        }
      });
    }
  };
  const deleteProducts = async (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `http://localhost:8080/admin/products/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.text();
        if (res.status === 200 && data) {
          Swal.fire({
            icon: "success",
            title: "Product deleted successfully",
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
          });
        }
      }
    });
  };
  return (
    <ProductsContext.Provider
      value={{ addProducts, editProducts, deleteProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default function useProductsContext() {
  const value = useContext(ProductsContext);
  if (value === null) {
    throw new Error("ProductsContext must be used within ProductsProvider");
  }
  return value;
}
