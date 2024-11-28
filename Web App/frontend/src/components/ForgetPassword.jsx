import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitButton, setSubmitButton] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      setSubmitButton(false);
      const response = await fetch("http://127.0.0.1:3001/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setAlertMessage(data.message);
        // window.location.href = data.redirect; // Or use react-router to handle navigation
      } else {
        setSubmitButton(true);
        setLoading(false);
        setAlertMessage(data.error);
        setSuccess(false);
        window.location.href = data.redirect;
      }
      setSubmitButton(true);
      setLoading(false);
    } catch (error) {
      console.error("Error during Froget Password:", error);
      setSubmitButton(true);
      setLoading(false);
      setAlertMessage(error);
      setSuccess(false);
    }
  };

  /*         const forgetPasswordForm = document.querySelector(".forgetPassword-form");

        forgetPasswordForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const email = document.querySelector("#email-address").value.trim();
            const alertMessage = document.querySelector(".alert-messages");
            const loader = document.querySelector(".loader");
            const btnText = document.querySelector(".btn-text");

            if (!email) return alert("Please enter your email.");

            try {
                loader.style.display = "flex";
                btnText.style.display = "none";
                const response = await fetch("http://20.198.48.206:3000/forget-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    alertMessage.classList.add("success");
                    alertMessage.style.display = "block";
                    alertMessage.innerText = data.message;
                    // window.location.href = data.redirect;
                } else {
                    btnText.style.display = "block";
                    loader.style.display = "none";
                    alertMessage.classList.add("error");
                    alertMessage.style.display = "block";
                    alertMessage.innerText = data.error;
                }
                loader.style.display = "none";
                btnText.style.display = "block";
            } catch (error) {
                console.error("Error during forget password:", error);
                btnText.style.display = "block";
                loader.style.display = "none";
                alertMessage.classList.add("error");
                alertMessage.style.display = "block";
                alertMessage.innerText = error;
            }
        }); */

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
                  <button className="login-btn" type="submit" disabled={!submitButton}>
                    {submitButton && <span className="btn-text">Submit</span>}
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
