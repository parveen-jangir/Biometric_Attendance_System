const signUpForm = document.querySelector(".signup-form");

signUpForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const userName = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email-address").value.trim();
  const password = document.querySelector("#email-password").value;
  const confirmPassword = document.querySelector("#email-password").value;
  const alertMessage = document.querySelector(".alert-messages");
  const loader = document.querySelector(".loader");
  const btnText = document.querySelector(".btn-text");

  if (!email) return alert("Please enter your email.");

  try {
    loader.style.display = "flex";
    btnText.style.display = "none";
    const response = await fetch("http://20.198.48.206:3000/generate-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // alert(data.message);
      alertMessage.classList.add("success");
      alertMessage.style.display = "block";
      alertMessage.innerText = data.message;
      window.location.href = data.redirect;
      // window.location.href = `signup-otp.html?email=${encodeURIComponent(email)}`;
    } else {
      btnText.style.display = "block";
      loader.style.display = "none";
      alertMessage.classList.add("error");
      alertMessage.style.display = "block";
      alertMessage.innerText = data.error;
      // alert(data.error);
    }
    loader.style.display = "none";
    btnText.style.display = "block";
  } catch (error) {
    console.error("Error generating OTP:", error);
    // alert("Failed to send OTP. Please try again.");
    btnText.style.display = "block";
    loader.style.display = "none";
    alertMessage.classList.add("error");
    alertMessage.style.display = "block";
    alertMessage.innerText = error;
  }
});
