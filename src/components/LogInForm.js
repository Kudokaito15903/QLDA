import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LogInContext from "../context/LogInContext";

const LoginForm = () => {
  const {LoginData } = useContext(LogInContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  // Regex for validating username (alphanumeric, no special characters)
  const usernameRegex = /^[a-zA-Z0-9]{5,16}$/;
  // Regex for validating password (alphanumeric, at least 6 characters)
  const passwordRegex = /^[a-zA-Z0-9_!@#\$%\^&\*]{6,20}$/;

  // Handle username input validation
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (!usernameRegex.test(value)) {
      setUsernameError(
        "Username should be 5-16 characters and can only include letters, numbers, and underscores."
      );
    }
    else if(value === "Username"){
      setUsernameError("Username cannot be Username");
    } else {
      setUsernameError("");
    }
  };

  // Handle password input validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password should be 6-20 characters and can include letters, numbers, and special characters."
      );
    } else {
      setPasswordError("");
    }
  };

  // Handle form submission
  const handleCheck = (e) => {
    e.preventDefault();
    if (!usernameError && !passwordError && username && password) {

      LoginData.login(username,password);
      
    } else {
      alert("Please correct the errors and try again");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <div
        className="card shadow"
        style={{ width: "1200px", maxWidth: "90%", borderRadius: "15px" }}
      >
        <div
          className="card-header text-center text-white"
          style={{
            background: "#871C1C",
            color: "#fff",
            borderRadius: "15px 15px 0 0",
          }}
        >
          <h2>Đăng nhập</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleCheck}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                required
                placeholder="Nhập tên người dùng"
                value={username}
                onChange={handleUsernameChange}
              />
              {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
            </div>
            <div className="mb-3">
              <input
                type="Nhập mật khẩu"
                className="form-control form-control-lg"
                required
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link to={"/getEmail"} style={{ 
                color: "#871C1C",
                textDecoration: "none",
                fontWeight: "bold"
              }}>
                Quên mật khẩu?
              </Link>
            </div>
            <div className="mb-3">        
              <button type="submit" className="custom-login-btn btn w-100 btn-lg" style={{
                background: "#871C1C",
                color: "#fff"
              }} >
                Đăng nhập
              </button>
            </div>
            <div className="text-center">
              Bạn chưa có tài khoản?{" "}
             
              <Link to={"/signup"}  style={{ 
                color: "#871C1C",
                textDecoration: "none",
                fontWeight: "bold"
              }}>
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
