import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!email) {
  //     alert("Please enter your email.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}auth/login` {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setSuccess(true);
  //       setAlertMessage(data.message);
  //       // window.location.href = data.redirect; // Or use react-router to handle navigation
  //       navigate(data.redirect); // Redirects based on server response
  //     } else {
  //       // setLoading(false);
  //       setSuccess(false);
  //       setAlertMessage(data.error);
  //     }
  //     // setLoading(false);
  //   } catch (error) {
  //     console.log("Error during Login:", error);
  //     setSuccess(false);
  //     setAlertMessage(error.message);
  //   }finally{
  //     setLoading(false);

  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}auth/login`,
        {
          email,
          password,
        }
      );
      // console.log(response);
      const data = response.data;

      if (response.status === 200) {
        setSuccess(true);
        setAlertMessage(data.message);
        // navigate(data.redirect);
        setTimeout(() => navigate(data.redirect),1000)
      } else {
        setSuccess(false);
        setAlertMessage(data.error);
      }
    } catch (error) {
      console.error("Error during Login:", error);
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
                  <h1>Login</h1>
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
                <form className="login-form" onSubmit={handleSubmit}>
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
                    <label htmlFor="email-confirm-password">Password</label>
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
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <Link className="forget-password" to="/forget-password">
                      <h2>Forget Password?</h2>
                    </Link>
                    {/* <a className="forget-password" href="forgetPassword.html">
                      <h2>Forget Password?</h2>
                    </a> */}
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
                      <span className="btn-text">Login</span>
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
                    <a href="">
                      <i className="fa-brands fa-google"></i>
                      <h3>Sign In with Google</h3>
                    </a>
                  </div>
                </div>
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
};

export default Login;
