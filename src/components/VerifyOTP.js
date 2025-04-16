import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" }); // Alert state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" }); // Clear previous messages

    try {
      const response = await axios.post(
        `http://localhost:8080/forgotPassword/verifyOTP/${otp}/${email}`
      );
      if (response.status === 200) {
        setMessage({ type: "success", text: response.data });
        // Redirect to change password page after success
        setTimeout(() => {
          navigate("/changePassword" , {state : {email}});
        }, 1500);
      }
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.response?.data || "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Verify OTP</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">
                    Type your OTP
                  </label>
                  <input
                    type="number"
                    id="otp"
                    className="form-control"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Verify OTP
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

export default VerifyOTP;

