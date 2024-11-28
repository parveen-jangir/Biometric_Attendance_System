import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:3001/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setAlertMessage(data.message);
        // navigate(data.redirect); // Redirects based on server response
        window.location.href = data.redirect;
      } else {
        setLoading(false);

        setAlertMessage(data.error);
        setSuccess(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error generating OTP:", error);
      setAlertMessage(error.message);
      setSuccess(false);
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
                  <h1>Sign Up</h1>
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
                <form className="signup-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Full Name</label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Enter Full Name"
                      value={userName}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email-address">Email Address</label>
                    <input
                      type="email"
                      id="email-address"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email-password">Password</label>
                    <input
                      type="password"
                      id="email-password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                        type={showPassword ? "text" : "password"}
                        id="email-confirm-password"
                        placeholder="Enter Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <button className="login-btn" type="submit">
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
                      <span className="btn-text">Sign Up</span>
                    )}
                  </button>
                </form>
                <div className="login-divider">
                  <span></span>
                  <span>or</span>
                  <span></span>
                </div>
                <div className="google-provider">
                  <div className="in-google-provider">
                    <a href="#">
                      <i className="fa-brands fa-google"></i>
                      <h3>Sign In with Google</h3>
                    </a>
                  </div>
                </div>
              </div>
              <div className="login-footer">
                <div className="text-light">
                  Already registered with us? <Link to="/">Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
