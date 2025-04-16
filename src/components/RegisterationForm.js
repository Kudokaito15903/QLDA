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
      console.error("Error checking username availability:", error);
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
        "Username should be 5-16 characters and can only include letters, numbers."
      );
      return;
    } else {
      setUsernameError(""); // Bỏ lỗi regex
    }

    // Kiểm tra trùng tên người dùng
    const userExists = await checkUsernameAvailability(value);
    if (userExists) {
      setUsernameError("Username already exists, please choose another.");
    } else {
      setUsernameError("");
    }
    if(formData.username === "Username"){
      setUsernameError("Username cannot be Username");
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
        "Password should be 6-20 characters and can only include letters, numbers, and underscores."
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
      alert("Please correct the errors and try again");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/api/users", {
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
        console.log("Registration successful:", response.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow">
        <div className="card-header text-white bg-primary">
          <h3 className="text-center">Registration</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
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
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your phone number"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
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
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12">
                <label className="form-label">Gender</label>
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
                    Male
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
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            Already a member?{" "}
            <Link to={"/login"} className="text-primary">
              Log in now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
