import { useEffect, useMemo, useRef, useState } from "react";
import { PiExport } from "react-icons/pi";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { ProductTitle, ProductColumnsToExport } from "../until/constants";
import Table from "../components/Table";
import useSidebarContext from "../context/SidebarContext";
import axios from "axios";
import ExportToExcel from "../components/ExportToExcel";
import Swal from "sweetalert2";
import Pagination from "../components/Pagination";
export default function Product() {
  const [query, setQuery] = useState("");
  const titleRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const { setSelectedPageURL } = useSidebarContext();
  
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/products/?page=${currentPage}&size=5`);
      const activeProducts = res.data.products.filter(product => !product.deleted);
      setProducts(activeProducts);
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
        title: 'Success!',
        text: `Product ${selectedProduct.name} has been deleted`,
        confirmButtonColor: '#3085d6'
      });
      fetchProducts(); // Refresh the list after deletion
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Cannot delete product. Please try again!',
        confirmButtonColor: '#d33'
      });
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
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
        case "brand":
          return item.brand.toString().includes(query);
        case "category":
          return item.productType.toLowerCase().includes(query.toLowerCase());
        default:
          return item.name.toLowerCase().includes(query.toLowerCase());
      }
    })
  }, [query, products])

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...filterProducts];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (sortConfig.key === 'price') {
          if (a.sellingPrice < b.sellingPrice) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.sellingPrice > b.sellingPrice) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [filterProducts, sortConfig]);

  const rowsDisplay = useMemo(() => {
    return sortedProducts.map((item) => {
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
  }, [sortedProducts]);

  return (
    <div className="overflow-auto custom-scroll-container bg-white rounded-xl shadow-lg sm:m-6">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Management</h2>
        <TopSection
          query={query}
          setQuery={setQuery}
          titleRef={titleRef}
          setCurrentPage={setCurrentPage}
          filterProducts={filterProducts}
          columnsToExport={ProductColumnsToExport}
          handleSort={handleSort}
          sortConfig={sortConfig}
        />
      </div>
      <div className="px-6">
        <Table title={ProductTitle} RowsDisplay={rowsDisplay} />
        <Link
          to="/product/add-product"
          onClick={() => setSelectedPageURL("/product/add-product")}
          className="btn btn-primary my-4"
        >
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Product
          </span>
        </Link>
      </div>
      
      {totalPages > 1 && (
        <div className="px-6 pb-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-3xl mx-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit Product
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-all duration-200"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-md mx-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Confirm Delete Product
              </h3>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-all duration-200"
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
                Are you sure you want to delete <span className="font-semibold">{selectedProduct.name}</span>?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="btn btn-error text-white hover:bg-red-600 transition-colors duration-200"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="btn btn-outline hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component for editing product
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
        title: 'Success!',
        text: 'Product has been updated successfully',
        confirmButtonColor: '#3085d6'
      });
      onSuccess();
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Unable to update product. Please try again!',
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Product Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Brand</span>
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Selling Price</span>
          </label>
          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            min="0"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Original Price</span>
          </label>
          <input
            type="number"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            min="0"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Image URL</span>
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Product Type</span>
          </label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="select select-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
          >
            <option value="" disabled>Select product type</option>
            <option value="headphone">Headphone</option>
            <option value="laptop">Laptop</option>
            <option value="smartphone">Smartphone</option>
            <option value="tablet">Tablet</option>
          </select>
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium text-gray-700">Description</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered h-32 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          required
        ></textarea>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-outline hover:bg-gray-200 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`btn btn-primary hover:bg-blue-600 transition-colors duration-200 ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Update'}
        </button>
      </div>
    </form>
  );
}

function TopSection(props) {
  const { setSelectedPageURL } = useSidebarContext();
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 border-b-2 border-gray-300 focus-within:border-blue-500 transition-colors duration-200 px-2 py-1 rounded-t-md">
          <IoMdSearch className="text-2xl text-gray-500" />
          <input
            onChange={(e) => {
              props.setQuery(e.target.value);
              props.setCurrentPage(0);
            }}
            type="search"
            className="h-8 focus:outline-none w-52"
            placeholder="Search products..."
          />
        </div>
        <select 
          ref={props.titleRef} 
          onChange={() => props.setQuery("")}
          className="select select-bordered rounded-md h-10 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <option value="name">Name</option>
          <option value="productId">Product ID</option>
          <option value="brand">Brand</option>
          <option value="category">Category</option>
        </select>
        <button 
          onClick={() => props.handleSort('price')}
          className="btn btn-outline btn-sm flex items-center gap-1"
        >
          Sort by Price
          {props.sortConfig.key === 'price' && (
            props.sortConfig.direction === 'ascending' 
              ? <BsArrowUp className="text-blue-500" />
              : <BsArrowDown className="text-blue-500" />
          )}
        </button>
      </div>
      <ExportToExcel
        data={props.filterProducts}
        fileName="Products.xlsx"
        columns={props.columnsToExport}
      />
    </div>
  );
}