import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiSave, FiX, FiPackage, FiDollarSign, FiImage, FiType, FiInfo, FiCpu } from 'react-icons/fi';
import { FaHeadphones } from 'react-icons/fa';
import { MdBrandingWatermark, MdDescription } from 'react-icons/md';

const EditProduct = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    sellingPrice: product.sellingPrice,
    originalPrice: product.originalPrice,
    image: product.image,
    description: product.description,
    productType: product.productType,
    brand: product.brand,
    headphoneSpecs: product.headphoneSpecs || {
      headphoneType: '',
      speakerSize: '',
      speakerSensitivity: '',
      speakerImpedance: '',
      microphoneSensitivity: '',
      microphoneFrequencyRange: '',
    },
    productSpecs: product.productSpecs || {
      CPU: '',
      RAM: '',
      hardDrive: '',
      GPU: '',
      Display: '',
      battery: '',
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [showHeadphoneSpecs, setShowHeadphoneSpecs] = useState(product.productType.toLowerCase() === 'headphone');
  const [showProductSpecs, setShowProductSpecs] = useState(product.productType.toLowerCase() !== 'headphone');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'sellingPrice' || name === 'originalPrice' ? parseFloat(value) : value
    });
  };

  const handleHeadphoneSpecsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      headphoneSpecs: {
        ...formData.headphoneSpecs,
        [name]: value
      }
    });
  };

  const handleProductSpecsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      productSpecs: {
        ...formData.productSpecs,
        [name]: value
      }
    });
  };

  const handleProductTypeChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, productType: value });
    
    setShowHeadphoneSpecs(value.toLowerCase() === 'headphone');
    setShowProductSpecs(value.toLowerCase() !== 'headphone');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Product:', product); // Log the product object
      if (!product || !product.id) {
        throw new Error('Product ID is missing');
      }    
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
            <span className="label-text flex items-center font-medium text-gray-700">
              <FiType className="mr-2" /> Product Name
            </span>
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
            <span className="label-text flex items-center font-medium text-gray-700">
              <MdBrandingWatermark className="mr-2" /> Brand
            </span>
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
            <span className="label-text flex items-center font-medium text-gray-700">
              <FiDollarSign className="mr-2" /> Selling Price (VND)
            </span>
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
            <span className="label-text flex items-center font-medium text-gray-700">
              <FiDollarSign className="mr-2" /> Original Price (VND)
            </span>
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
            <span className="label-text flex items-center font-medium text-gray-700">
              <FiImage className="mr-2" /> Image URL
            </span>
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
            <span className="label-text flex items-center font-medium text-gray-700">
              <FiInfo className="mr-2" /> Product Type
            </span>
          </label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleProductTypeChange}
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
          <span className="label-text flex items-center font-medium text-gray-700">
            <MdDescription className="mr-2" /> Description
          </span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered h-32 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          required
        ></textarea>
      </div>

      {/* Headphone Specifications */}
      {showHeadphoneSpecs && (
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-800">
            <FaHeadphones className="mr-2" /> Headphone Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Headphone Type</span>
              </label>
              <input
                type="text"
                name="headphoneType"
                value={formData.headphoneSpecs.headphoneType}
                onChange={handleHeadphoneSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Speaker Size</span>
              </label>
              <input
                type="text"
                name="speakerSize"
                value={formData.headphoneSpecs.speakerSize}
                onChange={handleHeadphoneSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Speaker Sensitivity</span>
              </label>
              <input
                type="text"
                name="speakerSensitivity"
                value={formData.headphoneSpecs.speakerSensitivity}
                onChange={handleHeadphoneSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Speaker Impedance</span>
              </label>
              <input
                type="text"
                name="speakerImpedance"
                value={formData.headphoneSpecs.speakerImpedance}
                onChange={handleHeadphoneSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Microphone Sensitivity</span>
              </label>
              <input
                type="text"
                name="microphoneSensitivity"
                value={formData.headphoneSpecs.microphoneSensitivity}
                onChange={handleHeadphoneSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Microphone Frequency Range</span>
              </label>
              <input
                type="text"
                name="microphoneFrequencyRange"
                value={formData.headphoneSpecs.microphoneFrequencyRange}
                onChange={handleHeadphoneSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* Other Product Specifications */}
      {showProductSpecs && (
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-800">
            <FiCpu className="mr-2" /> Technical Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">CPU</span>
              </label>
              <input
                type="text"
                name="CPU"
                value={formData.productSpecs.CPU}
                onChange={handleProductSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">RAM</span>
              </label>
              <input
                type="text"
                name="RAM"
                value={formData.productSpecs.RAM}
                onChange={handleProductSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Storage</span>
              </label>
              <input
                type="text"
                name="hardDrive"
                value={formData.productSpecs.hardDrive}
                onChange={handleProductSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">GPU</span>
              </label>
              <input
                type="text"
                name="GPU"
                value={formData.productSpecs.GPU}
                onChange={handleProductSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Display</span>
              </label>
              <input
                type="text"
                name="Display"
                value={formData.productSpecs.Display}
                onChange={handleProductSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Battery</span>
              </label>
              <input
                type="text"
                name="battery"
                value={formData.productSpecs.battery}
                onChange={handleProductSpecsChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onClose}
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
          {loading ? 'Processing...' : 'Update Product'}
        </button>
      </div>
    </form>
  );
};

export default EditProduct; 