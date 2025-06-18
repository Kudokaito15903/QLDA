import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
  });

  // Regex for validating username (alphanumeric, no special characters)
  const usernameRegex = /^[a-zA-Z0-9]{5,16}$/;
  // Regex for validating password (alphanumeric, at least 6 characters)
  const passwordRegex = /^[a-zA-Z0-9_!@#\$%\^&\*]{6,20}$/;
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      const userExists = response.data.some((user) => user.username === username);
      return userExists;
    } catch (error) {
      console.error("Lỗi khi kiểm tra tên đăng nhập khả dụng:", error);
      return false;
    }
  };

  // Hàm xử lý khi nhập tên người dùng
  const handleUserNameValidation = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, username: value });

    // Kiểm tra regex
    if (!usernameRegex.test(value)) {
      setUsernameError(
        "Tên đăng nhập phải từ 5 đến 16 ký tự và chỉ được bao gồm chữ cái và chữ số."
      );
      return;
    } else {
      setUsernameError(""); // Bỏ lỗi regex
    }

    // Kiểm tra trùng tên người dùng
    const userExists = await checkUsernameAvailability(value);
    if (userExists) {
      setUsernameError("Tên đăng nhập đã tồn tại.");
    } else {
      setUsernameError("");
    }
    if(formData.username === "Username"){
      setUsernameError("Username không được là Username.");
    }else{
      setUsernameError("");
    }
  };

  const handlePasswordValidation = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      password: value,
    });
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Mật khẩu phải có từ 6 đến 20 ký tự và chỉ được bao gồm chữ cái, chữ số và dấu gạch dưới."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameError || passwordError) {
      alert("Vui lòng sửa các lỗi và thử lại.");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/api/users/register", {
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        phonenumber: formData.phonenumber,
        password: formData.password,
        gender: formData.gender,
        address: formData.address,
        createdAt: new Date()
      });
  
      if (response.status === 201) {
        console.log("Đăng ký thành công:", response.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Đăng ký thất bại:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow">
        <div className="card-header text-white" style={{ background: "#871C1C", color: "#fff"}}>
          <h3 className="text-center">Đăng ký tài khoản</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập họ và tên"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Tên đăng nhập</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên đăng nhập"
                  name="username"
                  value={formData.username}
                  onChange={handleUserNameValidation}
                  required
                />
                {usernameError && (
                  <p style={{ color: "red" }}>{usernameError}</p>
                )}
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Nhập địa chỉ email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập số điện thoại"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  value={formData.password}
                  onChange={handlePasswordValidation}
                  required
                />
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Xác nhận lại mật khẩu"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập địa chỉ của bạn"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Giới tính</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    id="genderMale"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="genderMale">
                    Nam
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    id="genderFemale"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="genderFemale">
                    Nữ
                  </label>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn w-100" style={{
                background: "#871C1C",
                color: "#fff"
              }}>
                Đăng ký
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            Đã có tài khoản?{" "}
            <Link to={"/login"} style={{ 
                color: "#871C1C",
                textDecoration: "none",
                fontWeight: "bold"
              }}>
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
