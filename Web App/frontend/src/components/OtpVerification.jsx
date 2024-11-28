import React, { useState, useEffect } from "react";

const OtpVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [Success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const response = await fetch("http://127.0.0.1:3001/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setSuccess(true);
        setAlertMessage(data.message);
        window.location.href = data.redirect;
        // const next = new URLSearchParams(window.location.search).get("next");
        // setTimeout(() => {
        //   window.location.href = next || data.redirect;
        // }, 1500);
      } else {
        setLoading(false);
        setSuccess(false);
        setAlertMessage(data.error || "OTP verification failed.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setSuccess(false);
      setAlertMessage(error);
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
                      Success ? "success" : "error"
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
