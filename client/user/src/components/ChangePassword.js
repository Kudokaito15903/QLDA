import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState(null); // Hiển thị thông báo
  const [error, setError] = useState(null); // Hiển thị lỗi

  const passwordRegex = /^[a-zA-Z0-9_!@#\$%\^&\*]{6,20}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Kiểm tra nếu 2 mật khẩu không khớp
    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Kiểm tra regex
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 6-20 characters long and can include letters, numbers, and special characters (_!@#$%^&*)."
      );
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/forgotPassword/changePassword/${email}`,
        { password, repeatPassword }
      );
      setMessage(response.data); // Thông báo thành công
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data || "An error occurred."); // Thông báo lỗi
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Change Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="repeatPassword" className="form-label">
                    Repeat Password
                  </label>
                  <input
                    type="password"
                    id="repeatPassword"
                    className="form-control"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Change Password
                </button>
              </form>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
              {message && (
                <div className="alert alert-success mt-3" role="alert">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
