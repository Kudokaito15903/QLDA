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
      const response = await axios.post('/api/products', product);
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Sản phẩm đã được thêm thành công',
        confirmButtonColor: '#3085d6'
      });
      resetForm();
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Không thể thêm sản phẩm. Vui lòng thử lại!',
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
      title: 'Bạn có chắc chắn?',
      text: "Tất cả dữ liệu nhập sẽ bị xóa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        resetForm();
      }
    });
  };

  return (
    <div className="p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
        <FiPackage className="mr-2" /> Thêm Sản Phẩm Mới
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thông tin cơ bản */}
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center">
                <FiType className="mr-2" /> Tên sản phẩm
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center">
                <MdBrandingWatermark className="mr-2" /> Thương hiệu
              </span>
            </label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center">
                <FiDollarSign className="mr-2" /> Giá bán
              </span>
            </label>
            <input
              type="number"
              name="sellingPrice"
              value={product.sellingPrice}
              onChange={handleChange}
              className="input input-bordered w-full"
              min="0"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center">
                <FiDollarSign className="mr-2" /> Giá gốc
              </span>
            </label>
            <input
              type="number"
              name="originalPrice"
              value={product.originalPrice}
              onChange={handleChange}
              className="input input-bordered w-full"
              min="0"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center">
                <FiImage className="mr-2" /> URL hình ảnh
              </span>
            </label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center">
                <FiInfo className="mr-2" /> Loại sản phẩm
              </span>
            </label>
            <select
              name="productType"
              value={product.productType}
              onChange={handleProductTypeChange}
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
            <span className="label-text flex items-center">
              <MdDescription className="mr-2" /> Mô tả
            </span>
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="textarea textarea-bordered h-24"
            required
          ></textarea>
        </div>

        {/* Thông số kỹ thuật tai nghe */}
        {showHeadphoneSpecs && (
          <div className="bg-base-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaHeadphones className="mr-2" /> Thông số tai nghe
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Loại tai nghe</span>
                </label>
                <input
                  type="text"
                  name="headphoneType"
                  value={product.headphoneSpecs.headphoneType}
                  onChange={handleHeadphoneSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Kích thước loa</span>
                </label>
                <input
                  type="text"
                  name="speakerSize"
                  value={product.headphoneSpecs.speakerSize}
                  onChange={handleHeadphoneSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Độ nhạy loa</span>
                </label>
                <input
                  type="text"
                  name="speakerSensitivity"
                  value={product.headphoneSpecs.speakerSensitivity}
                  onChange={handleHeadphoneSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Trở kháng loa</span>
                </label>
                <input
                  type="text"
                  name="speakerImpedance"
                  value={product.headphoneSpecs.speakerImpedance}
                  onChange={handleHeadphoneSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Độ nhạy mic</span>
                </label>
                <input
                  type="text"
                  name="microphoneSensitivity"
                  value={product.headphoneSpecs.microphoneSensitivity}
                  onChange={handleHeadphoneSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Dải tần mic</span>
                </label>
                <input
                  type="text"
                  name="microphoneFrequencyRange"
                  value={product.headphoneSpecs.microphoneFrequencyRange}
                  onChange={handleHeadphoneSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Thông số kỹ thuật sản phẩm khác */}
        {showProductSpecs && (
          <div className="bg-base-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FiCpu className="mr-2" /> Thông số kỹ thuật
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">CPU</span>
                </label>
                <input
                  type="text"
                  name="CPU"
                  value={product.productSpecs.CPU}
                  onChange={handleProductSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">RAM</span>
                </label>
                <input
                  type="text"
                  name="RAM"
                  value={product.productSpecs.RAM}
                  onChange={handleProductSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Ổ cứng</span>
                </label>
                <input
                  type="text"
                  name="hardDrive"
                  value={product.productSpecs.hardDrive}
                  onChange={handleProductSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">GPU</span>
                </label>
                <input
                  type="text"
                  name="GPU"
                  value={product.productSpecs.GPU}
                  onChange={handleProductSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Màn hình</span>
                </label>
                <input
                  type="text"
                  name="Display"
                  value={product.productSpecs.Display}
                  onChange={handleProductSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pin</span>
                </label>
                <input
                  type="text"
                  name="battery"
                  value={product.productSpecs.battery}
                  onChange={handleProductSpecsChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button 
            type="button" 
            onClick={confirmReset} 
            className="btn btn-outline flex items-center"
          >
            <FiX className="mr-2" /> Hủy
          </button>
          <button 
            type="submit" 
            className={`btn btn-success btn-soft flex items-center ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {!loading && <FiSave className="mr-2" />} 
            {loading ? 'Đang xử lý...' : 'Thêm sản phẩm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;