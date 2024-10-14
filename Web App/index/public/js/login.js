const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.querySelector("#email-address").value.trim();
  const password = document.querySelector("#email-confirm-password").value;
  const alertMessage = document.querySelector(".alert-messages");
  const loader = document.querySelector(".loader");
  const btnText = document.querySelector(".btn-text");

  if (!email) return alert("Please enter your email.");

  try {
    loader.style.display = "flex";
    btnText.style.display = "none";
    const response = await fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
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
    console.error("Error during Login:", error);
    // alert("Failed to send OTP. Please try again.");
    btnText.style.display = "block";
    loader.style.display = "none";
    alertMessage.classList.add("error");
    alertMessage.style.display = "block";
    alertMessage.innerText = error;
  }
});



// const googleProvider = document.querySelector(".in-google-provider");
// if (googleProvider) {
//   googleProvider.addEventListener("click", async (e) => {
//     e.preventDefault();

//     const alertMessage = document.querySelector(".alert-messages");

//     let { data, error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         redirectTo: "http://127.0.0.1:5500/Web%20Interface/index/index.html",
//       },
//     });

//     if (error) {
//       alertMessage.classList.add("error");
//       alertMessage.style.display = "block";
//       alertMessage.innerText = `Google Error : ${error.message}`;
//     } else {
//       console.log("Signed in:", data);
//     }
//     console.log(data);
//   });
// }
