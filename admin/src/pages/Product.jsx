import { useEffect, useMemo, useRef, useState } from "react";
import { PiExport } from "react-icons/pi";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import useProductsContext from "../context/ProductContext";
import { ProductTitle } from "../until/constants";
import Table from "../components/Table";
import useSidebarContext from "../context/SidebarContext";
import axios from "axios";
import ExportToExcel from "../components/ExportToExcel";
import Swal from "sweetalert2";

export default function Product() {
  const [query, setQuery] = useState("");
  const titleRef = useRef(null);
  const [products, setProducts] = useState([]);
  const { deleteProducts } = useProductsContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { setSelectedPageURL } = useSidebarContext();
  
  const columnsToExport = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Price", accessor: "sellingPrice" },
    { header: "Category", accessor: "productType" },
    { header: "Brand", accessor: "brand" },
  ]
  
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/products/?page=${currentPage}`);
      console.log(res.data);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/deleteProduct/${selectedProduct.id}`);
      setIsDeleteModalOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: `Đã xóa sản phẩm ${selectedProduct.name}`,
        confirmButtonColor: '#3085d6'
      });
      fetchProducts(); // Làm mới danh sách sau khi xóa
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Không thể xóa sản phẩm. Vui lòng thử lại!',
        confirmButtonColor: '#d33'
      });
    }
  };

  const filterProducts = useMemo(() => {
    if (!query.trim()) {
      return products;
    }
    return products.filter((item) => {
      const title = titleRef.current?.value;
      switch (title) {
        case "name":
          return item.name.toLowerCase().includes(query.toLowerCase());
        case "productId":
          if (!isNaN(query) && query.trim() !== '') {
            return item.id === parseInt(query);
          }
          return false;
        case "price":
          return item.sellingPrice.toString().includes(query);
        case "category":
          return item.productType.toLowerCase().includes(query.toLowerCase());
        default:
          return item.name.toLowerCase().includes(query.toLowerCase());
      }
    })
  }, [query, products])

  const rowsDisplay = useMemo(() => {
    return filterProducts.map((item) => {
      return (
        <tr key={item.id} className={`font-semibold`}>
          <td>{item.id}</td>
          <td>
            <img className="w-16" src={item.image} alt="" />
          </td>
          <td>{item.name}</td>
          <td>$ {item.sellingPrice}</td>
          <td>{item.productType}</td>
          <td>{item.brand}</td>
          <td>
            <div className="cursor-pointer text-xl flex gap-2 items-center ">
              <FaRegEdit 
                onClick={() => handleEditClick(item)}
                className="text-green-500 hover:text-green-700" 
              />
              <FaRegTrashCan
                onClick={() => handleDeleteClick(item)}
                className="text-red-500 hover:text-red-700"
              />
            </div>
          </td>
        </tr>
      );
    });
  }, [filterProducts]);

  return (
    <div className="overflow-auto custom-scroll-container bg-white sm:m-6">
      <TopSection
        query={query}
        setQuery={setQuery}
        titleRef={titleRef}
        setCurrentPage={setCurrentPage}
        filterProducts={filterProducts}
        columnsToExport={columnsToExport}
      />
      <Table title={ProductTitle} RowsDisplay={rowsDisplay} />
      <Link
        to="/product/add-product"
        onClick={() => setSelectedPageURL("/product/add-product")}
        className="btn btn-soft btn-info ml-3 "
      >
        Add Product 
      </Link>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-3xl mx-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Chỉnh sửa sản phẩm
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <EditProductForm 
                product={selectedProduct} 
                onClose={() => setIsEditModalOpen(false)} 
                onSuccess={() => {
                  setIsEditModalOpen(false);
                  fetchProducts();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Xác nhận xóa sản phẩm
              </h3>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 text-center">
              <svg className="mx-auto mb-4 w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Bạn có chắc chắn muốn xóa sản phẩm <span className="font-semibold">{selectedProduct.name}</span>?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="btn btn-error text-white"
                >
                  Xác nhận xóa
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="btn btn-outline"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component form chỉnh sửa sản phẩm
function EditProductForm({ product, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: product.name,
    sellingPrice: product.sellingPrice,
    originalPrice: product.originalPrice,
    image: product.image,
    description: product.description,
    productType: product.productType,
    brand: product.brand
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'sellingPrice' || name === 'originalPrice' ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:8080/api/admin/updateProduct/${product.id}`, formData);
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Sản phẩm đã được cập nhật thành công',
        confirmButtonColor: '#3085d6'
      });
      onSuccess();
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Không thể cập nhật sản phẩm. Vui lòng thử lại!',
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tên sản phẩm</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Thương hiệu</span>
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Giá bán</span>
          </label>
          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            className="input input-bordered w-full"
            min="0"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Giá gốc</span>
          </label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            className="input input-bordered w-full"
            min="0"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">URL hình ảnh</span>
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Loại sản phẩm</span>
          </label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>Chọn loại sản phẩm</option>
            <option value="headphone">Tai nghe</option>
            <option value="laptop">Laptop</option>
            <option value="smartphone">Điện thoại</option>
            <option value="tablet">Máy tính bảng</option>
          </select>
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Mô tả</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered h-24"
          required
        ></textarea>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-outline"
        >
          Hủy
        </button>
        <button
          type="submit"
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Cập nhật'}
        </button>
      </div>
    </form>
  );
}

function TopSection(props) {
  const { setSelectedPageURL } = useSidebarContext();
  return (
    <div className="flex items-center justify-between m-4 flex-wrap gap-2">
      <div className="flex items-center gap-2  flex-wrap">
        <div className="flex items-center gap-2 border-b-2">
          <IoMdSearch className="text-2xl rounded-lg hidden sm:block" />
          <input
            onChange={(e) => {
              props.setQuery(e.target.value);
              props.setCurrentPage(0);
            }}
            type="search"
            className="h-8 focus:outline-none "
            placeholder={`Search ...`}
          />
        </div>
        <select ref={props.titleRef}>
          <option value="name">Name</option>
          <option value="productId">Product ID</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
        </select>
      </div>
      <ExportToExcel
        data={props.filterProducts}
        fileName="Products.xlsx"
        columns={props.columnsToExport}
      />
    </div>
  );
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const range = 1; // Số lượng nút hiển thị xung quanh trang hiện tại

  const handlePrevious = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  const generatePageNumbers = () => {
    const pages = [];

    // Hiển thị trang đầu tiên
    if (currentPage > range) {
      pages.push(0);
      if (currentPage > range + 1) pages.push("...");
    }

    // Hiển thị các trang xung quanh trang hiện tại
    for (
      let i = Math.max(0, currentPage - range);
      i <= Math.min(totalPages - 1, currentPage + range);
      i++
    ) {
      pages.push(i);
    }

    // Hiển thị trang cuối cùng
    if (currentPage < totalPages - range - 1) {
      if (currentPage < totalPages - range - 2) pages.push("...");
      pages.push(totalPages - 1);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center mt-6 pb-4 space-x-2">
      <button
        onClick={handlePrevious}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={currentPage === 0}
      >
        Previous
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => page !== "..." && onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            page === currentPage
              ? "bg-blue-700 text-white"
              : page === "..."
              ? "cursor-default text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          disabled={page === "..."}
        >
          {page === "..." ? "..." : page + 1}
        </button>
      ))}

      <button
        onClick={handleNext}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages - 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};