import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPackage, FiCpu, FiInfo } from 'react-icons/fi';
import { FaHeadphones, FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import { MdBrandingWatermark, MdDescription } from 'react-icons/md';

const ProductInfo = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/products/detail/${id}`);
        console.log(response.data);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product information');
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 bg-gray-50 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold text-gray-600 mb-2">Product Not Found</h2>
        <p className="text-gray-700">The requested product information is not available.</p>
      </div>
    );
  }

  const getProductTypeIcon = () => {
    switch (product.productType.toLowerCase()) {
      case 'headphone':
        return <FaHeadphones className="mr-2 text-blue-600" />;
      case 'laptop':
        return <FaLaptop className="mr-2 text-blue-600" />;
      case 'smartphone':
        return <FaMobileAlt className="mr-2 text-blue-600" />;
      case 'tablet':
        return <FaTabletAlt className="mr-2 text-blue-600" />;
      default:
        return <FiPackage className="mr-2 text-blue-600" />;
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center text-gray-800">
        {getProductTypeIcon()} {product.name} Details
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="flex justify-center items-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-full h-auto rounded-lg shadow-md"
            style={{ maxHeight: '300px' }} 
          />
        </div>

        {/* Basic Information */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <MdBrandingWatermark className="text-blue-600" />
            <span className="font-semibold text-gray-700">Brand:</span>
            <span>{product.brand}</span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <FiInfo className="text-blue-600" />
            <span className="font-semibold text-gray-700">Product Type:</span>
            <span className="capitalize">{product.productType}</span>
          </div>
          
          <div className="flex items-start gap-2 mb-2">
            <MdDescription className="text-blue-600 mt-1" />
            <span className="font-semibold text-gray-700 mt-1">Description:</span>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <span className="font-bold text-green-600">Sold:</span>
              <span className="text-green-700">{product.sold}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <span className="font-bold text-green-600">Current Price:</span>
              <span className="text-green-700">{product.sellingPrice.toLocaleString()} VND</span>
            </div>

            
            {product.originalPrice > product.sellingPrice && (
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                <span className="font-bold text-gray-500">Original Price:</span>
                <span className="text-gray-500 line-through">{product.originalPrice.toLocaleString()} VND</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      {product.productType.toLowerCase() === 'headphone' && product.headphoneSpecs && (
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100 mt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-800">
            <FaHeadphones className="mr-2" /> Headphone Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">Speaker Size</p>
              <p className="text-gray-600">{product.headphoneSpecs.speakerSize || 'Not specified'}</p>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">Speaker Sensitivity</p>
              <p className="text-gray-600">{product.headphoneSpecs.speakerSensitivity || 'Not specified'}</p>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">Speaker Impedance</p>
              <p className="text-gray-600">{product.headphoneSpecs.speakerImpedance || 'Not specified'}</p>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">Microphone Sensitivity</p>
              <p className="text-gray-600">{product.headphoneSpecs.microphoneSensitivity || 'Not specified'}</p>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">Microphone Frequency Range </p>
              <p className="text-gray-600">{product.headphoneSpecs.microphoneFrequencyRange || 'Not specified'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Other Product Specifications */}
      {product.productType.toLowerCase() !== 'headphone' && product.productSpecs && (
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100 mt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-800">
            <FiCpu className="mr-2" /> Technical Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">CPU</p>
              <p className="text-gray-600">{product.productSpecs.CPU || 'Not specified'}</p>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">RAM</p>
              <p className="text-gray-600">{product.productSpecs.RAM || 'Not specified'}</p>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">Storage</p>
              <p className="text-gray-600">{product.productSpecs.hardDrive || 'Not specified'}</p>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">GPU</p>
              <p className="text-gray-600">{product.productSpecs.GPU || 'Not specified'}</p>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">Display</p>
              <p className="text-gray-600">{product.productSpecs.Display || 'Not specified'}</p>
            </div>

            <div className="p-3 bg-white rounded-lg shadow-sm">
              <p className="font-medium text-gray-700">Battery</p>
              <p className="text-gray-600">{product.productSpecs.battery || 'Not specified'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo; 