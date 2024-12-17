import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function ConfirmNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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
      alert("Invalid Token.");
      navigate("/");
      // setSuccess(false);
      // setAlertMessage("Inavlid Token");
      // setTimeout(() => navigate("/"),1000)

    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setSuccess(false);
      setAlertMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}auth/confirm-newpassword`,
        {
          token,
          newPassword,
        }
      );

      const data = response.data;

      if (response.status === 200) {
        setSuccess(true);
        setAlertMessage(data.message);
        alert("Password reset successfully.");
        navigate(data.redirect);
      } else {
        setSuccess(false);
        setAlertMessage(data.error);
      }
    } catch (error) {
      console.error("Error during confirm new password:", error);
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
                  <h1>Forget Password</h1>
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
