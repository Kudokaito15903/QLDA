import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" }); // Alert state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" }); // Clear previous messages

    try {
      const res = await axios.post(
        `http://localhost:8080/forgotPassword/verifyEmail/${email}`
      );

      if (res.status === 200 && res.data) {
        setMessage({ type: "success", text: "OTP sent successfully!" });
        
        setTimeout(() => {
          navigate("/getOTP", { state : {email}});
        }, 1500);
      }
    } catch (error) {
      setMessage({
        type: "danger",
        text:
          error.response?.data ||
          "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Verify Email</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Link to={"/login"} className="text-primary">
                    Back to Login
                  </Link>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send OTP
                </button>
              </form>
              {message.text && (
                <div
                  className={`alert mt-3 alert-${message.type}`}
                  role="alert"
                >
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
