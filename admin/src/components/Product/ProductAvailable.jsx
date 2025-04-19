import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiSave, FiX, FiPackage, FiPlusCircle, FiEdit, FiTrash2 } from 'react-icons/fi';
import { IoMdColorPalette } from 'react-icons/io';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BsCalendarDate } from 'react-icons/bs';
import { format } from 'date-fns';
import Pagination from '../Pagination';

const ProductAvailable = ({ productId, productName }) => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [formData, setFormData] = useState({
    productId: productId,
    productName: productName,
    color: '',
    available: 0
  });

  useEffect(() => {
    fetchProductAvailability();
  }, [productId, currentPage]);

  const fetchProductAvailability = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/productAvailable`);
      console.log(response.data);
      setAvailableProducts(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.error('Error fetching product availability:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load product availability information.',
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'available' ? parseInt(value, 10) : value
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:8080/productAvailable/save', formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product variant added successfully',
        confirmButtonColor: '#3085d6'
      });
      setIsAddModalOpen(false);
      resetForm();
      fetchProductAvailability();
    } catch (error) {
      console.error('Error adding product variant:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add product variant. Please try again!',
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setFormData({
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      color: item.color,
      available: item.available
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:8080/productAvailable/update`, formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product variant updated successfully',
        confirmButtonColor: '#3085d6'
      });
      setIsEditModalOpen(false);
      fetchProductAvailability();
    } catch (error) {
      console.error('Error updating product variant:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update product variant. Please try again!',
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/productAvailable/delete/${id}`);
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Product variant has been deleted.',
            confirmButtonColor: '#3085d6'
          });
          fetchProductAvailability();
        } catch (error) {
          console.error('Error deleting product variant:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete product variant. Please try again!',
            confirmButtonColor: '#d33'
          });
        }
      }
    });
  };

  const getStatusColor = (quantity) => {
    if (quantity <= 0) {
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-600',
        status: 'Out of Stock',
        badgeColor: 'bg-red-500'
      };
    } else if (quantity <= 5) {
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-600',
        status: 'Low Stock',
        badgeColor: 'bg-yellow-500'
      };
    } else {
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-600',
        status: 'In Stock',
        badgeColor: 'bg-green-500'
      };
    }
  };

  const resetForm = () => {
    setFormData({
      productId: productId,
      productName: productName,
      color: '',
      available: 0
    });
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    resetForm();
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold flex items-center text-gray-800">
          <HiOutlineShoppingBag className="mr-2" /> Product Availability
        </h3>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary btn-sm flex items-center"
        >
          <FiPlusCircle className="mr-2" /> Add Variant
        </button>
      </div>

      {loading && !isAddModalOpen && !isEditModalOpen ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : availableProducts.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <HiOutlineShoppingBag className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-gray-600">No variants available for this product.</p>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary btn-sm mt-4"
          >
            Add New Variant
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3">ID</th>
                  <th className="py-3">ProductName</th>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Last Updated</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {availableProducts.map((item) => {
                  const { bgColor, textColor, status, badgeColor } = getStatusColor(item.available);
                  return (
                    <tr key={item.id} className={`border-b hover:bg-gray-50 transition-colors duration-150 ${item.available <= 0 ? 'bg-red-50' : ''}`}>
                      <td className="py-3">{item.id}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          {item.productName}
                        </div>
                        
                      </td>
                      <td className="py-3">
                        <span className={`font-semibold ${item.available <= 0 ? 'text-red-600' : ''}`}>
                          {item.available}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${badgeColor}`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-3">{formatDate(item.lastUpdated)}</td>
                      <td className="py-3">
                        <div className="flex justify-center space-x-2">
                          <button 
                            onClick={() => handleEditClick(item)}
                            className="btn btn-sm btn-outline btn-info"
                          >
                            <FiEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="btn btn-sm btn-outline btn-error"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-md mx-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Add Product Variant
              </h3>
              <button
                onClick={closeAddModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center font-medium text-gray-700">
                    <FiPackage className="mr-2" /> Product
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  disabled
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center font-medium text-gray-700">
                    <IoMdColorPalette className="mr-2" /> Color
                  </span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                    placeholder="e.g. Red, Blue, #FF5733"
                  />
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-12 h-10 p-1 border rounded"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center font-medium text-gray-700">
                    <HiOutlineShoppingBag className="mr-2" /> Available Quantity
                  </span>
                </label>
                <input
                  type="number"
                  name="available"
                  value={formData.available}
                  onChange={handleInputChange}
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  min="0"
                  required
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="btn btn-outline hover:bg-gray-200 transition-colors duration-200 flex items-center"
                >
                  <FiX className="mr-2" /> Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-success btn-soft hover:bg-blue-600 transition-colors duration-200 flex items-center ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {!loading && <FiSave className="mr-2" />}
                  {loading ? 'Processing...' : 'Add Variant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-md mx-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit Product Variant
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
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center font-medium text-gray-700">
                    <FiPackage className="mr-2" /> Product
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  disabled
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center font-medium text-gray-700">
                    <IoMdColorPalette className="mr-2" /> Color
                  </span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="w-12 h-10 p-1 border rounded"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center font-medium text-gray-700">
                    <HiOutlineShoppingBag className="mr-2" /> Available Quantity
                  </span>
                </label>
                <input
                  type="number"
                  name="available"
                  value={formData.available}
                  onChange={handleInputChange}
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  min="0"
                  required
                />
                {formData.available <= 0 && (
                  <p className="text-red-500 text-sm mt-1">Warning: This product is out of stock!</p>
                )}
                {formData.available > 0 && formData.available <= 5 && (
                  <p className="text-yellow-500 text-sm mt-1">Warning: Stock is running low!</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center font-medium text-gray-700">
                    <BsCalendarDate className="mr-2" /> Last Updated
                  </span>
                </label>
                <input
                  type="text"
                  value={formatDate(selectedItem.lastUpdated)}
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  disabled
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="btn btn-outline hover:bg-gray-200 transition-colors duration-200 flex items-center"
                >
                  <FiX className="mr-2" /> Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-success btn-soft hover:bg-blue-600 transition-colors duration-200 flex items-center ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {!loading && <FiSave className="mr-2" />}
                  {loading ? 'Processing...' : 'Update Variant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAvailable; 