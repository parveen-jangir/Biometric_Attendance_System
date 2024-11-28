import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function ConfirmNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [Success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    if (tokenParam) {
      // console.log(tokenParam)
      setToken(tokenParam);
      // console.log(token)
    } else {
      alert("Inv.");
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setSuccess(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:3001/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setAlertMessage(data.message);
        setSuccess(true);
        alert("Password reset successfully.");
        window.location.href = data.redirect;
      } else {
        setAlertMessage(data.error);
        console.log(data.error);
        setSuccess(false);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error during Forget Password:", error);
      setLoading(false);
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
                  <h1>Forget Password</h1>
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
                <form className="resetPassword-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email-password">Password</label>
                    <input
                      type="password"
                      id="email-password"
                      placeholder="Enter New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email-confirm-password">
                      Confirm Password
                    </label>
                    <div className="input-container">
                      <div
                        className="password-icon"
                        onClick={togglePasswordVisibility}
                      >
                        <i
                          className={`fa-regular ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </div>
                      <input
                        type={showPassword ? "type" : "password"}
                        id="email-confirm-password"
                        placeholder="Enter Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    className="login-btn"
                    type="submit"
                    disabled={loading}
                  >
                    <span className="btn-text">Submit</span>
                    {loading && (
                      <div className="loader">
                        <div className="loading">
                          <span className="rect1"></span>
                          <span className="rect2"></span>
                          <span className="rect3"></span>
                          <span className="rect4"></span>
                          <span className="rect5"></span>
                        </div>
                      </div>
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
}

export default ConfirmNewPassword;
