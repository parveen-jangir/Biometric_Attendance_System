import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OtpVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter your OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}auth/verify-otp`,
        {
          email,
          otp,
        }
      );

      const data = response.data;

      if (response.status === 200) {
        setSuccess(true);
        setAlertMessage(data.message);
        // navigate(data.redirect);
        setTimeout(() => navigate(data.redirect),1000)
      } else {
        setSuccess(false);
        setAlertMessage(data.error || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error during Otp Verification:", error);
      setSuccess(false);
      setAlertMessage(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-main">
      <div className="main-body">
        <div className="container">
          <div className="login">
            <div className="login-wrapper">
              <div className="login-body">
                <div className="login-title">
                  <h1>Otp Verification</h1>
                </div>
                {alertMessage && (
                  <div
                    className={`alert-messages ${
                      success ? "success" : "error"
                    }`}
                  >
                    {alertMessage}
                  </div>
                )}
                <form className="otp-signup-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      id="otp-email-address"
                      value={email}
                      placeholder="Enter Email"
                      style={{
                        color: "#727171",
                        cursor: "not-allowed",
                        pointerEvents: "none",
                      }}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      id="otp-code"
                      value={otp}
                      placeholder="Enter Verification Code"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <button
                    className="login-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="loader">
                        <div className="loading">
                          <span className="rect1"></span>
                          <span className="rect2"></span>
                          <span className="rect3"></span>
                          <span className="rect4"></span>
                          <span className="rect5"></span>
                        </div>
                      </div>
                    ) : (
                      <span className="btn-text">Otp Verfiy</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
