import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiSave, FiX, FiPackage, FiDollarSign, FiImage, FiType, FiInfo, FiCpu } from 'react-icons/fi';
import { FaHeadphones, FaLaptop } from 'react-icons/fa';
import { MdBrandingWatermark, MdDescription } from 'react-icons/md';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    sellingPrice: 0,
    originalPrice: 0,
    image: '',
    description: '',
    productType: '',
    brand: '',
    headphoneSpecs: {
      headphoneType: '',
      speakerSize: '',
      speakerSensitivity: '',
      speakerImpedance: '',
      microphoneSensitivity: '',
      microphoneFrequencyRange: '',
    },
    productSpecs: {
      CPU: '',
      RAM: '',
      hardDrive: '',
      GPU: '',
      Display: '',
      battery: '',
    }
  });

  const [loading, setLoading] = useState(false);
  const [showHeadphoneSpecs, setShowHeadphoneSpecs] = useState(false);
  const [showProductSpecs, setShowProductSpecs] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleHeadphoneSpecsChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      headphoneSpecs: {
        ...product.headphoneSpecs,
        [name]: value
      }
    });
  };

  const handleProductSpecsChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      productSpecs: {
        ...product.productSpecs,
        [name]: value
      }
    });
  };

  const handleProductTypeChange = (e) => {
    const { value } = e.target;
    setProduct({ ...product, productType: value });
    
    setShowHeadphoneSpecs(value.toLowerCase() === 'headphone');
    setShowProductSpecs(value.toLowerCase() !== 'headphone');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/admin/createProduct', product);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product has been added successfully',
        confirmButtonColor: '#3085d6'
      });
      resetForm();
    } catch (error) {
      console.error('Error adding product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Unable to add product. Please try again!',
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProduct({
      name: '',
      sellingPrice: 0,
      originalPrice: 0,
      image: '',
      description: '',
      productType: '',
      brand: '',
      headphoneSpecs: {
        headphoneType: '',
        speakerSize: '',
        speakerSensitivity: '',
        speakerImpedance: '',
        microphoneSensitivity: '',
        microphoneFrequencyRange: '',
      },
      productSpecs: {
        CPU: '',
        RAM: '',
        hardDrive: '',
        GPU: '',
        Display: '',
        battery: '',
      }
    });
    setShowHeadphoneSpecs(false);
    setShowProductSpecs(false);
  };

  const confirmReset = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "All entered data will be lost!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        resetForm();
      }
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center text-gray-800">
        <FiPackage className="mr-2" /> Add New Product
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center font-medium text-gray-700">
                <FiType className="mr-2" /> Product Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
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
              value={product.brand}
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
              value={product.sellingPrice}
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
              value={product.originalPrice}
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
              value={product.image}
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
              value={product.productType}
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

        <div className="form-control flex flex-col">
          <label className="label">
            <span className="label-text flex items-center font-medium text-gray-700">
              <MdDescription className="mr-2" /> Description
            </span>
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="textarea textarea-bordered h-32 focus:ring-2 focus:ring-blue-500 transition-all duration-200 w-full"
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
                  value={product.headphoneSpecs.headphoneType}
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
                  value={product.headphoneSpecs.speakerSize}
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
                  value={product.headphoneSpecs.speakerSensitivity}
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
                  value={product.headphoneSpecs.speakerImpedance}
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
                  value={product.headphoneSpecs.microphoneSensitivity}
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
                  value={product.headphoneSpecs.microphoneFrequencyRange}
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
                  value={product.productSpecs.CPU}
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
                  value={product.productSpecs.RAM}
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
                  value={product.productSpecs.hardDrive}
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
                  value={product.productSpecs.GPU}
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
                  value={product.productSpecs.Display}
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
                  value={product.productSpecs.battery}
                  onChange={handleProductSpecsChange}
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-8">
          <button 
            type="button" 
            onClick={confirmReset} 
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
            {loading ? 'Processing...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;