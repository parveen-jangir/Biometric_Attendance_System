import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}auth/forget-password`,
        {
          email,
        }
      );

      const data = response.data;
      if (response.status === 200) {
        setSuccess(true);
        setAlertMessage(data.message);
      } else {
        setSuccess(false);
        setAlertMessage(data.error);
        // navigate(data.redirect);
      }
    } catch (error) {
      console.error("Error during Froget Password:", error);
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
            {/* <div className="login-header"></div> */}
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
                <form
                  className="forgetPassword-form"
                  onSubmit={handleSubmit}
                  action=""
                >
                  <div className="form-group">
                    <label htmlFor="email-address">Email Address</label>
                    <input
                      type="email"
                      id="email-address"
                      name=""
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* <div className="form-group">
                                    <label htmlFor="email-confirm-password">Password</label>
                                    <div className="input-container">
                                        <div className="password-icon">
                                            <i className="fa-regular fa-eye"></i>
                                            <i className="fa-regular fa-eye-slash"></i>
                                        </div>
                                        <input type="password" id="email-confirm-password" placeholder="Enter Password">
                                    </div>
                                </div>
                                <div className="form-group">
                                    <a className="forget-password" href="">
                                        <h2>Forget Password?</h2>
                                    </a>
                                </div> */}
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
                      <span className="btn-text">Login</span>
                    )}
                  </button>
                </form>
                {/* <div className="login-divider">
                        <span></span>
                        <span>or</span>
                        <span></span>
                </div>  */}
                {/* <div className="google-provider">
                        <div className="in-google-provider">
                            <a href="">
                                <img src="" alt="">
                                <i className="fa-brands fa-google"></i>
                                <h3>Sign In with Google</h3>
                            </a>
                        </div>
                    /div>  */}
              </div>
              <div className="login-footer">
                <div className="text-light">
                  Not a member yet?{" "}
                  {/* <a href="signup.html">Create a New Account</a> */}
                  <Link to="/signup">Create a New Account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
