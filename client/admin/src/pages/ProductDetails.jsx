import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductInfo from '../components/Product/ProductInfo';
import { FiArrowLeft } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <Link 
            to="/product" 
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 w-fit"
          >
            <FiArrowLeft className="mr-2" /> Back to Products
          </Link>
        </div>
        
        <ProductInfo id={id} />
      </div>
    </div>
  );
};

export default ProductDetails; 