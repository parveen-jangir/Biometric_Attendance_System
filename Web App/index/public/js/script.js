const pageHeadings = document.querySelectorAll(".page-heading");
const subContainers = document.querySelectorAll(".sub-container");
const icons = document.querySelectorAll(".n-icon-title");

pageHeadings.forEach((head) => {
  head.addEventListener("click", function () {
    const subContainer = this.nextElementSibling;
    const currentIcon = this.querySelector("i");

    if (!subContainer || !subContainer.classList.contains("sub-container")) {
      return;
    }

    const isCurrentlyOpen =
      subContainer.style.maxHeight && subContainer.style.maxHeight !== "0px";

    subContainers.forEach((container, idx) => {
      container.style.maxHeight = "0px";
      const icon = icons[idx].querySelector("i");
      // if (icon) {
      icon.classList.remove("fa-angle-up");
      icon.classList.add("fa-angle-down");
      // }
    });

    if (isCurrentlyOpen) {
      subContainer.style.maxHeight = "0px";
      if (currentIcon) {
        currentIcon.classList.remove("fa-angle-up");
        currentIcon.classList.add("fa-angle-down");
      }
    } else {
      subContainer.style.maxHeight = subContainer.scrollHeight + "px";
      if (currentIcon) {
        currentIcon.classList.add("fa-angle-up");
        currentIcon.classList.remove("fa-angle-down");
      }
    }
  });
});

const studentPresentToday = document.querySelector(".student-present-today");
const enrollStudent = document.querySelector(".enroll-student");

if (studentPresentToday) {
  const getPresentUrl =
    "https://script.google.com/macros/s/AKfycbyRVHamgUyNMkpzukgtTCv7ZZxk4UHHXxj7c8SLUrw0OFzvxBnbHhj8vllCw25zvN4/exec?action=getPresentStudents";

  async function fetchPresentData(subject) {
    try {
      const response = await fetch(getPresentUrl);
      const data = await response.json();

      studentPresentToday.innerHTML = "";

      data.forEach((student) => {
        student.subject = "Chemistry";

        if (student.subject === subject) {
          const row = document.createElement("tr");

          let checkOutTime = student.checkOut
            ? student.checkOut
            : "Not checked out";
          let totalTime = student.totalTime ? student.totalTime : "N/A";

          row.innerHTML = `
          <td><h3>${student.name}</h3></td>
          <td><h3>${student.checkIn}</h3></td>
          <td><h3>${checkOutTime}</h3></td>
          <td><h3>${totalTime}</h3></td>
        `;

          studentPresentToday.append(row);
        }
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }

  // Get the subject from the URL query parameter
  const params = new URLSearchParams(window.location.search);
  const subject = params.get("subject");

  // Fetch data for the selected subject
  if (subject) {
    fetchPresentData(subject);
  }
}

if (enrollStudent) {
  const getEnrollUrl =
    "https://script.google.com/macros/s/AKfycbyRVHamgUyNMkpzukgtTCv7ZZxk4UHHXxj7c8SLUrw0OFzvxBnbHhj8vllCw25zvN4/exec?action=getAllStudents";

  async function fetchEnrollData() {
    try {
      const response = await fetch(getEnrollUrl);
      const data = await response.json();

      enrollStudent.innerHTML = "";

      data.forEach((student) => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td><h3>${student.name}</h3></td>
        <td><h3>${student.fingerprintID}</h3></td>
        <td><h3>${student.totalPresent}</h3></td>
        <td><h3>${student.totalTime}</h3></td>`;

        enrollStudent.append(row);
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }

  fetchEnrollData(enrollStudent);
}

const rolePageSelect = document.querySelector(".role-page");
if (rolePageSelect) {
  rolePageSelect.addEventListener("change", function () {
    if (rolePageSelect.value !== "default") {
      rolePageSelect.classList.add("changed");
    } else {
      rolePageSelect.classList.remove("changed");
    }
  });
}

const passwordIcon = document.querySelector(".password-icon");
const conPasswordInput = document.querySelector("#email-confirm-password");

if (passwordIcon) {
  passwordIcon.addEventListener("click", () => {
    passwordIcon.classList.toggle("active");
    const type =
      conPasswordInput.getAttribute("type") === "password"
        ? "text"
        : "password";
    conPasswordInput.setAttribute("type", type);
  });
}

// const supabaseUrl = "https://qtivjfcqzfqiveqppcom.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0aXZqZmNxemZxaXZlcXBwY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3ODg2ODAsImV4cCI6MjA0MzM2NDY4MH0.l70sIq9lNrt-MrOJtgDqzZyhqnqqCmB1fxYFeM9QpDQ"; // Your Supabase API Key
// // const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
// const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// const loginForm = document.querySelector(".login-form");
// const signUpForm = document.querySelector(".signup-form");

// if (loginForm) {
//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const email = document.querySelector("#email-address").value;
//     const password = document.querySelector("#email-password").value;
//     const alertMessage = document.querySelector(".alert-messages");
//     const loader = document.querySelector(".loader");
//     const btnText = document.querySelector(".btn-text");

//     loader.style.display = "flex";
//     btnText.style.display = "none";
//     let { data, error } = await supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     });

//     if (error) {
//       btnText.style.display = "block";
//       loader.style.display = "none";
//       alertMessage.classList.add("error");
//       alertMessage.style.display = "block";
//       alertMessage.innerText = `Login Error : ${error.message}`;
//     } else {
//       alertMessage.classList.add("success");
//       alertMessage.style.display = "block";
//       alertMessage.innerText = "Login successful! Redirecting to Home Page";
//       window.location.href = "/Web%20Interface/index/index.html";
//     }
//     loader.style.display = "none";
//     btnText.style.display = "block";

//     console.log(data);
//   });
// }

// if (signUpForm) {
//   signUpForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const email = document.querySelector("#email-address").value;
//     const password = document.querySelector("#email-password").value;
//     const alertMessage = document.querySelector(".alert-messages");
//     const loader = document.querySelector(".loader");
//     const btnText = document.querySelector(".btn-text");

//     loader.style.display = "flex";
//     btnText.style.display = "none";
//     let { data, error } = await supabase.auth.signUp(
//       {
//         email: email,
//         password: password,
//       },
//       {
//         redirectTo: "http://127.0.0.1:5500/Web%20Interface/index/index.html",
//       }
//     );

//     if (error) {
//       btnText.style.display = "block";
//       loader.style.display = "none";
//       alertMessage.classList.add("error");
//       alertMessage.style.display = "block";
//       alertMessage.innerText = `Sign Up Error : ${error.message}`;
//     } else {
//       alertMessage.classList.add("success");
//       alertMessage.style.display = "block";
//       alertMessage.innerText =
//         "Signup successful! Please check your email to confirm.";
//     }
//     loader.style.display = "none";
//     btnText.style.display = "block";
//     console.log(data);
//   });
// }

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

// // Utility function to handle cookies
// function setCookie(name, value, days) {
//   let expires = "";
//   if (days) {
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }

// function getCookie(name) {
//   const nameEQ = name + "=";
//   const ca = document.cookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }

// window.onload = function () {
//   let userCookie = getCookie("user");
//   if (!userCookie) {
//     let user = prompt('Enter your Username? ');
//     setCookie("user", user, 7);
//     console.log("Cookie 'user' was not set, now it has been created.");
//     userCookie = getCookie('user')
//     console.log('And Cookie is', userCookie)
//   } else {
//     console.log("Cookie 'user' is already set: " + userCookie);
//   }
// };

// Google OAuth Sign In
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
//       const userId = data.user.id;

//       // Store the user ID in cookies
//       setCookie("user_id", userId, 7); // Stores for 7 days

//       // Check if the user already exists in the database
//       const { data: userExists, error: userError } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", userId)
//         .single();

//       if (!userExists) {
//         alertMessage.classList.add("error");
//         alertMessage.style.display = "block";
//         alertMessage.innerText = "You are not registered, please sign up first.";
//         // window.location.href = "signup.html";
//       } else {
//         window.location.href = "/Web%20Interface/index/index.html";
//       }
//     }
//   });
// }

// Check if user is already logged in
// window.onload = async function () {
//   const userId = getCookie("user_id");

//   if (userId) {
//     const { data: user, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     if (!user) {
//       alert("User not found. Please sign up.");
//       // window.location.href = "signup.html";
//     } else {
//       // window.location.href = "/Web%20Interface/index/index.html";
//     }
//   }
// };

// function extractAccessToken() {
//   const currentUrl = window.location.href;
//   console.log(currentUrl);
//   const params = new URLSearchParams(window.location.hash.substring(1));
//   const accessToken = params.get("access_token");

//   if (accessToken) {
//     console.log("Access Token:", accessToken);
//     fetchUserInfo(accessToken);
//   } else {
//     console.log("Access Token not found in the URL.");
//   }
// }

// async function fetchUserInfo(accessToken) {
//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     // if (!response.ok) {
//     //   throw new Error("Network response was not ok: " + response.statusText);
//     // }

//     const userInfo = await response.json();
//     console.log("User Information:", userInfo);
//   } catch (error) {
//     console.error("Error fetching user info:", error);
//   }
// }
// window.onload = extractAccessToken;
